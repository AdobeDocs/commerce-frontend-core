---
title: Apply an Admin Theme | Commerce Frontend Development
description: Learn how to apply an Admin theme to the Adobe Commerce and Magento Open Source Admin user interfaces.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Apply an Admin theme

This topic describes how to apply your custom theme for Admin.

## Prerequisites

1. [Set](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/set-mode.html) your application to the developer [mode](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/setup/application-modes.html). The application mode influences the way static files are cached.
1. [Create a custom theme for the Admin panel](create-admin.md).
1. [Add a new custom module](https://developer.adobe.com/commerce/php/development/build/) or decide to use existing custom module. The module must load after the Magento_Theme module. To ensure this, add the following code in `<your_custom_module_dir>/etc/module.xml` (replace placeholders with your module information):

   ```xml
   <module name="%YourVendor_YourModule%" setup_version="2.0.1"> <!-- Example: "Magento_Backend" -->
      <sequence>
         <module name="Magento_Theme"/>
         <module name="Magento_Enterprise"/> <!-- For Enterprise versions only -->
      </sequence>
   </module>
   ```

<InlineAlert variant="info" slots="text"/>

If you choose to create a separate dedicated module, you can use the [Magento_SampleMinimal module from the sample modules repository](https://github.com/magento/magento2-samples/tree/master/sample-module-minimal) as example of a minimal module you need. If you will copy and use Magento_SampleMinimal, do not forget to enter your vendor and module naming, instead the ones used in the sample, in the `<your_module_dir>/etc/module.xml`, `<your_module_dir>/registration.php`, `and <your_module_dir>/composer.json` files.

If you decide to use the existing module, keep in mind, that theme declaring might be affected when the module is changed.

## Apply a custom theme in Admin: Overview

To apply the Admin theme, take the following steps:

1. [Specify the new Admin theme in your module's `di.xml`](#specify-the-custom-admin-theme-in-dixml)
1. Update the components by running the [`bin/magento setup:upgrade`](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/uninstall) command.
1. Open the Admin in browser and view the new theme applied.

Each step is described further with more details.

## Specify the custom Admin theme in `di.xml`

You need to specify the admin theme to be used in the `<your_module_dir>/etc/di.xml` file. Add it, if the file does not yet exist in your module.

In `<your_module_dir>/etc/di.xml` add the following (replace the placeholders with the vendor name and theme code of your Admin theme):

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">

    <!-- Admin theme. Start -->
    <type name="Magento\Theme\Model\View\Design">
        <arguments>
             <argument name="themes" xsi:type="array">
                 <item name="adminhtml" xsi:type="string">%Your_vendor_dir%/%your_theme_code%</item> <!-- Example: "Magento/backend" -->
             </argument>
         </arguments>
    </type>
    <!-- Admin theme. End -->
</config>
```

## Update components to apply the Admin theme

For your changes to take effect, you need to update components. For this,
run the `bin/magento setup:upgrade` command in your command line. If prompted, also run `bin/magento setup:di:compile`. Then run `bin/magento cache:clean` to clear the cache.

For details about performing command line tasks, view the following topics:

-  [Command line configuration](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/config-cli.html)
-  [Uninstall or reinstall the application: Optionally keeping generated files](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/database-upgrade)

## Open Admin in browser

The last step is to open the Admin in browser and view the new theme applied.
