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

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <p style={{ color: "#F97316", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
            Librería Bazar Yalu
          </p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.6rem", letterSpacing: "-0.3px", marginBottom: 0 }}>
            Catálogo
          </h2>
        </div>
        {filtrados.length > 0 && (
          <span style={{ color: "#999", fontSize: "0.8rem" }}>{filtrados.length} productos</span>
        )}
      </div>

      {/* Buscador */}
      <div style={{ position: "relative", marginBottom: "28px" }}>
        <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#bbb", fontSize: "0.9rem" }}>🔍</span>
        <input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "11px 16px 11px 40px",
            border: "1px solid #E8E8E8", borderRadius: "10px",
            fontSize: "0.9rem", outline: "none", color: "#1a1a1a",
            background: "#FAFAFA", transition: "border-color .2s, background .2s"
          }}
          onFocus={e => { e.target.style.borderColor = "#ddd"; e.target.style.background = "#fff"; }}
          onBlur={e => { e.target.style.borderColor = "#E8E8E8"; e.target.style.background = "#FAFAFA"; }}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="row g-3">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="col-6 col-md-4 col-lg-3">
              <div style={{ height: "240px", background: "#F5F5F5", borderRadius: "16px" }} />
            </div>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && filtrados.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📦</div>
          <p style={{ color: "#999", fontSize: "0.9rem" }}>
            {search ? `Sin resultados para "${search}"` : "No hay productos disponibles"}
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="row g-3">
        {filtrados.map((p) => (
          <div key={p.id} className="col-6 col-md-4 col-lg-3">
            <div
              onClick={() => navigate(`/productos/${p.id}`)}
              style={{
                background: "#fff",
                border: "1px solid #F0F0F0",
                borderRadius: "16px",
                overflow: "hidden",
                height: "100%",
                cursor: "pointer",
                transition: "transform .15s, box-shadow .15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Imagen */}
              <div style={{
                height: "160px",
                background: "#F8F8F8",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden"
              }}>
                {p.imagen_principal
                  ? <img src={p.imagen_principal} alt={p.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: "2rem", opacity: 0.3 }}>📚</span>
                }
              </div>

              {/* Info */}
              <div style={{ padding: "12px 14px 14px" }}>
                <p style={{
                  fontSize: "0.7rem", color: "#F97316", fontWeight: 600,
                  marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.05em"
                }}>{p.categoria_nombre}</p>
                <p style={{
                  fontSize: "0.88rem", fontWeight: 600, color: "#1a1a1a",
                  marginBottom: "10px", lineHeight: 1.35,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden"
                }}>{p.nombre}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <span style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800,
                    fontSize: "1rem", color: "#1a1a1a"
                  }}>S/. {p.precio}</span>
                  <span style={{
                    fontSize: "0.75rem", color: "#999", fontWeight: 500
                  }}>Ver →</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}