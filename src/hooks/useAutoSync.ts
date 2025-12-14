import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getAllTransactions } from '../storage/db';
import { processTransaction } from '../services/transaction.service';

export const useAutoSync = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const txs = await getAllTransactions();
        txs
          .filter(t => !t.synced)
          .forEach(processTransaction);
      }
    });

    return unsubscribe;
  }, []);
};
