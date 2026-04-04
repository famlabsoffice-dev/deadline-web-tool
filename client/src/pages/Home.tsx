import { CountdownTimer } from "@/components/CountdownTimer";
import { TokenMetrics } from "@/components/TokenMetrics";
import { TransactionFeed } from "@/components/TransactionFeed";
import { InfoSection } from "@/components/InfoSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="neon-red">DEADLINE</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">Token Experiment</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Live Countdown Timer</p>
              <p className="text-sm text-gray-400 mt-1">Community Controlled</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-12">
        {/* Countdown Timer Section */}
        <section className="mb-16">
          <CountdownTimer />
        </section>

        {/* Token Metrics Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Token Metrics</h2>
          <TokenMetrics />
        </section>

        {/* Transaction Feed Section */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionFeed />
          </div>
          
          {/* Sidebar with quick stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Total Transactions</p>
                  <p className="text-2xl font-bold text-white">--</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Buy/Sell Ratio</p>
                  <p className="text-2xl font-bold text-white">--</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time Added</p>
                  <p className="text-2xl font-bold text-green-400">+00:00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time Removed</p>
                  <p className="text-2xl font-bold text-red-400">-00:00</p>
                </div>
              </div>
            </div>

            {/* Contract Info */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Contract</h3>
              <div className="space-y-3">
                <div className="text-xs">
                  <p className="text-gray-500">Network</p>
                  <p className="text-white font-mono text-xs">Solana</p>
                </div>
                <div className="text-xs">
                  <p className="text-gray-500">Token</p>
                  <p className="text-white font-mono text-xs break-all">DEADLINE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section>
          <InfoSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 py-8 bg-black/50">
        <div className="container text-center text-sm text-gray-500">
          <p>© 2026 DEADLINE Token Experiment. Educational purposes only.</p>
          <p className="mt-2">Always conduct your own research before trading.</p>
        </div>
      </footer>
    </div>
  );
}
