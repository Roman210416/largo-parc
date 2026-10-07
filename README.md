# Largo Event Park

Site de prezentare pentru restaurantul de nunți Largo Event Park.
**Frontend:** React (Vite) · **Backend:** Node.js (Express) · **Bază de date:** MySQL

## Pornire

Necesită Node.js 18+ și MySQL 8 (sau MariaDB 10.5+).

```bash
# 1. baza de date (creează schema + cele 3 pachete)
mysql -u root -p < database/schema.sql

# 2. configurare server
cp server/.env.example server/.env      # completați parola MySQL și ADMIN_KEY

# 3. dependențe
npm run install:all

# 4. dezvoltare — în două terminale
npm run dev:server     # API pe http://localhost:4000
npm run dev:client     # site pe http://localhost:5173
```

Producție: `npm run build && npm start` — serverul Node servește și site-ul, pe portul 4000.

## Structură

```
client/   React — src/App.jsx, src/Rezervare.jsx, src/styles.css
          src/content.js  ← textele și datele de contact (de editat)
          src/assets/     ← poza de fundal și logotipul (SVG, variantă deschisă și închisă)
server/   Express — src/index.js (rute), src/db.js (conexiune MySQL)
database/ schema.sql — tabelele `pachete` și `rezervari`
```

## API

| Metodă | Rută | Descriere |
|---|---|---|
| GET | `/api/pachete` | pachetele afișate pe site |
| POST | `/api/rezervari` | salvează o cerere din formular |
| GET | `/api/rezervari` | lista cererilor; cere header `x-admin-key` |
| GET | `/api/health` | verifică legătura cu baza de date |

Vedeți cererile primite: `curl -H "x-admin-key: CHEIA" http://localhost:4000/api/rezervari`

## De completat

În `client/src/content.js`: meniul este un exemplu; pachetele sunt o propunere.
