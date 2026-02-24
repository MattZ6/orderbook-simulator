import type { StateCreator } from "zustand";

export type ConnectionSlice = {
	connectionStatus: "connected" | "disconnected";
	connect: () => void;
	disconnect: () => void;
};

export const createConnectionSlice: StateCreator<
	ConnectionSlice,
	[],
	[],
	ConnectionSlice
> = (set) => ({
	connectionStatus: "disconnected",

	connect: () => {
		set({ connectionStatus: "connected" });
	},

	disconnect: () => {
		set({ connectionStatus: "disconnected" });
	},
});
