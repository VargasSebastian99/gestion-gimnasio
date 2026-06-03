export default function ServiciosFilters({
    searchNombre,
}) {
    return (
        <div className="bg-white shadow rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
                type="text"
                placeholder="Buscar"
                className="p-3 border rounded-lg"
                value={searchNombre}
                onChange={(e) => searchNombre(e.target.value)}
            />
        </div>
    );
}