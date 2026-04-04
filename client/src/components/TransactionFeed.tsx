import { trpc } from "@/lib/trpc";
import { ArrowDown, ArrowUp } from "lucide-react";

export function TransactionFeed() {
  const transactionsQuery = trpc.transactions.getRecent.useQuery({ limit: 20 });
  const transactions = transactionsQuery.data || [];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        Live Transaction Feed
      </h2>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions yet. Be the first to trade!
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg p-4 hover:border-red-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Transaction type icon */}
                  <div
                    className={`p-2 rounded-full ${
                      tx.type === "buy"
                        ? "bg-green-500/20"
                        : "bg-red-500/20"
                    }`}
                  >
                    {tx.type === "buy" ? (
                      <ArrowDown className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowUp className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  {/* Transaction details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">
                        {tx.type === "buy" ? "BUY" : "SELL"}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatAddress(tx.walletAddress)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {tx.amountSOL} SOL • {tx.tokenAmount} tokens
                    </div>
                  </div>
                </div>

                {/* Time and adjustment */}
                <div className="text-right">
                  <div
                    className={`text-sm font-semibold ${
                      tx.timeAdjustment > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.timeAdjustment > 0 ? "+" : ""}{tx.timeAdjustment}s
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatTime(tx.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
