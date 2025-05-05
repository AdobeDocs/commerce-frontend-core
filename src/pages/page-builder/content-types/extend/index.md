---
title: Introduction to extending content types
description: Introduction on how to extend content types.
keywords:
  - Page Builder
edition: pass
---

# Introduction to extending content types

Extending Page Builder's native content types is often the best way to satisfy your end users when they request changes.

Page Builder gives end users several content styling options from the default form editors. But what if your end users want to create a Banner with a different layout? Or maybe they want to change or add content properties that don't have a form field. These are the use cases that beg you to extend an existing content type, rather than create a new one.

All content types provide end users with at least one layout that has properties end users can set. In Page Builder, we call these layouts _appearances_. When we extend content types, we're talking about changing or adding appearances to the content type. Making sense of appearances is essential to extending content types.

## Understanding appearances

An **appearance** defines the layout and styles for a content type. Every content type has at least one appearance. Content types like the Banner have four appearances to choose from. All content types define their appearances in their configuration files. For example, Banners, Products, and Columns define all their configurations, including appearances, in `banner.xml`, products.xml, and column.xml, respectively.

To help you understand the kind of changes you can make to appearances, we'll look at a few nodes from the Banner's `collage-left` appearance from the `banner.xml` file. The following XML fragment is a condensed version of this appearance, so we can focus on what's important.

```xml
<appearances>
    <appearance name="collage-left"
                preview_template="Magento_PageBuilder/content-type/banner/collage-left/preview"
                master_template="Magento_PageBuilder/content-type/banner/collage-left/master"
                reader="Magento_PageBuilder/js/master-format/read/configurable">
        <elements>
            <element name="wrapper">
                <style name="text_align" source="text_align"/>
                <attribute name="background_type" source="data-background-type"/>
                <css name="css_classes"/>
            </element>
            <element name="content">
                <html name="message" preview_converter="Magento_PageBuilder/js/converter/html/directive"/>
            </element>
        </elements>
    </appearance>
</appearances>
```

Even in a condensed form, appearance configurations can be confusing. A quick summary of these nodes may help:

-  `appearance` — identifies an appearance configuration (by name) that all the HTML templates and nodes help define.

-  `preview_template` — path to the HTML template (`preview.html`) used to display the appearance in the Admin.

-  `master_template` — path to the HTML template (`master.html`) used to display the appearance on the storefront.

-  `element` — node type bound to an HTML element in the `preview.html` and `master.html` templates. The `element` node provides its bound template element with the `style`, `attribute`, and `css` values from the form fields.

-  `style` — for adding CSS properties (like `text-align`) to the element. The `style` node is bound to a form field of the same name.

-  `attribute` — for adding custom properties (like `background_type`) to the element. The `attribute` node is bound to a form field of the same name.

-  `css` — for adding CSS classes to the element. The `css` node is bound to a form field of the same name.

-  `html` — for allowing HTML content in the element. The `html` node is bound to a form field of the same name. The field's `formElement` type is either `input` or `wysiwyg`.

When you understand how Page Builder uses these appearance nodes, it becomes much easier to recognize the nodes that define layouts vs. the ones that define styles. These node groups are defined next.

### Appearance layout nodes

The layout for an appearance comes from the arrangement of HTML tags (`<div>`, `<a>`, `<button>`) in the templates. So if you need to change the layout, you start by changing the appearance templates:

-  `preview_template` — (`collage-left/preview.html`) for changing the appearance's layout in the Admin.

-  `master_template` — (`collage-left/master.html`) for changing the appearance's layout on the storefront.

### Appearance style nodes

The styles and properties for an appearance come from all the sub-nodes of a given `element`. So if you need to change or add styles and properties to existing layouts, you start by changing and adding `style`, `attribute`, `css`, and `html` nodes to an existing `element` node:

-  `element` — for identifying the HTML element (in the templates) that you want to change using the `style`, `attribute`, and `css` nodes.

-  `style` — for changing or adding a CSS property (like `text-align`) to an element.

-  `attribute` — for changing or adding a custom property (like `background_type`) to an element.

-  `css` — for changing or adding CSS classes to an element.

-  `html` - for allowing HTML content in the element.

## Next steps

Now that you know about appearances, take the next steps by walking through one or both of these tutorials. We highly recommend you start with the first one, Extend an appearance:

-  [Extend an appearance](extend-appearances.md).

-  [Extend another appearance](extend-more-appearances.md).

-  [Add an appearance](add-appearances.md).
