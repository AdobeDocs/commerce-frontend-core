---
title: Conventions | Commerce Frontend Development
description: Review standard file naming conventions and locations for Adobe Commerce and Magento Open Source components.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Conventional notations for paths to modules and themes

Application components, including modules, themes, and language packages technically can be located anywhere under the installation directory. This refers to both, default and custom components.

The following relative paths are used for modules and themes:

## `<theme_dir>`

Theme directory. Usually used when talking about custom themes, or any theme in general.

For out-of-the-box frontend themes, the absolute path usually is one of the following:

-  `app/design/frontend/<Vendor>/<theme>`
-  `vendor/magento/theme-frontend-<theme>`

## `<module_dir>`

Module directory. When talking about a particular module, the following notation is used: `<Magento_X_module_dir>`, where `X` would indicate the module's name. The directory for module `X` in the installation directory would be one of the following:

-  `app/code/Magento/X`
-  `vendor/magento/module-x`

For example, `<Magento_Checkout_module_dir>` would resolve to one of the following:

-  `app/code/Magento/Checkout`
-  `vendor/magento/module-checkout`
