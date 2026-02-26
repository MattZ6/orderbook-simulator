import { useMarketController } from "@/hooks/use-market-controller";

import { HomeScreen } from "@/screens/home";

export default function TradeSurface() {
	useMarketController();

	return <HomeScreen />;
}
