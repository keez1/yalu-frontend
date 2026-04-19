import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import "../styles/Index.css";

const CATS = [
  { icon: "pencil-fill",      label: "Lapices y plumas",    count: "80+ items",  color: "#FFF3E0", accent: "#F97316" },
  { icon: "book-fill",        label: "Libros y cuadernos",  count: "120+ items", color: "#E8F5E9", accent: "#22C55E" },
  { icon: "palette-fill",     label: "Arte y pintura",      count: "95+ items",  color: "#EDE9FE", accent: "#8B5CF6" },
  { icon: "rulers",           label: "Geometria",           count: "40+ items",  color: "#DBEAFE", accent: "#2563EB" },
  { icon: "scissors",         label: "Manualidades",        count: "60+ items",  color: "#FCE7F3", accent: "#EC4899" },
  { icon: "bag-fill",         label: "Mochilas y estuches", count: "35+ items",  color: "#FEF9C3", accent: "#EAB308" },
];

const STEPS = [
  { n: "01", icon: "box-arrow-in-right", title: "Ingresa con Google",  desc: "Un clic y ya estas dentro. Sin formularios largos." },
  { n: "02", icon: "search",             title: "Explora el catalogo", desc: "Filtra por categoria, precio o marca facilmente." },
  { n: "03", icon: "cart-check-fill",    title: "Agrega al carrito",   desc: "Selecciona tus utiles y revisa tu pedido." },
  { n: "04", icon: "bag-check-fill",     title: "Confirma y listo",    desc: "Recoge en tienda o coordinamos entrega en Trujillo." },
];

const MARQUEE = ["LAPICES","CUADERNOS","COLORES","REGLAS","MOCHILAS","BORRADORES","TIJERAS","PINTURAS","LIBRERIA YALU","TRUJILLO"];

