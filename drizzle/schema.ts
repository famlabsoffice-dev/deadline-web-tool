import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Timer Status Table - Tracks the countdown timer state
 */
export const timerStatus = mysqlTable("timerStatus", {
  id: int("id").autoincrement().primaryKey(),
  /** Current timer value in seconds */
  secondsRemaining: int("secondsRemaining").default(0).notNull(),
  /** Whether the timer is currently running */
  isRunning: int("isRunning").default(0).notNull(),
  /** Total transactions processed */
  totalTransactions: int("totalTransactions").default(0).notNull(),
  /** Last update timestamp */
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TimerStatus = typeof timerStatus.$inferSelect;
export type InsertTimerStatus = typeof timerStatus.$inferInsert;

/**
 * Token Metrics Table - Stores real-time token statistics
 */
export const tokenMetrics = mysqlTable("tokenMetrics", {
  id: int("id").autoincrement().primaryKey(),
  /** Market cap in USD */
  marketCap: varchar("marketCap", { length: 255 }).default("0").notNull(),
  /** Trading volume in USD */
  volume: varchar("volume", { length: 255 }).default("0").notNull(),
  /** Current token price in SOL */
  priceSOL: varchar("priceSOL", { length: 255 }).default("0").notNull(),
  /** Current token price in USD */
  priceUSD: varchar("priceUSD", { length: 255 }).default("0").notNull(),
  /** Number of token holders */
  holderCount: int("holderCount").default(0).notNull(),
  /** Total supply */
  totalSupply: varchar("totalSupply", { length: 255 }).default("0").notNull(),
  /** Last update timestamp */
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TokenMetrics = typeof tokenMetrics.$inferSelect;
export type InsertTokenMetrics = typeof tokenMetrics.$inferInsert;

/**
 * Transaction Feed Table - Logs all buy/sell transactions
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  /** Transaction type: 'buy' or 'sell' */
  type: mysqlEnum("type", ["buy", "sell"]).notNull(),
  /** Amount in SOL */
  amountSOL: varchar("amountSOL", { length: 255 }).notNull(),
  /** Amount in USD */
  amountUSD: varchar("amountUSD", { length: 255 }).notNull(),
  /** Tokens received/sold */
  tokenAmount: varchar("tokenAmount", { length: 255 }).notNull(),
  /** Wallet address (truncated for privacy) */
  walletAddress: varchar("walletAddress", { length: 255 }).notNull(),
  /** Time adjustment in seconds (+60 for buy, -60 for sell) */
  timeAdjustment: int("timeAdjustment").notNull(),
  /** Transaction hash/ID from blockchain */
  txHash: varchar("txHash", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;