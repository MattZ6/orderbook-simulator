// import { useEffect } from "react";

// import { fakeSocket, type Message } from "@/services/fake-socket";

// import { useNewMarketStore } from "@/store/market/market.store";

// const TICK_SIZES_MAP: Record<string, number[]> = {
// 	BTC: [1, 10, 100, 1000],
// 	ETH: [0.1, 1, 10, 100],
// };

// export function useMarketController() {
// 	const symbol = useNewMarketStore((s) => s.currentSymbol);
// 	const tickSize = useNewMarketStore((s) => s.tickSize);

// 	useEffect(() => {
// 		const store = useNewMarketStore.getState();

// 		const sizes = TICK_SIZES_MAP[symbol];

// 		if (!sizes) {
// 			return;
// 		}

// 		store.setAvailableTickSizes(sizes);
// 		store.setTickSize(sizes[0]);
// 		store.resetBook();
// 	}, [symbol]);

// 	useEffect(() => {
// 		fakeSocket.connect();

// 		useNewMarketStore.getState().connect();

// 		return () => {
// 			fakeSocket.disconnect();

// 			useNewMarketStore.getState().disconnect();
// 		};
// 	}, []);

// 	useEffect(() => {
// 		const handleMessage = (message: Message) => {
// 			const currentSymbol = useNewMarketStore.getState().currentSymbol;

// 			if (message.symbol !== currentSymbol) {
// 				return;
// 			}

// 			switch (message.channel) {
// 				case "ticker":
// 					useNewMarketStore.getState().setTicker(message.data);
// 					break;

// 				case "book":
// 					useNewMarketStore.getState().setBookData({
// 						asks: message.data.asks,
// 						bids: message.data.bids,
// 					});
// 					break;
// 			}
// 		};

// 		fakeSocket.subscribeListener(handleMessage);
// 	}, []);

// 	useEffect(() => {
// 		fakeSocket.subscribeToChannel("ticker", symbol);
// 		fakeSocket.subscribeToChannel("book", symbol, { tickSize });
// 		// fakeSocket.subscribeToChannel("trades", symbol);

// 		return () => {
// 			fakeSocket.unsubscribe(symbol);

// 			useNewMarketStore.getState().resetTicker();
// 			useNewMarketStore.getState().resetBook();
// 		};
// 	}, [symbol, tickSize]);

// 	useEffect(() => {
// 		const tickSize = useNewMarketStore.getState().tickSize;

// 		// só re-subscribe
// 		fakeSocket.subscribeToChannel("book", symbol, { tickSize });
// 	}, [symbol]);

// 	useEffect(() => {
// 		useNewMarketStore.getState().resetBook(); // ← apenas quando muda symbol
// 	}, [symbol]);
// }

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

	/*
  ─────────────────────────────────────────────
  1️⃣ Conexão (uma vez só)
  ─────────────────────────────────────────────
  */
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

	/*
  ─────────────────────────────────────────────
  2️⃣ Quando muda SYMBOL
     - Atualiza tick sizes disponíveis
     - Define novo tick inicial
     - Reseta book (loading verdadeiro)
     - Re-subscreve tudo
  ─────────────────────────────────────────────
  */
	useEffect(() => {
		const store = useNewMarketStore.getState();

		const sizes = TICK_SIZES_MAP[symbol];
		if (!sizes) return;

		store.setAvailableTickSizes(sizes);
		store.setTickSize(sizes[0]);

		// Importante: só resetar aqui
		store.resetBook();
		store.resetTicker();

		fakeSocket.unsubscribe(symbol);

		fakeSocket.subscribeToChannel("ticker", symbol);
		fakeSocket.subscribeToChannel("book", symbol, {
			tickSize: sizes[0],
		});
	}, [symbol]);

	/*
  ─────────────────────────────────────────────
  3️⃣ Quando muda TICK SIZE
     - NÃO resetar
     - Apenas re-subscribe do book
  ─────────────────────────────────────────────
  */

	// biome-ignore lint/correctness/useExhaustiveDependencies: Só recarregar quando precisa
	useEffect(() => {
		fakeSocket.unsubscribe(symbol);

		fakeSocket.subscribeToChannel("ticker", symbol);
		fakeSocket.subscribeToChannel("book", symbol, {
			tickSize,
		});
	}, [tickSize]);
}
