---
title: Quickstart | Commerce Frontend Development
description: Start customizing your Adobe Commerce or Magento Open Source theme.
---

# Quickstart

This chapter combines the topics aiming to help you to quickly start working with styles of your custom theme:

-  Simple ways to customize a theme's styles
-  Simple style changes with client-side Less compilation vs. server-side

## Steps to create a theme and change styles

1. [Set] your application to the developer [mode].
1. In the file system, [add a new theme] inheriting from Blank or Luma.
1. [Apply your theme]
1. Decide which CSS compilation mode you will use. Compilation modes are described in the following topics:
   -  Detailed description: [Styles debugging]
   -  Practical illustration: [Simple style changes with client-side Less compilation vs. server-side]
1. Customize styles. To learn how, check out the following sources:
   -  [CSS chapter of this book][css overview]
   -  [Simple ways to customize a theme's styles]

## Why do you need to create a custom theme?

The application provides two themes out of the box: Blank and Luma. If the application is installed with sample data, the theme applied after installation is Luma. If no sample data is installed, the Blank theme is installed by default.

![Storefront with Luma applied]

Luma inherits from Blank, which contains all the basic functionality and styling required for a theme.

You can use either Luma or Blank for your storeview, if there is literally nothing you want to change in their design.

But if there is something you want to improve, the only recommended way is creating a new theme. It can inherit from Blank or Luma so you can preserve all you need, and change or add whatever is required.

Making changes in the out-of-the-box themes is a bad idea, because can result in your changes being overwritten during upgrade.

<!-- Link Definitions -->
[Simple ways to customize a theme's styles]: customize-styles.md
[Simple style changes with client-side Less compilation vs. server-side]: compilation-mode.md
[Set]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/set-mode.html
[mode]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/setup/application-modes.html
[add a new theme]: ../../themes/create-storefront.md
[Apply your theme]: ../../themes/apply-storefront.md
[Styles debugging]: ../debug.md
[Simple style changes with client-side Less compilation vs. server-side]: compilation-mode.md
[css overview]: ../index.md
[Simple ways to customize a theme's styles]: customize-styles.md
[Simple style changes with client-side Less compilation vs. server-side]: compilation-mode.md

<!-- Image definitions -->
[Storefront with Luma applied]: ../../../_images/frontend/css_guide_luma21.png
