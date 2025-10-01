import '../components/search-input';

describe('<search-input>', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('search-input');
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  test('emite evento "search" al enviar con username válido', () => {
    const input = el.shadowRoot.querySelector('input');
    input.value = 'octocat';
    const form = el.shadowRoot.querySelector('form');

    const handler = jest.fn();
    el.addEventListener('search', handler);

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ username: 'octocat' });
  });

  test('no emite evento si input está vacío', () => {
    const input = el.shadowRoot.querySelector('input');
    input.value = '   '; // solo espacios
    const form = el.shadowRoot.querySelector('form');

    const handler = jest.fn();
    el.addEventListener('search', handler);

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  test('deshabilita el botón cuando loading=true', () => {
    const button = el.shadowRoot.querySelector('button');
    expect(button.disabled).toBe(false);

    el.loading = true;
    expect(button.disabled).toBe(true);

    el.loading = false;
    expect(button.disabled).toBe(false);
  });
});
