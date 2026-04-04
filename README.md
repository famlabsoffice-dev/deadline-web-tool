# DEADLINE Token Experiment

Ein interaktives Token-Experiment-Dashboard mit Live-Countdown-Timer, Echtzeit-Metriken und Community-gesteuerten Transaktionen.

## 🎯 Projektübersicht

**DEADLINE** ist ein experimentelles Token-Projekt, bei dem die Countdown-Timer durch Community-Trading-Aktivität gesteuert wird:

- **+60 Sekunden** für jeden SOL-Kauf
- **-60 Sekunden** für jeden SOL-Verkauf
- **Timer stoppt** bei 0:00:00

Das Dashboard zeigt in Echtzeit:
- Großer Neon-Rot Countdown-Timer (Cyberpunk-Design)
- Live Token-Metriken (Marktkapitalisierung, Volumen, Preis, Holder-Count)
- Transaktions-Feed mit Buy/Sell-Aktivitäten
- Social-Media-Integration (Twitter, Telegram, Pump.fun)

## 🚀 Tech Stack

- **Frontend**: React 19 + Tailwind CSS 4 + TypeScript
- **Backend**: Express 4 + tRPC 11 + Drizzle ORM
- **Datenbank**: MySQL/TiDB
- **Authentication**: Manus OAuth
- **Testing**: Vitest

## 📋 Anforderungen

- Node.js 22+
- pnpm 10+
- MySQL/TiDB Datenbank
- Manus OAuth Credentials

## 🔧 Installation

### 1. Repository klonen

```bash
git clone https://github.com/famlabsoffice-dev/deadline-web-tool.git
cd deadline-web-tool
```

### 2. Dependencies installieren

```bash
pnpm install
```

### 3. Umgebungsvariablen konfigurieren

Erstelle eine `.env.local` Datei mit folgenden Variablen:

```env
DATABASE_URL=mysql://user:password@localhost:3306/deadline
JWT_SECRET=your-secret-key
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name
```

### 4. Datenbank-Migrationen durchführen

```bash
pnpm db:push
```

### 5. Development Server starten

```bash
pnpm dev
```

Der Server läuft auf `http://localhost:3000`

## 📁 Projektstruktur

```
deadline-web-tool/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── lib/           # Utilities (tRPC client)
│   │   └── App.tsx        # Main app router
│   └── public/            # Static assets
├── server/                # Express Backend
│   ├── routers.ts         # tRPC procedure definitions
│   ├── db.ts              # Database query helpers
│   └── _core/             # Framework internals
├── drizzle/               # Database schema & migrations
│   └── schema.ts          # Table definitions
├── shared/                # Shared types & constants
└── package.json           # Dependencies
```

## 🎨 Komponenten

### CountdownTimer
Zeigt den Live-Countdown-Timer mit Neon-Rot-Design und Status-Indikator.

```tsx
import { CountdownTimer } from "@/components/CountdownTimer";

<CountdownTimer />
```

### TokenMetrics
Zeigt aktuelle Token-Metriken in einer Grid-Layout.

```tsx
import { TokenMetrics } from "@/components/TokenMetrics";

<TokenMetrics />
```

### TransactionFeed
Live-Feed der letzten Transaktionen mit Buy/Sell-Indikatoren.

```tsx
import { TransactionFeed } from "@/components/TransactionFeed";

<TransactionFeed />
```

### InfoSection
Erklärt die Experiment-Mechanik und zeigt Social-Media-Links.

```tsx
import { InfoSection } from "@/components/InfoSection";

<InfoSection />
```

## 🔌 API (tRPC Procedures)

### Timer

```ts
// Get current timer status
trpc.timer.getStatus.useQuery()

// Update timer (protected)
trpc.timer.updateStatus.useMutation({
  secondsRemaining: 3600,
  isRunning: 1,
  totalTransactions: 5
})
```

### Metrics

```ts
// Get latest token metrics
trpc.metrics.getLatest.useQuery()

// Create new metrics (protected)
trpc.metrics.create.useMutation({
  marketCap: "1000000",
  volume: "500000",
  priceSOL: "0.5",
  priceUSD: "10",
  holderCount: 100,
  totalSupply: "1000000000"
})
```

### Transactions

```ts
// Get recent transactions
trpc.transactions.getRecent.useQuery({ limit: 50 })

// Create transaction
trpc.transactions.create.useMutation({
  type: "buy",
  amountSOL: "1.5",
  amountUSD: "30",
  tokenAmount: "1000000",
  walletAddress: "wallet123",
  timeAdjustment: 60,
  txHash: "hash123"
})

// Get transaction stats
trpc.transactions.getStats.useQuery()
```

## 🧪 Testing

Führe alle Tests aus:

```bash
pnpm test
```

Führe Tests im Watch-Modus aus:

```bash
pnpm test --watch
```

## 🏗️ Build & Deployment

### Production Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## 📊 Datenbankschema

### timerStatus
Speichert den aktuellen Timer-Status.

```sql
CREATE TABLE timerStatus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  secondsRemaining INT DEFAULT 0,
  isRunning INT DEFAULT 0,
  totalTransactions INT DEFAULT 0,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### tokenMetrics
Speichert Token-Metriken-Snapshots.

```sql
CREATE TABLE tokenMetrics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  marketCap VARCHAR(255) DEFAULT '0',
  volume VARCHAR(255) DEFAULT '0',
  priceSOL VARCHAR(255) DEFAULT '0',
  priceUSD VARCHAR(255) DEFAULT '0',
  holderCount INT DEFAULT 0,
  totalSupply VARCHAR(255) DEFAULT '0',
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### transactions
Speichert alle Buy/Sell-Transaktionen.

```sql
CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('buy', 'sell') NOT NULL,
  amountSOL VARCHAR(255) NOT NULL,
  amountUSD VARCHAR(255) NOT NULL,
  tokenAmount VARCHAR(255) NOT NULL,
  walletAddress VARCHAR(255) NOT NULL,
  timeAdjustment INT NOT NULL,
  txHash VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Design

Das Dashboard verwendet ein **Cyberpunk Dark Theme** mit:
- Neon-Rot Akzenten (#FF0000)
- Schwarzer Hintergrund (RGB 0,0,0)
- Großen, leuchtenden Ziffern für den Timer
- Glowing-Effekte für visuellen Impact
- Responsive Grid-Layout für alle Geräte

## 📝 Lizenz

MIT

## 🤝 Beitragen

Beiträge sind willkommen! Bitte erstelle einen Pull Request mit deinen Änderungen.

## ⚠️ Disclaimer

Dies ist ein experimentelles Projekt für Bildungszwecke. Führe immer deine eigene Recherche durch, bevor du tradest. Die Entwickler übernehmen keine Haftung für finanzielle Verluste.

## 📧 Support

Für Fragen oder Probleme öffne bitte ein Issue auf GitHub.

---

**Erstellt mit ❤️ von der DEADLINE Community**
