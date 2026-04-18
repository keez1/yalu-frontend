import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#161616",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #2A2A2A"
    }}>
      <span style={{ color: "#CFEE3B", fontWeight: "bold", fontSize: "1.4rem" }}>
        yalu
      </span>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/productos" style={{ color: "#F0F0F0", textDecoration: "none" }}>Catálogo</Link>
        <Link to="/pedidos" style={{ color: "#F0F0F0", textDecoration: "none" }}>Pedidos</Link>
        <Link to="/trabajos" style={{ color: "#F0F0F0", textDecoration: "none" }}>Trabajos</Link>
        <Link to="/perfil" style={{ color: "#F0F0F0", textDecoration: "none" }}>Perfil</Link>
        <button onClick={handleLogout} style={{
          background: "none",
          border: "none",
          color: "#FF4E4E",
          cursor: "pointer"
        }}>Salir</button>
      </div>
    </nav>
  );
}