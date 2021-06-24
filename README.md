# Accessible Tabs

[![Build Status](https://travis-ci.com/grrr-amsterdam/accessible-tabs.svg?branch=master)](https://travis-ci.com/grrr-amsterdam/accessible-tabs)

### JavaScript utility library

- No dependencies
- Lightweight (1.1kB minified and gzipped)
- Spec-compliant semantics, based on [Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/) by [ Heydon Pickering](https://twitter.com/heydonworks)

Built with ❤️ by [GRRR](https://grrr.tech).

## Installation

```sh
$ npm install @grrr/accessible-tabs
```

Note: depending on your setup [additional configuration might be needed](https://github.com/grrr-amsterdam/accessible-tabs/wiki/Usage-with-build-tools). This package is published with untranspiled JavaScript, as EcmaScript Modules (ESM).

## Usage

Import the module, construct and initialize it. The tabs constructor accepts an options object as secondary argument. See the [Markup](#Markup) section below for the specific DOM it expects.

```js
import Tabs from '@grrr/accessible-tabs';

const tabs = Tabs(document.querySelector('.js-tablist'), { /* options */ });
tabs.init();
```

### Options

Options will fall back to their defaults, which are listed here:

```js
{
    selectedTab: 0, // Zero-based index for the initially selected tab.
}
```

### Markup

The module enhances a basic list of anchors referencing sections:

```html
<ul class="js-tablist">
    <li>
        <a href="#section1">Section 1</a>
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
```

When fully enhanced, this will be the final markup:

```html
<ul class="js-tablist" role="tablist">
    <li role="presentation">
        <a href="#section1" role="tab" id="section1-tab" aria-selected="true">Section 1</a>
    </li>
    <li role="presentation">
        <a href="#section2" role="tab" id="section2-tab" tabindex="-1">Section 2</a>
    </li>
</ul>
<section id="section1" role="tabpanel" tabindex="-1" aria-labelledby="section1-tab">
    <h2>Section 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</section>
<section id="section2" role="tabpanel" tabindex="-1" aria-labelledby="section2-tab" hidden>
    <h2>Section 2</h2>
    <p>Nullam at diam nec arcu suscipit auctor non a erat.</p>
</section>
```

#### Pre-enhancing & layout shifts

It's possible to _pre-enhance_ the markup. Mainly to make semantic styling easier (e.g. `.tab-class [role="tab"]`), and to prevent layout shifts during page load (because of tabpanels being hidden and new styling being applied). However, this should be used with caution since it interferes with the semantics of the non-enhanced version.

To prevent layout shifts, one could use a styling strategy like this:

```css
.js section:not([role="tabpanel"]):not(:first-of-type) {
    display: none;
}
```

Note: the `.js` class could come from a library like [Modernizr](https://github.com/Modernizr/Modernizr), and helps deciding which styling should be applied based on the availability of JavaScript.
