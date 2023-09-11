---
title: Add breakpoints
description: Add breakpoints by copying and pasting an existing breakpoint from Page Builder's view.xml file.
keywords:
  - Page Builder
---

# Add breakpoints

Adding new breakpoints is as easy as copying and pasting an existing breakpoint from Page Builder's `view.xml` file (`Magento/PageBuilder/etc/view.xml`) to the `view.xml` file in your Admin theme or module, then changing its `min-width` and `max-width` as needed.

**Example: Create a new breakpoint with a `max-width` of `320px`:**

1. Copy Page Builder's `mobile-small` breakpoint from `Magento/PageBuilder/etc/view.xml`.

1. Paste it into the `view.xml` file for your Admin theme or module.

1. Change its `name` and `max-width` property.

1. Change the display `options` for the `products` content type as needed.

The `options` node in step 4 is for the Products content type. This node provides the ideal number of products to show for the breakpoint. In Page Builder's `view.xml` file, every breakpoint defines `options` data for the `products` content type. Your new breakpoint must also define this data, in addition to any other custom data added to the breakpoint.

The following example shows a new breakpoint called `mobile-tiny`. It's active for viewports with a `max-width` of `320px`, showing only one product at a time (`<var name="slidesToShow">1</var>`) for both Products appearances (`default` and `continuous`):

```xml
<!-- Your view.xml file -->

<var name="mobile-tiny">
    <var name="conditions">
        <var name="max-width">320px</var>
    </var>
    <var name="options">
        <var name="products">
            <var name="default">
                <var name="slidesToShow">1</var>
            </var>
            <var name="continuous">
                <var name="slidesToShow">1</var>
            </var>
        </var>
    </var>
</var>
```

<InlineAlert variant="warning" slots="text"/>

If your new breakpoint does not include the `options` node, the Products content type will default to show five products at a time, no matter how small the breakpoint width. That's why its important to include the `options` data for new breakpoints.
