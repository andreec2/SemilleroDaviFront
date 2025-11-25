export default function AddTransactionModal({ isOpen, onClose, onSubmit, transaction, setTransaction }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Nueva Transacción</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              value={transaction.tipo}
              onChange={(e) => setTransaction({ ...transaction, tipo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="GASTO">⬇️ Gasto</option>
              <option value="INGRESO">⬆️ Ingreso</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
            <input
              type="number"
              step="0.01"
              value={transaction.monto}
              onChange={(e) => setTransaction({ ...transaction, monto: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              value={transaction.categoria}
              onChange={(e) => setTransaction({ ...transaction, categoria: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Selecciona una categoría</option>
              <option value="COMIDA">🍔 Comida</option>
              <option value="TRANSPORTE">🚗 Transporte</option>
              <option value="VIVIENDA">🏠 Vivienda</option>
              <option value="COMPRAS">🛍️ Compras</option>
              <option value="SALARIO">💰 Salario</option>
              <option value="INVERSION">📈 Inversión</option>
              <option value="ENTRETENIMIENTO">🎮 Entretenimiento</option>
              <option value="SALUD">🏥 Salud</option>
              <option value="EDUCACION">📚 Educación</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <input
              type="text"
              value={transaction.descripcion}
              onChange={(e) => setTransaction({ ...transaction, descripcion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ej: Almuerzo en restaurante"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}