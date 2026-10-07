import { useEffect, useState } from 'react';
import mark from './assets/logo-mark.svg';
import logoDark from './assets/logo-dark.svg';
import f1 from './assets/foto1.webp';
import f2 from './assets/foto2.webp';
import f3 from './assets/foto3.webp';
import f4 from './assets/foto4.webp';
import f5 from './assets/foto5.webp';
import f6 from './assets/foto6.webp';
import f7 from './assets/foto7.webp';
import f8 from './assets/foto8.webp';
import f9 from './assets/foto9.webp';
import f10 from './assets/foto10.webp';
import f11 from './assets/foto11.webp';
import f12 from './assets/foto12.webp';
import f13 from './assets/foto13.webp';
import m1 from './assets/meniu1.webp';
import m2 from './assets/meniu2.webp';
import m3 from './assets/meniu3.webp';
import { CHEIE_FORMULAR, contact, servicii, motive, meniu, pacheteImplicite } from './content.js';
import Rezervare from './Rezervare.jsx';

const nav = [['#top', 'Acasă'], ['#servicii', 'Servicii'], ['#galerie', 'Galerie'], ['#pachete', 'Pachete'], ['#rezervare', 'Rezervări']];
// al treilea element: forma în grilă — 'mare' (2×2), 'inalt' (1×2), 'lat' (2×1) sau '' (1×1)
const galerie = [
  [f2, 'Arcadă de ceremonie cu hortensii albastre', 'mare'],
  [f9, 'Masă lungă cu față de masă galbenă, sub copaci și ghirlande de lumini', 'inalt'],
  [f11, 'Arcade drapate în galben pentru ceremonie', 'inalt'],
  [f12, 'Sala cu tavan de verdeață, candelabre și masa mirilor', 'inalt'],
  [f10, 'Mese galbene așezate în careu pe terasă', ''],
  [f5, 'Mese festive pe terasă, sub ghirlande de lumini', ''],
  [f13, 'Terasă cu decor galben și panou de așezare a invitaților', 'lat'],
  [f3, 'Ceremonie pe terasă, văzută de sus', ''],
  [f6, 'Terasa aranjată pentru cină, vedere aeriană', ''],
  [f8, 'Fundal de ceremonie cu draperii', ''],
  [f1, 'Largo Event Park și lacul, vedere aeriană', ''],
];

