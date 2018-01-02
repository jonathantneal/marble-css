# Marble CSS

This component serves two versions of [Marble] styles. Both versions provide
the same functionality.

## Marble CSS as a Module

This version provides Marble styles as **custom properties** and
**custom property sets**. This means your project includes only the portions of
Marble that it actually uses. This is the best solution for developers who
wish to dictate design through CSS. This requires your project compile CSS.

```css
@import "marble-css";

.my-element {
  @extend %button;
}
```

## Marble CSS as an Atomic Library

This version provides Marble styles as **Atomic classes**. This means all
Marble styles are available as classnames to be added to your markup. This is
the best solution for developers who wish to dictate design through HTML. This
requires your project always include all Marble styles.

```html
<link href="marble-css.css" rel="stylesheet">

<span class="my-element button"></span>
```

---

## Flow Relative Styles

Marble CSS changes the selector weight of flow-relative declarations and
requires a `[dir]` attribute somewhere in your HTML. If you don’t have any
`[dir]` attributes, consider using the following JavaScript:

```js
document.documentElement.dir = document.documentElement.dir || 'ltr';
```

[Marble]: https://github.com/jonathantneal/marble-css
