import React, { useState, useCallback, useEffect } from 'react';
import styles from '../components/styles/Form.module.css';
import { mask } from 'remask';

const ClientForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    cep: '',
    receiptImage: '',
    notes: '',
    possuiReceita: false,
    esfericoDireito: '',
    cilindricoDireito: '',
    eixoDireito: '',
    esfericoEsquerdo: '',
    cilindricoEsquerdo: '',
    eixoEsquerdo: '',
    adicao: '',
    vencimentoReceita: ''
  });

  const [cepLoading, setCepLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === 'checkbox') {
      newValue = checked;
    }

    if (name === 'cpf') {
      newValue = mask(newValue, ['999.999.999-99']);
    } else if (name === 'phone') {
      newValue = mask(newValue, ['(99) 99999-9999']);
    }

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const fetchAddressByCep = async (cep) => {
    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado.');
      } else {
        setFormData({
          ...formData,
          address: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
        });
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP.');
    } finally {
      setCepLoading(false);
    }
  };

  const handleCepChange = (e) => {
    const { value } = e.target;
    const maskedValue = mask(value, ['99999-999']);

    setFormData({
      ...formData,
      cep: maskedValue
    });

    if (maskedValue.length === 9) {
      fetchAddressByCep(maskedValue.replace('-', ''));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Nome Completo
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        CPF
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Telefone
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Data de Nascimento
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gênero
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
      </label>
      <label>
        CEP
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleCepChange}
          required
        />
      </label>
      {cepLoading && <p>Buscando endereço...</p>}
      <label>
        Endereço
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Observações
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </label>
      <label>
        Possui Receita
        <input
          type="checkbox"
          name="possuiReceita"
          checked={formData.possuiReceita}
          onChange={handleChange}
        />
      </label>
      {formData.possuiReceita && (
        <>
          <label>
            OD Esférico
            <input
              type="text"
              name="esfericoDireito"
              value={formData.esfericoDireito}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            OD Cilíndrico
            <input
              type="text"
              name="cilindricoDireito"
              value={formData.cilindricoDireito}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            OD Eixo
            <input
              type="text"
              name="eixoDireito"
              value={formData.eixoDireito}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            OE Esférico
            <input
              type="text"
              name="esfericoEsquerdo"
              value={formData.esfericoEsquerdo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            OE Cilíndrico
            <input
              type="text"
              name="cilindricoEsquerdo"
              value={formData.cilindricoEsquerdo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            OE Eixo
            <input
              type="text"
              name="eixoEsquerdo"
              value={formData.eixoEsquerdo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Adição
            <input
              type="text"
              name="adicao"
              value={formData.adicao}
              onChange={handleChange}
            />
          </label>
          <label>
            Vencimento da Receita
            <input
              type="date"
              name="vencimentoReceita"
              value={formData.vencimentoReceita}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ClientForm;