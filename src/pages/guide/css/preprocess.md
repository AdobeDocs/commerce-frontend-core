---
title: CSS and LESS preprocessing | Commerce Frontend Development
description: Learn how Adobe Commerce and Magento Open Source preprocess and compile CSS stylesheets.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# CSS and LESS preprocessing

The topic describes how stylesheets are preprocessed and compiled to CSS in the application. It provides the theoretical background a frontend developer needs to debug stylesheets effectively.

## Terms used

### Root source files

The `.less` files from which the `.css` files [included in layout](themes.md) are compiled. For example, in one of the [layout files of the Blank theme](https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/Magento_Theme/layout/default_head_blocks.xml), the following `.css` files are included in the `head`:

```html
<head>
   <css src="css/styles-m.css"/>
   <css src="css/styles-l.css" media="screen and (min-width: 768px)"/>
   <css src="css/print.css" media="print"/>
</head>
```

The root source files for the Blank theme:

-  [Magento_Blank_theme_dir/web/css/styles-m.less](https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/web/css/styles-m.less)
-  [Magento_Blank_theme_dir/web/css/styles-l.less](https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/web/css/styles-l.less)
-  [Magento_Blank_theme_dir/web/css/print.less](https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/blank/web/css/print.less)

## LESS compilation modes

In the application, the following modes of compiling `.less` files to CSS are implemented:

1. Server-side Less compilation.

   This is the default compilation mode, and is the only option in [production application mode]. In this case the compilation is performed on the server, using the [Less PHP library].

1. Client-side Less compilation.

   When your application is not in the production mode, you can set the application to compile `.less` files in a browser, using the [native `less.js` library]

To set the compilation mode, do the following:

1. In the Admin, navigate to **Stores** > **Settings** > **Configuration** > ADVANCED > **Developer**.
1. In the **Store View** drop-down field, select **Default Config**.
1. Under **Frontend development workflow**, in the **Workflow type** field, select the compilation mode.
1. To save the settings, click **Save Config**.

### Server-side LESS compilation

The following paragraph describes how the Less preprocessor works in server-side compilation mode.
For each CSS file included in the layouts, Less preprocessor does the following:

