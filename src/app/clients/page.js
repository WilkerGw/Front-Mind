'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../components/styles/Dashboard.module.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          throw new Error('Resposta inválida');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className={styles.dashboard}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Lista de Clientes</h1>
          <Link href="/clients/new">
            <button className={styles.btnNovo}>Novo Cliente</button>
          </Link>
        </div>
        <ul className={styles.lista}>
          {clients.map((client) => (
            <li key={client._id} className={styles.titleLista}>
              {client.fullName} - {client.cpf}
              <Link href={`/clients/${client._id}`}>
                <button>Detalhes</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}