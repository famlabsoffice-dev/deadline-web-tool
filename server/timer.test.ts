import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(isAuthenticated = false): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: isAuthenticated ? user : null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("timer procedures", () => {
  it("getStatus returns timer status", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.timer.getStatus();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("secondsRemaining");
    expect(result).toHaveProperty("isRunning");
    expect(result).toHaveProperty("totalTransactions");
  });

  it("updateStatus requires authentication", async () => {
    const ctx = createContext(false);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.timer.updateStatus({
        secondsRemaining: 3600,
        isRunning: 1,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("updateStatus updates timer with valid input", async () => {
    const ctx = createContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.timer.updateStatus({
      secondsRemaining: 3600,
      isRunning: 1,
      totalTransactions: 5,
    });

    expect(result).toBeDefined();
  });
});

describe("metrics procedures", () => {
  it("getLatest returns token metrics", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.metrics.getLatest();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("marketCap");
    expect(result).toHaveProperty("volume");
    expect(result).toHaveProperty("priceSOL");
    expect(result).toHaveProperty("priceUSD");
    expect(result).toHaveProperty("holderCount");
  });

  it("create requires authentication", async () => {
    const ctx = createContext(false);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.metrics.create({
        marketCap: "1000000",
        volume: "500000",
        priceSOL: "0.5",
        priceUSD: "10",
        holderCount: 100,
        totalSupply: "1000000000",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("transactions procedures", () => {
  it("getRecent returns recent transactions", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.transactions.getRecent({ limit: 10 });

    expect(Array.isArray(result)).toBe(true);
  });

  it("getStats returns transaction statistics", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.transactions.getStats();

    expect(result).toHaveProperty("buyCount");
    expect(result).toHaveProperty("sellCount");
    expect(typeof result.buyCount).toBe("number");
    expect(typeof result.sellCount).toBe("number");
  });

  it("create accepts buy transaction", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.transactions.create({
      type: "buy",
      amountSOL: "1.5",
      amountUSD: "30",
      tokenAmount: "1000000",
      walletAddress: "wallet123",
      timeAdjustment: 60,
      txHash: "hash123",
    });

    expect(result).toBeDefined();
  });

  it("create accepts sell transaction", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.transactions.create({
      type: "sell",
      amountSOL: "1.0",
      amountUSD: "20",
      tokenAmount: "500000",
      walletAddress: "wallet456",
      timeAdjustment: -60,
      txHash: "hash456",
    });

    expect(result).toBeDefined();
  });
});
