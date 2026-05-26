import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // Datos mockeados (después los conectamos al backend)
  const turnosSemana = [
    { dia: "Lun", turnos: 12 },
    { dia: "Mar", turnos: 18 },
    { dia: "Mié", turnos: 10 },
    { dia: "Jue", turnos: 22 },
    { dia: "Vie", turnos: 15 },
    { dia: "Sáb", turnos: 8 },
  ];

  const clientesMes = [
    { mes: "Ene", clientes: 40 },
    { mes: "Feb", clientes: 45 },
    { mes: "Mar", clientes: 50 },
    { mes: "Abr", clientes: 48 },
    { mes: "May", clientes: 55 },
  ];

  return (
    <div className="space-y-10">

      {/* TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700">Turnos del día</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">12</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700">Clientes activos</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">87</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700">Profesionales</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">5</p>
        </div>

      </div>

      {/* GRÁFICO DE TURNOS POR DÍA */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Turnos por día (última semana)
        </h3>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={turnosSemana}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="turnos" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICO DE CLIENTES POR MES */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Clientes activos por mes
        </h3>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={clientesMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clientes" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
