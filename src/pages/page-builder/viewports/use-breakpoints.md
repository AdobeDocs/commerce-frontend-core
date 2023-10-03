---
title: Use breakpoints for widgets
description: Using breakpoints with custom data to control the responsive behavior of content types from widgets.
keywords:
  - Page Builder
---

# Use breakpoints for widgets

Using breakpoints in Page Builder involves adding custom data to a breakpoint configuration so that you can use that data to control the responsive behavior of content types from `widgets`.

The Products `widget.js` provides a good example of why you might need to do this and how it works. Within the widget, the `min-width` and `max-width` strings are passed to a [matchMedia() function](https://www.w3schools.com/jsref/met_win_matchmedia.asp). This method creates a list of media queries created from the `min-width` and `max-width` values from all the breakpoints defined in the `view.xml` file. When the browser width matches one of the query breakpoints, `matchMedia()` invokes a callback function on the widget. The widget can then respond to the breakpoint by calling functions and changing configurations on other controls like the [slick carousel](https://kenwheeler.github.io/slick/).

Let's look closer at how the `Products` content type uses data from the `view.xml` configuration to control the number of products displayed in its carousel component at different breakpoints.

All breakpoints define an `options` node for `products` as shown here in the `tablet` breakpoint:

```xml
<var name="tablet">
    <var name="conditions">
        <var name="max-width">1024px</var>
        <var name="min-width">768px</var>
    </var>
    <var name="options">
        <var name="products">
            <var name="default">
                <var name="slidesToShow">4</var>
            </var>
            <var name="continuous">
                <var name="slidesToShow">3</var>
            </var>
        </var>
    </var>
</var>
```

On the frontend, when a breakpoint is active, the Products widget gets the `slidesToShow` value defined for that breakpoint in the `view.xml` configuration. The widget then passes that value to its internal carousel to show the number of products defined for the current breakpoint.

Like other content type `widgets`, the Product's `widget` is loaded on the frontend. However, the Product's `widget` also needs to listen for viewport stage events (`stage:viewportChangeAfter`) when the `Products` content type is rendered inside a `Block` or `Dynamic Block` on the stage. In such cases, the `widget` breakpoint functions (called on the frontend) do not work. That's why you see a frontend `widget` defining a backend event handler.

To capture and respond to events on the Admin stage and the frontend, you need to create two types of event handlers:

-  Frontend event handler using the `matchMedia` function
-  Stage event handler for Page Builder's `stage:viewportChangeAfter` events.

## Frontend event handler

For the frontend, use the [matchMedia](https://github.com/paulirish/matchMedia.js/) polyfill from `lib/web/matchMedia.js`. Adobe Commerce uses this polyfill in the Blank and Luma themes as described in [JavaScript in Commerce responsive design](../../guide/responsive-design/js.md).

The Products widget uses it as shown in this fragment:

```terminal
Magento/PageBuilder/view/base/web/js/content-type/products/appearance/carousel/widget.js
```

```javascript
define([
    'jquery',
    'underscore',
    'matchMedia',
    'Magento_PageBuilder/js/utils/breakpoints',
    'Magento_PageBuilder/js/events',
    'slick'
], function ($, _, mediaCheck, breakpointsUtils, events) {
    'use strict';
    ///
    return function (config, element) {
    ///
        _.each(config.breakpoints, function (breakpoint) {
            mediaCheck({
                media: breakpointsUtils.buildMedia(breakpoint.conditions),

                entry: function () {
                    initSlider($element, slickConfig, breakpoint);
                }
            });
        });
    ///
    };
});
```

## Stage event handler

For the Admin stage, use the [stage:viewportChangeAfter](../architecture/events.md#stageviewportchangeafter) event to control responsive changes to your content type from within your `widget`.

As mentioned for the Products `widget`, your `widget` should handle this event for cases where your content type is contained within a Block or Dynamic Block. In these cases, your content type's `widget` is loaded in the Admin, not your `preview` component.

The Products content type implements the following event handler in its `widget.js`:

```terminal
Magento/PageBuilder/view/base/web/js/content-type/products/appearance/carousel/widget.js
```

```typescript
events.on('stage:viewportChangeAfter', function (args) {
    var breakpoint = config.breakpoints[args.viewport];
    initSlider($element, slickConfig, breakpoint);
});
```

In both handlers, the event handler uses the breakpoint/viewport name to access the `slidesToShow` value, then uses that value to re-initialize the `Products` carousel (the [slick slider](https://kenwheeler.github.io/slick/)) to show a suitable number of products for the selected viewport width, when displayed on the stage.

Notice how the viewport data in both event handlers is accessed using dot syntax according to the hierarchy defined in the `view.xml` configuration file. For example, the `preview.ts` file, data for the local `this.slidesToShow` property is accessed using the viewport name from `args`, as shown here:

```javascript
this.slidesToShow = parseFloat(viewports[args.viewport].options.products.default.slidesToShow);
```

## Summary

In Page Builder, breakpoints provide your content type widgets with the custom, breakpoint-specific data they need to control responsive behavior that cannot otherwise be controlled from media queries alone.
