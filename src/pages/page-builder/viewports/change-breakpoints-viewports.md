---
title: Change breakpoints and viewports
description: Change Page Builder's default min-width and max-width values to match your responsive design needs.
---

# Change breakpoints and viewports

Changing breakpoints and viewports is about changing Page Builder's default `min-width` and `max-width` values to match your responsive design needs.

The following list shows Page Builder's default `min-width` and `max-width` values for breakpoints and viewports:

**desktop**

-  `<var name="min-width">1024px</var>`

**tablet**

-  `<var name="max-width">1024px</var>`

-  `<var name="min-width">768px</var>`

**mobile**

-  `<var name="max-width">768px</var>`

-  `<var name="min-width">640px</var>`

-  `<var name="media">only screen and (max-width: 768px)</var>`

**mobile-small**

-  `<var name="max-width">640px</var>`

By default, Page Builder defines only one viewport `media` query for the `mobile` breakpoint. But you may find that your instance of Page Builder has a viewport `media` query defined for each breakpoint.

<InlineAlert variant="info" slots="text"/>

Like the `mobile` breakpoint, the `desktop` breakpoint also defines viewport configurations, but it does not define a `media` query. The `desktop` breakpoint serves as the default viewport (or fallback) used to store form field properties that are not defined with a specific breakpoint like `mobile`.

## Steps for changing breakpoints

You can change Page Builder's existing breakpoints using an Admin theme or module. The following steps apply to both.

1. Add an overriding view.xml file

1. Change the min-width and max-width

1. Change the viewport media queries (as needed)

1. Change your frontend media queries (as needed)

1. Change the viewport stage CSS (as needed)

You can skip steps 3-5 if you are changing or adding new breakpoints without viewport configurations. These include the `tablet` and `mobile-small` breakpoints. Otherwise, you need to complete all these steps to ensure that the breakpoint and viewport widths are the same.

### Step 1: Create an overriding view.xml file

Start by copying Page Builder's `view.xml` file to your module or Admin theme's `etc` directory: `Vendor/Module/etc/view.xml`. Technically, in your `view.xml` file, you can remove the nodes you don't change and rely on Magento's XML merging to include Page Builder's `view.xml`. However, during development, it's helpful to keep Page Builder's nodes in place as a reminder of the configuration data Page Builder uses from the nodes you don't change.

### Step 2: Change the min-width and max-width

Page Builder uses the `min-width` and `max-width` values to generate media queries that control the breakpoint settings for JavaScript widgets (like the products widget). Here's an example that changes the `mobile-small` `max-width` to `480px` and adjusts the `min-width` on the mobile breakpoint to match:

```xml
<var name="mobile">
    <var name="label">Mobile</var>
    <var name="stage">true</var>
    <var name="class">mobile-switcher</var>
    <var name="icon">Magento_PageBuilder::css/images/switcher/switcher-mobile.svg</var>
    <var name="media">only screen and (max-width: 768px)</var>
    <var name="conditions">
        <var name="max-width">768px</var>
        <var name="min-width">480px</var>
    </var>
</var>
<var name="mobile-small">
    <var name="conditions">
        <var name="max-width">480px</var>
    </var>
</var>
```

<InlineAlert variant="info" slots="text"/>

**Other CSS units**. The default `min-width` and `max-width` values are in pixels (`px`). But you can use `em` units or any other CSS unit suitable to media queries.

### Step 3: Change the viewport media queries

If you are changing a breakpoint that doesn't define a `media` query for a viewport, you can skip this step.

Page Builder uses the `media` query node for form field properties set up to use them. So the `max-width` for these queries must match the `max-width` defined for JavaScript widgets. Otherwise, the content elements on the page will be responding to different breakpoints. The result could lead to surprising behavior on the frontend.

For example, if you changed the `max-width` of the `mobile` breakpoint to `640px`, you must also change the `media` query `max-width` to match, as shown here:

```xml
<var name="mobile">
    <var name="label">Mobile</var>
    <var name="stage">true</var>
    <var name="class">mobile-switcher</var>
    <var name="icon">Magento_PageBuilder::css/images/switcher/switcher-mobile.svg</var>
    <var name="media">only screen and (max-width: 640px)</var>
    <var name="conditions">
        <var name="max-width">640px</var>
        <var name="min-width">480px</var>
    </var>
</var>
<var name="mobile-small">
    <var name="conditions">
        <var name="max-width">480px</var>
    </var>
</var>
```

### Step 4: Change your frontend media queries

You must also change any corresponding breakpoints within your frontend media queries in your modules or frontend themes. In this example, we changed our frontend queries to match the new `max-width` we set for the `mobile-small` breakpoint:

```scss
//  Standard media queries
//  ________________________________________________________

@media only screen and (max-width: 480px){}

//  Magento media queries: @screen__xs = 480px
//  ________________________________________________________

.media-width(@extremum, @break) when (@extremum = 'max') and (@break = @screen__xs){}
```

### Step 5: Change the viewport stage CSS

When changing breakpoints that have viewport configurations, you must also change the viewport styles set for the stage width. By default, the `mobile` viewport is the only viewport that defines a CSS style for the stage width.

**To change the `mobile` viewport stage width:**

1. Add a `.less` file to the `adminhtml/web/css/source/` directory of your Admin theme or module.

1. Copy and paste in the `.mobile-viewport` style from `Magento/PageBuilder/view/adminhtml/web/css/source/_mobile-viewport.less`, as shown below.

1. Change the `width` of the `.pagebuilder-canvas` to match the `max-width` you set for the breakpoint and viewport `media` query. They should all match.

```css
.mobile-viewport {
    &.pagebuilder-stage-wrapper {
        &.stage-content-snapshot,
        &.stage-full-screen {
            .pagebuilder-stage {
                .pagebuilder-canvas {
                    left: 50%;
                    margin: 0;
                    transform: translateX(-50%);
                    width: 640px;
                }
            }
        }
    }
}
```

## Summary

Changing breakpoint and viewport widths in Page Builder is pretty simple. You just need to match all your breakpoint width changes to their viewport `media` queries, frontend media queries, and the viewport stage widths.
