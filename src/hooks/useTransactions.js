import { useState } from 'react';

export default function useTransactions(API_URL) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async (tipo = null) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const endpoint = tipo ? `${API_URL}/transactions/by-type?tipo=${tipo}` : `${API_URL}/transactions`;
      
      const res = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionsByDate = async (inicio, fin) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Convertir fechas a formato ISO
      const inicioISO = new Date(inicio).toISOString();
      const finISO = new Date(fin + 'T23:59:59').toISOString();
      
      const endpoint = `${API_URL}/transactions/by-date?inicio=${inicioISO}&fin=${finISO}`;
      
      const res = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching transactions by date:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData, onSuccess) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });

      if (res.ok) {
        await fetchTransactions();
        onSuccess?.();
      } else {
        alert('Error al crear la transacción');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error de conexión');
    }
  };

  const deleteTransaction = async (transactionId, onSuccess) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        await fetchTransactions();
        onSuccess?.();
      } else {
        alert('Error al eliminar la transacción');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Error de conexión');
    }
  };

  return { 
    transactions, 
    loading, 
    fetchTransactions, 
    fetchTransactionsByDate,
    createTransaction,
    deleteTransaction
  };
}