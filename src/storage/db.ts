import SQLite, {
  SQLiteDatabase,
  Transaction,
  ResultSet,
} from 'react-native-sqlite-storage';
import { Transaction as TxModel } from '../types/transaction';

SQLite.enablePromise(true);

let database: SQLiteDatabase | null = null;

const getDB = async (): Promise<SQLiteDatabase> => {
  if (database) return database;

  database = await SQLite.openDatabase({
    name: 'wallet.db',
    location: 'default',
  });

  return database;
};

export const initDB = async (): Promise<void> => {
  const db = await getDB();

  await db.transaction((tx: Transaction) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL,
        status TEXT,
        createdAt INTEGER,
        synced INTEGER
      );
    `);
  });
};

export const insertTransaction = async (txData: TxModel): Promise<void> => {
  const db = await getDB();

  await db.transaction((tx: Transaction) => {
    tx.executeSql(
      `INSERT OR IGNORE INTO transactions VALUES (?,?,?,?,?)`,
      [
        txData.id,
        txData.amount,
        txData.status,
        txData.createdAt,
        txData.synced ? 1 : 0,
      ]
    );
  });
};

export const updateTransactionStatus = async (
  id: string,
  status: string,
  synced: boolean
): Promise<void> => {
  const db = await getDB();

  await db.transaction((tx: Transaction) => {
    tx.executeSql(
      `UPDATE transactions SET status=?, synced=? WHERE id=?`,
      [status, synced ? 1 : 0, id]
    );
  });
};

export const getAllTransactions = async (): Promise<TxModel[]> => {
  const db = await getDB();

  return new Promise(resolve => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `SELECT * FROM transactions ORDER BY createdAt DESC`,
        [],
        (_: Transaction, res: ResultSet) => {
          resolve(res.rows.raw());
        }
      );
    });
  });
};
