import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { pool } from './db.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get('/api/health', wrap(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ ok: true });
}));

app.get('/api/pachete', wrap(async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT id, nume, descriere, include_text FROM pachete WHERE activ = 1 ORDER BY ordine'
  );
  res.json(rows.map(({ include_text, ...p }) => ({ ...p, include: include_text.split('|') })));
}));

function valideaza(b) {
  const err = {};
  const nume = String(b.nume ?? '').trim();
  const telefon = String(b.telefon ?? '').trim();
  const email = String(b.email ?? '').trim();
  const data = String(b.data_eveniment ?? '');
  const nr = Number(b.nr_invitati);
  const mesaj = String(b.mesaj ?? '').trim();
  const pachet = b.pachet_id ? Number(b.pachet_id) : null;

  if (nume.length < 2 || nume.length > 120) err.nume = 'Introduceți numele.';
  if (!/^[+\d][\d\s()-]{5,28}$/.test(telefon)) err.telefon = 'Număr de telefon invalid.';
  if (email && (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) err.email = 'Email invalid.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || Number.isNaN(Date.parse(data))) err.data_eveniment = 'Alegeți data.';
  else if (data < new Date().toISOString().slice(0, 10)) err.data_eveniment = 'Data trebuie să fie în viitor.';
  if (!Number.isInteger(nr) || nr < 10 || nr > 1000) err.nr_invitati = 'Între 10 și 1000 de invitați.';
  if (pachet !== null && (!Number.isInteger(pachet) || pachet < 1)) err.pachet_id = 'Pachet invalid.';
  if (mesaj.length > 2000) err.mesaj = 'Mesaj prea lung.';

  return { err, val: { nume, telefon, email: email || null, data, nr, pachet, mesaj: mesaj || null } };
}

app.post('/api/rezervari', wrap(async (req, res) => {
  const { err, val } = valideaza(req.body ?? {});
  if (Object.keys(err).length) return res.status(400).json({ erori: err });
  const [r] = await pool.execute(
    `INSERT INTO rezervari (nume, telefon, email, data_eveniment, nr_invitati, pachet_id, mesaj)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [val.nume, val.telefon, val.email, val.data, val.nr, val.pachet, val.mesaj]
  );
  res.status(201).json({ id: r.insertId });
}));

// Lista cererilor — protejata cu cheie simpla (header x-admin-key)
app.get('/api/rezervari', wrap(async (req, res) => {
  if (!process.env.ADMIN_KEY || req.get('x-admin-key') !== process.env.ADMIN_KEY)
    return res.status(401).json({ mesaj: 'Neautorizat' });
  const [rows] = await pool.query(
    `SELECT r.*, p.nume AS pachet FROM rezervari r
     LEFT JOIN pachete p ON p.id = r.pachet_id ORDER BY r.creat_la DESC`
  );
  res.json(rows);
}));

// In productie serveste si frontendul construit (client/dist)
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ mesaj: 'JSON invalid' });
  if (err.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ erori: { pachet_id: 'Pachet inexistent.' } });
  console.error(err.code || err.message);
  res.status(500).json({ mesaj: 'Eroare de server. Încercați din nou.' });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`Largo Event Park API: http://localhost:${port}`));
