import { fireEvent } from "@testing-library/dom";
import "../components/search-input.ts";

describe("<search-input>", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("search-input");
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  test('emite evento "search" al enviar con username válido', () => {
    const input = el.shadowRoot.querySelector("input");
    input.value = "octocat";
    const form = el.shadowRoot.querySelector("form");
    const handler = jest.fn();
    el.addEventListener("search", handler);
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ username: "octocat" });
  });

  test("no emite evento si input está vacío", () => {
    const input = el.shadowRoot.querySelector("input");
    input.value = "   ";
    const form = el.shadowRoot.querySelector("form");
    const handler = jest.fn();
    el.addEventListener("search", handler);
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    expect(handler).not.toHaveBeenCalled();
  });

  test("submit hace preventDefault", () => {
    const form = el.shadowRoot.querySelector("form");
    const input = el.shadowRoot.querySelector("input");
    input.value = "octocat";
    const ev = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
  });

  test("deshabilita el botón cuando loading=true y lo habilita con loading=false", () => {
    const button = el.shadowRoot.querySelector("button");
    el.loading = true;
    expect(button.disabled).toBe(true);
    el.loading = false;
    expect(button.disabled).toBe(false);
  });

  test("setter loading antes de connectedCallback no modifica nada", () => {
    const fresh = document.createElement("search-input");
    expect(() => {
      fresh.loading = true;
      fresh.loading = false;
    }).not.toThrow();
    expect(fresh.shadowRoot).toBeTruthy();
  });
});
