import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ClienteFormModal({ open, onClose, onSubmit, initialValues }) {
  const [form, setForm] = useState(initialValues);

  // 🔥 IMPORTANTE: resetear formulario cuando se abre el modal
  useEffect(() => {
    if (open) {
      setForm(initialValues);
    }
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    if (!form.nombre.trim() || !form.apellido.trim()) {
      toast.error("Nombre y apellido son obligatorios");
      return;
    }
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Nuevo Cliente
        </h2>

        <div className="space-y-4">
          {["nombre", "apellido", "dni", "telefono", "email", "direccion"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-24 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border hover:bg-gray-100">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white shadow"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
