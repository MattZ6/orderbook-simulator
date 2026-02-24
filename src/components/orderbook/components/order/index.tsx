import { memo } from "react";
import { View } from "react-native";

import type { OrderWithTotal } from "@/store/market/types";

import { OrderBar } from "./components/bar";
import { OrderPrice } from "./components/price";
import { OrderSize } from "./components/size";
import { OrderTotal } from "./components/total";

import { styles } from "./styles";

function formatSize(value: number) {
	let suffix = "";
	let normalizedValue = Number(value);

	if (value > 1000) {
		suffix = "K";
		normalizedValue = normalizedValue / 1000;
	}

	return `${normalizedValue.toFixed(2)}${suffix}`;
}

function formatPrice(value: number) {
	let suffix = "";
	let maximumFractionDigits = 0;

	if (value >= 1_000_000_000) {
		value = value / 1_000_000_000;
		maximumFractionDigits = 1;
		suffix = "B";
	}

	if (value >= 1_000_000) {
		value = value / 1_000_000;
		maximumFractionDigits = 1;
		suffix = "M";
	}

	return (
		Intl.NumberFormat("en-us", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits,
		}).format(value) + suffix
	);
}

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
		viewType === "dollar" ? formatPrice(sizeInUSD) : formatSize(size);

	const formattedTotal =
		viewType === "dollar" ? formatPrice(totalInUSD) : formatSize(total);

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
