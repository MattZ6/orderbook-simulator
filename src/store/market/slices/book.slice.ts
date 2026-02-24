import type { StateCreator } from "zustand";

import type { Order, OrderWithTotal } from "../types";

export type ViewType = "symbol" | "dollar";

type SetBookDataInput = {
	bids: Order[];
	asks: Order[];
};

type BookData = {
	bids: OrderWithTotal[];
	asks: OrderWithTotal[];

	maxBidTotal: number;
	maxAskTotal: number;

	spread: number;
	spreadPercent: number;
};

export type BookSlice = {
	isBookLoading: boolean;

	tickSize: number;
	availableTickSizes: number[];
	viewType: ViewType;
	levels: number;

	book: BookData | null;

	setTickSize: (tickSize: number) => void;
	setAvailableTickSizes: (sizes: number[]) => void;
	toggleViewType: () => void;

	setBookData: (input: SetBookDataInput) => void;
	resetBook: () => void;
};

export const createBookSlice: StateCreator<BookSlice, [], [], BookSlice> = (
	set,
) => ({
	tickSize: 10,
	availableTickSizes: [1, 10, 100, 1000],
	viewType: "symbol",
	levels: 5,

	isBookLoading: true,
	book: null,

	setTickSize(tickSize) {
		set({ tickSize });
	},

	setAvailableTickSizes(sizes) {
		set({ availableTickSizes: sizes });
	},

	toggleViewType() {
		set((state) => ({
			viewType: state.viewType === "symbol" ? "dollar" : "symbol",
		}));
	},

	setBookData(input) {
		const asks = mapToOrderWithTotal(input.asks);
		const bids = mapToOrderWithTotal(input.bids);

		const maxAskTotal = asks.length > 0 ? asks[asks.length - 1].total : 0;

		const maxBidTotal = bids.length > 0 ? bids[bids.length - 1].total : 0;

		const bestAsk = asks.length > 0 ? asks[0].price : 0;
		const bestBid = bids.length > 0 ? bids[0].price : 0;

		const spread = bestAsk && bestBid ? bestAsk - bestBid : 0;

		const spreadPercent = bestBid > 0 ? (spread / bestBid) * 100 : 0;

		set({
			isBookLoading: false,
			book: {
				asks: [...asks].reverse(),
				bids,
				maxAskTotal,
				maxBidTotal,
				spread,
				spreadPercent,
			},
		});
	},

	resetBook() {
		set({
			isBookLoading: true,
			book: null,
		});
	},
});

function mapToOrderWithTotal(orders: Order[]): OrderWithTotal[] {
	let accumulatedTotal = 0;
	let accumulatedTotalInUSD = 0;

	return orders.map((order) => {
		accumulatedTotal += order.size;
		accumulatedTotalInUSD += order.sizeInUSD;

		return {
			...order,
			total: accumulatedTotal,
			totalInUSD: accumulatedTotalInUSD,
		};
	});
}
