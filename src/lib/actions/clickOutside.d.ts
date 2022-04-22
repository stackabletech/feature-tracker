declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
      onclickoutside?: (e: CustomEvent) => void;
    }
  }