import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { mockLoginApi } from '../api/auth.api';
import { saveAuth } from '../storage/secureStorage';

export default function LoginScreen({ onLoginSuccess }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Enter username and password');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Call mock API
      const response = await mockLoginApi(username, password);

      // 2️⃣ Store token securely (NOT AsyncStorage)
      await saveAuth(response.token, response.expiresAt);

      // 3️⃣ Notify app login success
      onLoginSuccess();

    } catch (e: any) {
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>LOGIN</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, textAlign: 'center', marginVertical: 40 },
  input: {
    borderBottomWidth: 1,
    marginVertical: 20,
    paddingVertical: 8,
  },
  button: {
    borderWidth: 1,
    padding: 14,
    marginTop: 40,
    borderRadius: 8,
  },
  buttonText: { textAlign: 'center', fontWeight: 'bold' },
});
