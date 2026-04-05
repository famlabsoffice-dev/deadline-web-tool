import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export function CountdownTimer() {
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const timerQuery = trpc.timer.getStatus.useQuery();

  useEffect(() => {
    if (!timerQuery.data) return;

    const seconds = timerQuery.data.secondsRemaining;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    setDisplayTime(formatted);
    setIsRunning(timerQuery.data.isRunning === 1);
  }, [timerQuery.data]);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-red-600 blur-3xl opacity-30 rounded-full"></div>
        
        {/* Timer display */}
        <div className="relative bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-2xl px-12 py-8">
          <div className="text-center">
            <div className="font-mono text-8xl font-bold tracking-wider" style={{
              color: "#ff0000",
              textShadow: "0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)",
              letterSpacing: "0.1em",
            }}>
              {displayTime}
            </div>
            
            {/* Status indicator */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
              <span className="text-sm text-gray-400">
                {isRunning ? "TIMER RUNNING" : "TIMER STOPPED"}
              </span>
            </div>

            {/* Experiment info */}
            <div className="mt-8 text-xs text-gray-500 space-y-1">
              <p>+300s per SOL buy | -300s per SOL sell</p>
              <p>Timer stops at 0:00:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
