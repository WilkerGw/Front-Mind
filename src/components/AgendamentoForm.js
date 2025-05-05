import React, { useState, useCallback } from 'react';
import styles from '../components/styles/Form.module.css';

const AgendamentoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    date: '',
    hour: '',
    observation: ''
  });

  const formatAgendamentoCode = useCallback((code) => {
    const cleanedCode = code.replace(/-/g, ''); 
    if (cleanedCode.length > 2) {
      const prefix = cleanedCode.slice(0, -2);
      const suffix = cleanedCode.slice(-2);
      return `${prefix}-${suffix}`;
    }
    return cleanedCode;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'code') {
      setFormData({
        ...formData,
        [name]: formatAgendamentoCode(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
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
          name="name"
          placeholder=""
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Telefone
        <input
          type="text"
          name="telephone"
          placeholder=""
          value={formData.telephone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Data
        <input
          type="date"
          name="date"
          placeholder=""
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Hora
        <input
          type="time"
          name="hour"
          placeholder=""
          value={formData.hour}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Observação
        <input
          type="text"
          name="observation"
          placeholder=""
          value={formData.observation}          
          onChange={handleChange}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default AgendamentoForm;