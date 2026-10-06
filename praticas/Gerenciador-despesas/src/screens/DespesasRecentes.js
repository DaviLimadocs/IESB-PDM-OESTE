import React from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';

const DESPESAS_MOCK = [
  { id: '1', descricao: 'Supermercado', valor: 150.50, categoria: 'Alimentação', data: new Date(2026, 9, 1) },
  { id: '2', descricao: 'Gasolina', valor: 80.00, categoria: 'Transporte', data: new Date(2026, 9, 2) },
];

export default function DespesasRecentes() {
  return <DespesaSaida despesas={DESPESAS_MOCK} periodo="Últimos 7 dias" />;
}