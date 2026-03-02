import FeatherIcon from "@expo/vector-icons/Feather";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { Text } from "@/components/ui/text";

import { DEFAULT_HIT_SLOP } from "@/config/ui";

import { Haptics } from "@/services/device/haptics";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

export function ViewTypeSwitcher() {
	const ticker = useNewMarketStore((s) => s.currentSymbol);
	const viewType = useNewMarketStore((s) => s.viewType);
	const toggleViewType = useNewMarketStore((s) => s.toggleViewType);

	const label = viewType === "symbol" ? ticker : "USD";

	const handleToggleViewType = useCallback(() => {
		Haptics.selection();
		toggleViewType();
	}, [toggleViewType]);

	return (
		<Pressable
			style={styles.button}
			onPress={handleToggleViewType}
			hitSlop={DEFAULT_HIT_SLOP}
		>
			<Text variant="bodySmall" style={styles.text}>
				{label}
			</Text>
			<FeatherIcon name="refresh-cw" size={12} style={styles.icon} />
		</Pressable>
	);
}
