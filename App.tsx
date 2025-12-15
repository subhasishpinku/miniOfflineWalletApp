// App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import WalletScreen from './src/screens/WalletScreen';
import DeviceInfoScreen from './src/screens/DeviceInfoScreen';

import { validateAuthOnLaunch } from './src/services/auth.service';
import { clearAuth } from './src/storage/secureStorage';
import GlobalErrorBoundary from './src/components/GlobalErrorBoundary';
import { initDB } from './src/storage/db'; // ✅ ADD

type Screen = 'LOGIN' | 'WALLET' | 'DEVICE';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>('LOGIN');

  /**
   *  APP BOOTSTRAP
   * Runs ONCE on app launch
   */
  useEffect(() => {
    const bootstrap = async () => {
      try {
        // ✅ VERY IMPORTANT
        initDB(); // CREATE TABLES FIRST

        const token = await validateAuthOnLaunch();
        if (token) {
          setLoggedIn(true);
          setScreen('WALLET');
        } else {
          setScreen('LOGIN');
        }
      } catch {
        setScreen('LOGIN');
      } finally {
        setBooting(false);
      }
    };

    bootstrap();
  }, [])

  /**
   *  LOGIN SUCCESS HANDLER
   */
  const handleLoginSuccess = useCallback(() => {
    setLoggedIn(true);
    setScreen('WALLET');
  }, []);

  /**
   *  LOGOUT HANDLER
   * Clears secure storage and resets state
   */
  const handleLogout = useCallback(async () => {
    await clearAuth();
    setLoggedIn(false);
    setScreen('LOGIN');
  }, []);

  /**
   * SHOW SPLASH / LOADER DURING BOOTSTRAP
   */
  if (booting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /**
   *  SIMPLE SCREEN ROUTER (NO NAV LIB REQUIRED)
   */
  const renderScreen = () => {
    if (!loggedIn) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    if (screen === 'DEVICE') {
      return <DeviceInfoScreen />;
    }

    return (
      <WalletScreen
  onLogout={handleLogout}
  onOpenDeviceInfo={() => setScreen('DEVICE')}
/>

    );
  };

  return (
    <GlobalErrorBoundary>
      {renderScreen()}
    </GlobalErrorBoundary>
  );
}
//react-native-safe-area-context