import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarCheck,
  LogOut,
  Menu,
} from "lucide-react";

export default function MainLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { label: "Clientes", icon: <Users size={20} />, path: "/clientes" },
    { label: "Profesionales", icon: <UserCog size={20} />, path: "/profesionales" },
    { label: "Turnos", icon: <CalendarCheck size={20} />, path: "/turnos" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* OVERLAY (visible en mobile y desktop) */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* SIDEBAR (siempre oculto por defecto) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 z-50 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-10 text-gray-800 tracking-tight">
          Gimnasio
        </h2>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                  ${active ? "bg-orange-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

          {/* Botón hamburguesa SIEMPRE visible */}
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">Panel de Control</h1>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              S
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
            >
              <LogOut size={18} />
              Salir
            </button>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
