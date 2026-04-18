import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api.get("/ventas/pedidos/").then((res) => setPedidos(res.data));
  }, []);

  return (
    <div>
      <h2>Mis Pedidos</h2>
      {pedidos.length === 0 && <p>No tienes pedidos aún.</p>}
      {pedidos.map((p) => (
        <div key={p.id} className="card">
          <p>Código: {p.codigo}</p>
          <p>Total: S/. {p.total}</p>
          <p>Estado: {p.estado}</p>
          <p>Fecha: {p.fecha}</p>
        </div>
      ))}
    </div>
  );
}