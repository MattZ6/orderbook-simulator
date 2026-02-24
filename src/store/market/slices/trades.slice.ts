import type { StateCreator } from "zustand";

import type { Trade } from "@/store/market/types";

export type TradesSlice = {
	trades: Trade[];
};

export const createTradesSlice: StateCreator<
	TradesSlice,
	[],
	[],
	TradesSlice
> = () => ({
	trades: [],
});
