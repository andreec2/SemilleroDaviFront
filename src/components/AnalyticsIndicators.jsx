import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndicatorCard from './analytics/IndicatorCard';
import OutlierCard from './analytics/OutlierCard';
import CategoryStatsTable from './analytics/CategoryStatsTable';
import FrequentCategoriesChart from './analytics/FrequentCategoriesChart';
import { formatCurrency } from '../utils/formatters';

export default function AnalyticsIndicators() {
  const [indicadores, setIndicadores] = useState(null);
  const [outliers, setOutliers] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:8080/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [indicadoresRes, outliersRes, estadisticasRes] = await Promise.all([
        fetch(`${API_URL}/analytics/indicadores`, { headers }),
        fetch(`${API_URL}/analytics/outliers`, { headers }),
        fetch(`${API_URL}/analytics/estadisticas-categoria`, { headers })
      ]);

      const [ind, out, est] = await Promise.all([
        indicadoresRes.json(),
        outliersRes.json(),
        estadisticasRes.json()
      ]);

      setIndicadores(ind);
      setOutliers(out);
      setEstadisticas(est);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Cargando indicadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📈 Indicadores Financieros</h1>
            <p className="text-gray-600">Análisis avanzado de tus finanzas</p>
          </div>
          <button
            onClick={() => navigate('/analytics')}
            className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2"
          >
            <span>←</span>
            <span>Volver a Gráficos</span>
          </button>
        </div>

        {/* Indicadores principales */}
        {indicadores && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <IndicatorCard
              title="Gasto Promedio Mensual"
              value={formatCurrency(indicadores.gastoPromedioMensual)}
              emoji="💸"
              color="bg-red-100"
            />
            <IndicatorCard
              title="Ingreso Promedio Mensual"
              value={formatCurrency(indicadores.ingresoPromedioMensual)}
              emoji="💰"
              color="bg-green-100"
            />
            <IndicatorCard
              title="Balance Promedio"
              value={formatCurrency(indicadores.balancePromedio)}
              emoji="📊"
              color="bg-blue-100"
              subtitle={indicadores.balancePromedio >= 0 ? 'Positivo ✅' : 'Negativo ⚠️'}
            />
          </div>
        )}

        {/* Categorías frecuentes y Outliers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {indicadores && indicadores.categoriasFrecuentes && (
            <FrequentCategoriesChart categories={indicadores.categoriasFrecuentes} />
          )}

          {/* Outliers */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-gray-800">⚠️ Gastos Inusuales</h3>
              {outliers.length > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                  {outliers.length}
                </span>
              )}
            </div>
            
            {outliers.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-2">✅</div>
                <p className="text-gray-600">No hay gastos inusuales detectados</p>
                <p className="text-sm text-gray-500 mt-1">Tus gastos están dentro del promedio</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {outliers.map((outlier) => (
                  <OutlierCard key={outlier.id} outlier={outlier} formatCurrency={formatCurrency} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabla de estadísticas por categoría */}
        {estadisticas && (
          <CategoryStatsTable stats={estadisticas} formatCurrency={formatCurrency} />
        )}

        {/* Insights adicionales */}
        {indicadores && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top gastos */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💳 Top Gastos por Categoría</h3>
              <div className="space-y-3">
                {Object.entries(indicadores.gastosPorCategoria || {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([categoria, monto], idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '📌'}</span>
                        <span className="font-medium text-gray-800">{categoria}</span>
                      </div>
                      <span className="font-bold text-red-600">{formatCurrency(monto)}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Ratio de ahorro */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Análisis de Ahorro</h3>
              <div className="space-y-4">
                {(() => {
                  const ratioAhorro = ((indicadores.balancePromedio / indicadores.ingresoPromedioMensual) * 100).toFixed(1);
                  const isGood = ratioAhorro >= 20;
                  
                  return (
                    <>
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-600 mb-2">Ratio de Ahorro</p>
                        <p className={`text-5xl font-bold ${isGood ? 'text-green-600' : 'text-orange-600'}`}>
                          {ratioAhorro}%
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {isGood ? '¡Excelente! Sigues ahorrando bien' : 'Considera aumentar tu ahorro'}
                        </p>
                      </div>
                      
                      <div className={`p-4 ${isGood ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border rounded-lg`}>
                        <p className="text-sm text-gray-700">
                          {isGood 
                            ? '✅ Estás ahorrando más del 20% de tus ingresos. ¡Sigue así!'
                            : '⚠️ Intenta ahorrar al menos el 20% de tus ingresos mensuales.'
                          }
                        </p>
                      </div>

                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-indigo-800 mb-2">💰 Proyección Anual</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          {formatCurrency(indicadores.balancePromedio * 12)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Ahorro estimado en 12 meses
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}