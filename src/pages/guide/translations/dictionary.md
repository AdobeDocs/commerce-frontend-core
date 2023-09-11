---
title: Custom String Dictionary | Commerce Frontend Development
description: Learn how Adobe Commerce and Magento Open Source themes search for strings and translate them.
---

# Use a dictionary to customize strings

Modify default strings in your custom theme to load and use [translation dictionaries]. Learn more about locales, modifying strings, and how the application searches and applies translations.

## How the application applies locales

When the locale is changed for a store, the application searches and applies translations in the corresponding dictionaries in the following sequence:

1. Module translations: `<module_dir>/i18n/`
1. Translation package: `app/i18n/`
1. Theme translations:
   1. `<parent_theme_dir>/i18n/` (iterated through all ancestor themes)
   1. `<current_theme_dir>/i18n/`
1. The database (translations located in this database take precedence and override translations stored in other locations.)  Refer to the [user guide](https://docs.magento.com/m2/ce/user_guide/system/translate-inline.html) for more information.

<InlineAlert variant="info" slots="text"/>

Translation priority follows the inverse sequence, with "module translations" having the lowest priority and  "database" having the highest priority.

If there are competing translations for one string, the theme dictionary translations have priority over the module translations, and child theme translations have priority over parent theme translations.

## Override parent strings for default locale

The translations priority described earlier is applied for the default `en_US` locale as well. So you can use the `en_US.csv` dictionary to customize the strings used in the default locale.

For example, this approach is used in the Luma theme. It has the [`<Magento_Luma_theme_dir>/i18n/en_US.csv`] file, where the left column contains the default values (keys), and the right column contains the values to be used instead when the Luma theme is applied:

```text
"Add to Wish List", "Wish List"
"Add to Compare", "Compare"
"Your Checkout Progress", "Checkout Progress"
"Card Verification Number", "CVV"
```

It is important to remember that if you generate a dictionary for your theme using the [i18n tool] with the conventional names and locations for the dictionary, the existing dictionary gets overwritten.

To add custom strings:

1. [Generate the dictionary] for your theme.
1. Change the necessary values in the right column.
1. Add custom strings as rows if the strings you want to replace are not in the dictionary.

The i18n tool does not create a dictionary if the theme files do not contain strings for translation. In this case, add the file manually.

See the [Example theme translation dictionary] topic for the practical illustration of the procedure.

## Create locale dictionaries

When creating locale dictionaries for your theme, use the default strings as keys. Do not create translations using the custom keys you may have created and overwritten in your default locale dictionary.

Continuing the previous example with the Luma theme, we changed "Add to Wish List" to "Wish List" in `en_US.csv`. In the `de_DE.csv` dictionary, use the original, default key of "Add to Wish List" to enter your translation. Do not use the custom value "Wish List" for translations.

The locale dictionary would use the default values (keys) in the left column followed by the translation:

```text
"Add to Wish List", <translation>
"Add to Compare", <translation>
"Your Checkout Progress", <translation>
"Card Verification Number", <translation>
```

[translation dictionaries]: index.md#terms
[`<Magento_Luma_theme_dir>/i18n/en_US.csv`]: https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/luma/i18n/en_US.csv
[i18n tool]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html
[Generate the dictionary]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html
[Example theme translation dictionary]: practice.md
