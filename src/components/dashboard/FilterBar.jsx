import { useState } from 'react';

export default function FilterBar({ filterType, onFilterChange, onAddClick, onDateFilter }) {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState({
    inicio: '',
    fin: ''
  });

  const handleDateFilter = () => {
    if (dateRange.inicio && dateRange.fin) {
      onDateFilter(dateRange.inicio, dateRange.fin);
      setShowDateFilter(false);
    }
  };

  const clearDateFilter = () => {
    setDateRange({ inicio: '', fin: '' });
    onFilterChange('all');
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => onFilterChange('INGRESO')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'INGRESO' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⬆️ Ingresos
          </button>
          <button
            onClick={() => onFilterChange('GASTO')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'GASTO' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⬇️ Gastos
          </button>
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="px-4 py-2 rounded-lg font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
          >
            📅 Filtrar por Fecha
          </button>
        </div>

        <button
          onClick={onAddClick}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          ➕ Nueva Transacción
        </button>
      </div>

      {/* Filtro de fecha */}
      {showDateFilter && (
        <div className="border-t pt-4 mt-2">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
              <input
                type="date"
                value={dateRange.inicio}
                onChange={(e) => setDateRange({ ...dateRange, inicio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
              <input
                type="date"
                value={dateRange.fin}
                onChange={(e) => setDateRange({ ...dateRange, fin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleDateFilter}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Aplicar
            </button>
            <button
              onClick={clearDateFilter}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}