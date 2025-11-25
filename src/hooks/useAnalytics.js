import { useState, useEffect } from 'react';

export default function useAnalytics(API_URL) {
  const [pieData, setPieData] = useState(null);
  const [gastosData, setGastosData] = useState(null);
  const [ingresosData, setIngresosData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [pieRes, gastosRes, ingresosRes] = await Promise.all([
        fetch(`${API_URL}/analytics/charts/distribucion-gastos`, { headers }),
        fetch(`${API_URL}/analytics/charts/gastos-categoria`, { headers }),
        fetch(`${API_URL}/analytics/charts/ingresos-categoria`, { headers })
      ]);

      const [pie, gastos, ingresos] = await Promise.all([
        pieRes.json(),
        gastosRes.json(),
        ingresosRes.json()
      ]);

      setPieData(pie);
      setGastosData(gastos);
      setIngresosData(ingresos);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { pieData, gastosData, ingresosData, loading, refetch: fetchAnalytics };
}