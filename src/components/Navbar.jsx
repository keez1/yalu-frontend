import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 48px",
      background: "rgba(248,250,255,0.95)", backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
      fontFamily: "'Nunito', sans-serif",
    }}>

      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <img src={logo} alt="Yalu" style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid #DBEAFE" }} />
        <div>
          <b style={{ display: "block", fontSize: "0.96rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>Yalu</b>
          <small style={{ display: "block", fontSize: "0.6rem", color: "#64748b", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Libreria Bazar</small>
        </div>
      </Link>

      {/* Links centro */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Link to="/productos" style={{
          padding: "8px 16px", borderRadius: "100px", textDecoration: "none",
          fontSize: "0.87rem", fontWeight: 700,
          color: isActive("/productos") ? "#2563EB" : "#334155",
          background: isActive("/productos") ? "#DBEAFE" : "transparent",
          transition: "all .2s"
        }}>
          <i className="bi bi-grid-fill" style={{ marginRight: "6px" }}></i>Productos
        </Link>

        <Link to="/carrito" style={{
          padding: "8px 16px", borderRadius: "100px", textDecoration: "none",
          fontSize: "0.87rem", fontWeight: 700,
          color: isActive("/carrito") ? "#2563EB" : "#334155",
          background: isActive("/carrito") ? "#DBEAFE" : "transparent",
          transition: "all .2s", position: "relative"
        }}>
          <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <i className="bi bi-cart-fill"></i>
            Carrito
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: "-10px", right: "-14px",
                background: "#F97316", color: "#fff", borderRadius: "50%",
                width: "18px", height: "18px", fontSize: "0.62rem", fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{totalItems > 99 ? "99+" : totalItems}</span>
            )}
          </span>
        </Link>

        {user && (
          <>
            <Link to="/pedidos" style={{
              padding: "8px 16px", borderRadius: "100px", textDecoration: "none",
              fontSize: "0.87rem", fontWeight: 700,
              color: isActive("/pedidos") ? "#2563EB" : "#334155",
              background: isActive("/pedidos") ? "#DBEAFE" : "transparent",
              transition: "all .2s"
            }}>
              <i className="bi bi-box-fill" style={{ marginRight: "6px" }}></i>Pedidos
            </Link>
            <Link to="/perfil" style={{
              padding: "8px 16px", borderRadius: "100px", textDecoration: "none",
              fontSize: "0.87rem", fontWeight: 700,
              color: isActive("/perfil") ? "#2563EB" : "#334155",
              background: isActive("/perfil") ? "#DBEAFE" : "transparent",
              transition: "all .2s"
            }}>
              <i className="bi bi-person-fill" style={{ marginRight: "6px" }}></i>Perfil
            </Link>
          </>
        )}
      </div>

      {/* Derecha - login o salir */}
      {user ? (
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "7px",
          background: "rgba(239,68,68,0.1)", color: "#DC2626",
          border: "1px solid rgba(239,68,68,0.25)", cursor: "pointer",
          padding: "9px 18px", borderRadius: "100px", fontWeight: 800,
          fontSize: "0.84rem", fontFamily: "'Nunito', sans-serif", transition: "all .2s"
        }}>
          <i className="bi bi-box-arrow-right"></i> Salir
        </button>
      ) : (
        <button onClick={() => navigate("/login")} style={{
          display: "flex", alignItems: "center", gap: "7px",
          background: "#2563EB", color: "#fff",
          border: "none", cursor: "pointer",
          padding: "10px 20px", borderRadius: "100px", fontWeight: 800,
          fontSize: "0.84rem", fontFamily: "'Nunito', sans-serif", transition: "all .2s"
        }}>
          <i className="bi bi-box-arrow-in-right"></i> Ingresar
        </button>
      )}
    </nav>
  );
}
