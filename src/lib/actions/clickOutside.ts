// adapted from @nikolai-cc/svu clickoutside action

import type { ActionReturn } from 'svelte/action';

interface Attributes {
	'on:clickoutside'?: (event: CustomEvent<Event>) => void;
}

/**
 * Dispatches a `clickoutside` event on 'node' with the original event as `detail`.
 *
 * Example:
 * ```svelte
 * <element use:clickoutside on:!clickoutside={handler} />
 * ```
 */
export function clickoutside(
	node: HTMLElement
): ActionReturn<undefined, Attributes> {

	function handleClick(event: Event) {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('clickoutside', { detail: event }));
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		update: () => {},
		destroy: () => document.removeEventListener('click', handleClick, true)
	};
}