// Tot textul site-ului este aici — editați liber.
export const contact = {
  telefon: '+373 60 789 992',
  telefonLink: '+37360789992',
  email: 'LargoEventPark@gmail.com',
  adresa: 'Str. Ialoveni 33, Chișinău, Moldova',
};

// Formularul de rezervări, trimis pe email prin Web3Forms (pentru GitHub Pages).
// Puneți aici cheia primită de la web3forms.com. Dacă rămâne goală, formularul
// trimite cererea la serverul Node.js (/api/rezervari), ca pe calculatorul local.
export const CHEIE_FORMULAR = 'f4fa70a2-4be1-43ef-93ce-b22afffcedd6';

export const servicii = [
  { t: 'Organizare completă', d: 'Planificare, buget, coordonarea furnizorilor și a întregii zile.' },
  { t: 'Decor și aranjamente florale', d: 'Concepte personalizate pentru sală, ceremonie și masa mirilor.' },
  { t: 'Foto și video', d: 'Amintiri surprinse natural, pe care le veți revedea cu drag peste ani.' },
  { t: 'Muzică și divertisment', d: 'Formație, DJ, moderator și momente artistice.' },
  { t: 'Meniu și tort', d: 'Consultanță în alegerea restaurantului, a meniului și a candy bar-ului.' },
  { t: 'Invitații și papetărie', d: 'Design unitar, de la invitații la meniuri și plicuri de dar.' },
];

export const motive = [
  'Experiență în organizarea nunților de toate dimensiunile',
  'Soluții adaptate bugetului vostru, fără costuri ascunse',
  'Furnizori verificați, cu care lucrăm de ani de zile',
  'Un coordonator prezent alături de voi pe tot parcursul zilei',
];

// EXEMPLU de meniu — înlocuiți cu preparatele reale
export const meniu = [
  { t: 'Aperitive reci', p: ['Platou de brânzeturi și fructe', 'Rulouri de vinete cu nucă', 'Somon marinat cu citrice', 'Tartine cu pate de casă'] },
  { t: 'Aperitive calde', p: ['Plăcinte moldovenești', 'Julien de pui cu ciuperci', 'Sarmale în foi de viță'] },
  { t: 'Fel principal', p: ['Friptură de vițel cu sos de vin roșu', 'Rață la cuptor cu mere', 'Pește la grătar cu legume'] },
  { t: 'Desert', p: ['Tortul mirilor', 'Candy bar', 'Fructe de sezon'] },
];

// Folosite doar dacă serverul nu răspunde
export const pacheteImplicite = [
  { id: 1, nume: 'Classic', descriere: 'Esențialul unei nunți reușite, într-un cadru elegant.', include: ['Sala de bal cu vitraliu', 'Meniu festiv complet', 'Aranjament standard al meselor', 'Coordonator de eveniment'] },
  { id: 2, nume: 'Largo', descriere: 'Pachetul nostru cel mai ales: ceremonie pe terasă și petrecere în sală.', include: ['Tot ce include Classic', 'Ceremonie în aer liber pe terasă', 'Welcome drink și candy bar', 'Decor floral pentru arcadă'] },
  { id: 3, nume: 'Signature', descriere: 'O nuntă gândită în întregime după povestea voastră.', include: ['Tot ce include Largo', 'Meniu personalizat cu bucătarul-șef', 'Decor și lumini la comandă', 'Întregul complex, în exclusivitate'] },
];
