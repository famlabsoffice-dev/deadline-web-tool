import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, timerStatus, tokenMetrics, transactions, InsertTimerStatus, InsertTokenMetrics, InsertTransaction } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Timer Queries
 */
export async function getTimerStatus() {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(timerStatus).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateTimerStatus(data: Partial<InsertTimerStatus>) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(timerStatus).values({
    secondsRemaining: data.secondsRemaining ?? 0,
    isRunning: data.isRunning ?? 0,
    totalTransactions: data.totalTransactions ?? 0,
  }).onDuplicateKeyUpdate({
    set: {
      secondsRemaining: data.secondsRemaining,
      isRunning: data.isRunning,
      totalTransactions: data.totalTransactions,
    },
  });
  
  return result;
}

/**
 * Token Metrics Queries
 */
export async function getLatestTokenMetrics() {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(tokenMetrics).orderBy(desc(tokenMetrics.createdAt)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createTokenMetrics(data: InsertTokenMetrics) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(tokenMetrics).values(data);
  return result;
}

/**
 * Transaction Queries
 */
export async function getRecentTransactions(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(transactions).orderBy(desc(transactions.createdAt)).limit(limit);
  return result;
}

export async function createTransaction(data: InsertTransaction) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(transactions).values(data);
  return result;
}

export async function getTransactionStats() {
  const db = await getDb();
  if (!db) return { buyCount: 0, sellCount: 0 };
  
  const result = await db.select().from(transactions);
  const buyCount = result.filter(t => t.type === 'buy').length;
  const sellCount = result.filter(t => t.type === 'sell').length;
  
  return { buyCount, sellCount };
}
