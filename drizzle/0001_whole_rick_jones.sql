CREATE TABLE `timerStatus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`secondsRemaining` int NOT NULL DEFAULT 0,
	`isRunning` int NOT NULL DEFAULT 0,
	`totalTransactions` int NOT NULL DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `timerStatus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tokenMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`marketCap` varchar(255) NOT NULL DEFAULT '0',
	`volume` varchar(255) NOT NULL DEFAULT '0',
	`priceSOL` varchar(255) NOT NULL DEFAULT '0',
	`priceUSD` varchar(255) NOT NULL DEFAULT '0',
	`holderCount` int NOT NULL DEFAULT 0,
	`totalSupply` varchar(255) NOT NULL DEFAULT '0',
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tokenMetrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('buy','sell') NOT NULL,
	`amountSOL` varchar(255) NOT NULL,
	`amountUSD` varchar(255) NOT NULL,
	`tokenAmount` varchar(255) NOT NULL,
	`walletAddress` varchar(255) NOT NULL,
	`timeAdjustment` int NOT NULL,
	`txHash` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
