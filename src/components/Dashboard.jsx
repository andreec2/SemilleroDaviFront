import { useState, useEffect } from 'react';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';
import StatsCard from './dashboard/StatsCard';
import FilterBar from './dashboard/FilterBar';
import TransactionList from './dashboard/TransactionList';
import AddTransactionModal from './dashboard/AddTransactionModal';
import useTransactions from '../hooks/useTransactions';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [newTransaction, setNewTransaction] = useState({
    monto: '',
    tipo: 'GASTO',
    categoria: '',
    descripcion: '',
    fecha: new Date().toISOString()
  });

  const API_URL = 'http://localhost:8080/api';
  const { 
    transactions, 
    loading, 
    fetchTransactions, 
    fetchTransactionsByDate,
    createTransaction,
    deleteTransaction
  } = useTransactions(API_URL);

  useEffect(() => {
    fetchProfile();
    fetchTransactions();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFilterChange = (tipo) => {
    setFilterType(tipo);
    fetchTransactions(tipo === 'all' ? null : tipo);
  };

  const handleDateFilter = (inicio, fin) => {
    setFilterType('date');
    fetchTransactionsByDate(inicio, fin);
  };

  const handleAddTransaction = async () => {
    const transactionData = {
      fecha: new Date().toISOString(),
      monto: parseFloat(newTransaction.monto),
      categoria: newTransaction.categoria,
      tipo: newTransaction.tipo,
      descripcion: newTransaction.descripcion
    };

    await createTransaction(transactionData, () => {
      setShowAddModal(false);
      setNewTransaction({
        monto: '',
        tipo: 'GASTO',
        categoria: '',
        descripcion: '',
        fecha: new Date().toISOString()
      });
      fetchProfile();
    });
  };

  const handleDeleteTransaction = async (transactionId) => {
    await deleteTransaction(transactionId, () => {
      fetchProfile();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={profile}
        formatCurrency={formatCurrency}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Hola, {profile?.username || 'Usuario'} 👋
          </h2>
          <p className="text-gray-600">Gestiona tus transacciones y controla tus finanzas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Saldo Total"
            value={formatCurrency(profile?.saldo || 0)}
            emoji="💰"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Transacciones"
            value={transactions.length}
            emoji="📊"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Este Mes"
            value={transactions.filter(t => {
              if (!t.fecha) return false;
              return new Date(t.fecha).getMonth() === new Date().getMonth();
            }).length}
            emoji="📅"
            bgColor="bg-purple-100"
          />
        </div>

        <FilterBar
          filterType={filterType}
          onFilterChange={handleFilterChange}
          onAddClick={() => setShowAddModal(true)}
          onDateFilter={handleDateFilter}
        />

        <TransactionList
          transactions={transactions}
          loading={loading}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          onDelete={handleDeleteTransaction}
        />
      </main>

      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTransaction}
        transaction={newTransaction}
        setTransaction={setNewTransaction}
      />
    </div>
  );
}