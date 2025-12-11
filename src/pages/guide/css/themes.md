---
title: Include CSS | Commerce Frontend Development
description: Follow these best practices for structuring stylesheets in Adobe Commerce and Magento Open Source themes.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Include CSS

In the application, CSS files are included in [layout files](../layouts/index.md).

Technically there is an option to include them in template files, but we strongly recommend avoiding this.

<InlineAlert variant="info" slots="text"/>

The CSS class names can be assigned in both templates and layouts.

This topic describes how stylesheets are located by default in the application file system, and the recommended way to include CSS files in layouts.

## How stylesheet files are organized

Conventionally, CSS and Less files are stored only in themes. Module directories do not contain any default styles.

In a [theme directory][], stylesheets are stored in the following locations:

Directory relative to `<THEME_DIR>` | Description
---------|----------
 `/<Namespace>_<Module>/web/css` | Module-specific styles. |
 `/web/css` | Contains the following:\<br/\>`print.less`: Used to generate styles for the printed version of store pages.\<br /\>`_styles.less` - A composite file, which includes all Less files used in the theme. The underscore sign (`_`) in a file name conventionally means that a file is not used independently, but is included in other files.\<br /\>`styles-m.less`: Used to generate mobile-specific styles, includes `_styles.less`.\<br /\>`styles-l.less`: Used to generate desktop-specific styles, includes `_styles.less`.\<br /\>`/source`: This subdirectory contains LESS configuration files that invoke mixins from the UI library.\<br /\>`/source/_theme.less`: Overrides the default UI library variables values.

## Include CSS

In the application, the recommended way to include stylesheets is to specify them in layout files.

Usually, the stylesheets you include should be available for all store pages. To achieve this, include your CSS in `default_head_blocks.xml` of the `Magento_Theme` module, which defines the default `<head>` page section for all pages.
The recommended way to do this is adding an [extending](../layouts/extend.md) `default_head_blocks.xml` in your theme, and including the required stylesheets in this file.

Your custom `default_head_blocks.xml` should be located as follows:

`<theme_dir>/Magento_Theme/layout/default_head_blocks.xml`.

To include a CSS file, add the `<css src="<path>/<file>" media="print|<option>"/>` block in `<head>` section in a layout file. `<path>` is specified relative to the theme web directory (`<theme_dir>/web`)

For example, to include `<theme_dir>/web/css/custom.css`:

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <head>
        <css src="css/custom.css" rel="stylesheet" type="text/css"  />
    </head>
</page>
```

The following illustrates how stylesheets are included in the default Blank theme:

[`/Magento_Theme/layout/default_head_blocks.xml`]

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <head>
        <css src="css/styles-m.css" />
        <css src="css/styles-l.css" media="screen and (min-width: 768px)"/>
        <css src="css/print.css" media="print" />
    </head>
</page>
```

To include an external CSS file, add `<css src="URL to External Source" src_type="url" rel="stylesheet" type="text/css" />`.

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <head>
        <css src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css"  src_type="url" rel="stylesheet" type="text/css"  />
    </head>
</page>
```

<InlineAlert variant="info" slots="text"/>

If the system does not find the included CSS files, it searches for the same file names with a `.less` extension. This is part of the built-in preprocessing mechanism. You can find more information about it in the [CSS Preprocessing] topic.

[layout files]: ../layouts/index.md
[theme directory]: ../themes/structure.md
[CSS Preprocessing]: preprocess.md
