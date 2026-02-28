import { useEffect } from "react";

import { fakeSocket, type Message } from "@/services/fake-socket";

import { useNewMarketStore } from "@/store/market/market.store";

const TICK_SIZES_MAP: Record<string, number[]> = {
	BTC: [1, 10, 100, 1000],
	ETH: [0.1, 1, 10, 100],
};

export function useMarketController() {
	const symbol = useNewMarketStore((s) => s.currentSymbol);
	const tickSize = useNewMarketStore((s) => s.tickSize);

	useEffect(() => {
		fakeSocket.connect();

		const handleMessage = (message: Message) => {
			const store = useNewMarketStore.getState();

			if (message.symbol !== store.currentSymbol) {
				return;
			}

			switch (message.channel) {
				case "ticker":
					store.setTicker(message.data);
					break;

				case "book":
					store.setBookData({
						asks: message.data.asks,
						bids: message.data.bids,
					});
					break;
			}
		};

		fakeSocket.subscribeListener(handleMessage);

		return () => {
			fakeSocket.disconnect();
		};
	}, []);

	useEffect(() => {
		const store = useNewMarketStore.getState();

		const sizes = TICK_SIZES_MAP[symbol];

		if (!sizes) {
			return;
		}

		store.setAvailableTickSizes(sizes);
		store.setTickSize(sizes[0]);

		store.resetBook();
		store.resetTicker();

		fakeSocket.unsubscribe(symbol);

		fakeSocket.subscribeToChannel("ticker", symbol);
		fakeSocket.subscribeToChannel("book", symbol, {
			tickSize: sizes[0],
		});
	}, [symbol]);

	useEffect(() => {
		const currentSymbol = useNewMarketStore.getState().currentSymbol;

		fakeSocket.unsubscribe(currentSymbol);

		fakeSocket.subscribeToChannel("ticker", currentSymbol);
		fakeSocket.subscribeToChannel("book", currentSymbol, {
			tickSize,
		});
	}, [tickSize]);
}
