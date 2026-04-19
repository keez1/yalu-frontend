import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const res = await api.post("/usuarios/login/", { firebase_token: token });
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("uid", result.user.uid);
      navigate("/productos");
    } catch (e) {
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center"
      }}>
        <img src={logo} alt="Yalú" style={{ height: "100px", objectFit: "contain", marginBottom: "8px" }} />
        <p style={{ color: "#777", marginBottom: "40px", fontSize: "0.9rem" }}>
          Librería Bazar Yalú · Trujillo
        </p>

        {error && (
          <div style={{
            background: "rgba(255,78,78,0.1)",
            border: "1px solid rgba(255,78,78,0.3)",
            color: "#FF4E4E",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "20px",
            fontSize: "0.85rem"
          }}>{error}</div>
        )}

        <button onClick={loginGoogle} disabled={loading}
          className="w-100 d-flex align-items-center justify-content-center gap-2"
          style={{
            background: "#CFEE3B",
            color: "#000",
            border: "none",
            borderRadius: "14px",
            padding: "14px",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "16px"
          }}>
          {loading ? "Iniciando..." : "🌐 Continuar con Google"}
        </button>

        <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "24px" }}>
          Al ingresar aceptas los términos de uso de Yalú
        </p>
      </div>
    </div>
  );
}