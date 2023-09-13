---
title: UI components | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Introduction to UI components

*UI components are used to represent distinct UI elements, such as tables, buttons, dialogs, and others*.

They are designed for simple and flexible user interface (UI) rendering. Components are responsible for rendering result page fragments and providing/supporting further interactions of JavaScript components and server.

UI components are implemented as a standard module named Magento_UI.

To use UI components in your custom module, you need to add a dependency for the Magento_UI module in [your component's composer.json file](https://developer.adobe.com/commerce/php/development/build/composer-integration/).

The following XSD file contains rules and limitations shared between all components (both definitions and instance configurations):

`<your module root dir>/Magento/Ui/etc/ui_definition.xsd`

Extension developers cannot extend this XSD scheme and introduce new components, but can customize existing ones.

## General structure

There are basic and secondary UI components.

Basic components are:

*  [Listing component](components/listing-grid.md)

*  [Form component](components/form.md)

All other UI components are secondary.

Basic components are declared in the [page layout files](../guide/layouts/types.md#page-layout); secondary components are declared in the top-level components' instances configuration files.

All components can be configured both for Admin and storefront.

<InlineAlert variant="info" slots="text" />

You need to configure styles manually for components on the storefront.

## When to use UI components

With Magento, you may apply different approaches to implementing a UI element, and use:

*  PHTML template with inline JavaScript

*  PHTML template with declaration of related JavaScript file via XML layout

*  jQuery widget

*  UI component

We recommend using UI components as much as possible.

UI components work well together: they communicate with each other via the [uiRegistry service](concepts/registry.md#javascript-debugging) that tracks their asynchronous initialization. Therefore, if we need to extend something that has already been implemented as a hierarchy of UI components or add a new feature that should interact with other UI components, it's easier and more effective to use a UI component.

A UI component is a combination of:

1. **XML declaration** that specifies the component's configuration settings and inner structure.

1. **JavaScript** class inherited from one of the JavaScript framework UI components base classes (such as [UIElement](concepts/element.md), [UIClass](concepts/class.md) or [UICollection](concepts/collection.md)).

1. **Related template(s)**

### XML Declaration

XML is widely used in which allows developers to easily reuse existing functionalities and add customizations.

Compared to XML layouts, UI components use a more semantical approach to declare and configure the user interface.

An instance of a UI component is usually based on the hierarchy of child UI components.

For example:

*  the Form component has Fieldsets, Tabs, and inner fields

*  the Listing component has Filters, Columns, Bookmark component, and others

### JavaScript class

The picture below shows how the JavaScript class of a UI component is implemented.

![JavaScript class implementation of a UI component](../_images/ui-components/ui_comp_js_class.png)

### Templates

A UI component can be bound to one or more HTML templates using the KnockoutJS bindings.

## Configuring a UI component

A particular instance of a UI component is defined primarily by the following:

1. `<Magento_Ui_module_dir>/view/base/ui_component/etc/definition.xml`: default component configuration. Can be extended in custom modules.
1. [UI component's XML declaration](concepts/xml-declaration.md).
1. [Backend/PHP modifiers](concepts/modifier.md).
1. Configuration inside the JavaScript classes.

## Frontend design area

*  Configured through layout XML.

*  The `jsLayout` argument is used to specify information.

```xml
<block name="block-name" template="Magento_Module::path_to_template.phtml">
  <arguments>
    <argument name="jsLayout" xsi:type="array">
      <item name="components" xsi:type="array">
        ...
      </item>
    </argument>
  </arguments>
</block>
```

## Adminhtml area

*  Configured through dedicated XML file (`view/adminhtml/ui_component/[ui_component_name.xml]`). For example, the Customer grid UI component defined in `<Magento_Customer_module_dir>/view/adminhtml/ui_component/customer_listing.xml`.

*  Included in layout XML with uiComponent tag. For example, the `customer_listing` UI component is included in `<Magento_Customer_module_dir>/view/adminhtml/layout/customer_index_index.xml`.

  ```xml
  <page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
      <update handle="formkey"/>
      <body>
          <referenceContainer name="content">
              <uiComponent name="customer_listing"/>
          </referenceContainer>
      </body>
  </page>
  ```

## Things to remember

**UI components have different settings:**

Configuration settings (their list and names) are different among UI components; these settings contain constants, optional and required settings. Developers need to treat every UI component separately.

**Beware of mistakes in XML config:**

Surprisingly, most issues occur because of the typos and other mistakes in the UI component's XML configuration. Naming is critical because UI components are heavily cross-referenced.
