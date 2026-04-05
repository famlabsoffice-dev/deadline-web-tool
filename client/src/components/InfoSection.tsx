import { Twitter, MessageCircle, ExternalLink } from "lucide-react";

export function InfoSection() {
  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      url: "https://t.me",
      color: "hover:text-blue-500",
    },
    {
      name: "Pump.fun",
      icon: ExternalLink,
      url: "https://pump.fun",
      color: "hover:text-purple-400",
    },
  ];

  return (
    <div className="py-12 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Experiment explanation */}
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            How the Experiment Works
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              This is a live token experiment for educational purposes. The countdown timer is controlled by community trading activity:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold mt-1">+300s</span>
                <span>Every SOL spent buying the token adds 300 seconds to the timer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">-300s</span>
                <span>Every SOL spent selling the token removes 300 seconds from the timer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 font-bold mt-1">STOP</span>
                <span>When the timer reaches 0:00:00, the experiment ends</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 italic mt-6">
              Data is streamed from pump.fun WebSocket API. Always DYOR before trading.
            </p>
          </div>
        </div>

        {/* Social media links */}
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold text-white">Join the Community</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 transition-colors ${link.color}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
