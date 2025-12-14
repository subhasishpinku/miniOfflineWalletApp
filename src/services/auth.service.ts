import { getAuth, clearAuth } from '../storage/secureStorage';

export const validateAuthOnLaunch = async () => {
  const auth = await getAuth();

  if (!auth) return null;

  if (Date.now() > auth.expiresAt) {
    await clearAuth(); // logout on expiry
    return null;
  }

  return auth.token;
};
