import * as Keychain from 'react-native-keychain';

export const saveAuth = async (token: string, expiresAt: number) => {
  await Keychain.setGenericPassword(
    'auth',
    JSON.stringify({ token, expiresAt })
  );
};

export const getAuth = async () => {
  const creds = await Keychain.getGenericPassword();
  return creds ? JSON.parse(creds.password) : null;
};

export const clearAuth = async () => {
  await Keychain.resetGenericPassword();
};
