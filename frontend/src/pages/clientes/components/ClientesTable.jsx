export default function ClientesTable({ data, onEdit, onDelete, onView }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4">Nombre</th>
            <th className="p-4">DNI</th>
            <th className="p-4">Teléfono</th>
            <th className="p-4">Estado</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{c.nombreCompleto}</td>
              <td className="p-4">{c.dni}</td>
              <td className="p-4">{c.telefono}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    c.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.activo ? "Activo" : "Inactivo"}
                </span>
              </td>

              <td className="p-4 text-center">
                <button onClick={() => onView(c.id)} className="text-gray-700 mr-3">
                  Ver
                </button>
                <button onClick={() => onEdit(c)} className="text-blue-600 mr-3">
                  Editar
                </button>
                <button onClick={() => onDelete(c.id)} className="text-red-600">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
