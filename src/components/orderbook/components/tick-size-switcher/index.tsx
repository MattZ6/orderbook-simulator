import FeatherIcon from "@expo/vector-icons/Feather";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { Text } from "@/components/ui/text";

import { DEFAULT_HIT_SLOP } from "@/config/ui";

import { Haptics } from "@/services/device/haptics";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

export function TickSizeSwitcher() {
	const tickSize = useNewMarketStore((s) => s.tickSize);
	const availableTickSizes = useNewMarketStore((s) => s.availableTickSizes);
	const setTickSize = useNewMarketStore((s) => s.setTickSize);

	const handleChangeTickSize = useCallback(() => {
		const index = availableTickSizes.indexOf(tickSize);
		const newTickSizeIndex =
			index + 1 > availableTickSizes.length - 1 ? 0 : index + 1;
		const newTickSize = availableTickSizes[newTickSizeIndex];

		setTickSize(newTickSize);
		Haptics.selection();
	}, [tickSize, availableTickSizes, setTickSize]);

	return (
		<Pressable
			style={styles.button}
			onPress={handleChangeTickSize}
			hitSlop={DEFAULT_HIT_SLOP}
		>
			<Text variant="bodySmall" style={styles.text}>
				{tickSize}
			</Text>
			<FeatherIcon name="chevron-down" size={14} style={styles.icon} />
		</Pressable>
	);
}
