import { useState } from 'react';

export default function TransactionItem({ transaction, formatCurrency, formatDate, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getCategoryEmoji = (categoria) => {
    const emojis = {
      'COMIDA': '🍔',
      'ALIMENTACION': '🍔',
      'TRANSPORTE': '🚗',
      'VIVIENDA': '🏠',
      'COMPRAS': '🛍️',
      'SALARIO': '💰',
      'INVERSION': '📈',
      'ENTRETENIMIENTO': '🎮',
      'SALUD': '🏥',
      'EDUCACION': '📚'
    };
    return emojis[categoria?.toUpperCase()] || '💵';
  };

  const handleDelete = () => {
    onDelete(transaction.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors relative group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
            transaction.tipo === 'INGRESO' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {getCategoryEmoji(transaction.categoria)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              {transaction.descripcion || transaction.categoria || 'Sin descripción'}
            </h4>
            <p className="text-sm text-gray-500">{formatDate(transaction.fecha)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={`text-lg font-bold ${
              transaction.tipo === 'INGRESO' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.tipo === 'INGRESO' ? '+' : '-'} {formatCurrency(transaction.monto)}
            </p>
            <p className="text-xs text-gray-500">{transaction.categoria || 'Sin categoría'}</p>
          </div>
          
          {/* Botón de eliminar */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-lg text-red-600"
            title="Eliminar transacción"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center gap-3 px-4">
          <p className="text-sm font-medium text-gray-800">¿Eliminar esta transacción?</p>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Sí, eliminar
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}