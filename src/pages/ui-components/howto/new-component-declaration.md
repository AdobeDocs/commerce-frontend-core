---
title: Declare a custom UI component | Commerce Frontend Development
description: Follow this tutorial to create the XML configuration required for custom Adobe Commerce and Magento Open Source UI components.
---

# Declre a custom UI component

Declaring a custom [UI component](https://glossary.magento.com/ui-component) refers to creating the [XML](https://glossary.magento.com/xml) configuration of your custom component, and is a part of a bigger task of creating a custom UI component.

This topic describes the XML elements that must be used for declaring a custom component and where this declaration should be placed.

## XML elements

A custom UI component can be declared using one of the following elements: `<component>` or `<container>`.

The `<component>` element is typically used for declaring simple custom components that do not have other nested components. `<component>` uses the [uiElement] constructor by default.

The `<container>` element is typically used for declaring custom components that are collections, or in other words, can have nested components. `<container>` uses the [uiCollection] constructor by default.

### Attributes you can use

The `<container>` and `<component>` elements have no mandatory attributes. The following optional attributes are available for both these elements:

-  `component`: link to the component's [JavaScript](https://glossary.magento.com/javascript) constructor.
-  `class`: link to the component's [PHP](https://glossary.magento.com/php) class.
-  `template`: link to component's `.html` template.
-  `provider`: link to component's data provider.
-  `sortOrder`: component's sort order
-  `displayArea`: the placeholder which defines the area for rendering the component in the [layout](https://glossary.magento.com/layout) file.

<InlineAlert variant="warning" slots="text1, text2, text3" />

If the following elements are used inside `<container>` or `<component>`, they should be specified strictly in the following order:

1. `<argument>`
1. `<settings>`
1. `<childComponent>`

For the component configuration inside `<container>` and `<component>`, [use the "arbitrary" structure].

## Declare a custom basic component

If the custom component you create is a [basic UI component] (like Form or Listing), you need to take the following steps to declare it:

1. Specify the XML file with its configuration it in the page layout file in your module, as described in the [About XML configuration of UI components] topic.
1. Declare the component in a separate `.xml` file using the `<container>` or `<component>` as parent node.

## Declare a custom secondary component

**The current version of the application does not yet support secondary components.**

<!-- Link Definitions -->

[uiElement]: ../concepts/element.md
[uiCollection]: ../concepts/collection.md
[use the "arbitrary" structure]: ../concepts/semantic-configuration.md
[basic UI component]: ../index.md#general-structure
[About XML configuration of UI components]: ../concepts/xml-declaration.md#about-the-layout-configuration-file-and-ui-component-declaration
