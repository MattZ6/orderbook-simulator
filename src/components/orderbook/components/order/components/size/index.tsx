import { memo } from "react";
import { Text } from "react-native";

import { styles } from "./styles";

type Props = {
	value: string;
};

export const OrderSize = memo(({ value }: Props) => (
	<Text style={styles.text}>{value}</Text>
));

OrderSize.displayName = "OrderSize";
