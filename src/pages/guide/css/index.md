---
title: Cascading Style Sheets (CSS) | Commerce Frontend Development
description: Manage CSS and LESS stylesheets when developing Adobe Commerce and Magento Open Source themes.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Cascading style sheets (CSS)

The Adobe Commerce and Magento Source applications incorporate [Less](https://lesscss.org/), a CSS pre-processor that simplifies the management of complex CSS files. To define styles for a store, you can use both CSS and Less stylesheets.

The Commerce application provides a built-in Less UI library, which you can optionally extend.

To customize storefront styles, you need to [create a custom design theme](../themes/create-storefront.md). Then you can use one of the following approaches:

*  If your theme [inherits](../themes/inheritance.md) from the out-of-the-box Blank or Luma theme, you can override the default Less files. For example, to [change the values of the variables](ui-library.md#predefined-variables) used in the default files.
*  Create your own Less files using the built-in Less preprocessor.
*  Create your own CSS files, optionally having compiled them using third-party CSS preprocessor.

## Things to remember when working with styles

*  Make sure that you [set](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/set-mode) your application to the developer or default [mode](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/setup/application-modes).

*  If your style changes do not apply after refreshing the page, cleaning the static files cache might help. See the [caching](../caching.md#page-caching) for instructions how to do this.

### CSS merging, minification, and performance

There are a couple options to help with CSS and site performance.

*  Merge CSS files to decrease the number of HTTP requests required to load the page.

*  Minification of CSS files reduces the file size being sent. It does this by stripping white space within the file.

*  Use CSS critical path to eliminate render-blocking CSS resources.

To enable / disable these settings, go into Admin > **Stores** > Setting > **Configuration** > **Advanced** > **Developer** > **CSS Settings**.

## Walkthrough

Here is a simple illustration of changing styles using the first approach: changing the color of the buttons of a certain class.
In the Blank theme, the buttons of the `.action.primary` class, so called *primary* buttons, are blue. The following image illustrates this:

![The default view of a product page, with the orange Add to Cart button]

ExampleCorp wants to change the color of the primary buttons to orange. To achieve this, they do the following:

1. Create a new Orange theme, which inherits from the Blank theme.
1. In the Orange theme directory add the overriding `app/design/frontend/ExampleCorp/orange/web/css/source/_theme.less` file with the following code:

   ```less
   //  Primary button
   @button-primary__color: @color-white;
   @button-primary__hover__color: @color-white;
   @button-primary__background: @color-orange-red1;
   @button-primary__hover__background: @color-orange-red4;
   @button-primary__border: 1px solid @color-orange-red2;
   @button-primary__hover__border: 1px solid @color-orange-red2;
   ```

ExampleCorp wants to change the color of the primary buttons to a custom color. In the orange theme directory add the overriding `app/design/frontend/ExampleCorp/orange/web/css/source/_theme.less` file with the following code:

   ```less
   //  Primary button
   @btn-color-text: #2e3138;
   @btn-color-background: #d5d7dd;
   @btn-color-background-hover: #d9dbe0;
   @button-primary__color: @btn-color-text;
   @button-primary__hover__color: @btn-color-text;
   @button-primary__background: @btn-color-background;
   @button-primary__hover__background: @btn-color-background-hover;
   @button-primary__border: 1px solid @btn-color-background;
   ```

When ExampleCorp [applies their theme](../themes/apply-storefront.md), the primary buttons will look like on the following image:

![The customized view of a product page, with the grey Add to Cart button]

[The default view of a product page, with the orange Add to Cart button]: ../../_images/frontend/css_over1.png
[The customized view of a product page, with the grey Add to Cart button]: ../../_images/frontend/css_over2.png
