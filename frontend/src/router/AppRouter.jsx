import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layout/MainLayout";
import Clientes from "../pages/clientes/ClientesPage";
import ClienteView from "../pages/clientes/ClienteView";
import Servicios from "../pages/servicios/ServiciosPage";
import ServicioView from "../pages/servicios/ServicioView";
export default function AppRouter() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />
        

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={token ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/*clientes */}
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/:id" element={<ClienteView />} />
          {/* servicios */}
          <Route path="servicios" element={<Servicios />} />
          <Route path="servicios/:id" element={<ServicioView />} />
    
        </Route>

        {/* Redirección */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
