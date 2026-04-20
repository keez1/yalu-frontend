import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Carrito() {
  const { carrito, actualizarCantidad, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: "24px" }}>Carrito</h2>

      {carrito.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: "3rem" }}>ðŸ›’</div>
          <p style={{ color: "#777", marginTop: "12px" }}>Tu carrito estÃ¡ vacÃ­o</p>
          <button onClick={() => navigate("/productos")} style={{
            background: "#F97316", color: "#fff", border: "none",
            borderRadius: "12px", padding: "10px 24px", cursor: "pointer", fontWeight: 600, marginTop: "12px"
          }}>Ver productos</button>
        </div>
      )}

      {carrito.length > 0 && (
        <>
          <div className="d-flex flex-column gap-3 mb-4">
            {carrito.map((item, i) => (
              <div key={i} style={{ background: "#161616", border: "1px solid #2A2A2A", borderRadius: "14px", padding: "16px" }}
                className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-3" style={{ flex: 1 }}>
                  {item.imagen
                    ? <img src={item.imagen} alt={item.nombre} style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />
                    : <div style={{ width: "56px", height: "56px", background: "#1F1F1F", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>ðŸ“š</div>
                  }
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: "2px" }}>{item.nombre}</p>
                    {item.variante_nombre && <p style={{ color: "#777", fontSize: "0.8rem", marginBottom: "4px" }}>{item.variante_nombre}</p>}
                    <p style={{ color: "#CFEE3B", fontWeight: 700, marginBottom: 0 }}>S/. {item.precio}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", background: "#1F1F1F", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                  <button onClick={() => actualizarCantidad(i, item.cantidad - 1)} style={{ background: "none", border: "none", color: "#fff", padding: "6px 12px", cursor: "pointer" }}>âˆ’</button>
                  <span style={{ padding: "0 10px", fontWeight: 600 }}>{item.cantidad}</span>
                  <button onClick={() => actualizarCantidad(i, item.cantidad + 1)} style={{ background: "none", border: "none", color: "#fff", padding: "6px 12px", cursor: "pointer" }}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#161616", border: "1px solid #2A2A2A", borderRadius: "14px", padding: "20px" }}>
            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: "#777" }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>S/. {subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: "#777" }}>EnvÃ­o</span>
              <span style={{ color: "#777" }}>Se calcula en checkout</span>
            </div>
            <button onClick={() => navigate("/checkout")} style={{
              width: "100%", background: "#F97316", color: "#fff",
              border: "none", borderRadius: "12px", padding: "14px",
              fontWeight: 700, fontSize: "1rem", cursor: "pointer"
            }}>Proceder al Checkout â†’</button>
          </div>
        </>
      )}
    </div>
  );
}
