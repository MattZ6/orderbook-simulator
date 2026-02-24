import { useEffect, useState } from "react";

export function useDelayedLoading(value: boolean, delay = 500) {
	const [visible, setVisible] = useState(value);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		if (!value) {
			timeout = setTimeout(() => {
				setVisible(false);
			}, delay);
		} else {
			setVisible(true);
		}

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return visible;
}
