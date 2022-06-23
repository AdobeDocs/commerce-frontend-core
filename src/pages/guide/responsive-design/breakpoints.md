---
title: Add a Custom Breakpoint | Commerce Frontend Development
description: View code samples for adding custom breakpoints in Adobe Commerce and Magento Open Source themes.
---

# Add a custom breakpoint

Breakpoints are used in stylesheets to set up the screen width at which the design changes, for example, from the mobile to the desktop version. Themes provided with the application implement a list of [default breakpoints](css.md#breakpoints). This topic describes how to add a custom breakpoint in your theme.

To add a custom breakpoint in your theme, you need to do the following:

1. Define a variable for the new breakpoint.
1. Override the library `_responsive.less` file, and add the new rule for the new breakpoint.
1. Implement the screen changes for the new breakpoint.

## Add a breakpoint variable

In your custom theme directory, add a `/web/css/source/_variables.less` in one of the following ways:

-  if your theme [inherits](../themes/inheritance.md) from the other, then copy the parent's `_variables.less`.
-  if your theme is a standalone one, add a new empty file.

In your file `_variables.less` in custom theme, add the variable for your new breakpoint.

For example:

```less
@screen__xl: 1280px;
@screen__lg: 1600px;
```

For variables' naming rules see [Less coding standards](https://developer.adobe.com/commerce/php/coding-standards/less/#variables).

## Override `_responsive.less` from the library

According to the approach, implemented in the UI library, the `.media-width()` mixin calls are defined in many places, but invoked in one place, in `lib/web/css/source/lib/_responsive.less`.

To implement a new breakpoint, you need to edit the `.media-width()` mixin by adding the appropriate rule there. So you need to override the library `_responsive.less` in your theme, and add the customizations there.

To do this, take the following steps:

1. Copy the `_responsive.less` file to your `<your_theme_dir>/web/css/source/lib/` directory from one of the following locations:
   -  `<your_parent_theme_dir>/web/css/source/lib/_responsive.less`: overriding `_responsive.less` in the parent theme. If there's no such file or no parent theme, use the other option.
   -  `<your_theme_dir>/web/css/source/lib/_responsive.less`: the library file.
1. In your `_responsive.less` file, add the `.media-width` [mixin](https://glossary.magento.com/mixin) rule for your breakpoint in the corresponding section (desktop or mobile, depending on the type of breakpoint you add).

<InlineAlert variant="info" slots="text"/>

The `@media-target` option may have one of the following values: `all`, `desktop` or `mobile`.

<InlineAlert variant="warning" slots="text"/>

Use single quotes when specifying media-targets. Double quotes may cause unexpected issues with the scripts.

Example:

```less
& when (@media-target = 'desktop'), (@media-target = 'all') {

    @media all and (min-width: @screen__xl) {
        .media-width('min', @screen__xl);
    }
}
```

## Add `.media-width()` calls

Now you can add a new `.media-width()` mixin call where necessary in your theme `.less` files.

Example:

```less
.media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__xl) {
    //  Customization for @screen__xl breakpoint
}
```