export default function Index() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [robotReady, setRobotReady] = useState(false);
  const [counts, setCounts] = useState({ p: 0, y: 0, c: 0 });
  const floatRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 60);
    const t = { p: 500, y: 14, c: 2000 };
    let s = 0; const steps = 55;
    const id = setInterval(() => {
      s++; const e = 1 - Math.pow(1 - s/steps, 3);
      setCounts({ p: Math.floor(e*t.p), y: Math.floor(e*t.y), c: Math.floor(e*t.c) });
      if (s >= steps) clearInterval(id);
    }, 1800/steps);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`yi ${loaded ? "yi--on" : ""}`}>

      {/* NAV */}
      <nav className="yi-nav">
        <div className="yi-nav__logo">
          <img src="/src/assets/logo.png" alt="Yalu" />
          <div>
            <b>Yalu</b>
            <small>Libreria Bazar</small>
          </div>
        </div>
        <div className="yi-nav__links">
          <a href="#catalogo">Catalogo</a>
          <a href="#como">Como funciona</a>
          <a href="#nosotros">Nosotros</a>
        </div>
        <button className="yi-nav__cta" onClick={() => navigate("/login")}>
          <i className="bi bi-box-arrow-in-right"></i> Ingresar
        </button>
      </nav>

      {/* HERO */}
      <section className="yi-hero">
        {/* fondo decorativo */}
        <div className="yi-hero__blob yi-hero__blob--a" />
        <div className="yi-hero__blob yi-hero__blob--b" />
        <div className="yi-hero__blob yi-hero__blob--c" />

        {/* circulos flotantes decorativos utiles */}
        <div className="yi-hero__deco yi-hero__deco--1"><i className="bi bi-pencil-fill"></i></div>
        <div className="yi-hero__deco yi-hero__deco--2"><i className="bi bi-book-fill"></i></div>
        <div className="yi-hero__deco yi-hero__deco--3"><i className="bi bi-palette-fill"></i></div>
        <div className="yi-hero__deco yi-hero__deco--4"><i className="bi bi-rulers"></i></div>
        <div className="yi-hero__deco yi-hero__deco--5"><i className="bi bi-scissors"></i></div>
        <div className="yi-hero__deco yi-hero__deco--6"><i className="bi bi-bag-fill"></i></div>

        <div className="yi-hero__content">
          <div className="yi-hero__pill">
            <i className="bi bi-geo-alt-fill"></i> Trujillo, Peru
          </div>
          <h1 className="yi-hero__h1">
            <span className="l l1">Todo para</span>
            <span className="l l2">aprender y</span>
            <span className="l l3"><em>crear.</em></span>
          </h1>
          <p className="yi-hero__p">
            La libreria bazar con mas variedad de Trujillo.
            Utiles, arte, libros y todo lo que necesitas,
            ahora en un solo lugar.
          </p>
          <div className="yi-hero__btns">
            <button className="yi-btn yi-btn--blue" onClick={() => navigate("/login")}>
              Ver catalogo <i className="bi bi-arrow-right"></i>
            </button>
            <button className="yi-btn yi-btn--ghost" onClick={() => navigate("/login")}>
              Ver ofertas <i className="bi bi-tag-fill"></i>
            </button>
          </div>
          <div className="yi-hero__badges">
            <span><i className="bi bi-truck"></i> Envio en Trujillo</span>
            <span><i className="bi bi-shield-check"></i> Compra segura</span>
            <span><i className="bi bi-star-fill"></i> +2000 clientes</span>
          </div>
        </div>

        {/* ilustracion hero â€” grid de productos */}
        <div className="yi-hero__visual">
          <div className="yi-hero__shelf">
            <div className="yi-shelf-card yi-shelf-card--a">
              <div className="yi-shelf-card__icon"><i className="bi bi-pencil-fill"></i></div>
              <span>Lapices</span>
              <small>Desde S/.2</small>
            </div>
            <div className="yi-shelf-card yi-shelf-card--b">
              <div className="yi-shelf-card__icon"><i className="bi bi-book-fill"></i></div>
              <span>Cuadernos</span>
              <small>Desde S/.5</small>
            </div>
            <div className="yi-shelf-card yi-shelf-card--c">
              <div className="yi-shelf-card__icon"><i className="bi bi-palette-fill"></i></div>
              <span>Pinturas</span>
              <small>Desde S/.8</small>
            </div>
            <div className="yi-shelf-card yi-shelf-card--d">
              <div className="yi-shelf-card__icon"><i className="bi bi-rulers"></i></div>
              <span>Geometria</span>
              <small>Desde S/.3</small>
            </div>
            <div className="yi-shelf-card yi-shelf-card--e">
              <div className="yi-shelf-card__icon"><i className="bi bi-bag-fill"></i></div>
              <span>Mochilas</span>
              <small>Desde S/.35</small>
            </div>
            <div className="yi-shelf-card yi-shelf-card--f">
              <div className="yi-shelf-card__icon"><i className="bi bi-scissors"></i></div>
              <span>Manualidades</span>
              <small>Desde S/.4</small>
            </div>
          </div>
          <div className="yi-hero__tag">
            <i className="bi bi-lightning-fill"></i> +500 productos disponibles
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="yi-marquee" aria-hidden="true">
        <div className="yi-marquee__t">
          {[...MARQUEE,...MARQUEE,...MARQUEE].map((x,i) => (
            <span key={i}>{x} <i className="bi bi-dot"></i></span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="yi-stats">
        <div className="yi-stat">
          <strong>+{counts.p}</strong><span>Productos</span>
        </div>
        <div className="yi-stat__line" />
        <div className="yi-stat">
          <strong>{counts.y}+</strong><span>Anos de experiencia</span>
        </div>
        <div className="yi-stat__line" />
        <div className="yi-stat">
          <strong>+{counts.c}</strong><span>Clientes felices</span>
        </div>
        <div className="yi-stat__line" />
        <div className="yi-stat">
          <strong>100%</strong><span>Productos originales</span>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="yi-cats" id="catalogo">
        <div className="yi-sec">
          <p className="yi-lbl">Catalogo</p>
          <h2 className="yi-h2">Encuentra todo lo que <em>necesitas</em></h2>
          <p className="yi-sub">Desde el lapiz mas sencillo hasta materiales de arte profesional.</p>
        </div>
        <div className="yi-cats__grid">
          {CATS.map((c,i) => (
            <div key={i} className="yi-cat" style={{"--ca": c.accent,"--cb": c.color, animationDelay:`${i*0.08}s`}} onClick={() => navigate("/login")}>
              <div className="yi-cat__ico"><i className={`bi bi-${c.icon}`}></i></div>
              <div className="yi-cat__info">
                <strong>{c.label}</strong>
                <span>{c.count}</span>
              </div>
              <i className="bi bi-chevron-right yi-cat__arr"></i>
            </div>
          ))}
        </div>
        <div className="yi-cats__foot">
          <button className="yi-btn yi-btn--blue" onClick={() => navigate("/login")}>
            Ver catalogo completo <i className="bi bi-grid-fill"></i>
          </button>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="yi-how" id="como">
        <div className="yi-how__bg" />
        <div className="yi-sec yi-sec--light">
          <p className="yi-lbl yi-lbl--w">Como funciona</p>
          <h2 className="yi-h2 yi-h2--w">Comprar es <em>muy facil</em></h2>
        </div>
        <div className="yi-how__grid">
          {STEPS.map((s,i) => (
            <div key={i} className="yi-step">
              <div className="yi-step__n">{s.n}</div>
              <div className="yi-step__ico"><i className={`bi bi-${s.icon}`}></i></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",paddingTop:"48px",position:"relative",zIndex:1}}>
          <button className="yi-btn yi-btn--white" onClick={() => navigate("/login")}>
            Empezar ahora <i className="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="yi-about" id="nosotros">
        <div className="yi-about__l">
          <p className="yi-lbl">Nuestra historia</p>
          <h2 className="yi-h2">Mas que una <em>libreria</em></h2>
          <p className="yi-about__txt">
            Desde Trujillo, llevamos mas de 14 anos siendo el aliado de estudiantes,
            docentes y creativos. En Yalu encontraras todo lo que necesitas para
            aprender, crear y crecer. Somos una libreria con alma moderna.
          </p>
          <div className="yi-about__list">
            <div><i className="bi bi-check-circle-fill"></i> Atencion personalizada</div>
            <div><i className="bi bi-check-circle-fill"></i> Precios justos y competitivos</div>
            <div><i className="bi bi-check-circle-fill"></i> La mayor variedad de Trujillo</div>
          </div>
          <button className="yi-btn yi-btn--blue" onClick={() => navigate("/login")}>
            Conocer la tienda <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        <div className="yi-about__r">
          <div className="yi-about__big">
            <i className="bi bi-book-half"></i>
            <strong>+14</strong>
            <span>Anos en Trujillo</span>
          </div>
          <div className="yi-about__grid2">
            <div className="yi-abox">
              <i className="bi bi-star-fill"></i>
              <strong>4.9</strong>
              <span>Valoracion</span>
            </div>
            <div className="yi-abox">
              <i className="bi bi-bag-check-fill"></i>
              <strong>+500</strong>
              <span>Pedidos/mes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROBOT CTA con Spline */}
      <section className="yi-cta">
        <div className="yi-cta__l">
          <p className="yi-lbl yi-lbl--w">Tecnologia + Educacion</p>
          <h2 className="yi-h2 yi-h2--w">El futuro de comprar<br /><em>utiles escolares</em></h2>
          <p className="yi-cta__desc">
            Yalu no es solo una libreria. Es una plataforma disenada para que
            estudiantes, padres y docentes encuentren lo que necesitan en segundos.
          </p>
          <button className="yi-btn yi-btn--white" onClick={() => navigate("/login")}>
            Empezar gratis <i className="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
        <div className="yi-cta__r">
          {!robotReady && (
            <div className="yi-loader">
              <div className="yi-loader__ring yi-loader__ring--w" />
            </div>
          )}
          <div className={`yi-cta__spline ${robotReady ? "yi-cta__spline--on" : ""}`}>
            <Spline
              scene="https://prod.spline.design/d6I5rP0Gl6tfQeGu/scene.splinecode"
              onLoad={() => setRobotReady(true)}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="yi-foot" id="contacto">
        <div className="yi-foot__top">
          <div className="yi-foot__brand">
            <img src="/src/assets/logo.png" alt="Yalu" />
            <div>
              <strong>Libreria Bazar Yalu</strong>
              <span>Trujillo, Peru</span>
            </div>
          </div>
          <div className="yi-foot__nav">
            <a href="#catalogo">Catalogo</a>
            <a href="#como">Como funciona</a>
            <a href="#nosotros">Nosotros</a>
            <button onClick={() => navigate("/login")}>Ingresar</button>
          </div>
        </div>
        <div className="yi-foot__bot">
          <span>2025 Libreria Bazar Yalu. Todos los derechos reservados.</span>
          <div className="yi-foot__social">
            <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
