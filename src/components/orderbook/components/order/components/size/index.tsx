import { memo } from "react";

import { Text } from "@/components/ui/text";

import { styles } from "./styles";

type Props = {
	value: string;
};

export const OrderSize = memo(({ value }: Props) => (
	<Text variant="bodySmall" style={styles.text}>
		{value}
	</Text>
));

OrderSize.displayName = "OrderSize";
