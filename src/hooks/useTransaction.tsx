import React, { createContext, ReactNode, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../services/api';

interface Transactions {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createAt: string;
}

type TransactionInput = Omit<Transactions, 'id' | 'createAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transactions[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionsInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionsInput,
      createAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([
      ...transactions,
      transaction
    ])

    if (transaction.type === 'deposit') {
      toast.success('Você fez um deposíto! 😎')
    } else if (transaction.type === 'withdraw') {
      toast.success('Você fez uma retirada! 😵')
    }
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
      <Toaster
        position="top-right"
      />
    </TransactionsContext.Provider>
  )
}