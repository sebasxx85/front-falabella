import "../components/user-card.ts";

const R = (el) => el.shadowRoot ?? el;

describe("<user-card>", () => {
  test("estado inicial idle sin contenido", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");
    const root = R(el);
    expect(root.querySelector(".spinner")).toBeFalsy();
    expect(root.querySelector("article.card")).toBeFalsy();
    expect(root.querySelector('[role="alert"]')).toBeFalsy();
  });

  test("loading muestra spinner", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");
    el.state = "loading";
    const root = R(el);
    expect(root.querySelector(".spinner")).toBeTruthy();
  });

  test("errorMessage muestra alerta", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");
    el.errorMessage = "Usuario no encontrado";
    const root = R(el);
    const alert = root.querySelector('[role="alert"]');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toMatch(/Usuario no encontrado/i);
  });

  test("profile renderiza datos", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");
    el.profile = {
      avatar_url: "https://example.com/a.png",
      name: "The Octocat",
      bio: "Hello",
      public_repos: 42,
      html_url: "https://github.com/octocat"
    };
    const root = R(el);
    expect(root.querySelector("h2")?.textContent).toBe("The Octocat");
    expect(root.querySelector('img[alt="Avatar"]')?.getAttribute("src")).toBe("https://example.com/a.png");
    expect(root.textContent).toMatch(/Repos públicos:\s*42/);
    expect(root.querySelector('a[href="https://github.com/octocat"]')).toBeTruthy();
  });

  test("fallbacks cuando name y bio son null", () => {
    document.body.innerHTML = `<user-card></user-card>`;
    const el = document.querySelector("user-card");
    el.profile = {
      avatar_url: "x.png",
      name: null,
      bio: null,
      public_repos: 0,
      html_url: "#"
    };
    const root = R(el);
    expect(root.querySelector("h2")?.textContent).toBe("(sin nombre)");
    expect((root.textContent || "")).not.toMatch(/\bnull\b/i);
  });
});
