export const mockCreatePayment = (txId: string): Promise<'SUCCESS' | 'FAILED'> =>
new Promise(resolve => {
setTimeout(() => {
Math.random() > 0.3 ? resolve('SUCCESS') : resolve('FAILED');
}, 2000);
});