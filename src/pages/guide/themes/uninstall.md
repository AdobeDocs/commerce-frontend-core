---
title: Uninstall a Storefront Theme | Commerce Frontend Development
description: Learn how to uninstall Adobe Commerce and Magento Open Source themes.
keywords:
  - Install
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Uninstall a storefront theme

This topic describes how to uninstall a storefront theme.

The way a theme should be uninstalled is defined by two factors:

*  The way the theme was added: manually added (installed or created), installed as composer package or as an extension.
*  The way the application was installed: [using the source files from GitHub](https://devdocs.magento.com/guides/v2.4/install-gde/install/cli/install-cli-sample-data-clone.html) or [using Composer](https://devdocs.magento.com/guides/v2.4/install-gde/install/cli/install-cli-sample-data-composer.html).

The following sections describe the flow for uninstalling themes in each case.

## Prerequisites

1. [Set your application to the developer or default mode](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/set-mode.html).
1. Make sure that the theme is not applied on the storefront. To do this, in the Admin panel navigate to **Content** > Design > **Configuration** and make sure that your custom theme is not applied for any store view.
1. Make sure that the theme is not defined as a parent for any registered theme. To do this, in the Admin panel, navigate to **Content** > Design > **Themes**. Make sure that your theme is not mentioned in the **Parent Theme** column. If it is mentioned, you need to uninstall the child theme first.

## Uninstall a manually added theme

In case if your theme was created or installed manually, the uninstall procedure is the same, regardless of the way that the application was installed.

To uninstall a manually added theme:

1. Navigate to the vendor directory where the theme was installed. This directory should be: `<installation dir>/app/design/frontend/<VendorName>`.
1. Remove the theme directory.
1. Remove the theme record from database. If you are using MySQL, run the following command to do this:

```bash
mysql -u <user> -p -e "delete from <dbname>.theme where theme_path ='<Vendor>/<theme>' AND area ='frontend' limit 1"
```

Where:

*  `<user>`: your database username
*  `<dbname>`: your database name
*  `<Vendor>/<theme>`: relative path to the theme directory

## Uninstall a theme package

The flow for uninstalling a theme that is Composer package is different, depending on the way your instance was installed.

### Composer-based installations

If both the theme and the instance were installed using Composer, you can use a special CLI command. Follow the instructions from the [Uninstall themes Composer package](https://devdocs.magento.com/guides/v2.4/install-gde/install/cli/install-cli-theme-uninstall.html) topic.

### Git-based installations

To uninstall a theme Composer package if your instance was installed by cloning the Git repository, you can also uninstall it using a CLI command. However, you must first remove it from the list of dependencies.

Take the following steps:

1. Open the `<installation dir>/composer.json` file.
1. Find a line with a reference to theme package and delete it. The reference would look like following:

   ```json
   "require": {
    ...
       "<vendor>/<theme-name>": "<version>"
   },
   ```

1. To update the project dependencies, run:

   ```bash
   composer update
   ```

1. Use the `magento theme:uninstall` CLI command as described in the [Uninstall themes Composer package](https://devdocs.magento.com/guides/v2.4/install-gde/install/cli/install-cli-theme-uninstall.html) topic.

<InlineAlert variant="info" slots="text"/>

You can use the Composer remove command to remove the dependency, but in that case, you must delete the theme record from the database manually.

## Uninstall a theme extension

If the theme was installed as an extension, you can uninstall it the same way that theme Composer packages are uninstalled, see the [Uninstall a theme package](#composer-based-installations) section for details.
