import React from 'react';
import { Summury } from '../Summury';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Summury />
      <TransactionsTable />
    </Container>
  )
}