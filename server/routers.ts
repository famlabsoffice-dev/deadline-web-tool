import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getTimerStatus, updateTimerStatus, getLatestTokenMetrics, createTokenMetrics, getRecentTransactions, createTransaction, getTransactionStats } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  timer: router({
    getStatus: publicProcedure.query(async () => {
      const status = await getTimerStatus();
      return status || { id: 1, secondsRemaining: 0, isRunning: 0, totalTransactions: 0, lastUpdated: new Date(), createdAt: new Date() };
    }),
    
    updateStatus: protectedProcedure
      .input(z.object({
        secondsRemaining: z.number().optional(),
        isRunning: z.number().optional(),
        totalTransactions: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await updateTimerStatus(input);
      }),
  }),

  metrics: router({
    getLatest: publicProcedure.query(async () => {
      const metrics = await getLatestTokenMetrics();
      return metrics || {
        id: 1,
        marketCap: "0",
        volume: "0",
        priceSOL: "0",
        priceUSD: "0",
        holderCount: 0,
        totalSupply: "0",
        lastUpdated: new Date(),
        createdAt: new Date(),
      };
    }),
    
    create: protectedProcedure
      .input(z.object({
        marketCap: z.string(),
        volume: z.string(),
        priceSOL: z.string(),
        priceUSD: z.string(),
        holderCount: z.number(),
        totalSupply: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await createTokenMetrics(input);
      }),
  }),

  transactions: router({
    getRecent: publicProcedure
      .input(z.object({ limit: z.number().default(50) }).optional())
      .query(async ({ input }) => {
        return await getRecentTransactions(input?.limit || 50);
      }),
    
    create: publicProcedure
      .input(z.object({
        type: z.enum(["buy", "sell"]),
        amountSOL: z.string(),
        amountUSD: z.string(),
        tokenAmount: z.string(),
        walletAddress: z.string(),
        timeAdjustment: z.number(),
        txHash: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createTransaction(input);
      }),
    
    getStats: publicProcedure.query(async () => {
      return await getTransactionStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
