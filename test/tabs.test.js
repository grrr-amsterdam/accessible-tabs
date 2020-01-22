import Tabs from '../src/tabs';

describe('Tabs', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>
          <a href="#section1" id="section1-custom-tab-id">Section 1</a>
        </li>
        <li>
          <a href="#section2">Section 2</a>
        </li>
      </ul>
      <section id="section1">
        <h2>Section 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
      <section id="section2">
        <h2>Section 2</h2>
        <p>Nullam at diam nec arcu suscipit auctor non a erat.</p>
      </section>
    `;
  });

  test('Should fail when invalid list element is passed.', () => {
    console.warn = jest.fn();

    const tabModule1 = Tabs();
    expect(tabModule1.init()).toBeUndefined();
    expect(console.warn).toHaveBeenCalled();

    const tabModule2 = Tabs(document.querySelector('li'));
    expect(tabModule2.init()).toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });

  test('Enhances with the right roles and attributes.', () => {
    const tabModule = Tabs(document.querySelector('ul'));
    tabModule.init();

    expect(document.querySelector('ul').getAttribute('role')).toEqual('tablist');
    expect(document.querySelector('li').getAttribute('role')).toEqual('presentation');
    expect(document.querySelector('a').getAttribute('role')).toEqual('tab');
    expect(document.querySelector('section').getAttribute('role')).toEqual('tabpanel');
    expect(document.querySelector('section').getAttribute('tabindex')).toEqual('-1');
    expect(document.querySelector('section').getAttribute('aria-labelledby')).toBeTruthy();
  });

  test('Enhances with the right states.', () => {
    const tabModule = Tabs(document.querySelector('ul'));
    tabModule.init();

    const tabs = [...document.querySelectorAll('[role="tab"]')];
    expect(tabs[0].getAttribute('aria-selected')).toEqual('true');
    expect(tabs[0].getAttribute('tabindex')).not.toEqual('-1');
    expect(tabs[1].getAttribute('aria-selected')).not.toEqual('true');
    expect(tabs[1].getAttribute('tabindex')).toEqual('-1');

    const sections = [...document.querySelectorAll('section')];
    expect(sections[0].hidden).toEqual(false);
    expect(sections[1].hidden).toEqual(true);
  });

  test('Should leave existing tab IDs intact.', () => {
    const tabModule = Tabs(document.querySelector('ul'));
    tabModule.init();

    const tabs = [...document.querySelectorAll('[role="tab"]')];
    expect(tabs[0].id).toEqual('section1-custom-tab-id');
    expect(tabs[1].id).toEqual('section2-tab');
  });

});
