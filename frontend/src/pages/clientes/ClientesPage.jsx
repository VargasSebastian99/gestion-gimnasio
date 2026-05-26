import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  getClienteById,
} from "./services/ClientesService";

import ClientesFilters from "./components/ClientesFilters";
import ClientesTable from "./components/ClientesTable";
import ClienteFormModal from "./components/ClienteFormModal";
import { useNavigate } from "react-router-dom";

export default function ClientesPage() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  const [searchNombre, setSearchNombre] = useState("");
  const [searchDni, setSearchDni] = useState("");
  const [searchEstado, setSearchEstado] = useState("Todos");

  // ============================
  // CARGA DE CLIENTES
  // ============================
  const fetchData = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch {
      toast.error("Error al cargar clientes");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // FILTROS
  // ============================
  const filtered = clientes.filter((c) => {
    const matchNombre = c.nombreCompleto.toLowerCase().includes(searchNombre.toLowerCase());
    const matchDni = c.dni.includes(searchDni);
    const matchEstado =
      searchEstado === "Todos" ||
      (searchEstado === "Activo" && c.activo) ||
      (searchEstado === "Inactivo" && !c.activo);

    return matchNombre && matchDni && matchEstado;
  });

  // ============================
  // CREAR CLIENTE
  // ============================
  const handleCreate = async (form) => {
    try {
      await createCliente(form);
      toast.success("Cliente creado");
      setOpenModal(false);
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || "Error al crear cliente");
    }
  };

  // ============================
  // EDITAR CLIENTE
  // ============================
  const handleUpdate = async (form) => {
    try {
      await updateCliente(editingCliente.id, form);
      toast.success("Cliente actualizado");
      setOpenModal(false);
      setEditingCliente(null);
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || "Error al actualizar cliente");
    }
  };

  // ============================
  // ELIMINAR CLIENTE
  // ============================
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar cliente?")) return;

    try {
      await deleteCliente(id);
      toast.success("Cliente eliminado");
      fetchData();
    } catch {
      toast.error("Error al eliminar cliente");
    }
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>

        <button
          onClick={() => {
            setEditingCliente(null);
            setOpenModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Nuevo Cliente
        </button>
      </div>

      <ClientesFilters
        searchNombre={searchNombre}
        setSearchNombre={setSearchNombre}
        searchDni={searchDni}
        setSearchDni={setSearchDni}
        searchEstado={searchEstado}
        setSearchEstado={setSearchEstado}
      />

      <ClientesTable
        data={filtered}
        onEdit={async (c) => {
            try {
                const fullData = await getClienteById(c.id);
                setEditingCliente(fullData);
                setOpenModal(true);
            }catch (e) {
                toast.error("Error al cargar datos del cliente");
            }
        }}
        onDelete={handleDelete}
        onView={(id) => navigate(`/clientes/${id}`)}
      />

      <ClienteFormModal
        open={openModal}
        onClose={() => {
            setOpenModal(false);
            setEditingCliente(null);
        }}
        onSubmit={editingCliente ? handleUpdate : handleCreate}
        initialValues={{
            nombre: editingCliente?.nombre || "",
            apellido: editingCliente?.apellido || "",
            dni: editingCliente?.dni || "",
            telefono: editingCliente?.telefono || "",
            email: editingCliente?.email || "",
            direccion: editingCliente?.direccion || "",
            observaciones: editingCliente?.observaciones || "",
            activo: editingCliente?.activo ?? true, // importante: usar ?? en booleanos
        }}
        />
    </div>
  );
}
