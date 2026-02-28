import { memo } from "react";

import { Text } from "@/components/ui/text";

import { styles } from "./styles";

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
	price: number;
};

export const OrderPrice = memo(({ price, type }: Props) => (
	<Text
		variant="bodySmall"
		style={[styles.text, type === "ask" ? styles.ask : styles.bid]}
	>
		{formatPrice(price)}
	</Text>
));

OrderPrice.displayName = "OrderPrice";
