import { trpc } from "@/lib/trpc";
import { TrendingUp, Users, Zap } from "lucide-react";

export function TokenMetrics() {
  const metricsQuery = trpc.metrics.getLatest.useQuery();
  const metrics = metricsQuery.data;

  const metricCards = [
    {
      label: "Market Cap",
      value: metrics?.marketCap || "$0",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      label: "Volume (24h)",
      value: metrics?.volume || "$0",
      icon: Zap,
      color: "text-blue-400",
    },
    {
      label: "Price",
      value: `${metrics?.priceSOL || "0"} SOL`,
      icon: TrendingUp,
      color: "text-purple-400",
    },
    {
      label: "Holders",
      value: metrics?.holderCount || 0,
      icon: Users,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
      {metricCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {card.label}
              </span>
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
