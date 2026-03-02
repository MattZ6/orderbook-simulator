const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(locale: string, options: Intl.NumberFormatOptions) {
	const key = locale + JSON.stringify(options);

	if (!formatterCache.has(key)) {
		formatterCache.set(key, new Intl.NumberFormat(locale, options));
	}

	// biome-ignore lint/style/noNonNullAssertion: It will always have a formatter
	return formatterCache.get(key)!;
}

type BaseConfig = {
	locale: string;
	currency: string;
};

const defaultConfig: BaseConfig = {
	locale: "en-US",
	currency: "USD",
};

type CurrencyOptions = {
	locale?: string;
	currency?: string;
	fractionDigits?: number;
	compact?: boolean;
};

type PercentOptions = {
	fractionDigits?: number;
	locale?: string;
};

type SizeOptions = {
	fractionDigits?: number;
};

export const NumberFormat = {
	currency(value: number, options?: CurrencyOptions) {
		const locale = options?.locale ?? defaultConfig.locale;
		const currency = options?.currency ?? defaultConfig.currency;

		if (options?.compact) {
			return NumberFormat.compactCurrency(value, options);
		}

		const fractionDigits = options?.fractionDigits ?? 2;

		const formatter = getFormatter(locale, {
			style: "currency",
			currency,
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
		});

		return formatter.format(value);
	},

	percent(value: number, options?: PercentOptions) {
		const locale = options?.locale ?? defaultConfig.locale;
		const fractionDigits = options?.fractionDigits ?? 2;

		const formatter = getFormatter(locale, {
			style: "percent",
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
			signDisplay: "exceptZero",
		});

		return formatter.format(value / 100);
	},

	compactCurrency(
		value: number,
		options?: {
			locale?: string;
			currency?: string;
		},
	) {
		const locale = options?.locale ?? defaultConfig.locale;
		const currency = options?.currency ?? defaultConfig.currency;

		let suffix = "";
		let normalized = value;
		let fractionDigits = 0;

		if (value >= 1_000_000_000) {
			normalized = value / 1_000_000_000;
			suffix = "B";
			fractionDigits = 1;
		} else if (value >= 1_000_000) {
			normalized = value / 1_000_000;
			suffix = "M";
			fractionDigits = 1;
		}

		const formatter = getFormatter(locale, {
			style: "currency",
			currency,
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
		});

		return formatter.format(normalized) + suffix;
	},

	size(value: number, options?: SizeOptions) {
		const digits = options?.fractionDigits ?? 2;

		if (value >= 1000) {
			return `${(value / 1000).toFixed(digits)}K`;
		}

		return value.toFixed(digits);
	},
};
