import React, { useContext } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../context/DespesasContext';

export default function TodasDespesas() {
  const despesasCtx = useContext(DespesasContext);

  return <DespesaSaida despesas={despesasCtx.despesas} periodo="Total de Despesas" />;
}