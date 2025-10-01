import { fireEvent } from "@testing-library/dom";
import "../components/search-input.ts";

test("<search-input> emite 'search' con { username }", () => {
  document.body.innerHTML = `<search-input></search-input>`;
  const el = document.querySelector("search-input");

  const root = el.shadowRoot ?? el;
  const input = root.querySelector("input");
  const form  = root.querySelector("form") || root.querySelector("button") || root;

  const spy = jest.fn();
  el.addEventListener("search", spy);

  input.value = "octocat";
  // si tienes form:
  if (form.tagName?.toLowerCase() === "form") {
    fireEvent.submit(form);
  } else {
    // si usas botón:
    fireEvent.click(form);
  }

  expect(spy).toHaveBeenCalledTimes(1);
  const ev = spy.mock.calls[0][0];
  expect(ev.detail).toEqual({ username: "octocat" });
});
