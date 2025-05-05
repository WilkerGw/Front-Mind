'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link'; // Para link de edição
import styles from '../../../components/styles/Dashboard.module.css'; // Reutilizando estilos
import ClientForm from '../../../components/ClientForm'; // Importa o componente

// Função auxiliar para formatar data
const formatDate = (dateString) => {
  if (!dateString) return 'Não informada';
  try {
      // Tenta criar data e formatar, cuidado com fuso horário se for relevante
      const date = new Date(dateString);
      // Adiciona 1 dia para compensar potencial problema de fuso ao extrair apenas a data
      date.setUTCDate(date.getUTCDate() + 1);
      return date.toLocaleDateString('pt-BR') || 'Data inválida';
  } catch (e) {
      return 'Data inválida';
  }
};

export default function ClientDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // ID vem dos parâmetros da rota dinâmica
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID do cliente não fornecido na URL.');
      return;
    }
    const fetchClient = async () => {
      setLoading(true);
      setError(null);
      try {
        // Chama a API route dinâmica do Next.js
        const response = await fetch(`/api/clients/${id}`);
        console.log('Response Status:', response.status); // Log status
        if (!response.ok) {
          let errorData;
          try {
              errorData = await response.json();
              console.error('Erro da API (JSON):', errorData); // Log erro JSON
          } catch (jsonError) {
              // Se a resposta não for JSON válido
              errorData = { error: await response.text() };
              console.error('Erro da API (Texto):', errorData.error); // Log erro Texto
          }
          throw new Error(errorData.error || `Erro ${response.status} ao buscar cliente`);
        }
        const data = await response.json();
        console.log('Data recebida:', data); // Log dados recebidos
        setClient(data);
      } catch (error) {
        console.error("Erro no fetchClient:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]); // Dependência: re-executa se o ID mudar

  const handleDelete = async () => {
    if (!id || !client) return;
    if (confirm(`Tem certeza que deseja excluir o cliente "${client.fullName}"?`)) {
        try {
            const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao excluir cliente');
            }
            alert('Cliente excluído com sucesso!');
            router.push('/clients'); // Volta para a lista
        } catch (err) {
            setError(err.message);
            alert(`Erro ao excluir: ${err.message}`);
        }
    }
  };

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (error) return <p className={styles.error}>Erro: {error}</p>;
  if (!client) return <p>Cliente não encontrado.</p>; // Caso após loading/error

  return (
    <div className={styles.detalhesContainer}>
        <div className={styles.detalhesHeader}>
            <h1 className={styles.title}>Detalhes de: {client.fullName}</h1>
            <div>
                {/* Adicionar Link para Edição - Criar a página [id]/edit depois */}
                {/* <Link href={`/clients/${client._id}/edit`}>
                    <button className={styles.btnEditar}>Editar</button>
                </Link> */}
                <button onClick={handleDelete} className={styles.btnExcluir}>Excluir</button>
                <button onClick={() => router.back()} className={styles.btnVoltar}>Voltar</button>
            </div>
        </div>
        <div className={styles.detalhesGrid}>
            {/* Informações Pessoais */}
            <div className={styles.detalhesCard}>
                <h2>Informações Pessoais</h2>
                <ClientForm onSubmit={(data) => {
                  fetch(`/api/clients/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  }).then(response => {
                    if (response.ok) {
                      alert('Cliente atualizado com sucesso!');
                      router.push('/clients');
                    } else {
                      response.json().then(errorData => {
                        alert(errorData.error || 'Erro ao atualizar cliente');
                      });
                    }
                  }).catch(error => {
                    console.error("Erro ao atualizar cliente:", error);
                    alert('Erro ao atualizar cliente');
                  });
                }} initialData={client} />
            </div>
        </div>
    </div>
  );
}