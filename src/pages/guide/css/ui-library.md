---
title: UI Library | Commerce Frontend Development
description: Use mixins to accelerate Adobe Commerce and Magento Open Source theme development.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# UI library

The UI library is a flexible [Less]-based frontend library designed to assist theme developers.
It employs a set of mixins for base elements to ease frontend theme development and customization.

This topic describes how the library is organized and how to use it.

## Components

The UI library provides the ability to customize and reuse the following user interface elements and properties:

*  actions-toolbar
*  breadcrumbs
*  buttons
*  drop-downs
*  forms
*  icons
*  layout
*  loaders
*  messages
*  pagination
*  popups
*  ratings
*  sections - tabs and accordions
*  tables
*  [tooltips](#tooltips)
*  typography
*  list of theme variables

The following illustration shows a storefront product page containing some of the preceding elements:

![*A product page with user interface elements specified*][ui_lib1.png]

## Mixin location

You can find the UI library under [`lib/web/css`][].
Library source `.less` files are stored under the `source` directory, each file contains mixins for configuring a certain element, and in most cases the element coincides with the file name:

```tree
lib/web
    ├── css/
    │    ├── docs/ (Library documentation)
    │    ├── source/
    │    │    ├── lib/ (Library source files)
    |    |    |    ├── variables/ (Predefined variables for each mixin)
    │    │    │    ├── _actions-toolbar.less
    │    │    │    ├── _breadcrumbs.less
    │    │    │    ├── _buttons.less
    │    │    │    ├── _dropdowns.less
    │    │    │    ├── _forms.less
    |    |    |    ├── _grids.less
    │    │    │    ├── _icons.less
    │    │    │    ├── _layout.less
    │    │    │    ├── _lib.less
    │    │    │    ├── _loaders.less
    │    │    │    ├── _messages.less
    │    │    │    ├── _navigation.less
    │    │    │    ├── _pages.less
    │    │    │    ├── _popups.less
    │    │    │    ├── _rating.less
    │    │    │    ├── _resets.less
    │    │    │    ├── _responsive.less
    │    │    │    ├── _sections.less
    │    │    │    ├── _tables.less
    │    │    │    ├── _tooltips.less
    │    │    │    ├── _typography.less
    │    │    │    ├── _utilities.less
    │    │    │    └── _variables.less
    │    │    └── _email-variables.less
    │    │    └── _extend.less
    │    │    └── _theme.less
    │    │    └── _variables.less
    │    │    └── _widgets.less
    │    └── styles.less
    ├── fonts/
    │    └── Blank-Theme-Icons/ (Library custom icons font)
    ├── images/
    │    └── blank-theme-icons.png (Library icons sprite)
    └── jquery/ (Library javascript files)
```

## Predefined variables

If your theme [inherits] from any out-of-the-box theme, for example Blank, you can easily customize any element of a store page without changing any CSS code or templates.
Customization can be performed by simply changing in your theme the values of the predefined variables used in the UI library or parent theme mixins.

The complete list of these variables and their default values are stored in [`lib/web/css/source/lib/variables`][].
This directory contains a set of files, corresponding to the set of UI library elements, and each of the files lists element-specific variables.
For example, [`lib/web/css/source/lib/variables/_breadcrumbs.less`][] contains variables used in the `breadcrumbs()` mixin.

To change the default library variables values, specify the new values for the required variables in the `<theme_dir>/web/css/source/_theme.less` file.

<InlineAlert variant="info" slots="text"/>

Please mind, that your `<theme_dir>/web/css/source/_theme.less` file overrides `_theme.less` of the parent theme (if your theme has a parent).
So if you want to inherit the parent theme's variable values additionally to your changes, add the content of parent's `_theme.less` to your file as well.

The following figure shows the product page shown earlier in this topic, after a custom theme was applied.
The theme customized Blank by redefining variables only.

![*Changing design by redefining variables*][ui_lib2.png]

## Custom variables

When naming custom variables, please follow the [naming convention for the Less variables](https://developer.adobe.com/commerce/php/coding-standards/less/#naming).

## Using mixins

You can use a mixin with default variables values, or you can redefine them when calling a mixin.
The following paragraphs describe both ways to call a mixin.

To use a mixin with default values, call the mixin without specifying any parameters.
For example:

```css
.breadcrumbs {
    .lib-breadcrumbs();
}
```

To call a mixin with parameter values different from default, set these values when calling the mixin, like in the following example:

```css
.example-button {
    .lib-button(
        @_button-padding: @button-padding,
        @_button-color: #fff,
        @_button-color-hover: #ccc
    );
}
```

Variables starting with `@_` are private mixin variables used only in this mixin.
Variables starting with `@` (without the underscore) are global, and are listed in [`lib/web/css/source/lib/variables`].

## Tabs and accordions

Use the accordion style for mobile and tab style for desktop.

To set tabs and accordions using breakpoints, see the following example:

```css
//
//  Mobile + Desktop
//  _____________________________________________

& when (@media-common = true) {
    .product.data.items {
        .lib-data-accordion();
    }
}

//
//  Desktop
//  _____________________________________________

.media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__m) {
    .product.data.items {
        .lib-data-tabs();
    }
}
```

## Navigation

Use the Navigation style for mobile and tab style for desktop.

To set navigation using breakpoints, see the following example:

```css
//
//  Mobile
//  _____________________________________________

.media-width(@extremum, @break) when (@extremum = 'max') and (@break = @screen__m) {
    .lib-main-navigation();
}

//
//  Desktop
//  _____________________________________________

.media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__m) {
    .lib-main-navigation-desktop();
}
```

## Tooltips

To create a tooltip element, use the `.lib-tooltip()` mixin.

| Option | Default |
| --- | --- |
| `position` | `top` |
| `selector-toggle` | `.tooltip-toggle` |
| `selector-content` | `.tooltip-content` |

```html
<span class="my-tooltip">
    <a href="#" class="tooltip-toggle">Hover me</a>
    <span class="tooltip-content">Details here</span>
</span>
```

```css
.my-tooltip {
    .lib-tooltip(right);
}
```

### Result

As result, the tooltip placed on the right side.

![Tooltip element](../../_images/frontend/tooltip-element-result.png)

## Embedded documentation

The detailed information about the UI library is embedded in the code repository:

*  [`lib/web/css/docs/source/README.md`] describes the UI library structure, naming conventions, and code style.
*  [`lib/web/css/docs`] contains a set of `.html` files with detailed information about the library mixins.

Each file is named after the mixin it describes, and contains detailed mixin description and navigation controls to access documentation for other mixins.
The generated UI library documentation is provided in a convenient HTML view. It is available in the following location in your installation: `<your_instance>/pub/static/frontend/Magento/blank/en_US/css/docs/index.html` (view in a browser).

<!-- Link definitions -->

[inherits]: https://developer.adobe.com/commerce/frontend-core/guide/themes/inheritance/

[`lib/web/css/docs/source/README.md`]: https://github.com/magento/magento2/blob/2.4/lib/web/css/docs/source/README.md

[`lib/web/css/docs`]: https://github.com/magento/magento2/blob/2.4/lib/web/css/docs

[`lib/web/css/source/lib/variables/_breadcrumbs.less`]: https://github.com/magento/magento2/blob/2.4/lib/web/css/source/lib/variables/_breadcrumbs.less

[`lib/web/css/source/lib/variables`]: https://github.com/magento/magento2/blob/2.4/lib/web/css/source/lib/variables

[`lib/web/css`]: https://github.com/magento/magento2/blob/2.4/lib/web/css

[Less]: http://lesscss.org/

[ui_lib1.png]: ../../_images/frontend/ui_lib1.png
[ui_lib2.png]: ../../_images/frontend/ui_lib2.png
