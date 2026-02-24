import { memo, useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { styles } from "./styles";

type Props = {
	type: "ask" | "bid";
	progress: number;
};

export const OrderBar = memo(({ progress, type }: Props) => {
	const barSize = useSharedValue(0);

	useEffect(() => {
		barSize.value = withTiming(progress, { duration: 200 });
	}, [progress, barSize]);

	const animatedStyle = useAnimatedStyle(() => ({
		width: `${barSize.value * 100}%`,
	}));

	return (
		<Animated.View
			style={[
				styles.bar,
				type === "ask" ? styles.barAsk : styles.barBid,
				animatedStyle,
			]}
		/>
	);
});

OrderBar.displayName = "OrderBar";
