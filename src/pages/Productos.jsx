import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/catalogo/productos/").then((res) => setProductos(res.data));
  }, []);

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Catálogo</h2>
      <input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {filtrados.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.nombre}</h3>
            <p>S/. {p.precio_base}</p>
            <p>{p.categoria_nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}