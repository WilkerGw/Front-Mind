'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../components/styles/Dashboard.module.css';

export default function AgendamentoDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [product, setAgendamento] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID do agendamento não encontrado');
      return;
    }
    const fetchAgendamento = async () => {
      try {
        const response = await fetch(`/api/agendamento/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao buscar agendamento');
        }
        const data = await response.json();
        setAgendamento(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendamento();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.detalhesContainer}>
      <h1 className={styles.titleLista}>{agendamento.name}</h1>
      {product && (
        <div>
        </div>
      )}
    </div>
  );
}