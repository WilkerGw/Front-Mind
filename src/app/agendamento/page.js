'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../components/styles/Dashboard.module.css';

export default function Agendamento() {
  const [agendamentos, setAgendamento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgendamento = async () => {
      try {
        const response = await fetch('/api/agendamento');
        if (!response.ok) {
          throw new Error('Erro ao buscar agendamentos');
        }
        const data = await response.json();
        setAgendamento(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendamento();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className={styles.dashboard}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Agendamentos</h1>
          <Link href="/agendamento/new">
            <button className={styles.btnNovo}>Novo Agendamento</button>
          </Link>
        </div>
        <ul className={styles.lista}>
          {agendamentos.map((agendamento) => (
            <li key={agendamento._id} className={styles.titleLista}>
              {agendamento.name} - {agendamento.telephone} - {agendamento.hour}
              <Link href={`/agendamentos/${agendamento._id}`}>
                <button>Detalhes</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}