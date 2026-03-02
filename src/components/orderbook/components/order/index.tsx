import { memo } from "react";
import { View } from "react-native";

import { NumberFormat } from "@/lib/number-format";

import type { OrderWithTotal } from "@/store/market/types";

import { OrderBar } from "./components/bar";
import { OrderPrice } from "./components/price";
import { OrderSize } from "./components/size";
import { OrderTotal } from "./components/total";

import { styles } from "./styles";

type Props = {
	type: "ask" | "bid";
	viewType: "symbol" | "dollar";
	order: OrderWithTotal;
	maxTotal: number;
};

export const Order = memo((props: Props) => {
	const { type, viewType, order, maxTotal } = props;
	const { price, size, sizeInUSD, total, totalInUSD } = order;

	const formattedSize =
		viewType === "dollar"
			? NumberFormat.currency(sizeInUSD, { compact: true })
			: NumberFormat.size(size);

	const formattedTotal =
		viewType === "dollar"
			? NumberFormat.currency(totalInUSD, { compact: true })
			: NumberFormat.size(total);

	const barProgress = maxTotal > 0 ? total / maxTotal : 0;

	return (
		<View style={styles.container}>
			<OrderBar progress={barProgress} type={type} />

			<View style={styles.content}>
				<View style={styles.slot}>
					<OrderPrice price={price} type={type} />
				</View>

				<View style={styles.slot}>
					<OrderSize value={formattedSize} />
				</View>

				<View style={styles.slot}>
					<OrderTotal value={formattedTotal} />
				</View>
			</View>
		</View>
	);
});

Order.displayName = "Order";
