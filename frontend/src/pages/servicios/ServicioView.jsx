import { useNavigate , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServicioFormModal from "./components/ServicioFormModal";
import { getServicioById, deleteServicio, updateServicio } from "./services/ServiciosService";
import { toast } from "react-toastify";

export default function ServicioView() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [servicio, setServicio] = useState(null);
    const [tab, setTab] = useState("info");

    const [openModal, setOpenModal] = useState(false);
    const [editingServicio, setEditingServicio] = useState(null);

    const fetchData = async () => {
        try {
            const data = await getServicioById(id);
            setServicio(data);
        } catch {
            toast.error("Error al cargar el servicio");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm("¿Eliminar servicio?")) return;
        try {
            await deleteServicio(id);
            toast.success("Servicio eliminado");
            navigate("/servicios");
        } catch {
            toast.error("Error al eliminar cliente");
        }
    };

    const handleUpdate = async (form) => {
        try {
            await updateServicio(editingServicio.id, form);
            toast.success("Servicio actualizado");
            setOpenModal(false);
            setEditingServicio(null);
            fetchData();
        } catch (e) {
            toast.error(e.response?.data?.error || "Error al actualizar el servicio");
        }
    };

    if (!servicio) return <p>Cargando...</p>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    {servicio.nombre}
                </h1>
                <button onClick={() => navigate("/servicios")}
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow"
                >
                    Ir a Servicios
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
            </div>
            {/* CONTENIDO */}
            {tab === "info" && (
                <div className="p-4 bg-white shadow rounded-xl">
                <p><strong>Nombre:</strong> {servicio.nombre}</p>
                <p><strong>Descripción:</strong> {servicio.descripcion}</p>
                </div>
            )}

            {tab === "auditoria" && (
                <div className="p-4 bg-white shadow rounded-xl">
                <p><strong>Activo:</strong> {servicio.activo ? "Sí" : "No"}</p>
                </div>
            )}
            {/* BOTONES DE ACCIÓN */}
            <div className="flex gap-3">
                <button
                onClick={() => {
                    setEditingServicio(servicio); // ← cargamos el cliente actual
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
            <ServicioFormModal
                open={openModal}
                onClose={() => {
                setOpenModal(false);
                setEditingServicio(null);
                }}
                onSubmit={handleUpdate}
                initialValues={{
                    nombre: editingServicio?.nombre || "",
                    descripcion: editingServicio?.descripcion || "",
                }}
            />

        </div>
    )
}