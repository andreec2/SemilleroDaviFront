export default function FrequentCategoriesChart({ categories }) {
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const maxValue = Math.max(...sortedCategories.map(([_, count]) => count));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🔥 Categorías Más Frecuentes</h3>
      <div className="space-y-4">
        {sortedCategories.map(([categoria, count], idx) => {
          const percentage = (count / maxValue) * 100;
          return (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{categoria}</span>
                <span className="text-sm font-bold text-gray-800">{count} transacciones</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${percentage}%` }}
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