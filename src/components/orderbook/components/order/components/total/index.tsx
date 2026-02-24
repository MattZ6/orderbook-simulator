import { memo } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { styles } from "./styles";

type Props = {
	value: string;
};

export const OrderTotal = memo(({ value }: Props) => (
	<Animated.Text style={styles.text} entering={FadeIn.duration(300)}>
		{value}
	</Animated.Text>
));

OrderTotal.displayName = "OrderTotal";
