export default function BarChart({ data, title, color }) {
  if (!data || !data.labels) return null;

  const maxValue = Math.max(...data.values);
  const barColor = color || (data.tipo === 'INGRESO' ? '#10B981' : '#EF4444');

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.labels.map((label, index) => {
          const value = data.values[index];
          const percentage = (value / maxValue) * 100;

          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold text-gray-800">
                  ${value.toLocaleString('es-CO')}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: barColor
                  }}
                >
                  <span className="text-xs font-semibold text-white">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}