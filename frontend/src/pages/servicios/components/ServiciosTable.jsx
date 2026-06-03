export default function ServiciosTable({ data, onEdit, onDelete, onView }) {
    return (
        <div className="bg-white shadow rounded-xl oberflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Descripción</th>
                        <th className="p-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((s) => (
                        <tr key={s.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{s.nombre}</td>
                            <td className="p-4">{s.descripcion}</td>
                            <td className="p-4 text-center">
                                <button onClick={() => onView(s.id)} className="text-gray-700 mr-3">
                                    Ver
                                </button>
                                <button onClick={() => onEdit(s.id)} className="text-blue-600 mr-3">
                                    Editar
                                </button>
                                <button onClick={() => onDelete(s.id)} className="text-red-600 mr-3">
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