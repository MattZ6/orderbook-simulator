import { FlatList } from "react-native";

import { Header } from "@/components/header";

import { Content } from "./components/content";

import { styles } from "./styles";

export function HomeScreen() {
	return (
		<FlatList
			data={[]} // lista vazia
			renderItem={null}
			ListHeaderComponent={
				<>
					<Header />
					<Content />
				</>
			}
			style={styles.container}
			contentContainerStyle={styles.scrollableContent}
			showsVerticalScrollIndicator={false}
		/>
	);
}
