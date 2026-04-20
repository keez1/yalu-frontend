import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarItem } = useCart();
  const [producto, setProducto] = useState(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [fotoActual, setFotoActual] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    api.get(`/catalogo/productos/${id}/`).then((res) => {
      setProducto(res.data);
      if (res.data.variantes?.length > 0) setVarianteSeleccionada(res.data.variantes[0]);
    });
  }, [id]);

  const agregarAlCarrito = () => {
    agregarItem({
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen_principal || null,
      precio: varianteSeleccionada ? varianteSeleccionada.precio : producto.precio_base,
      variante_id: varianteSeleccionada?.id || null,
      variante_nombre: varianteSeleccionada?.nombre_variante || null,
      cantidad,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  if (!producto) return <div className="container py-4"><p style={{ color: "#777" }}>Cargando...</p></div>;

  const precio = varianteSeleccionada ? varianteSeleccionada.precio : producto.precio_base;

  return (
    <div className="container py-4">
      <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "#777", cursor: "pointer", marginBottom: "20px", fontSize: "0.9rem" }}>
        â† Volver
      </button>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div style={{ background: "#161616", borderRadius: "16px", overflow: "hidden", marginBottom: "12px" }}>
            {producto.imagenes?.length > 0
              ? <img src={producto.imagenes[fotoActual].imagen} alt={producto.nombre} style={{ width: "100%", height: "320px", objectFit: "cover" }} />
              : <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>ðŸ“š</div>
            }
          </div>
          {producto.imagenes?.length > 1 && (
            <div className="d-flex gap-2">
              {producto.imagenes.map((img, i) => (
                <img key={i} src={img.imagen} alt="" onClick={() => setFotoActual(i)}
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", cursor: "pointer", border: fotoActual === i ? "2px solid #CFEE3B" : "2px solid transparent" }} />
              ))}
            </div>
          )}
        </div>

        <div className="col-12 col-md-6">
          <p style={{ color: "#777", fontSize: "0.8rem", marginBottom: "4px" }}>{producto.categoria_nombre} Â· {producto.marca_nombre}</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: "8px" }}>{producto.nombre}</h2>
          <p style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "20px" }}>{producto.descripcion}</p>

          {producto.variantes?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#777", fontSize: "0.8rem", marginBottom: "8px" }}>VARIANTE</p>
              <div className="d-flex flex-wrap gap-2">
                {producto.variantes.map((v) => (
                  <button key={v.id} onClick={() => setVarianteSeleccionada(v)} style={{
                    background: varianteSeleccionada?.id === v.id ? "rgba(207,238,59,0.15)" : "#1F1F1F",
                    border: varianteSeleccionada?.id === v.id ? "1px solid #CFEE3B" : "1px solid #2A2A2A",
                    color: varianteSeleccionada?.id === v.id ? "#CFEE3B" : "#ccc",
                    borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "0.85rem"
                  }}>{v.nombre_variante}</button>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#CFEE3B", marginBottom: "20px" }}>
            S/. {precio}
          </p>

          <div className="d-flex align-items-center gap-3 mb-3">
            <div style={{ display: "flex", alignItems: "center", background: "#1F1F1F", borderRadius: "10px", overflow: "hidden" }}>
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} style={{ background: "none", border: "none", color: "#fff", padding: "8px 14px", cursor: "pointer", fontSize: "1.1rem" }}>âˆ’</button>
              <span style={{ padding: "0 12px", fontWeight: 600 }}>{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)} style={{ background: "none", border: "none", color: "#fff", padding: "8px 14px", cursor: "pointer", fontSize: "1.1rem" }}>+</button>
            </div>
          </div>

          <button onClick={agregarAlCarrito} style={{
            width: "100%", background: agregado ? "#22C55E" : "#F97316",
            color: "#fff", border: "none", borderRadius: "12px",
            padding: "14px", fontWeight: 700, fontSize: "1rem", cursor: "pointer",
            transition: "background 0.3s"
          }}>
            {agregado ? "âœ“ Agregado al carrito" : "+ Agregar al carrito"}
          </button>

          {agregado && (
            <button onClick={() => navigate("/carrito")} style={{
              width: "100%", background: "transparent", color: "#CFEE3B",
              border: "1px solid #CFEE3B", borderRadius: "12px",
              padding: "12px", fontWeight: 600, fontSize: "0.9rem",
              cursor: "pointer", marginTop: "10px", transition: "all 0.3s"
            }}>
              Ver carrito â†’
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
