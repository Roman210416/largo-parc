import { useState } from 'react';
import { CHEIE_FORMULAR } from './content.js';

const gol = { nume: '', telefon: '', email: '', data_eveniment: '', nr_invitati: '', mesaj: '' };
const rest = ({ lat, ...p }) => p;
const azi = () => new Date().toISOString().slice(0, 10);

export default function Rezervare({ pachete, ales, setAles }) {
  const [f, setF] = useState(gol);
  const [erori, setErori] = useState({});
  const [stare, setStare] = useState('idle'); // idle | trimite | ok | eroare
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function trimite(e) {
    e.preventDefault();
    setStare('trimite'); setErori({});
    try {
      if (CHEIE_FORMULAR) {
        // Varianta fără server: cererea ajunge pe email
        const pachet = pachete.find((p) => String(p.id) === String(ales))?.nume || 'Nedecis';
        const r = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: CHEIE_FORMULAR,
            subject: `Rezervare nouă: ${f.nume}, ${f.data_eveniment}`,
            from_name: 'Site Largo Event Park',
            Nume: f.nume,
            Telefon: f.telefon,
            ...(f.email ? { email: f.email } : {}),
            'Data nunții': f.data_eveniment,
            'Număr de invitați': f.nr_invitati,
            Pachet: pachet,
            Mesaj: f.mesaj || '—',
          }),
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.success) throw new Error();
        setF(gol); setAles(''); setStare('ok');
        return;
      }
      const r = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, nr_invitati: Number(f.nr_invitati), pachet_id: ales || null }),
      });
      if (r.status === 400) {
        const d = await r.json().catch(() => ({}));
        setErori(d.erori || {}); setStare('idle'); return;
      }
      if (!r.ok) throw new Error();
      setF(gol); setAles(''); setStare('ok');
    } catch { setStare('eroare'); }
  }

  if (stare === 'ok') return (
    <div className="form form--ok" role="status">
      <h3>Mulțumim!</h3>
      <p>Am primit cererea voastră. Vă contactăm în cel mai scurt timp pentru a stabili o vizită.</p>
      <button className="btn btn--line" onClick={() => setStare('idle')}>Trimite altă cerere</button>
    </div>
  );

  const camp = (k, eticheta, props = {}) => (
    <label className={props.lat ? 'lat' : ''}>
      <span>{eticheta}</span>
      <input value={f[k]} onChange={set(k)} aria-invalid={!!erori[k]} {...rest(props)} />
      {erori[k] && <em>{erori[k]}</em>}
    </label>
  );

  return (
    <form className="form" onSubmit={trimite} noValidate={false}>
      {camp('nume', 'Numele vostru', { required: true, maxLength: 120, autoComplete: 'name', lat: true })}
      {camp('telefon', 'Telefon', { required: true, type: 'tel', autoComplete: 'tel' })}
      {camp('email', 'Email (opțional)', { type: 'email', autoComplete: 'email' })}
      {camp('data_eveniment', 'Data nunții', { required: true, type: 'date', min: azi() })}
      {camp('nr_invitati', 'Număr de invitați', { required: true, type: 'number', min: 10, max: 1000, inputMode: 'numeric' })}
      <label className="lat">
        <span>Pachet</span>
        <select value={ales} onChange={(e) => setAles(e.target.value)}>
          <option value="">Încă nu ne-am decis</option>
          {pachete.map((p) => <option key={p.id} value={p.id}>{p.nume}</option>)}
        </select>
      </label>
      <label className="lat">
        <span>Mesaj (opțional)</span>
        <textarea rows="4" maxLength={2000} value={f.mesaj} onChange={set('mesaj')} placeholder="Povestiți-ne pe scurt cum vă imaginați ziua" />
      </label>
      {stare === 'eroare' && <p className="form__err lat" role="alert">Nu am putut trimite cererea. Încercați din nou sau sunați-ne.</p>}
      <button className="btn btn--gold lat" disabled={stare === 'trimite'}>{stare === 'trimite' ? 'Se trimite…' : 'Trimite cererea'}</button>
    </form>
  );
}
