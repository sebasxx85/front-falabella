import "../components/user-card.ts";

const getRoot = (el) => el.shadowRoot ?? el;

describe("<user-card>", () => {
  test("muestra loader cuando state='loading'", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");

    // Act
    el.state = "loading";

    // Assert
    const root = getRoot(el);
    const busy = root.querySelector('[aria-busy="true"]');
    const spinner = root.querySelector(".spinner");
    expect(busy).toBeTruthy();
    expect(spinner).toBeTruthy();
    expect(root.textContent).toMatch(/Buscando usuario/i);
  });

  test("renderiza datos cuando se asigna profile (state='ready')", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");

    // Act: opcional, setear loading antes para simular flujo real
    el.state = "loading";
    el.profile = {
      avatar_url: "https://example.com/a.png",
      name: "The Octocat",
      bio: "Hello from GitHub",
      public_repos: 42,
      html_url: "https://github.com/octocat",
    };

    // Assert
    const root = getRoot(el);
    const title = root.querySelector("h2");
    const img = root.querySelector('img[alt="Avatar"]');
    const link = root.querySelector('a[href="https://github.com/octocat"]');
    const reposText = root.textContent || "";

    expect(title?.textContent).toBe("The Octocat");
    expect(img?.getAttribute("src")).toBe("https://example.com/a.png");
    expect(link).toBeTruthy();
    expect(reposText).toMatch(/Repos públicos:\s*42/);
  });

  test("muestra mensaje de error cuando errorMessage es seteado", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");

    // Act
    el.errorMessage = "Usuario no encontrado";

    // Assert
    const root = getRoot(el);
    const alert = root.querySelector('[role="alert"]');
    expect(alert).toBeTruthy();
    expect(alert?.textContent).toMatch(/Error:\s*Usuario no encontrado/i);
  });
});
