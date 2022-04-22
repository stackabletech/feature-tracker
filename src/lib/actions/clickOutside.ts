export const clickOutside = (node: HTMLElement) => {
	const handleClick = (event: Event) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
