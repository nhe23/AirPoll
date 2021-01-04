declare namespace svelte.JSX {
  interface HTMLInputElement<T> {
    onnewvalue: (e: any) => Promise<void>
  }
  interface SvelteInputProps<T> {
    onnewvalue: (e: any) => Promise<void>
  }
}