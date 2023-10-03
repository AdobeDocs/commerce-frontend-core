---
title: Override a Layout | Commerce Frontend Development
description: View code samples for overriding layouts in Adobe Commerce and Magento Open Source themes.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Override a layout

Not all layout customizations can be performed by [extending layouts]. If the amount of customizations is large, you can use the overriding function for the needed layout file. This means that the new file that you place in the theme will be used instead of the parent [theme] layout file or [base] layout file.

In this article, [page layouts], [page configurations], and [generic layouts] are referred to as *layout files*, as the mechanism of overriding is similar for all of them.

Layout files with instructions that override the default or parent theme files are referred to as *overriding layout files*.

## Examples of customizations that override layouts

Examples of customizations that involve overriding layouts:

*  Suppressing method invocation.

   Overriding is not necessary if a block has a method that cancels the effect of the originally invoked method. In this case, you can customize the layout by adding a layout file where the canceling method is invoked.

*  Modifying method arguments.
*  Canceling block/container removal using the `remove` attribute.
*  Setting XML attributes of blocks and containers.

<InlineAlert variant="info" slots="text"/>

Certain attributes, like `htmlClass`, `htmlId`, `label` attributes can be changed in [extending layouts].

*  Removing block arguments.
*  Modifying and suppressing [handles] inclusion.
*  Removing all handle instructions by declaring an overriding layout file with an empty handle.

## How to override a layout

This section discusses how to override:

*  [Base layout]
*  [Theme layout]

### Override base layouts

To add an overriding base layout file (to override a base layout provided by the module):

1. Put a layout file with the same name in the following location:

   ```tree
    <theme_dir>
      |__/<Namespace_Module>
        |__/layout
          |__/override
             |__/base
               |--<layout1>.xml
               |--<layout2>.xml
   ```

These files override the following layouts:

*  `<module_dir>/view/frontend/layout/<layout1>.xml`
*  `<module_dir>/view/frontend/layout/<layout2>.xml`

For example, `<theme_dir>/Magento_Checkout/layout/override/base/checkout_cart_index.xml` will override `Magento_Checkout/view/frontend/layout/checkout_cart_index.xml`.

### Override theme layouts

To add an overriding theme file (to override a parent theme layout):

1. Put a layout file with the same name in the following location:

```tree
<theme_dir>
  |__/<Namespace_Module>
    |__/layout
      |__/override
         |__/theme
            |__/<Parent_Vendor>
               |__/<parent_theme>
                  |--<layout1>.xml
                  |--<layout2>.xml
```

These files override the following layouts:

*  `<parent_theme_dir>/<Namespace>_<Module>/layout/<layout1>.xml`
*  `<parent_theme_dir>/<Namespace>_<Module>/layout/<layout2>.xml`

For example, `<theme_dir>/Magento_Checkout/layout/override/theme/Magento/luma/checkout_cart_index.xml` will override `app/design/frontend/Magento/luma/Magento_Checkout/layout/checkout_cart_index.xml`.

<InlineAlert variant="info" slots="text"/>

To override page layout files, use the `page_layout` directory name instead of `layout`.

## Customization mistakes

Although the layout overriding mechanism provides great customization flexibility, it's possible to use it to add logically irrelevant changes. We strongly recommend you not make the following changes:

*  Changing block name or alias. The name of a block should not be changed, and neither should the alias of a block remaining in the same parent element.
*  Changing handle inheritance. For example, you should not change the page type parent handle.

[extending layouts]: extend.md
[theme]: index.md#module-and-theme-layout-files
[base]: index.md#module-and-theme-layout-files
[page layouts]: types.md#page-layout
[page configurations]: types.md#page-configuration
[generic layouts]: types.md#generic-layout
[handles]: index.md
[Base layout]: index.md#module-and-theme-layout-files
[Theme layout]: index.md#module-and-theme-layout-files
