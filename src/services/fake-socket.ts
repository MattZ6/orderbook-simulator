type Channel = "ticker" | "book" | "trades";

type Subscription = {
	channel: Channel;
	symbol: string;
	payload?: Record<string, object | string | number>;
};

type TickerMessage = {
	channel: "ticker";
	symbol: string;
	data: {
		midPrice: number;
		markPrice: number;
		change: number;
		changePercent: number;
		volume24h: number;
		timestamp: number;
	};
};

type Order = {
	price: number;
	size: number;
	sizeInUSD: number;
};

type BookMessage = {
	channel: "book";
	symbol: string;
	data: {
		bids: Order[];
		asks: Order[];
		referencePrice: number;
		timestamp: number;
	};
};

type Trade = {
	id: string;
	price: number;
	size: number;
	notional: number;
	side: "buy" | "sell";
	timestamp: number;
};

type TradesMessage = {
	channel: "trades";
	symbol: string;
	data: Trade[];
};

export type Message = TickerMessage | BookMessage | TradesMessage;

type MarketState = {
	midPrice: number;
	open24h: number;
	volume24h: number;
	markPrice: number;
	lastTickSize?: number;
	bids: Order[];
	asks: Order[];
};

class FakeWebSocket {
	private listeners: ((message: Message) => void)[] = [];
	private intervals: ReturnType<typeof setInterval>[] = [];
	private subscriptions: Subscription[] = [];

	private marketState: Record<string, MarketState> = {
		BTC: {
			midPrice: 67510,
			open24h: 67000,
			volume24h: 2_700_000_000,
			markPrice: 67470,
			bids: [],
			asks: [],
		},
		ETH: {
			midPrice: 3400,
			open24h: 3350,
			volume24h: 900_000_000,
			markPrice: 3400,
			bids: [],
			asks: [],
		},
	};

	private LEVELS = 5;

	connect() {
		this.startTicker();
		this.startBook();
		this.startTrades();
	}

	subscribeToChannel(
		channel: Channel,
		symbol: string,
		payload?: Record<string, object | string | number>,
	) {
		this.subscriptions.push({ channel, symbol, payload });
	}

	unsubscribe(symbol: string) {
		this.subscriptions = this.subscriptions.filter(
			(sub) => sub.symbol !== symbol,
		);
	}

	private getSubscription(channel: Channel, symbol: string) {
		return this.subscriptions.find(
			(sub) => sub.channel === channel && sub.symbol === symbol,
		);
	}

	private isSubscribed(channel: Channel, symbol: string) {
		return this.subscriptions.some(
			(sub) => sub.channel === channel && sub.symbol === symbol,
		);
	}

	private emit(message: Message) {
		this.listeners.forEach((listener) => {
			listener(message);
		});
	}

	subscribeListener(listener: (msg: Message) => void) {
		this.listeners.push(listener);
	}

	private startTicker() {
		this.intervals.push(
			setInterval(() => {
				Object.keys(this.marketState).forEach((symbol) => {
					const subscription = this.getSubscription("ticker", symbol);

					if (!subscription) {
						return;
					}

					const current = this.marketState[symbol];

					// 30% chance de não mover
					if (Math.random() < 0.3) {
						return;
					}

					const direction = Math.random() > 0.5 ? 1 : -1;

					// Volatilidade baseada no preço atual
					const baseVolatility = current.midPrice * 0.0003;
					// 0.03% do preço

					const randomFactor = 0.5 + Math.random();
					// Entre 0.5x e 1.5x

					const move = direction * baseVolatility * randomFactor;

					current.midPrice += move;

					// Proteção contra valores negativos
					current.midPrice = Math.max(0.0001, current.midPrice);

					const change = current.midPrice - current.open24h;
					const changePercent = (change / current.open24h) * 100;

					// Mark suavizado
					current.markPrice =
						current.markPrice * 0.95 + current.midPrice * 0.05;

					this.emit({
						channel: "ticker",
						symbol,
						data: {
							midPrice: current.midPrice,
							markPrice: current.markPrice,
							change,
							changePercent,
							volume24h: current.volume24h,
							timestamp: Date.now(),
						},
					});
				});
			}, 850),
		);
	}

