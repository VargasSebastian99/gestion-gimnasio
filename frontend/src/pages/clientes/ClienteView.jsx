import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClienteFormModal from "./components/ClienteFormModal";
import { getClienteById, deleteCliente, updateCliente } from "./services/ClientesService";
import { toast } from "react-toastify";

export default function ClienteView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [tab, setTab] = useState("info");

  // ESTADOS NECESARIOS PARA EL MODAL
  const [openModal, setOpenModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getClienteById(id);
      setCliente(data);
    } catch {
      toast.error("Error al cargar cliente");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("¿Eliminar cliente?")) return;
    try {
      await deleteCliente(id);
      toast.success("Cliente eliminado");
      navigate("/clientes");
    } catch {
      toast.error("Error al eliminar cliente");
    }
  };

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

  if (!cliente) return <p>Cargando...</p>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {cliente.nombre} {cliente.apellido}
        </h1>

        <button
          onClick={() => navigate("/clientes")}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow"
        >
          Ir a Clientes
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b pb-2">
        <button onClick={() => setTab("info")} className={tab === "info" ? "font-bold" : ""}>
          Información
        </button>
        <button onClick={() => setTab("auditoria")} className={tab === "auditoria" ? "font-bold" : ""}>
          Auditoría
        </button>
        <button onClick={() => setTab("historial")} className={tab === "historial" ? "font-bold" : ""}>
          Historial
        </button>
      </div>

      {/* CONTENIDO */}
      {tab === "info" && (
        <div className="p-4 bg-white shadow rounded-xl">
          <p><strong>DNI:</strong> {cliente.dni}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Dirección:</strong> {cliente.direccion}</p>
          <p><strong>Observaciones:</strong> {cliente.observaciones}</p>
        </div>
      )}

      {tab === "auditoria" && (
        <div className="p-4 bg-white shadow rounded-xl">
          <p><strong>Activo:</strong> {cliente.activo ? "Sí" : "No"}</p>
          <p><strong>Fecha de baja:</strong> {cliente.fechaBaja || "—"}</p>
          <p><strong>Creado en:</strong> {cliente.creadoEn}</p>
          <p><strong>Actualizado en:</strong> {cliente.actualizadoEn}</p>
        </div>
      )}

      {tab === "historial" && (
        <div className="p-4 bg-white shadow rounded-xl">
          <p>Acá en el futuro podés mostrar turnos, pagos, asistencia, etc.</p>
        </div>
      )}

      {/* BOTONES DE ACCIÓN */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setEditingCliente(cliente); // ← cargamos el cliente actual
            setOpenModal(true);         // ← abrimos modal
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Editar
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Eliminar
        </button>
      </div>

      {/* MODAL DE EDICIÓN */}
      <ClienteFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingCliente(null);
        }}
        onSubmit={handleUpdate}
        initialValues={{
          nombre: editingCliente?.nombre || "",
          apellido: editingCliente?.apellido || "",
          dni: editingCliente?.dni || "",
          telefono: editingCliente?.telefono || "",
          email: editingCliente?.email || "",
          direccion: editingCliente?.direccion || "",
          observaciones: editingCliente?.observaciones || "",
          activo: editingCliente?.activo ?? true,
        }}
      />
    </div>
  );
}