1. Checks if the requested `.css` file is found. If it is found, the preprocessor stops its execution. Otherwise, it proceeds to the next step.
1. Changes the extension of the requested file to `.less` and tries to find the file using the [fallback mechanism]. If the `.less` file is not found, Less preprocessor stops its execution. Otherwise, it proceeds to the next step.
1. Reads `.less` file contents and resolves [`@magento_import`](#magento_import-directive) and default Less `@import` directives.

1. Resolves all paths in `.less` files to relative paths in the system using the fallback mechanism. All files resolved by the Less preprocessor are copied to `var/view_preprocessed/less`. Imported files are processed recursively.

1. All source files are passed to the PHP Less compiler. The resulting compiled `.css` files are published to `pub/static/frontend/<Vendor>/<theme>/<locale>`.

#### Debug in server-side compilation mode

In server-side Less compilation mode, to have your changes applied, you need to do the following:

1. Clear `pub/static/frontend/<Vendor>/<theme>/<locale>` by deleting the directory in the file system (excluding .htaccess).
1. Clear the `var/cache` and `var/view_preprocessed` directories by deleting the directory in the file system. (if they already existed there).
1. Trigger static files compilation and publication. This can be done in one of the following ways:

   -  Reloading the page where the modified styles are applied.
   -  Running the [static files deployment tool](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment.html).

Reloading the page only triggers compilation and publication of the styles used on this very page, and does not give you the information about the errors if any. So if you made changes in `.less` files used on many pages, and want to debug them, using the deployment tool is the better option.

##### Debug with the static view files deployment tool

Once you save your changes, run the following command from your `<root>` directory:

```bash
bin/magento setup:static-content:deploy
```

To generate frontend static view files in all languages:

```bash
bin/magento setup:static-content:deploy --area frontend
```

To generates backend static view files:

```bash
bin/magento setup:static-content:deploy --area adminhtml
```

The tool pre-processes (including compilation) and publishes the static view files.

<InlineAlert variant="info" slots="text"/>

Manual static content deployment is not required in "default" and "developer" modes. If you still want to deploy in these modes, use the -f option: `bin/magento setup:static-content:deploy -f`. Read more about the command in the [Deploy static view files](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment.html) section.

All errors occurring during `.less` files compilation are handled by the [LESS PHP library][] third party library.

<InlineAlert variant="info" slots="text"/>

Since Adobe Commerce and Magento Open Source 2.3.3, `oyegorge/less.php` has been replaced by `wikimedia/less.php`

Errors are caught as exceptions and written to the system log (by default it is `var/log/system.log`) and displayed on the screen. For each error, the following information is written:

-  The path to the processed file in the `var/view_preprocessed` directory.
-  The error description, including the path to file where the actual error occurred. It might be either the processed file, or the imported file.
-  The error line and the column number.
-  The content of the `.less` code in the previous and following lines.

Example of an error message:

```terminal
Compilation from source: /var/www/magento2/app/design/adminhtml/Magento/backend/web/css/styles.less
variable @variable-x is undefined in file /var/www/magento2/var/view_preprocessed/css/adminhtml/Magento/backend/en_US/css/styles.less in styles.less on line 56, column 17
        margin-left: 0;
        width: 100%;
        height: @variable-x;
    }
    .menu-wrapper,
```

##### Debug with Grunt

Alternatively, to streamline the process of applying and debugging styles customizations, in server-side compilation mode, you can

See the [Compile LESS with Grunt](debug.md) topic for details how to install, configure and use Grunt.

### Client-side LESS compilation

The client-side compilation flow is similar to [server-side](#server-side-less-compilation). The difference is in the set of files, published to `pub/static` on the last step. In the client-side mode, the following files are published to the `pub/static/frontend/<Vendor>/<theme>/<locale>` directory:

-  root source (.less) files with resolved `@magento_import` directive
-  [symlinks](http://en.wikipedia.org/wiki/Symbolic_link) to the root source file that do not contain `@magento_import`
-  symlinks to all other `.less` files imported recursively by the `@magento_import` and `@import` directives

<InlineAlert variant="info" slots="text"/>

Symlink is not created, and a copy of the processed file is published to `pub/static` instead, if the source file differs from the processed one. One of the reasons of this difference might be the usage of the `@import` directive without file extension in the source file. See [The @import directive usage](#import-remote-css-files) for more details.

#### Debug in client-side compilation mode

Client-side LESS compilation is implemented using the native `less.js` library. The default configuration is set in `lib/web/less/config.less.js`; you can change it as needed.

You can find the detailed information about the configuration and other options of the `less.js` used in a browser at [http://lesscss.org/usage/#using-less-in-the-browser](http://lesscss.org/usage/#using-less-in-the-browser).

In client-side compilation mode, most of the stylesheet customizations display immediately after you reload a page in a browser.

With client-side compilation mode enabled, LESS files are compiled on every page load. This reduces page-loading performance.

##### Clean static view files

There are certain types of changes, that require you to clear the `pub/static/frontend/<Vendor>/<theme>/<locale>` directory and trigger the compilation and [publication] processes anew.

This is required in the following cases:

-  If you change the [root source files](#terms-used) that contain the `@magento_import` directive, or the `@import` directive where the imported file is specified without extension.
-  If you rename, remove, or add a `.less` file imported with a `@magento_import` or `@import` directive but you did not correct the directives accordingly.

To clear the `pub/static/frontend/<Vendor>/<theme>/<locale>` directory, delete the directory in the file system, and reload the store pages in a browser to trigger compilation and publication.

## `@import` directive

You can import local and remote `.less` and `.css` files in your `.less` stylesheets by using the standard LESS [`@import` directive](http://lesscss.org/features/#import-directives-feature).
According to the `@import` syntax, specifying the file extension for the imported file is not mandatory. For example, the following notation is allowed:

```less
@import 'source/lib/_lib';
@import (css) 'styles';
```

But in process of resolving the file path, the application adds the `.less` extension for the imported files in all `@import` entrees. So in the processed files, the statements from the previous example will look like following:

```less
@import 'source/lib/_lib.less';
@import (css) 'styles.less';
```

As a result, the processed files are different from the source files. So in the [client-side compilation mode](#client-side-less-compilation) or when using [grunt commands](debug.md), the application cannot use symlinks to the source files. Instead it uses the copies of processed files, and they are published to the `pub/static` directory. In case of importing CSS resources, this also results in not finding and not importing the required files.

### Import remote CSS files

If you need to import a remote CSS file in your `.less` source, use `url()` notation. For example, to import a Google font, use the following notation:

```less
@import url('//fonts.googleapis.com/css?family=Titillium+Web:400,300,200,600.css');
```

To [include the font](fonts.md) in your theme's CSS files, use the `@font-face` CSS rule for the fastest loading time.

This way the application will skip the `@import` directive while resolving paths to the local resources.

## @magento_import directive

`@magento_import` is an application-specific LESS directive that allows including multiple files by a name pattern. It is used to include files with the same name from the different locations, for example, different modules.
The standard `@import` directive includes a single file, which is found according to the [static files fallback].

`@magento_import` can be used in the root source files of a theme only.

### @magento_import rules

To include a `.less` file using the `@magento_import` directive:

1. To avoid any conflicts with the original LESS syntax, `@magento_import` must be commented out with two slashes. Otherwise, the LESS preprocessor ignores it.

   **Example:**

   ```less
   //  Comment in a LESS document

   //  Standard LESS import directive
   //  ---------------------------------------------

   @import 'source/_reset';
   @import '_styles';

   //
   //  Custom LESS import directives
   //  ---------------------------------------------

   //@magento_import 'source/_module.less'; // Theme modules
   //@magento_import 'source/_widgets.less'; // Theme widgets
   //@magento_import 'source/_extend.less'; // Extend for minor customization
   ```

1. `@magento_import` must contain the file path. The path is specified relatively to the file, where the directive is called and put in either single ('') or double quotes (""). The best practice is to specify the file extension in the path, though technically you can omit this.

### @magento_import processing

In the scope of static resources preprocessing, the built-in LESS preprocessor does the following:

1. Searches for all `@magento_import` directives.
1. Replaces the original `@magento_import` directives with the standard `@import` directives. The latter specify the paths to the particular files that correspond to the pattern specified in `@magento_import`.

Example of how `@magento_import` is used and processed in `Magento_Blank_theme_dir/web/css/styles-l.less`:

#### Before

In `Magento_Blank_theme_dir/web/css/styles-l.less` there's a following directive:

```less
..
 //@magento_import 'source/_widgets.less'; // Theme widgets
..
```

#### After

In the processed file, this results in the following:

```less
@import '../Magento_Catalog/css/source/_widgets.less';
@import '../Magento_Cms/css/source/_widgets.less';
@import '../Magento_Reports/css/source/_widgets.less';
@import '../Magento_Sales/css/source/_widgets.less';
 // Theme widgets
```

## Deploy styles for enabled modules only

<InlineAlert variant="info" slots="text"/>

This feature was introduced in 2.4.8.

By default, the core code base imports all CSS from all modules, regardless of whether modules are enabled or disabled. This can lead to unnecessarily large CSS files, which can delay browser parsing, especially for stores with many modules and custom styles. To reduce the size of the CSS output and improve browser performance, you can use the `static_content_only_enabled_modules` flag.

1. Add the following line to the top of the array in your `app/etc/env.php` or `app/etc/config.php` file:

   ```php
   return [
   'static_content_only_enabled_modules' => true,
   //...other lines
   ]
   ```

   - Set the value to `true` to deploy styles from enabled modules only to the final CSS files (`styles-l.css`, `styles-m.css`).
   - Set the value to `false` to deploy all styles, regardless of module status.

1. Update your configuration:

   ```bash
   bin/magento app:config:import
   ```

   ```bash
   bin/magento setup:upgrade
   ```

1. Re-run static content deployment (if necessary):

   ```bash
   bin/magento setup:static-content:deploy en_US --area frontend
   ```

   Replace `en_US` with the appropriate locale code if your store uses a different language.

<!-- Link definitions -->
[production application mode]:https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/setup/application-modes.html#production-mode
[LESS PHP library]: https://github.com/wikimedia/less.php
[native `less.js` library]: http://lesscss.org/usage/#using-less-in-the-browser
[fallback mechanism]: ../themes/inheritance.md#override-static-assets
[publication]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment.html
[static files fallback]: ../themes/inheritance.md#override-static-assets
