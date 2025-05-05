'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../../components/styles/ResultadosDashboard.module.css';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.get('/api/sales/total');
        setTotalSales(response.data.total);
      } catch (err) {
        setError("Erro ao carregar total de vendas");
      } finally {
        setLoading(false);
      }
    };
    fetchTotal();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/sales/history');
        setSalesHistory(response.data);
      } catch (err) {
        setError("Erro ao carregar histórico de vendas");
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div class={styles.titleContainer}>
        <h1 className={styles.title}>Dashboard de Vendas</h1>
        {/* Painel de Total */}
        <div className={styles.totalPanel}>
          <h2>Total de Vendas</h2>
          <div className={styles.totalValue}>
            R$ {totalSales.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Gráfico de Histórico */}
      <div className={styles.chartContainer}>
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={salesHistory}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis 
                dataKey="day"
                tickFormatter={(tick) => moment(tick).format('DD/MM')}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#8884d8" 
                name="Vendas Diárias" 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}