import type { ConfigContext, ExpoConfig } from "expo/config";

import { name, version } from "./package.json";

const buildNumber = 3;

export default ({ config }: ConfigContext): ExpoConfig => {
	const variant = process.env.APP_VARIANT ?? "production";
	const isPreview = variant === "preview";

	return {
		...config,

		name: isPreview ? "Live Trade Feed (Preview)" : "Live Trade Feed",

		slug: name,
		version,
		scheme: name,

		orientation: "portrait",

		userInterfaceStyle: "automatic",
		backgroundColor: "#0a0a0a",

		icon: "./assets/images/icon.png",

		splash: {
			image: "./assets/images/splash-icon.png",
			resizeMode: "contain",
			backgroundColor: "#0a0a0a",
		},

		ios: {
			supportsTablet: true,
			buildNumber: String(buildNumber),

			bundleIdentifier: isPreview
				? "dev.zanin.livetradefeed.preview"
				: "dev.zanin.livetradefeed",
		},

		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#0a0a0a",
			},
			predictiveBackGestureEnabled: false,
			versionCode: buildNumber,
			package: isPreview
				? "dev.zanin.livetradefeed.preview"
				: "dev.zanin.livetradefeed",
		},

		plugins: ["expo-router"],

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
