/**
 * DEADLINE ($DIE24) - Solana Transaction Tracker
 * Cloudflare Worker for monitoring on-chain activity via RPC
 */

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(this.checkTransactions(env));
  },

  async fetch(request, env) {
    return new Response("DEADLINE Tracker is running.");
  },

  async checkTransactions(env) {
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

    const data = await response.json();
    if (!data.result || data.result.length === 0) return;

    // 2. Process each new transaction
    for (const tx of data.result.reverse()) {
      // 3. Notify Backend to update Timer (+300s)
      await fetch(`${env.BACKEND_API_URL}/api/trpc/transactions.create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({
          type: "buy",
          amountSOL: "1.0",
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
