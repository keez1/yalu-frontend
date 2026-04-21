import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/catalogo/productos/")
      .then((res) => setProductos(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>Catálogo</h2>
        <span style={{ color: "#777", fontSize: "0.85rem" }}>{filtrados.length} productos</span>
      </div>

      <input
        className="mb-4"
        placeholder="🔍 Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          background: "#1F1F1F", border: "1px solid #2A2A2A",
          borderRadius: "12px", padding: "12px 16px",
          color: "#F0F0F0", width: "100%", outline: "none"
        }}
      />

      {loading && <p style={{ color: "#777" }}>Cargando productos...</p>}

      {!loading && filtrados.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: "3rem" }}>📦</div>
          <p style={{ color: "#777", marginTop: "12px" }}>No hay productos disponibles</p>
        </div>
      )}

      <div className="row g-3">
        {filtrados.map((p) => (
          <div key={p.id} className="col-6 col-md-4 col-lg-3">
            <div style={{
              background: "#161616", border: "1px solid #2A2A2A",
              borderRadius: "16px", overflow: "hidden", height: "100%",
              transition: "border-color .2s"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#444"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2A2A2A"}
            >
              <div style={{
                background: "#1F1F1F", height: "120px",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem"
              }}>
                {p.imagen_principal
                  ? <img src={p.imagen_principal} alt={p.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : "📚"}
              </div>
              <div style={{ padding: "14px" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px", color: "#fff" }}>{p.nombre}</div>
                <div style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "8px" }}>{p.categoria_nombre}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#CFEE3B", fontSize: "1rem", marginBottom: "10px" }}>
                  S/. {p.precio}
                </div>
                <button onClick={() => navigate(`/productos/${p.id}`)} style={{
                  width: "100%", background: "#F97316", color: "#fff",
                  border: "none", borderRadius: "10px", padding: "8px",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer"
                }}>Ver detalle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}