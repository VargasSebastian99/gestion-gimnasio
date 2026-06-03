import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    getServicios,
    createServicio,
    updateServicio,
    deleteServicio,
    getServicioById,
} from "./services/ServiciosService";

import ServiciosFilters from "./components/ServiciosFilters";
import ServiciosTable from "./components/ServiciosTable";
import ServicioFormModal from "./components/ServicioFormModal";
import { useNavigate } from "react-router-dom";

export default function ServiciosPage() {
    const navigate = useNavigate();

    const [servicios, setServicios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingServicio, setEditingServicio] = useState(null);

    const [searchNombre, setSearchNombre] = useState("");

    const fetchData = async () => {
        try {
            const data = await getServicios();
            setServicios(data);
        } catch {
            toast.error("Error al cargar servicios");
        }
    };
    useEffect(() => {
        fetchData();
    },[]);


    const filtered = servicios.filter((s) => {
        const matchNombre = s.nombre.toLowerCase().includes(searchNombre.toLowerCase());
        return matchNombre;
    });

    const handleCreate = async (form) => {
        try {
            await createServicio(form);
            toast.success("Servicio creado");
            fetchData();
            setOpenModal(false);
            fetchData();
        } catch (e) {
            toast.error(e.response?.data?.error || "Error al crear el servicio");
        }
    };

    const handleUpdate = async (form) => {
        try {
            await updateServicio(editingServicio.id,form);
            toast.success("Servicio actualizado");
            fetchData();
            setOpenModal(false);
            setEditingServicio(null);
            fetchData();
        } catch (e) {
            toast.error(e.response?.data?.error || "Error al editar el servicio");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar servicio?")) return;
    
        try {
          await deleteServicio(id);
          toast.success("Servicio eliminado");
          fetchData();
        } catch {
          toast.error("Error al eliminar servicio");
        }
      };

      return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Servicios</h1>

                <button
                    onClick={() => {
                        setEditingServicio(null);
                        setOpenModal(true);
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded--lg shadow"
                >
                    Nuevo Servicio
                </button>
            </div>
            <ServiciosFilters
                searchNombre={searchNombre}
                setSearchNombre={setSearchNombre}
            />
            <ServiciosTable
                data={filtered}
                onEdit={async (s) => {
                    try {
                        const fullData = await getServicioById(s.id);
                        setEditingServicio(fullData);
                        setOpenModal(true);
                    } catch (e) {
                        toast.error("Error al cargar el servicio");
                    }
                }}
                onDelete={handleDelete}
                onView={(id) => navigate(`/servicios/${id}`)}
            />
            <ServicioFormModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditingServicio(null);
                }}
                onSubmit={editingServicio ? handleUpdate : handleCreate}
                initialValues={{
                    nombre : editingServicio?.nombre || "",
                    descripcion : editingServicio?.descripcion || "",
                }}
            />
        </div>
      );
}