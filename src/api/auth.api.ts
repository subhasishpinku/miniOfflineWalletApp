export const mockLoginApi = async (username: string, password: string) => {
  await new Promise<void>(resolve => setTimeout(resolve, 800));

  if (username !== 'admin' || password !== '1234') {
    throw new Error('INVALID_CREDENTIALS');
  }

  return {
    token: `secure-token-${Date.now()}`,
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
  };
};
