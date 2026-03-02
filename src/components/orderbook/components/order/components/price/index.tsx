import { memo } from "react";

import { Text } from "@/components/ui/text";

import { NumberFormat } from "@/lib/number-format";

import { styles } from "./styles";

type Props = {
	type: "ask" | "bid";
	price: number;
};

export const OrderPrice = memo(({ price, type }: Props) => (
	// TODO: improve format by tick size (show fractional digits)

	<Text
		variant="bodySmall"
		style={[styles.text, type === "ask" ? styles.ask : styles.bid]}
	>
		{NumberFormat.currency(price, { fractionDigits: 1 })}
	</Text>
));

OrderPrice.displayName = "OrderPrice";
