test("Jest corre y jsdom está OK", () => {
  document.body.innerHTML = `<div id="root">hola</div>`;
  const el = document.getElementById("root");
  expect(el).not.toBeNull();
  expect(el.textContent).toBe("hola");
});
