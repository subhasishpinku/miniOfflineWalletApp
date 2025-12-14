import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types/transaction';

interface Props {
  item: Transaction;
}

const TransactionItem = ({ item }: Props) => {
  const getStatusColor = () => {
    switch (item.status) {
      case 'SUCCESS':
        return 'green';
      case 'FAILED':
        return 'red';
      case 'PENDING':
        return 'orange';
      case 'INITIATED':
      default:
        return 'gray';
    }
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.amount}>₹ {item.amount}</Text>
        <Text style={styles.id}>ID: {item.id.slice(0, 8)}</Text>
      </View>

      <Text style={[styles.status, { color: getStatusColor() }]}>
        {item.status}
      </Text>
    </View>
  );
};


export default React.memo(TransactionItem);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
