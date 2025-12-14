import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import TransactionItem from '../components/TransactionItem';
import { getAllTransactions } from '../storage/db';
import { createPayment } from '../services/transaction.service';
import { useAutoSync } from '../hooks/useAutoSync';
import { Transaction } from '../types/transaction';

/** PROPS TYPE */
type Props = {
  onLogout: () => Promise<void>;
  onOpenDeviceInfo: () => void;
};

export default function WalletScreen({
  onLogout,
  onOpenDeviceInfo,
}: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useAutoSync();

  const loadTransactions = async () => {
    const data = await getAllTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleCreatePayment = async () => {
    await createPayment(100);
    loadTransactions();
  };

  /**  Typed item */
  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => (
      <TransactionItem item={item} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreatePayment}>
        <Text style={styles.buttonText}>CREATE PAYMENT</Text>
      </TouchableOpacity>

      {/*  LOGOUT */}
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>

      {/*  DEVICE INFO */}
      <TouchableOpacity style={styles.button} onPress={onOpenDeviceInfo}>
        <Text style={styles.buttonText}>DEVICE INFO</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 20 },
  button: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: { textAlign: 'center', fontWeight: 'bold' },
});
