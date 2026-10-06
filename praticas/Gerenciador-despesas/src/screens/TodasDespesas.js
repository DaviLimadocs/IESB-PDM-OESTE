import React from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';

const DESPESAS_MOCK = [
  { id: '1', descricao: 'Supermercado', valor: 150.50, categoria: 'Alimentação', data: new Date(2026, 9, 1) },
  { id: '2', descricao: 'Gasolina', valor: 80.00, categoria: 'Transporte', data: new Date(2026, 9, 2) },
  { id: '3', descricao: 'Cinema', valor: 45.00, categoria: 'Lazer', data: new Date(2026, 9, 3) },
  { id: '4', descricao: 'Conta de Luz', valor: 120.00, categoria: 'Contas', data: new Date(2026, 9, 4) },
];

export default function TodasDespesas() {
  return <DespesaSaida despesas={DESPESAS_MOCK} periodo="Total de Despesas" />;
}