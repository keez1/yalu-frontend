import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import Trabajos from "./pages/Trabajos";
import Perfil from "./pages/Perfil";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<Layout><Productos /></Layout>} />
          <Route path="/pedidos" element={<Layout><Pedidos /></Layout>} />
          <Route path="/trabajos" element={<Layout><Trabajos /></Layout>} />
          <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;