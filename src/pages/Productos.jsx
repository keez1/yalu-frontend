import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catSel, setCatSel] = useState("");
  const [marcaSel, setMarcaSel] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [orden, setOrden] = useState("");
  const { agregarItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get("/catalogo/productos/"),
      api.get("/catalogo/categorias/").catch(() => ({ data: [] })),
      api.get("/catalogo/marcas/").catch(() => ({ data: [] })),
    ]).then(([p, c, m]) => {
      setProductos(p.data);
      setCategorias(c.data);
      setMarcas(m.data);
    }).finally(() => setLoading(false));
  }, []);

  let filtrados = productos.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    const matchCat = catSel ? p.categoria_nombre === catSel : true;
    const matchMarca = marcaSel ? p.marca_nombre === marcaSel : true;
    const matchPrecio = precioMax ? parseFloat(p.precio_base) <= parseFloat(precioMax) : true;
    return matchSearch && matchCat && matchMarca && matchPrecio;
  });

  if (orden === "asc") filtrados = [...filtrados].sort((a, b) => a.precio_base - b.precio_base);
  if (orden === "desc") filtrados = [...filtrados].sort((a, b) => b.precio_base - a.precio_base);
  if (orden === "az") filtrados = [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre));

  const limpiar = () => { setSearch(""); setCatSel(""); setMarcaSel(""); setPrecioMax(""); setOrden(""); };

  const hayFiltros = search || catSel || marcaSel || precioMax || orden;

  const agregarRapido = (e, p) => {
    e.stopPropagation();
    agregarItem({ id: p.id, nombre: p.nombre, imagen: p.imagen_principal || null, precio: p.precio_base, variante_id: null, variante_nombre: null, cantidad: 1 });
  };
  return (
    <div style={{ background: "#f8faff", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
            CatÃ¡logo
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.88rem", fontWeight: 600 }}>
            {loading ? "Cargando..." : `${filtrados.length} producto${filtrados.length !== 1 ? "s" : ""} disponibles`}
          </p>
        </div>

        {/* Barra busqueda + filtros */}
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "20px",
          border: "1px solid rgba(0,0,0,0.07)", marginBottom: "28px",
          display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end"
        }}>

          {/* Busqueda */}
          <div style={{ flex: "1 1 220px", position: "relative" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.9rem" }}></i>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              style={{
                width: "100%", padding: "10px 14px 10px 38px",
                border: "1px solid #e2e8f0", borderRadius: "10px",
                fontSize: "0.87rem", fontFamily: "'Nunito', sans-serif",
                outline: "none", background: "#f8faff", color: "#0f172a", boxSizing: "border-box"
              }}
            />
          </div>

          {/* Categoria */}
          <select value={catSel} onChange={e => setCatSel(e.target.value)} style={{
            flex: "1 1 150px", padding: "10px 14px", border: "1px solid #e2e8f0",
            borderRadius: "10px", fontSize: "0.87rem", fontFamily: "'Nunito', sans-serif",
            background: "#f8faff", color: "#0f172a", outline: "none", cursor: "pointer"
          }}>
            <option value="">Todas las categorias</option>
            {categorias.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
          </select>

          {/* Marca */}
          <select value={marcaSel} onChange={e => setMarcaSel(e.target.value)} style={{
            flex: "1 1 140px", padding: "10px 14px", border: "1px solid #e2e8f0",
            borderRadius: "10px", fontSize: "0.87rem", fontFamily: "'Nunito', sans-serif",
            background: "#f8faff", color: "#0f172a", outline: "none", cursor: "pointer"
          }}>
            <option value="">Todas las marcas</option>
            {marcas.map(m => <option key={m.id} value={m.nombre}>{m.nombre}</option>)}
          </select>

          {/* Precio max */}
          <div style={{ flex: "1 1 130px", position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "0.8rem", color: "#94a3b8", fontWeight: 700 }}>S/.</span>
            <input
              type="number"
              value={precioMax}
              onChange={e => setPrecioMax(e.target.value)}
              placeholder="Precio max"
              style={{
                width: "100%", padding: "10px 14px 10px 34px",
                border: "1px solid #e2e8f0", borderRadius: "10px",
                fontSize: "0.87rem", fontFamily: "'Nunito', sans-serif",
                background: "#f8faff", color: "#0f172a", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          {/* Orden */}
          <select value={orden} onChange={e => setOrden(e.target.value)} style={{
            flex: "1 1 140px", padding: "10px 14px", border: "1px solid #e2e8f0",
            borderRadius: "10px", fontSize: "0.87rem", fontFamily: "'Nunito', sans-serif",
            background: "#f8faff", color: "#0f172a", outline: "none", cursor: "pointer"
          }}>
            <option value="">Ordenar por</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
            <option value="az">Nombre A-Z</option>
          </select>

          {/* Limpiar */}
          {hayFiltros && (
            <button onClick={limpiar} style={{
              padding: "10px 16px", borderRadius: "10px", border: "1px solid #e2e8f0",
              background: "#fff", color: "#64748b", fontSize: "0.82rem", fontWeight: 700,
              cursor: "pointer", fontFamily: "'Nunito', sans-serif", whiteSpace: "nowrap"
            }}>
              <i className="bi bi-x-circle" style={{ marginRight: "5px" }}></i>Limpiar
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid #DBEAFE", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}></div>
            <p style={{ color: "#64748b", fontWeight: 600 }}>Cargando productos...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filtrados.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>ðŸ“¦</div>
            <p style={{ color: "#64748b", fontWeight: 700, fontSize: "1rem" }}>No hay productos disponibles</p>
            {hayFiltros && <button onClick={limpiar} style={{ marginTop: "12px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "100px", padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>Limpiar filtros</button>}
          </div>
        )}

        {/* Grid productos */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {filtrados.map((p) => (
            <div key={p.id}
              onClick={() => navigate(`/productos/${p.id}`)}
              style={{
                background: "#fff", borderRadius: "16px", overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer",
                transition: "all .22s cubic-bezier(.16,1,.3,1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(37,99,235,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
            >
              {/* Imagen */}
              <div style={{ height: "160px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                {p.imagen_principal
                  ? <img src={p.imagen_principal} alt={p.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <i className="bi bi-book-fill" style={{ fontSize: "2.5rem", color: "#cbd5e1" }}></i>
                }
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px" }}>
                {p.categoria_nombre && (
                  <span style={{
                    display: "inline-block", fontSize: "0.68rem", fontWeight: 800,
                    color: "#2563EB", background: "#DBEAFE", borderRadius: "100px",
                    padding: "2px 10px", marginBottom: "6px", letterSpacing: "0.03em"
                  }}>{p.categoria_nombre}</span>
                )}
                <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "#0f172a", marginBottom: "4px", lineHeight: 1.3 }}>{p.nombre}</p>
                {p.marca_nombre && <p style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, marginBottom: "10px" }}>{p.marca_nombre}</p>}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#2563EB" }}>
                    S/. {parseFloat(p.precio_base).toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => agregarRapido(e, p)}
                    style={{
                      background: "#2563EB", color: "#fff", border: "none",
                      borderRadius: "100px", padding: "7px 14px",
                      fontSize: "0.75rem", fontWeight: 800, cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif", transition: "all .2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1D4ED8"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2563EB"}
                  >
                    <i className="bi bi-cart-plus"></i> Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
