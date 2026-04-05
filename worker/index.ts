/**
 * DEADLINE ($DIE24) - Solana Transaction Tracker
 * Cloudflare Worker for monitoring on-chain activity via RPC
 */

interface Env {
  SOLANA_RPC_URL: string;
  TARGET_ADDRESS: string;
  BACKEND_API_URL: string;
  ADMIN_TOKEN: string;
  KV: KVNamespace;
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(this.checkTransactions(env));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    return new Response("DEADLINE Tracker is running.");
  },

  async checkTransactions(env: Env) {
    const lastSignature = await env.KV.get("lastSignature");
    
    // 1. Fetch signatures from Solana RPC
    const response = await fetch(env.SOLANA_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [
          env.TARGET_ADDRESS,
          {
            limit: 10,
            until: lastSignature
          }
        ]
      })
    });

    const data: any = await response.json();
    if (!data.result || data.result.length === 0) return;

    // 2. Process each new transaction
    for (const tx of data.result.reverse()) {
      // Fetch full transaction details if needed, or just use the signature
      // For this experiment, we assume any valid signature to the pair address counts
      
      // 3. Notify Backend to update Timer (+300s)
      await fetch(`${env.BACKEND_API_URL}/api/trpc/transactions.create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({
          type: "buy", // Simplified: assuming buy for now, can be refined with full tx parsing
          amountSOL: "1.0", // Mock or parsed value
          amountUSD: "0",
          tokenAmount: "0",
          walletAddress: "on-chain",
          timeAdjustment: 300,
          txHash: tx.signature
        })
      });

      await env.KV.put("lastSignature", tx.signature);
    }
  }
};
