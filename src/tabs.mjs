const Tabs = tablist => {

  /**
   * Array with tabs and corresponding panels for easy access.
   */
  const items = [];

  /**
   * Arrow key identifiers.
   */
  const isLeftKey = e => (e.key && e.key === 'ArrowLeft') || e.keyCode === 37;
  const isRightKey = e => (e.key && e.key === 'ArrowRight') || e.keyCode === 39;
  const isDownKey = e => (e.key && e.key === 'ArrowDown') || e.keyCode === 40;

  /**
   * Item helper functions.
   */
  const getCurrentItem = () => items.find(({ panel }) => !panel.hidden);
  const getItemByTab = target => items.find(({ tab }) => tab === target);

  /**
   * Switch to specified item.
   */
  const switchToItem = item => {
    items.forEach(({ tab, panel }) => {
      const match = tab === item.tab;
      tab.setAttribute('aria-selected', match);
      tab.setAttribute('tabindex', match ? '' : '-1');
      panel.hidden = !match;
      if (match) {
        tab.focus();
      }
    });
  };

  /**
   * Handle tab `keydown` events.
   */
  const tabKeyDownHandler = e => {
    const currentItem = getCurrentItem();
    const index = items.findIndex(item => item === currentItem);

    // Handle `left` and `right` key events.
    const horizontalOffset = isLeftKey(e)
      ? -1
      : isRightKey(e)
        ? +1
        : 0;

    // Navigate to the left or right if conditions are met.
    if (horizontalOffset !== 0) {
      e.preventDefault();
      const target = items[index + horizontalOffset];
      if (target) {
        switchToItem(target);
      }
    }

    // Handle `down` key event and focus on the current tab.
    if (isDownKey(e)) {
      e.preventDefault();
      getCurrentItem().panel.focus();
    }
  };

  /**
   * Handle tab `click` events.
   */
  const tabClickHandler = e => {
    e.preventDefault();
    switchToItem(getItemByTab(e.currentTarget));
  };

  /**
   * Attach event listeners to handle clicks and arrow key events.
   */
  const attachEventListeners = () => {
    items.forEach(({ tab, panel }) => {
      tab.addEventListener('click', tabClickHandler);
      tab.addEventListener('keydown', tabKeyDownHandler);
    });
  };

  /**
   * Enhance elements with sementics and initial state.
   */
  const addElementSemantics = () => {

    // Add `tablist` semantics to list element.
    tablist.setAttribute('role', 'tablist');

    // Loop over all items.
    items.forEach(({ tab, panel }, index) => {

      // Add `tab` semantics and initial state to anchors.
      tab.setAttribute('role', 'tab');
      tab.parentNode.setAttribute('role', 'presentation');
      tab.setAttribute('tabindex', index === 0 ? '' : '-1');
      tab.setAttribute('aria-selected', index === 0);
      if (!tab.getAttribute('id')) {
        tab.setAttribute('id', `${panel.id}-tab`);
      }

      // Add `tabpanel` semantics and initial state to sections.
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
      panel.hidden = index !== 0;

    });

  };

  /**
   * Create an array of tabs with corresponding panels for easy access.
   */
  const populateItems = () => {
    const tabs = [...tablist.querySelectorAll('a')];
    tabs.forEach((tab, index) => {
      items.push({
        tab,
        panel: document.querySelector(tab.getAttribute('href')),
      });
    });
  };

  return {
    // eslint-disable-next-line consistent-return
    init() {
      // Return early when no `ul` is passed as enhanceable element.
      if (!tablist || tablist.tagName.toLowerCase() !== 'ul') {
        return console.warn(`Unable to enhance tabs. No list element (<ul>) specified.`);
      }

      populateItems();
      addElementSemantics();
      attachEventListeners();
    },
  };

};

export default Tabs;
