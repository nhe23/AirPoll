export function debounceInput(node) {
  let val = "";
  let timer: NodeJS.Timeout;

  const debounce = (v: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      val = v;
      node.dispatchEvent(
        new CustomEvent("newvalue", {
          detail: val,
        })
      );
    }, 250);
  };

  function handleInput(event) {
    debounce(event.target.value);
  }

  node.addEventListener("input", handleInput);

  return {
    destroy() {
      node.removeEventListener("input", handleInput);
    },
  };
}
