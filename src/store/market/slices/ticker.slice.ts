import type { StateCreator } from "zustand";

export type TickerData = {
	midPrice: number;
	change: number;
	changePercent: number;
	volume24h: number;
	markPrice: number;
};

export type TickerSlice = {
	isTickerLoading: boolean;
	ticker: TickerData | null;

	setTicker: (data: TickerData) => void;
	resetTicker: () => void;
};

export const createTickerSlice: StateCreator<
	TickerSlice,
	[],
	[],
	TickerSlice
> = (set, _get) => ({
	isTickerLoading: true,
	ticker: null,

	setTicker(data) {
		set({
			isTickerLoading: false,
			ticker: data,
		});
	},

	resetTicker() {
		set({
			isTickerLoading: true,
		});
	},
});
