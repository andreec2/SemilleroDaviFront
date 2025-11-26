import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from './analytics/PieChart';
import BarChart from './analytics/BarChart';
import StatCard from './analytics/StatCard';
import useAnalytics from '../hooks/useAnalytics';
import { formatCurrency } from '../utils/formatters';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('gastos');
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8080/api';
  const { pieData, gastosData, ingresosData, loading } = useAnalytics(API_URL);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Cargando análisis...</p>
        </div>
      </div>
    );
  }

  const calculateTotals = () => {
    const totalGastos = gastosData?.values.reduce((a, b) => a + b, 0) || 0;
    const totalIngresos = ingresosData?.values.reduce((a, b) => a + b, 0) || 0;
    return { totalGastos, totalIngresos, balance: totalIngresos - totalGastos };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Análisis Financiero</h1>
            <p className="text-gray-600">Visualiza tus patrones de gastos e ingresos</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/analytics/indicadores')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md flex items-center gap-2"
            >
              <span>📈</span>
              <span>Ver Indicadores</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2"
            >
              <span>←</span>
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Ingresos"
            value={formatCurrency(totals.totalIngresos)}
            emoji="💰"
          />
          <StatCard
            title="Total Gastos"
            value={formatCurrency(totals.totalGastos)}
            emoji="💸"
          />
          <StatCard
            title="Balance"
            value={formatCurrency(totals.balance)}
            emoji={totals.balance >= 0 ? '✅' : '⚠️'}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('gastos')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'gastos'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📉 Análisis de Gastos
            </button>
            <button
              onClick={() => setActiveTab('ingresos')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'ingresos'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📈 Análisis de Ingresos
            </button>
          </div>
        </div>

        {activeTab === 'gastos' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pieData && <PieChart data={pieData} title="Distribución de Gastos" />}
            {gastosData && <BarChart data={gastosData} title="Gastos por Categoría" color="#EF4444" />}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {ingresosData && <BarChart data={ingresosData} title="Ingresos por Categoría" color="#10B981" />}
          </div>
        )}

        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {activeTab === 'gastos' ? '💳 Detalle de Gastos' : '💰 Detalle de Ingresos'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Categoría</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Monto</th>
                  {activeTab === 'gastos' && pieData && (
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Porcentaje</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'gastos' && pieData
                  ? pieData.slices.map((slice, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">{slice.categoria}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-600">
                          {formatCurrency(slice.monto)}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-600">
                          {slice.porcentaje}%
                        </td>
                      </tr>
                    ))
                  : ingresosData?.labels.map((label, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">{label}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-green-600">
                          {formatCurrency(ingresosData.values[idx])}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}