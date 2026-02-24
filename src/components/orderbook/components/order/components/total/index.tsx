import { memo } from "react";
import { Text } from "react-native";

import { styles } from "./styles";

type Props = {
	value: string;
};

export const OrderTotal = memo(({ value }: Props) => (
	<Text style={styles.text}>{value}</Text>
));

OrderTotal.displayName = "OrderTotal";
