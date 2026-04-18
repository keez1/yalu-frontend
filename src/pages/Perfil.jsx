import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/usuarios/perfil/").then((res) => setPerfil(res.data));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Mi Perfil</h2>
      {perfil && (
        <>
          <p>{perfil.nombres} {perfil.apellidos}</p>
          <p>{perfil.email}</p>
        </>
      )}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}