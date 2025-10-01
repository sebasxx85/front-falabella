import "@testing-library/jest-dom";
import "whatwg-fetch"; // polyfill fetch para githubApi

// Si se requiere, silenciar errores por customElements redefinidos:
const origDefine = customElements.define.bind(customElements);
customElements.define = (name, ctor) => {
  if (!customElements.get(name)) origDefine(name, ctor);
};
