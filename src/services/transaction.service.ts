import NetInfo from '@react-native-community/netinfo';
import uuid from 'react-native-uuid';
import { insertTransaction, updateTransactionStatus } from '../storage/db';
import { mockCreatePayment } from '../api/payment.api';
import { Transaction } from '../types/transaction';

export const createPayment = async (amount: number) => {
  const transaction: Transaction = {
    id: uuid.v4().toString(),
    amount,
    status: 'INITIATED',
    createdAt: Date.now(),
    synced: false,
  };

  // 1️Save immediately (offline-safe)
  insertTransaction(transaction);

  // Try processing
  processTransaction(transaction);
};

export const processTransaction = async (tx: Transaction) => {
  const net = await NetInfo.fetch();

  if (!net.isConnected) {
    // Offline → wait
    updateTransactionStatus(tx.id, 'PENDING', false);
    return;
  }

  try {
    updateTransactionStatus(tx.id, 'PENDING', false);

    const result = await mockCreatePayment(tx.id);

    updateTransactionStatus(
      tx.id,
      result === 'SUCCESS' ? 'SUCCESS' : 'FAILED',
      true
    );
  } catch {
    updateTransactionStatus(tx.id, 'FAILED', false);
  }
};
