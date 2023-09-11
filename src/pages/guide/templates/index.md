---
title: Templates | Commerce Frontend Development
description: Review introductory information about how templates work in Adobe Commerce and Magento Open Source themes.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Templates

In application templates are the part of the view layer. Templates define exactly how the content of [layout blocks](../layouts/index.md) is presented on a page: order, CSS classes, elements grouping, and so on.
In most cases, templates do not contain any logic about whether they will or will not be rendered, this is typically handled by the layout files. Once a template is called in a layout, it will be displayed.

Default templates are PHTML files. Also HTML templates are used for [Knockout JS](http://knockoutjs.com/index.html) scripts.

<InlineAlert variant="info" slots="text"/>

The template rendering subsystem supports multiple template engines, including the default PHP-based engine for processing PHTML templates.

This chapter describes how to customize templates in your design theme, and provides both the practice reference and the theoretical background of how templates are applied in a store.

We strongly recommend that you do not change the default templates, because if you do edit them, your changes can be overwritten by the new version of the default files during upgrades.
The best practice is [creating a new design theme](../themes/create-storefront.md) and adding your modified templates there.
