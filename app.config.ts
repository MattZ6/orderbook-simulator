import type { ConfigContext, ExpoConfig } from "expo/config";

import { name, version } from "./package.json";

const appName = "Orderbook Simulator";
const packageName = "dev.zanin.orderbook";

export default ({ config }: ConfigContext): ExpoConfig => {
	const variant = process.env.APP_VARIANT ?? "production";
	const isPreview = variant === "preview";

	return {
		...config,

		name: isPreview ? `${appName} (Preview)` : appName,

		slug: name,
		version,
		scheme: name,

		orientation: "portrait",

		userInterfaceStyle: "dark",
		backgroundColor: "#0a0a0a",

		icon: "./assets/images/icon.png",

		ios: {
			supportsTablet: false,
			bundleIdentifier: isPreview
				? `${packageName}.preview`
				: packageName
		},

		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#0a0a0a",
			},
			package: isPreview
				? `${packageName}.preview`
				: packageName
		},

		plugins: [
			"expo-router",
			"expo-font",
			"expo-status-bar",
			["expo-splash-screen", {
				image: "./assets/images/splash-icon.png",
				resizeMode: "contain",
				backgroundColor: "#0a0a0a",
			}],
		],

		experiments: {
			typedRoutes: true,
		},

		extra: {
			router: {},
			eas: {
				projectId: "ef1fbbab-753c-41ce-b9a4-9fa06fde0704",
			},
			variant,
		},
	};
};
