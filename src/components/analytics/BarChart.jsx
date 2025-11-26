import { useMemo } from 'react';

export default function BarChart({ data, title, color = '#EF4444' }) {
  // Calcular el total correcto
  const total = useMemo(() => {
    return data.values.reduce((sum, val) => sum + val, 0);
  }, [data.values]);

  // Calcular porcentajes correctamente
  const barsWithPercentage = useMemo(() => {
    return data.labels.map((label, idx) => ({
      label,
      value: data.values[idx],
      percentage: total > 0 ? (data.values[idx] / total) * 100 : 0
    }));
  }, [data.labels, data.values, total]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-4">
        {barsWithPercentage.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-800">{formatCurrency(item.value)}</span>
            </div>
            <div className="relative w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className="absolute h-full rounded-lg flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: color
                }}
              >
                {item.percentage.toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}