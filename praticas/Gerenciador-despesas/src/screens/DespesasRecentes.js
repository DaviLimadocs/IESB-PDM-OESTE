import React, { useContext } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../context/DespesasContext';

export default function DespesasRecentes() {
  const despesasCtx = useContext(DespesasContext);

  // Exibe despesas dos últimos 7 dias
  const despesasRecentes = despesasCtx.despesas.filter((despesa) => {
    const hoje = new Date();
    const dataDespesa = new Date(despesa.data);
    const diferencaDias = (hoje - dataDespesa) / (1000 * 60 * 60 * 24);
    return diferencaDias <= 7;
  });

  return <DespesaSaida despesas={despesasRecentes} periodo="Últimos 7 dias" />;
}