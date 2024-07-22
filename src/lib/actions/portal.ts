// adapted from @nikolai-cc/svu portal action

/**
 * Mounts a component elsewhere in the DOM.
 * Pass in the target parent by reference or selector.
 *
 * Example:
 * ```svelte
 * <element use:portal={'#target'} /> (target is querySelector)
 * <element use:portal={target} /> (target is HTMLelement)
 * ```
 */
export function portal(node: HTMLElement, target: HTMLElement | string) {
  let targetElement = typeof target === 'string' ? document.querySelector(target) : target;
  if (targetElement) targetElement.appendChild(node);

  return {
    update: (target: HTMLElement | string) => {
      targetElement = typeof target === 'string' ? document.querySelector(target) : target;
      if (targetElement) targetElement.appendChild(node);
    },
    destroy: () => node.parentElement?.removeChild(node)
  };
}
