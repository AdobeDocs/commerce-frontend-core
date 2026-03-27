---
title: Theme Development Workflow | Commerce Frontend Development
description: Review the Adobe Commerce and Magento Open Source theme development workflow.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Theme development workflow

## Enable development mode

In the installation directory, run:

```php
bin/magento deploy:mode:set developer
```

See:

*  [About application modes](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/setup/application-modes)
*  [Get started with command-line configuration](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/config-cli)

<InlineAlert variant="success" slots="text"/>

To check the current mode of your instance, in the root directory, run: `bin/magento deploy:mode:show`.

### Create basic theme files

In the `<magento_root>/app/design/frontend/<Your_Vendor>/<your_theme>` directory, create the following files:

*  `theme.xml`
*  `registration.php`
*  (optionally) `composer.json`

For details, see [Create a new storefront theme](create-storefront.md)

### Apply the theme

1. In the Admin Panel, go to **CONTENT** > **Design** > **Configuration**
1. Find the record corresponding to your store view and click **Edit**.
1. In the **Applied Theme** drop-down, select your newly created theme.
1. Click **Save Configuration**.

For details, see [Apply and configure a storefront theme](apply-storefront.md)

### Choose LESS compilation mode

#### Grunt (recommended)

*  [Setup Grunt](../tools/grunt.md)
*  [Add the theme to Grunt configuration](../tools/grunt.md#configuration-file)
*  [Track changes](../css/debug.md#track-changes-using-grunt)

#### Client-side compilation

See [CSS preprocessing#client-side compilation mode](../css/preprocess.md#client-side-less-compilation)

#### Server-side compilation (default)

See [CSS preprocessing server-side compilation mode](../css/preprocess.md#server-side-less-compilation)

#### Custom preprocessor

See [Using custom CSS preprocessor](../css/custom-preprocessor/index.md)

### Create your styles

See:

*  [Quick start guide to working with styles](../css/quickstart/index.md)
*  [All about styles in themes](../css/index.md)

### Debug

See:

*  [Locate the CSS/Less file you need to change](debug.md)
*  [CSS source maps](../css/debug.md#css-source-maps)
*  [Track changes using Grunt](../css/debug.md#track-changes-using-grunt)

### Clean cache and/or static files

*  Certain changes in styles require cleaning previously pre-processed and published static view files. Run `grunt clean <theme>` or manually clear the `pub/static` and `var/view_preprocessed` directories. Do this after any changes in server-side compilation mode. For the client-side or Grunt compilation, see [Clean static files](../caching.md#clean-static-files) for details.

*  Changes in layout and templates requires cleaning cache. See [Clean cache](../caching.md#clean-cache) for details.

### Make sure that the same styles are delivered to production (optional)

When you finish developing and your styles are ready to go to production, you can configure your Grunt/Gulp less compiler to minify compiled code, disable source maps generation and then copy the compiled files to `/app/design/frontend/<Vendor>/<theme>/web/css` directory next to source files. They will be used in static content deploy instead of running backend compilation (and static content deployment process will run faster).

### Switch to production mode

In the installation directory, run:

```php
bin/magento deploy:mode:set production
```

See [application modes](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/setup/application-modes) for details.

### Deploy static content

To publish your static files to the `pub/static` directory when your instance is set to production mode, [run the static content deployment tool](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment).
