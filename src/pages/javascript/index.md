---
title: Introduction to JavaScript | Commerce Frontend Development 
description: Learn how Adobe Commerce and Magento Open Source frontend developers use JavaScript to customize the storefront and Admin applications.
---

# Introduction to JavaScript

By default, the application uses the [RequireJS file and module loader] to optimize the time of loading pages with included JavaScript files, and to manage dependencies of JavaScript resources.

For information about how JS resources are located and configured, see the [JavaScript resources] topic in the Configuration Guide.

## What's in this guide

Topics of this book describe the following:

-  [JavaScript initialization] - how to initialize JavaScript components and widgets in JavaScript files and `.phtml` templates
-  [Use custom JavaScript] - how to extend or replace default JavaScript components/widgets.
-  [Locate JavaScript] components - how to define which components (scripts) are used on a particular store page.
-  [jQuery widgets] - jQuery widget API documentation.
-  [Customizing JavaScript illustration] - practical illustration of custom widgets related tasks.

JavaScript automatic testing is described in a separate [JavaScript unit testing] topic.

## Terms used

| Term                                  | Description                                        |
| ------------------------------------- |--------------------------------------------------- |
| *JavaScript component (JS component)* | Any separate `.js` file decorated as [AMD module]. |
| *Ui component*                        | JS component located in the `Magento_Ui` module, in the [app/code/Magento/Ui/view] directory, or JS component that extends files from this module. |
| *jQuery UI widget*                    | A JS component/widget provided by the [jQuery UI library]. |
| *jQuery widget*                       | Custom widget created using jQuery UI Widget Factory and decorated as AMD module. Many JS components are the jQuery widgets. |

[AMD module]: http://requirejs.org/docs/whyamd.html#amd
[`Magento_Ui`]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui
[app/code/Magento/Ui/view]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view
[jQuery UI library]: https://github.com/magento/magento2/blob/2.4/lib/web/jquery/jquery-ui-1.9.2.js
[jQuery Widget]: https://jqueryui.com/widget/

[RequireJS file and module loader]: http://requirejs.org/
[JavaScript resources]: resources.md

[JavaScript initialization]: init.md
[Use custom JavaScript]: custom.md
[Locate JavaScript]: debug.md
[jQuery widgets]: jquery-widgets/index.md
[Customizing JavaScript illustration]: practice.md
[JavaScript unit testing]: https://developer.adobe.com/commerce/testing/guide/js/
