---
title: Form Validation | Commerce Frontend Development
description: Review introductory information about form validation in Adobe Commerce and Magento Open Source themes.
contributor_name: Adarsh Manickam
contributor_link: https://github.com/drpayyne
---

# Form validation

The application provides various ways to validate your form inputs. This implementation is based, and extends, [jQuery Validation](https://jqueryvalidation.org/documentation).

## Validation module structure

There are three main validation modules: `jquery/validate`, `mage/validation`, and `mage/validation/validation`.

### `jquery/validate`

This is an alias for [`lib/web/jquery/jquery.validate`](https://github.com/magento/magento2/blob/2.4/lib/web/jquery/jquery.validate.js). This is the base validation JavaScript file provided by jQuery that the application extends.

### `mage/validation`

This module is present at [`lib/web/mage/validation.js`](https://github.com/magento/magento2/blob/2.4/lib/web/mage/validation.js). This module includes `jquery/validate` and adds various functions, such as `$.validator.addMethod`, which can be used by mixins to add custom validation rules, a base set of rules to validate, the `mage.validation` widget, and more.

### `mage/validation/validation`

This module is present at [`lib/web/mage/validation/validation.js`](https://github.com/magento/magento2/blob/2.4/lib/web/mage/validation/validation.js). This is considered the entry point for the form validator and is aliased as `validation` at [`Magento_Theme/view/frontend/requirejs-config.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Theme/view/frontend/requirejs-config.js#L29). This includes `mage/validation` (which in turn includes `jquery/validate`), and adds a few more rules to the validator.
