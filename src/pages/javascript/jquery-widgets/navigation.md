---
title: Navigation | Commerce Frontend Development
description: Learn how to initialize and configure the Adobe Commerce and Magento Open Source Navigation widget.
---

# Navigation widget

The navigation widget is an extension of the [menu widget](menu.md) with the following funcitonalities:

-  Expanding all layers of the menu tree past the second layer.
-  Limiting the maximum number of list items contained within the main
   navigation (overflow items are placed into a secondary navigation
   level).
-  Method for handling the responsive layout of the menu.

The navigation widget source is present in [lib/web/mage/menu.js] along with the menu widget source.

## Initialize

For information about how to initialize a widget in a JS component or `.phtml` template, see the [Initialize JavaScript] topic.

## Options

### `breakpoint`

Width of user's window in px for which the menu switches between mobile view and desktop view.

**Type**: Number

**Default value**: `768`

### `container`

Container's CSS selector to track the menu overflow on responsive navigation.

**Type**: String

**Default value**: `#menu`

### `maxItems`

The number of top level navigational items in main menu.

**Type**: Number

**Default value**: `null`

### `moreText`

Set the text for the overflow menu (i.e. more)

**Type**: String

**Default value**: `more`

### `responsiveAction`

The default responsive handler for the navigation widget.

**Type**: String

**Default value**: `wrap`

**Accepted values**: `wrap`, `onResize`, `onReload`

## Methods

### `setMaxItems()`

Moves the list items that are more than the total max item number set by the user option.

### `setupMoreMenu()`

Builds the more overflowing menu by cloning the main menu items.

[lib/web/mage/menu.js]: https://github.com/magento/magento2/blob/2.4/lib/web/mage/menu.js
[Initialize JavaScript]: ../init.md
