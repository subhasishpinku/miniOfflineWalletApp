export type PaymentStatus =
  | 'INITIATED'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED';

export interface Transaction {
  id: string;              // UUID (idempotency key)
  amount: number;
  status: PaymentStatus;
  createdAt: number;
  synced: boolean;         // critical for offline sync
}
