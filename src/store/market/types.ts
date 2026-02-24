export type Order = {
	price: number;
	size: number;
	sizeInUSD: number;
};

export type OrderWithTotal = Order & {
	total: number;
	totalInUSD: number;
};

export type Trade = {
	id: string;
	price: number;
	size: number;
	side: "buy" | "sell";
	timestamp: number;
};

export type ConnectionStatus = "connected" | "disconnected";
