import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const res = await api.post("/usuarios/login/", { firebase_token: token });
      localStorage.setItem("token", res.data.access);
      navigate("/productos");
    } catch (e) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="login">
      <h1>yalu</h1>
      <p>Librería Bazar Yalú · Trujillo</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={loginGoogle}>Continuar con Google</button>
    </div>
  );
}