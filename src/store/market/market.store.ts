import { create } from "zustand";

import { type BookSlice, createBookSlice } from "./slices/book.slice";
import {
	type ConnectionSlice,
	createConnectionSlice,
} from "./slices/connection.slice";
import { createSymbolSlice, type SymbolSlice } from "./slices/symbol.slice";
import { createTickerSlice, type TickerSlice } from "./slices/ticker.slice";

type MarketStore = SymbolSlice & TickerSlice & BookSlice & ConnectionSlice;

export const useNewMarketStore = create<MarketStore>()((...a) => ({
	...createSymbolSlice(...a),
	...createTickerSlice(...a),
	...createBookSlice(...a),
	...createConnectionSlice(...a),
}));
