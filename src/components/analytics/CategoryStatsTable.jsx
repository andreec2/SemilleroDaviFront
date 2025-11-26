export default function CategoryStatsTable({ stats, formatCurrency }) {
  const sortedStats = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">📊 Estadísticas por Categoría</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Categoría</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Promedio</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Mínimo</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Máximo</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map(([categoria, data], idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-800">{categoria}</td>
                <td className="py-3 px-4 text-sm text-right font-bold text-indigo-600">
                  {formatCurrency(data.total)}
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-700">
                  {formatCurrency(data.promedio)}
                </td>
                <td className="py-3 px-4 text-sm text-right text-green-600">
                  {formatCurrency(data.minimo)}
                </td>
                <td className="py-3 px-4 text-sm text-right text-red-600">
                  {formatCurrency(data.maximo)}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-semibold">
                    {data.cantidad}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}