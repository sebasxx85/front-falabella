import "@testing-library/jest-dom";
import "whatwg-fetch";

const _define = customElements.define.bind(customElements);
customElements.define = (name, ctor) => {
  if (!customElements.get(name)) _define(name, ctor);
};
