export default function OutlierCard({ outlier, formatCurrency }) {
  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{outlier.descripcion || outlier.categoria}</h4>
          <p className="text-sm text-gray-600">{outlier.categoria}</p>
        </div>
        <span className="text-lg font-bold text-red-600">{formatCurrency(outlier.monto)}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-2xl">⚠️</span>
        <p className="text-sm text-gray-700">{outlier.razon}</p>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(outlier.fecha).toLocaleDateString('es-CO', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric' 
        })}
      </p>
    </div>
  );
}