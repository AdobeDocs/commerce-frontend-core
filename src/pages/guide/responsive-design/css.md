---
title: CSS in Responsive Design | Commerce Frontend Development
description: Learn how to use stylesheets when developing responsive Adobe Commerce and Magento Open Source themes.
---

# CSS in responsive design

Stylesheets are the main tool in responsive web design (RWD) implementation. This topic describes the mechanisms and approaches to building RWD used in the default themes. To re-use them in your custom theme, make your theme [inherit][theme-inherit] from the Blank theme.

## Mobile first

In the Blank and Luma themes, a "mobile first" approach is used. The order is:

-  Mobile
-  Tablet
-  Desktop

This means that the styles for mobile devices (screen width less than 768px) are extended by the styles for the higher breakpoints. As the result, the extra styles are never loaded when a store is viewed on a mobile device.

The mobile and desktop styles are defined in separate files:

-  [styles-l.less] is used to generate desktop-specific styles (768px and higher).
-  [styles-m.less] is used to generate basic and mobile-specific styles.

## Breakpoints

Breakpoints are used in the CSS code to set up the screen width at which the design switches from the mobile to the desktop version.

The Blank and Luma themes use Less variables to implement the following [breakpoints][breakpoints-link]:

-  `@screen__xxs`: 320px
-  `@screen__xs`: 480px
-  `@screen__s`: 640px
-  `@screen__m`: 768px (in the Blank and Luma themes, this breakpoint switches between mobile and desktop views)
-  `@screen__l`: 1024px
-  `@screen__xl`: 1440px

The default breakpoint variables are located in the UI library: `lib/web/css/source/lib/variables/_responsive.less`.

You can change these breakpoints or add new ones in your custom theme. For instructions see the [Add a new breakpoint][rwd-breakpoints] topic.

## Media queries

The Blank and Luma theme styles are based on the [UI library]. The library uses [CSS3 media queries][css3-media-queries-wiki], an extension of the `@media` rule, to adapt the layout to the screen width.

The approach implemented in the UI library, uses `@media-common` style group separation and `.media-width()` mixins which can be used in any `.less` file in a theme, as many times as needed, but it is invoked only once, in `lib/web/css/source/lib/_responsive.less`. The resulting `styles-m.css` and `styles-l.css` both have only one call of each media query with all the rules there, instead of multiple calls for the same query.

-  Media queries `@media-common`, `max screen__s` and `max screen__m` will be added to `styles-m.css`.
-  Media queries `min screen__m` and `min screen__l` will be added to `styles-l.css`.

<InlineAlert variant="warning" slots="text"/>

If working on a theme which inherits from either the Blank or Luma theme, it's recommended to use `.media-width()` and style groups separation.  Otherwise the style rules will be added twice, once to `styles-m.css` and once more to `styles-l.css`.

For Less styles rules to be compiled to `styles-m.css` without a media query so that they apply to all screen widths use the `@media-common` style group separation.

```less
//
//  Common (styles-m.css)
//  _____________________________________________
& when (@media-common = true) {
    // your code
}
```

For grouping style rules in certain media queries the `.media-width()` mixin used.

```less
.media-width(<@extremum>, <@break>);
```

`@extremum: max|min` - sets whether to use min-width or max-width in media query condition. If `max` is used the compiled styles will be placed in `styles-m.css` with the appropriate media query. Whereas if `min` is used the compiled styles will be placed in `styles-l.css` with the appropriate media query.

`@break: value` - sets the value of breakpoint to compare with in media query condition.

```less
//
//  Mobile (styles-m.css)
//  _____________________________________________

.media-width(@extremum, @break) when (@extremum = 'max') and (@break = @screen__s) {
    // your code
}

.media-width(@extremum, @break) when (@extremum = 'max') and (@break = @screen__m) {
    // your code
}

& when (@media-target = 'mobile'), (@media-target = 'all') {
    @media only screen and (max-width: 375px) {
        // styles for custom breakpoint below <= 375px mobile screen
    }
}

//
//  Tablet
//  _____________________________________________

// This will add styles for tablet devices. When using native media-queries, we recommend wrapping your media-queries with media-width mixins or media-target
& when (@media-target = 'desktop'), (@media-target = 'all') {
    @media only screen and (min-width: @screen__m) and (max-width: (@screen__xl - 1)) {
        // styles for breakpoint >= 768px and < 1440px
    }
}

//
//  Desktop (style-l.css)
//  _____________________________________________

.media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__m) {
    // your code
}

.media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__l) {
    // your code
}

.media-width(@extremum, @break) when (@extremum = 'min') and (@break = @screen__xl) {
    // your code
}
```

You can find more information about the UI library responsive mixin usage in `<your_Magento_instance>/pub/static/frontend/Magento/blank/en_US/css/docs/responsive.html` (view in a browser).

<!-- Link definitions -->
[styles-l.less]: https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/web/css/styles-l.less
[styles-m.less]: https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/web/css/styles-m.less
[css3-media-queries-wiki]: http://en.wikipedia.org/wiki/Media_queries
[breakpoints-link]: index.md#terms-used
[theme-inherit]: ../themes/inheritance.md
[rwd-breakpoints]: breakpoints.md
