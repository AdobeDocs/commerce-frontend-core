---
title: Translations | Commerce Frontend Development
description: Review introductory information about how translations work in Adobe Commerce and Magento Open Source themes.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Translations

The application enables you to localize your store for multiple regions and markets. We improved the localization and customization of instances by making translation dictionaries easier to update and by maintaining a reduced amount of code coupling and duplication.

Also, we accept [contributions](#open-source-translations-project) using CrowdIn for translations. The project may include package creation and further support using the contributed translations.

## Terms

A *translation dictionary* is a comma-separated value (.csv) file with at least two columns: the original phrase in the `en_US` locale and a translation of that phrase in an another locale. Sample translation from English (`en_US`) to German (`de_DE`):

```text
"Add to Cart","Zum Warenkorb hinzufügen"
"Add to Compare","Hinzufügen um zu vergleichen"
"Add to Wishlist","Zum Wunschzettel hinzufügen"
"Additional Product Info","Zusätzliche Angaben zum Produkt"
"Address","Adresse"
"Address %1 of %2","Adresse %1 von %2"
```

*UI text strings* are the text elements in the Admin, including field names, instructions, notifications, and table and grid labels. When localizing, you replace these strings with translation dictionary content.

A *language package* is basically a collection of translation dictionaries for a particular language together with meta-information. You can also distribute language packages to other merchants if you wish. [More information about language packages](#language-packages).

<InlineAlert variant="info" slots="text"/>

To create a language package, the `.csv` file requires additional columns that specify the themes or modules in which the translations were found. For more information, see [Generate a translation dictionary].

## Benefits

Localizing storefronts and the Admin panel gives your company global presence for support and sales.

*  The application supports two types of language packages:

   *  Translated Module and theme packages.

      The application auto-discovers packages included in the `i18n` directory of a module or theme. When installing themes and extensions, consider checking for multiple language versions to download and use.

   *  An entire dictionary in one directory.

      Use and distribute the dictionary as a standalone component (similar to modules and themes).

*  Customize the default strings. For example, changing "Add to Wish List" to "Wish List".
*  Use ready-to-use language packages prepared by other users or create your own. The [Commerce Marketplace] offers language packs to download and install.
*  Localize strings based on existing, or parent, translations using [language inheritance].
*  Customize your translations further by creating more than one version of a translation for the same language to cover dialects and different phrasing.
*  Contribute to [translations](#open-source-translations-project) through [CrowdIn project] with Community Engineering. We encourage translation contributions and efforts in the project for future language packs.

Depending on your needs, you can use the existing language packages, translate by yourself, or contribute.

## Programming notes

*  It is recommended, but not enforced, that you do not place variables inside `__()` functions or `new Phrase()` calls. The scanner that collects the phrases from the code cannot interpret and collect the value of the variable when it is in these locations. Instead, you should place the full text in the `__()` function or `new Phrase()` call. If you need to specify a variable in these cases, ensure that it is translated correctly wherever it is defined as a string literal.
*  The language package (`i18n` directory) can be saved to any directory of your extension.
*  The phrases for translations are enabled in the [Phrase] class.

## Theme dictionaries

You might need to add a dictionary for the default language (en_US) in the following cases:

*  To replace or customize strings in the [parent theme]. For example, use "Compare" instead of "Add to Compare".
*  To prepare your theme for localization. More merchants may use your theme if it supports localization.

For an example of creating a dictionary for a theme for both cases, see [Example theme translation dictionary].

## Manually translation

To translate names, titles, and phrases:

1. Generate a dictionary of your instance using the [translation dictionary tool]. Fully review [Translation dictionaries and packages] to understand all steps, commands, and best practices for generating the dictionary.
1. Translate the terms.
1. If desired, package your translations in a [language package].

<InlineAlert variant="info" slots="text"/>

Only one variant of translation can be used for a word or phrase in a package. Otherwise, the application returns an error.

Anyone can submit inline translations on the storefront using the Text Editor. These inline translations overwrite a dictionary and save to your database (not in an instance's dictionary). Inline translations are theme-specific and do not apply if another theme is assigned.

To save and reuse translations, we recommend localizing in a dictionary.

## Translation dictionaries

The application translates words and phrases when all of the following conditions are met:

*  The code base has the necessary translation dictionaries for a language.
*  This language is configured by the store administrator to be used in specified scope (that is, storefront).

The application automatically assembles translation dictionaries located in the modules' `i18n` directory into a dictionary per language. For example, Brazilian Portuguese (`pt_BR`) translation dictionaries might be located in module and theme directories similar to the following:

*  `<Magento_Checkout_module_dir>/i18n/pt_BR.csv`
*  `<Magento_Checkout_module_dir>/<theme>/i18n/pt_BR.csv`

<InlineAlert variant="info" slots="text"/>

`<Magento_Checkout_module_dir>` stands for the `Magento_Checkout` module directory. The location of this directory depends on the way the application was installed. See [Conventional notations for paths to modules and themes] for details.

Assembling the preceding `pt_BR.csv` files across all modules and the current theme results in a Portuguese translation of the entire application area (storefront or the Admin).

### Dictionary generator tool

You can generate a translation dictionary to use by itself (for example, to translate words and phrases in a custom module) or for use by a language package. For more information, see [dictionary generator tool - We intend to publish more information on this technique at a later time].

## Language packages

<InlineAlert variant="success" slots="text"/>

Existing language packages can be installed using [Composer](https://experienceleague.adobe.com/en/docs/commerce-cloud-service/user-guide/configure-store/extensions) like any other extension. You can search for package names on Packagist.

The application enables you to create the following types of language packages:

*  A set of `.csv` files for modules and themes. These packages files are intended to be deployed in modules. For example:

   ```tree
   __/app
    |__/code
    | |__/Magento
    |   |__/Catalog
    |   | |__/i18n
    |   |   |-- pt_BR.csv
    |   |__/Checkout
    |   | |__/i18n
    |   |   |-- pt_BR.csv
    |   |__/Customer
    |     |__/i18n
    |       |-- pt_BR.csv
    |__/design
      |__/frontend
        |__/<Vendor>
          |__/<theme>
            |__/i18n
              |-- pt_BR.csv
   ```

*  Language packages that contain a entire dictionary in one directory.

   You can distribute this language package as a standalone component (similar to modules and themes). Interestingly, it violates modularity principles on purpose; that is, so that a system integrator can translate variations provided by extensions.

In addition to the `.csv` file that contains the language dictionary, the language package contains meta-information:

*  `composer.json` that contains any dependencies for the language package and a mapping to its defined locale. [Sample composer.json](https://developer.adobe.com/commerce/php/development/package/component/#sample-composerjson-file).

*  `language.xml`, in which you declare a language package.
   [Sample language.xml](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html#example%3A-create-a-language-package).

## Open-source translations project

The Community Engineering team accepts translation contributions through the [CrowdIn project] to localize all UI strings. Various Meet Magento and Contribution Day events include developers contributing translations.

1. Create a [CrowdIn account] and join the [CrowdIn project].
1. Browse and select a language. A percentage displays tracking translation progress overall and per section of the Admin.
1. Expand and locate an area of UI text strings to translate. Strings marked red need a translation, and marked green have existing translations.
1. Enter or review translations for strings as described in the [CrowdIn knowledge base].

Admins will review and approve translations as available. The project may include package creation and further support using the contributed and approved translations.

If you need help understanding the context or meaning of a UI string, or have questions about the project, chat with us in the Community Engineering [Translations Slack channel]. To join, send a request to [engcom@magento.com] or [self signup].

[Generate a translation dictionary]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html
[language inheritance]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html#create-directories-and-files
[parent theme]: ../themes/inheritance.md
[Example theme translation dictionary]: practice.md
[translation dictionary tool]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html
[language package]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html#create-a-language-package
[dictionary generator tool]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html
[Translation dictionaries and packages]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html
[CrowdIn account]: https://crowdin.com/join
[CrowdIn knowledge base]: https://support.crowdin.com/online-editor
[engcom@magento.com]: mailto:engcom@magento.com
[self signup]: https://opensource.magento.com/slack
[Translations Slack channel]: https://magentocommeng.slack.com/archives/CD97DKBHS
[Commerce Marketplace]: https://marketplace.magento.com/catalogsearch/result/?q=language%20packs#q=language%20pack&idx=m2_cloud_prod_default_products&p=0&nR%5Bvisibility_search%5D%5B%3D%5D%5B0%5D=1
[Conventional notations for paths to modules and themes]: ../conventions.md
[Example theme translation dictionary]: practice.md
