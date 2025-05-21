'use client';
import ClientForm from '../../../components/ClientForm'; // Importa o componente
import { useRouter } from 'next/navigation';
import styles from '../../../components/styles/Dashboard.module.css';
import { useState } from 'react'; // Para estado de erro/loading

export default function NewClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    console.log("Enviando dados:", data); // Log para depuração
    try {
      const response = await fetch('/api/clients', { // Chama a API route do Next.js
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro da API:", errorData); // Log do erro
        throw new Error(errorData.error || `Erro ${response.status} ao salvar cliente.`);
      }
      // Sucesso - redireciona para a lista
      router.push('/clients');
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
      setSubmitError(error.message);
      // Opcional: alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Cadastrar Novo Cliente</h1>
        {submitError && <p className={styles.errorMessage}>{submitError}</p>}
        <ClientForm onSubmit={handleSubmit} />
        {isSubmitting && <p>Salvando...</p>}
      </div>
    </>
  );
}