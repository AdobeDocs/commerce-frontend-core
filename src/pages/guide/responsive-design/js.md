---
title: JS in Responsive Design | Commerce Frontend Development
description: Learn how responsive Adobe Commerce and Magento Open Source themes use JavaScript.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# JavaScript in responsive web design

This topic describes the JavaScript used in out-of-the-box Blank and Luma themes to relocate certain elements and change their behavior depending on the [breakpoint](index.md#terms-used).

## Scripts general overview

The Blank and Luma themes use the following scripts to responsively relocate page elements by breakpoint:

-  [`menu.js`]
-  [`matchMedia.js`], used by `menu.js`

The script files are located in the file system as follows:

```tree
├── lib/web/
    ├── matchMedia.js
    ├── mage/
       ├── menu.js
```

## menu.js

In a mobile view, on the 768px breakpoint, `menu.js` changes the navigation menu look and behavior the following way:

-  Category menu items are not displayed, but are accessible after clicking the menu icon.
-  The behavior of a category link depends on whether the category has sub-categories:
   -  If sub-categories exist, the category link behaves as collapsible block. Clicking a category link does not redirect to the category page immediately. Instead it opens a list of sub-categories, including the **All category products** option.
   -  If there are no sub-categories, the category link behaves as usual.

The following image illustrates the mobile-view navigation menu.

![responsive menu]

## Re-using scripts in your theme

You can use the `menu.js` and `matchMedia.js` to add responsive behavior in your custom theme.
If your theme inherits from Blank or Luma, you do not even need to additionally include the script files in your theme.

If your theme does not inherit from Blank or Luma, to be able to use the scripts, you must configure RequireJS for your theme.

[`matchMedia.js`]: https://github.com/paulirish/matchMedia.js/
[responsive menu]: ../../_images/frontend/js_rwd_menu.png
