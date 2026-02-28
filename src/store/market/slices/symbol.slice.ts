import type { StateCreator } from "zustand";

export type SymbolSlice = {
	currentSymbol: string;
	switchSymbol: (symbol: string) => void;
};

export const createSymbolSlice: StateCreator<
	SymbolSlice,
	[],
	[],
	SymbolSlice
> = (set) => ({
	currentSymbol: "BTC",

	switchSymbol(symbol) {
		set({ currentSymbol: symbol });
	},
});
