'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../components/styles/Dashboard.module.css';

export default function ProductDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID do produto não encontrado');
      return;
    }
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao buscar produto');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.detalhesContainer}>
      <h1 className={styles.titleLista}>{product.name}</h1>
      {product && (
        <div>
          <p>Código: {product.code}</p>
          <p>Tipo: {product.type}</p>
          <p>Design: {product.design}</p>
          <p>Material: {product.material}</p>
          <p>Estoque: {product.stock}</p>
          <p>Preço: R$ {parseFloat(product.price).toFixed(2)}</p>
          <p>Preço de Custo: R$ {parseFloat(product.costPrice).toFixed(2)}</p>
          <p>Data de Criação: {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Não disponível'}</p>
        </div>
      )}
    </div>
  );
}