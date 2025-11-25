import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions, loading, formatCurrency, formatDate, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Transacciones Recientes</h3>
        </div>
        <div className="p-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Cargando transacciones...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Transacciones Recientes</h3>
        </div>
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">💳</div>
          <p className="text-gray-600">No hay transacciones aún</p>
          <p className="text-sm text-gray-400 mt-2">Comienza agregando tu primera transacción</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Transacciones Recientes</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}