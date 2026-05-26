export default function ClientesFilters({
  searchNombre,
  setSearchNombre,
  searchDni,
  setSearchDni,
  searchEstado,
  setSearchEstado,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="p-3 border rounded-lg"
        value={searchNombre}
        onChange={(e) => setSearchNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Buscar por DNI"
        className="p-3 border rounded-lg"
        value={searchDni}
        onChange={(e) => setSearchDni(e.target.value)}
      />

      <select
        className="p-3 border rounded-lg"
        value={searchEstado}
        onChange={(e) => setSearchEstado(e.target.value)}
      >
        <option value="Todos">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
    </div>
  );
}