	private startBook() {
		this.intervals.push(
			setInterval(() => {
				Object.keys(this.marketState).forEach((symbol) => {
					const subscription = this.getSubscription("book", symbol);

					if (!subscription) {
						return;
					}

					const state = this.marketState[symbol];

					const tickSize = Number(subscription.payload?.tickSize || 0);

					if (state.lastTickSize !== tickSize) {
						state.bids = [];
						state.asks = [];
						state.lastTickSize = tickSize;
					}

					const safeTick = Math.max(tickSize, 0.000001);

					const bidBaseRaw = Math.floor(state.midPrice / safeTick) * safeTick;

					const bidBase = Math.round(bidBaseRaw / safeTick) * safeTick;
					const askBase = bidBase + safeTick;

					if (!state.bids || state.bids.length === 0) {
						state.bids = Array.from({ length: this.LEVELS }).map((_, i) => {
							const price =
								Math.round((bidBase - i * safeTick) / safeTick) * safeTick;
							const size = (Math.random() + i * 0.02) * 168;
							const sizeInUSD = price * size;

							return {
								price,
								size,
								sizeInUSD,
							};
						});

						state.asks = Array.from({ length: this.LEVELS }).map((_, i) => {
							const price =
								Math.round((askBase + i * safeTick) / safeTick) * safeTick;
							const size = (Math.random() + i * 0.02) * 153;
							const sizeInUSD = price * size;

							return {
								price,
								size,
								sizeInUSD,
							};
						});
					} else {
						state.bids = state.bids.map((bid, i) => {
							const price =
								Math.round((bidBase - i * safeTick) / safeTick) * safeTick;
							const sizeInUSD = price * bid.size;

							return {
								...bid,
								price,
								sizeInUSD,
							};
						});

						state.asks = state.asks.map((ask, i) => {
							const price =
								Math.round((askBase + i * safeTick) / safeTick) * safeTick;
							const sizeInUSD = price * ask.size;

							return {
								...ask,
								price,
								sizeInUSD,
							};
						});
					}

					// -------- VARIAÇÃO NATURAL --------

					const random = Math.random();

					let changes = 0;

					if (random < 0.1) {
						changes = this.LEVELS - (this.LEVELS - 5);
					} else if (random < 0.5) {
						changes = this.LEVELS - (this.LEVELS - 4);
					} else if (random < 0.7) {
						changes = this.LEVELS - (this.LEVELS - 3);
					} else if (random < 0.9) {
						changes = this.LEVELS - (this.LEVELS - 2);
					} else {
						changes = this.LEVELS - (this.LEVELS - 1);
					}

					for (let i = 0; i < changes; i++) {
						const side = Math.random() > 0.5 ? "bids" : "asks";

						const levels = state[side];

						const index = Math.floor(Math.random() * levels.length);

						const baseSizeVolatility = 20;

						const safeTick = Math.max(tickSize, 0.000001);
						const tickScale = Math.abs(Math.log10(safeTick));
						const volatilityFactor = 1 / (1 + tickScale);

						const depthFactor = (1 - index / (levels.length - 1)) ** 2;

						const change =
							(Math.random() - 0.5) *
							baseSizeVolatility *
							volatilityFactor *
							depthFactor;

						const newSize = Math.max(0.123, levels[index].size + change);

						levels[index].size = newSize;
						levels[index].sizeInUSD = levels[index].price * newSize;
					}

					this.emit({
						channel: "book",
						symbol,
						data: {
							bids: [...state.bids],
							asks: [...state.asks],
							referencePrice: state.midPrice,
							timestamp: Date.now(),
						},
					});
				});
			}, 220),
		);
	}

	private startTrades() {
		this.intervals.push(
			setInterval(() => {
				Object.keys(this.marketState).forEach((symbol) => {
					if (!this.isSubscribed("trades", symbol)) return;

					const state = this.marketState[symbol];
					if (!state.bids.length || !state.asks.length) return;

					const bestBid = state.bids[0];
					const bestAsk = state.asks[0];

					// Quantos trades nesse ciclo?
					const burstChance = Math.random();
					const tradeCount = burstChance < 0.7 ? 1 : burstChance < 0.9 ? 2 : 3;

					const trades: Trade[] = [];

					for (let i = 0; i < tradeCount; i++) {
						const isBuy = Math.random() > 0.5;
						const executionPrice = isBuy ? bestAsk.price : bestBid.price;

						const size = Number((Math.random() * 3 + 0.2).toFixed(3));

						const notional = executionPrice * size;

						state.volume24h += notional;

						trades.push({
							id: Math.random().toString(36).slice(2),
							price: executionPrice,
							size,
							notional,
							side: isBuy ? "buy" : "sell",
							timestamp: Date.now(),
						});
					}

					this.emit({
						channel: "trades",
						symbol,
						data: trades,
					});
				});
			}, 200),
		);
	}

	disconnect() {
		this.intervals.forEach(clearInterval);
		this.intervals = [];
		this.subscriptions = [];
	}
}

export const fakeSocket = new FakeWebSocket();
