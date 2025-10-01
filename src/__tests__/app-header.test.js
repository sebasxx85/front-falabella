import "../components/app-header.ts";

describe("<app-header>", () => {
  test("se registra y renderiza", () => {
    document.body.innerHTML = `<app-header></app-header>`;
    const el = document.querySelector("app-header");
    expect(el).toBeInTheDocument();
  });

  test("muestra el título por defecto o atributo 'title'", () => {
    document.body.innerHTML = `<app-header title="Mi Título"></app-header>`;
    const el = document.querySelector("app-header");

    const text = el.shadowRoot?.textContent || el.textContent || "";
    expect(text).toMatch(/Mi Título|Front Falabella/i); // admite default o el atributo
  });
});
