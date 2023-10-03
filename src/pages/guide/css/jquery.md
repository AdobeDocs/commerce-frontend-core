---
title: jQuery UI Styles | Commerce Frontend Development
description: Review high-level details about how Adobe Commerce and Magento Open Source themes use jQuery UI styles.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# jQuery UI styles

This topic provides an overview of how jQuery UI styles are used and how you can use them in a custom theme.

## Styles used on the storefront

By default, certain storefront elements are implemented using jQuery UI widgets (like navigation menu, mini shopping cart and so on), with the default jQuery classes assigned. But the application does not contain jQuery UI styles in the code base. Styles for the certain default jQuery UI classes are defined by default (in the default storefront and Admin themes). For other jQuery UI classes styles are not defined.

We do not recommend downloading the jQuery UI styles as is, because they will override the default theme definitions and break the default design.

To use the jQuery styles, you need to define those which you need in your custom stylesheets in the `<your_custom_theme>/web/css` directory.
