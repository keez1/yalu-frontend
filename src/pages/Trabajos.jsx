import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Trabajos() {
  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    api.get("/trabajos/").then((res) => setTrabajos(res.data));
  }, []);

  const whatsapp = () => {
    window.open("https://wa.me/51981555864?text=Hola, quiero consultar sobre un trabajo manual.", "_blank");
  };

  return (
    <div>
      <h2>Trabajos Manuales</h2>
      {trabajos.map((t) => (
        <div key={t.id} className="card">
          <h3>{t.titulo}</h3>
          <p>Estado: {t.estado}</p>
          <p>Precio estimado: S/. {t.precio_estimado}</p>
        </div>
      ))}
      <button onClick={whatsapp}>Consultar por WhatsApp</button>
    </div>
  );
}