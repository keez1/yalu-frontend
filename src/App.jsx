import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import Trabajos from "./pages/Trabajos";
import Perfil from "./pages/Perfil";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
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
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<PrivateRoute><Layout><Productos /></Layout></PrivateRoute>} />
          <Route path="/productos/:id" element={<PrivateRoute><Layout><DetalleProducto /></Layout></PrivateRoute>} />
          <Route path="/carrito" element={<PrivateRoute><Layout><Carrito /></Layout></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Layout><Checkout /></Layout></PrivateRoute>} />
          <Route path="/pedidos" element={<PrivateRoute><Layout><Pedidos /></Layout></PrivateRoute>} />
          <Route path="/trabajos" element={<PrivateRoute><Layout><Trabajos /></Layout></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><Layout><Perfil /></Layout></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
