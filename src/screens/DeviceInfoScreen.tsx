import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeviceInfo from '../native/DeviceInfo';

export default function DeviceInfoScreen() {
  const [battery, setBattery] = useState<number | null>(null);
  const [network, setNetwork] = useState<string>('UNKNOWN');

  useEffect(() => {
    DeviceInfo.getBattery()
      .then(setBattery)
      .catch(() => setBattery(null));

    DeviceInfo.getNetwork()
      .then(setNetwork)
      .catch(() => setNetwork('UNKNOWN'));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Info</Text>
      <Text>Battery: {battery ?? 'N/A'}%</Text>
      <Text>Network: {network}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, marginBottom: 20 },
});
