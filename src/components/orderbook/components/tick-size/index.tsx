import FeatherIcon from "@expo/vector-icons/Feather";
import { useCallback } from "react";
import { Pressable, Text } from "react-native";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

export function TickSize() {
	const tickSize = useNewMarketStore((s) => s.tickSize);
	const availableTickSizes = useNewMarketStore((s) => s.availableTickSizes);
	const setTickSize = useNewMarketStore((s) => s.setTickSize);

	const handleChangeTickSize = useCallback(() => {
		const index = availableTickSizes.indexOf(tickSize);
		const newTickSizeIndex =
			index + 1 > availableTickSizes.length - 1 ? 0 : index + 1;
		const newTickSize = availableTickSizes[newTickSizeIndex];

		setTickSize(newTickSize);
	}, [tickSize, availableTickSizes, setTickSize]);

	return (
		<Pressable
			style={styles.button}
			onPress={handleChangeTickSize}
			hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
		>
			<Text style={styles.text}>{tickSize}</Text>
			<FeatherIcon name="chevron-down" size={14} style={styles.icon} />
		</Pressable>
	);
}