export default function App() {
  const [pachete, setPachete] = useState(pacheteImplicite);
  const [ales, setAles] = useState('');
  const [solid, setSolid] = useState(false);
  const [deschis, setDeschis] = useState(false);

  useEffect(() => {
    if (!CHEIE_FORMULAR) fetch('/api/pachete').then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => Array.isArray(d) && d.length && setPachete(d)).catch(() => {});
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${solid || deschis ? 'nav--solid' : ''}`}>
        <a href="#top" className="nav__brand" aria-label="Largo Event Park — acasă">
          <img src={mark} alt="" />
          <span><span className="nav__name">LARGO</span><span className="nav__sub">Event Park</span></span>
        </a>
        <button className="nav__toggle" aria-expanded={deschis} aria-label="Meniu" onClick={() => setDeschis(!deschis)}>
          <span /><span />
        </button>
        <nav className={deschis ? 'is-open' : ''} onClick={() => setDeschis(false)}>
          {nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__inner">
            <p className="eyebrow">Largo Event Park · Chișinău</p>
            <h1>Nunta ta, exact așa cum ai visat-o</h1>
            <p>Organizăm nunți cu suflet, de la prima idee până la ultimul dans.</p>
            <div className="hero__cta">
              <a href="#rezervare" className="btn btn--gold">Rezervă data</a>
              <a href="#servicii" className="btn btn--ghost">Serviciile noastre</a>
            </div>
          </div>
        </section>

        <section id="despre" className="sec">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Despre noi</p>
              <h2>Pregătirea nunții ar trebui să fie o bucurie, nu o grijă</h2>
              <p className="lead">Ziua nunții este una dintre cele mai frumoase din viață. La Largo Event Park ne ocupăm de fiecare detaliu, pentru ca voi să vă puteți bucura de emoții, de cei dragi și unul de celălalt.</p>
              <p className="muted">Ascultăm povestea voastră, înțelegem ce vă doriți și transformăm totul într-un eveniment care vă reprezintă: elegant, bine organizat și plin de momente de neuitat.</p>
            </div>
            <img className="foto foto--inalt" src={f4} alt="Sala de bal cu candelabru de cristal și mese aranjate" loading="lazy" decoding="async" />
          </div>
        </section>

        <section id="servicii" className="sec servicii">
          <div className="wrap">
            <p className="eyebrow">Serviciile noastre</p>
            <h2>Tot ce are nevoie o nuntă, într-un singur loc</h2>
            <div className="servicii__grid">
              {servicii.map((s) => (
                <article key={s.t}><h3>{s.t}</h3><p>{s.d}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap split split--inv">
            <img className="foto" src={f7} alt="Arcadă albă de ceremonie cu flori și pufuri verzi" loading="lazy" decoding="async" />
            <div>
              <p className="eyebrow">De ce să ne alegeți</p>
              <h2>Liniștea că totul este pe mâini bune</h2>
              <ol className="motive">{motive.map((m) => <li key={m}>{m}</li>)}</ol>
            </div>
          </div>
        </section>

        <section id="galerie" className="sec galerie">
          <div className="wrap">
            <p className="eyebrow">Galerie</p>
            <h2>Același loc, de fiecare dată altă poveste</h2>
            <div className="galerie__grid">
              {galerie.map(([src, alt, forma]) => <img key={src} className={forma} src={src} alt={alt} loading="lazy" decoding="async" />)}
            </div>
          </div>
        </section>

        <section id="pachete" className="sec">
          <div className="wrap">
            <p className="eyebrow">Pachete de nuntă</p>
            <h2>Trei puncte de pornire, o singură nuntă: a voastră</h2>
            <div className="pachete__grid">
              {pachete.map((p, i) => (
                <article key={p.id} className={i === 1 ? 'pachet pachet--top' : 'pachet'}>
                  {i === 1 && <span className="pachet__tag">Cel mai ales</span>}
                  <h3>{p.nume}</h3>
                  <p>{p.descriere}</p>
                  <ul>{p.include.map((x) => <li key={x}>{x}</li>)}</ul>
                  <a href="#rezervare" className="btn btn--line" onClick={() => setAles(String(p.id))}>Cere ofertă</a>
                </article>
              ))}
            </div>
            <p className="nota">Prețul se stabilește în funcție de dată, numărul de invitați și meniul ales.</p>
          </div>
        </section>

        <section id="meniu" className="sec meniu">
          <div className="wrap">
            <p className="eyebrow">Meniu</p>
            <h2>Un meniu ales la masă, nu de pe hârtie</h2>
            <div className="meniu__foto">
              <img src={m1} alt="Masă festivă cu aperitive reci și aranjamente florale roz" loading="lazy" decoding="async" />
              <img src={m2} alt="Platouri cu somon, creveți, salate și antreuri" loading="lazy" decoding="async" />
              <img src={m3} alt="Bruschete și gustări la bufetul de întâmpinare" loading="lazy" decoding="async" />
            </div>
            <div className="meniu__grid">
              {meniu.map((c) => (
                <div key={c.t}><h3>{c.t}</h3><ul>{c.p.map((x) => <li key={x}>{x}</li>)}</ul></div>
              ))}
            </div>
            <p className="nota">Meniul se personalizează pentru fiecare nuntă, cu degustare înainte de eveniment.</p>
          </div>
        </section>

        <section id="rezervare" className="sec rezervare">
          <div className="wrap rezervare__grid">
            <div>
              <p className="eyebrow">Rezervări</p>
              <h2>Spuneți-ne data. Restul îl construim împreună.</h2>
              <p>Completați formularul și vă sunăm pentru a stabili o vizită.</p>
              <dl className="contact">
                <dt>Telefon</dt><dd><a href={`tel:${contact.telefonLink}`}>{contact.telefon}</a></dd>
                <dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
                <dt>Adresă</dt><dd>{contact.adresa}</dd>
              </dl>
            </div>
            <Rezervare pachete={pachete} ales={ales} setAles={setAles} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src={logoDark} alt="Largo Event Park" />
        <p>Nunți cu suflet, de la prima idee până la ultimul dans</p>
        <small>{contact.adresa} · {contact.telefon} · {contact.email}<br />© {new Date().getFullYear()} Largo Event Park</small>
      </footer>
    </>
  );
}
