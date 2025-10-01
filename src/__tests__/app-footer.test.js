import "../components/app-footer.ts";

test("<app-footer> muestra el año actual", () => {
  document.body.innerHTML = `<app-footer></app-footer>`;
  const el = document.querySelector("app-footer");
  expect(el).toBeInTheDocument();

  const year = String(new Date().getFullYear());
  const text = el.shadowRoot?.textContent || el.textContent || "";
  expect(text).toContain(year);
});
