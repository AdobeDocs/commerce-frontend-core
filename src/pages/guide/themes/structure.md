---
title: Theme Structure | Commerce Frontend Development
description: Use this reference to learn how Adobe Commerce and Magento Open Source themes are structured.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Theme structure

A [design theme](index.md) is an important part of the application. This topic describes the file structure of a theme.

## Location

Storefront themes are conventionally located under `app/design/frontend/<Vendor>/`. Though technically they can reside in other directories. For example, built-in themes can be located under `vendor/magento/theme-frontend-<theme_code>` when a instance is deployed from the Composer repository.

Each theme must be stored in a separate directory:

```tree
app/design/frontend/<Vendor>/
├── <theme1>
├── <theme2>/
├── <theme3>
├--...
```

## Components

The structure of a theme directory typically would be like following:

```tree
<theme_dir>/
├── <Vendor>_<Module>/
│   ├── web/
│   │   ├── css/
│   │   │   ├── source/
│   ├── layout/
│   │   ├── override/
│   ├── templates/
├── etc/
├── i18n/
├── media/
├── web/
│   ├── css/
│   │   ├── source/
│   ├── fonts/
│   ├── images/
│   ├── js/
├── composer.json
├── registration.php
├── theme.xml
```

Let's have a closer look at each particular sub-directory.

<InlineAlert variant="info" slots="text"/>

The directories and files structure described below is the most extended one. It may not coincide with the structure of your store.

|Directory|Required|Description|
|--- |--- |--- |
|`/<Vendor>_<Module>`|optional|Module-specific styles, layouts, and templates.|
|`/<Vendor>_<Module>/web/css/`|optional|Module-specific styles (`.css` and/or `.less` files). General styles for the module are in the _module.less file, and styles for widgets are in `_widgets.less`.|
|`/<Vendor>_<Module>/layout`|optional|Layout files which extend the default module or parent theme layouts.|
|`/<Vendor>_<Module>/layout/override/base`|optional|Layouts that override the default module layouts.|
|`/<Vendor>_<Module>/layout/override/<parent_theme>`|optional|Layouts that override the parent theme layouts for the module.|
|`<Vendor>_<Module>/templates`|optional|This directory contains theme templates which override the default module templates or parent theme templates for this module. Custom templates are also stored in this directory.|
|`/etc/view.xml`|required for a theme, but optional if it exists in the parent theme|This file contains configurations for all storefront product images and thumbnails. It also contains product page, gallery widget configurations such as navigation options, fullscreen options and breakpoint conditions.|
|`/i18n`|optional|`.csv` files with translations.|
|`/media`|optional|This directory contains a theme preview (a screenshot of your theme).|
|`/web`|optional|Static files that can be loaded directly from the frontend.|
|`/web/css/source`|optional|This directory contains theme LESS configuration files that invoke mixins for global elements from the UI library, and `theme.less` file which overrides the default variables values.|
|`/web/css/source/lib`|optional|View files that override the UI library files stored in `lib/web/css/source/lib`|
|`/web/fonts`|optional|Contains theme fonts and customized icons.|
|`/web/images`|optional|Images that are used in this theme.|
|`/web/js`|optional|Theme JavaScript files.|
|`/composer.json`|optional|Describes the theme dependencies and some meta-information. Will be here if your theme is a Composer package. The "name" field must be in the format `<vendor-name>/theme-<area>-<theme-name>`.|
|`/registration.php`|required|Required to register your theme in the system.|
|`/theme.xml`|required|The file is mandatory as it declares a theme as a system component. It contains the basic meta-information, like the theme title and the parent theme name, if the theme is inherited from an existing theme. The file is used by the system to recognize the theme.|

## Files

Apart from the configuration file and theme metadata file, all theme files fall into the following two categories:

*  Static view files
*  Dynamic view files

### Static view files

A set of theme files that are returned by the server to a browser as is, without any processing, are called the *static files* of a theme.

Static files can be located in a theme directory as follows:

```tree
<theme_dir>/
├── media/
├── web
│   ├── css/ (except the "source" sub-directory)
│   ├── fonts/
│   ├── images/
│   ├── js/
```

The key difference between static files and other theme files is that static files appear on a web page as references to the files, while other theme files take part in the page generation, but are not explicitly referenced on a web page as files.

Static view files that can be accessed by a direct link from the storefront, are distinguished as public theme files.

<InlineAlert variant="info" slots="text"/>

To be actually accessible for browsers public static files are [published](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment.html#config-cli-static-overview) to the `/pub/static/frontend/<Vendor>/<theme>/<locale>/css/` directory.

### Dynamic view files

View files that are processed or executed by the server in order to provide result to the client. These are: `.less` files, templates, and layouts.

Dynamic view files are located in a theme directory as follows:

```tree
<theme_dir>/
├── <Vendor>_<module>/
│   ├── web/
│   │   ├── css/
│   │   │   ├── source/
│   ├── layout/
│   │   ├── override/
│   ├── templates/
├── web/
│   ├── css/
│   │   ├── source/
```
