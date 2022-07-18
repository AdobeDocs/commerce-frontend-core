---
title: Sticky widget | Commerce Frontend Development
description: Learn how to initialize and configure the Adobe Commerce and Magento Open Source Sticky widget.
---

# Sticky widget

The sticky widget allows developers to fix a page element on the screen in a specific position while a user scrolls the page.

Widget source file is [lib/web/mage/sticky.js](https://github.com/magento/magento2/blob/2.4/lib/web/mage/sticky.js).

**Usages:**

-  [Bundle](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Bundle/view/frontend/templates/catalog/product/view/summary.phtml)
-  [Blank theme](https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/Magento_Theme/web/js/theme.js)

## Initialize

The sticky widget can be initialized as described in [JavaScript initialization](../init.md).

### Initialize with `data-mage-init` attribute

```html
<div class="block-bundle-summary"
     data-mage-init='{"sticky":{"container": ".product-add-form"}}'>
     [...]
 </div>
```

### Initialize in `.js` file with options

```js
$('.sticky-element').sticky({
    container: '.sticky-parent'
});
```

## Options

### `container`

Element selector, who's height will be used to restrict the maximum offsetTop
position of the sticky element. Default uses document `body`.

**Type**: String

**Default value**: `''`

### `spacingTop`

Spacing in pixels above the sticky element.

**Type**:

-  Number
-  Function, that will return a Number

**Default value**: `0`

### `stickAfter`

Allows the postponing of sticking, until element goes off the screen for the number of pixels.

**Type**:

-  Number
-  Function, that will return a number

**Default value**: `0`

### `stickyClass`

CSS class for active sticky state.

**Type**: String

**Default value**: `_sticky`

## Styles

<InlineAlert variant="info" slots="text" />

The Sticky widget will not work without basic CSS Styles.

The sticky page element has to have a position relative to the
beginning of the page.

```css
.sticky-element {
    position: relative;
}
```

## Code Example

```html
<script type="text/x-magento-init">
 {
   ".sidebar.sidebar-additional": {
       "sticky": {
         "container": ".columns"
         }
    }
 }
</script>
```

## Result

![Sticky Widget in action](../../_images/javascript/sticky-widget-result.gif)
