---
title: JavaScript Resources | Commerce Frontend Development 
description:
---

# JavaScript Resources in Commerce

This topic describes general concepts of how [JavaScript](https://glossary.magento.com/javascript) (JS) components are organized.

To address the problem of slow page loads, we exclude JavaScript from the page headers and we added the ability to use the [RequireJS library](http://requirejs.org).

RequireJS improves the perceived page load time because it allows JavaScript to load in the background; in particular, it enables asynchronous JavaScript loading.

## Explore resources

### Location

You can find Javascript components on the following levels:

*  [Library](https://glossary.magento.com/library) level (`lib/web`). Resources located here are available in any place within the application.
*  Module level (`<module_dir>/view/<areaname>/web`). If the [module](https://glossary.magento.com/module) is enabled, resources added here are available in other modules and themes.
*  Theme level, for a particular module (`<theme_dir>/<VendorName>_<ModuleName>/web`). Resources added here are available for [inheriting] themes.
*  Theme level  (`<theme_dir>/web`). Resources added here are available for [inheriting](../guide/themes/inheritance.md) themes.

<InlineAlert variant="info" slots="text" />

The library level can only contain core application resources. Do not put custom JS files in the \`lib/web\` directory.

### Specifying JS

We recommend specifying JavaScript resources in the templates rather than in the [layout](https://glossary.magento.com/layout) updates, to ensure that the resources are available for body of a page.

## Accessing resources

JS resources are accessed using relative paths.

**Example 1:**

*  File actual location: `app/code/Magento/ConfigurableProduct/view/frontend/web/js/configurable.js`
*  File published to `pub/static`: `pub/static/frontend/<Vendor>/<theme>/<locale>/Magento_ConfigurableProduct/js/configurable.js`. Here `<theme>` and `<locale>` are the currently applied in your instance [theme](https://glossary.magento.com/theme) and [locale](https://glossary.magento.com/locale).
*  Called in script:

    ```javascript
    require(["Magento_ConfigurableProduct/js/configurable"], function(Configurable){
    });
    ```

**Example 2:**

*  File actual location: `app/design/frontend/Magento/blank/Magento_Theme/web/js/theme.js`
*  File published to `pub/static`: `pub/static/frontend/Magento/blank/<locale>/Magento_Theme/js/theme.js`
*  Called in script:

   ```javascript
   require(["Magento_Theme/js/theme"], function(){
   });
   ```

**Example 3:**

*  File actual location: `lib/web/jquery.js`
*  File published to `pub/static`: `pub/static/<area>/<Vendor>/<theme>/<locale>/jquery.js`
*  Called in script:

    ```javascript
    require(["jquery"], function($){
    });
    ```

Relative paths are also used in for [mapping and setting `paths` in requirejs-config.js configuration files](resources.md).

## Dependencies

To build a dependency on the third-party plugin, specify a [shim](http://requirejs.org/docs/api.html#config-shim) in the following configuration files:

*  `requirejs-config.js`

    ```javascript
    var config = {
        shim: {
           "3-rd-party-plugin": ["jquery"]
        }
    };
    ```

*  `<third-party-plugin>.js`

    ```javascript
    !(function($){
        // plugin code
        // where $ == jQuery
    })(jQuery);
    ```

## RequireJS library

### Including RequireJS

To be available for the entire application instance, RequireJS library is included in the following layout files:

*  For the `adminhtml` [area](https://developer.adobe.com/commerce/php/architecture/modules/areas/):

   [app/code/Magento/Backend/view/adminhtml/layout/default.xml](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Backend/view/adminhtml/layout/default.xml)

   ```xml
    <page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" layout="admin-1column" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
        <head>
            <title>Admin</title>
            <meta name="viewport" content="width=1024"/>
            <meta name="format-detection" content="telephone=no"/>
            <!-- Here's the library included -->
            <link src="requirejs/require.js"/>
            <css src="extjs/resources/css/ext-all.css"/>
            <css src="extjs/resources/css/ytheme-magento.css"/>
        </head>
        <body>
            <attribute name="id" value="html-body"/>
            <!-- Here's the basic configuration file require_js.phtml specified -->
            <block name="require.js" class="Magento\Backend\Block\Page\RequireJs" template="Magento_Backend::page/js/require_js.phtml"/>
            <referenceContainer name="global.notices">
                <block class="Magento\Backend\Block\Page\Notices" name="global_notices" as="global_notices" template="Magento_Backend::page/notices.phtml"/>
            </referenceContainer>
            <referenceContainer name="header">
                ...
            </referenceContainer>
            <referenceContainer name="after.body.start">
                <!-- Here's the main configuration file requirejs-config.js specified -->
                <block class="Magento\RequireJs\Block\Html\Head\Config" name="requirejs-config"/>
                <block class="Magento\Translation\Block\Html\Head\Config" name="translate-config"/>
                <block class="Magento\Translation\Block\Js" name="translate" template="Magento_Translation::translate.phtml"/>
                <block class="Magento\Framework\View\Element\Js\Components" name="head.components" as="components" template="Magento_Backend::page/js/components.phtml"/>
                <block class="Magento\Framework\View\Element\Html\Calendar" name="head.calendar" as="calendar" template="Magento_Backend::page/js/calendar.phtml"/>
            </referenceContainer>
        </body>
    </page>
   ```

*  For the `frontend` area, the equivalent configuration is located in [`app/code/Magento/Theme/view/frontend/layout/default.xml`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Theme/view/frontend/layout/default.xml).

### Including third-party libraries

To include a 3rd party library and use it within the entire website (using the [Slick JS Library](https://github.com/kenwheeler/slick/) as an example):

1. Download the library and copy `slick.min.js` to the `<theme_path>/web/js` folder

1. Copy `slick.less` and `slick-theme.less` to the `<theme_path>/web/css/source` folder. Also add both files to `<theme_path>/web/css/source/_extend.less`.

   ```scss
   @import "slick.less";
   @import "slick-theme.less";
   ```

1. Create or update the theme's `requirejs-config.js` file.

   `<theme_path>/requirejs-config.js`

   ```javascript
   var config = {
    paths: {
        slick: 'js/slick.min'
    },
    shim: {
        slick: {
            deps: ['jquery']
        }
      }
   };
   ```

After these steps, clear the cache and perform a static content deployment.

#### Result

We should now be able to use the Slick library, for example, on any list that we want to convert into a slider.

```html
<ul class="my-list">
    <li>1st Element</li>
    <li>2nd Element</li>
    <li>3rd Element</li>
    <li>4th Element</li>
    <li>5th Element</li>
    <li>6th Element</li>
    <li>7th Element</li>
    <li>8th Element</li>
</ul>

<script>
   require([
      'jquery',
      'slick',
      'domReady!'
   ], function ($) {
      $(".my-list").slick({
         dots: true,
         infinite: true,
         speed: 300,
         slidesToShow: 4,
         slidesToScroll: 1
      });
   });
</script>
```

![Slick Slider](../_images/javascript/slick-slider-result.png)

### Mapping resources

To make configurations more precise and specific to different modules and themes, `requirejs-config.js` files can be placed in different [locations](#m2devgde-js-resources-configuring) depending on your needs.

All configurations are collected and executed in the following order:

1. Library configurations.
1. Configurations at the module level.
1. Configurations at the theme module level for the ancestor themes.
1. Configurations at the theme module level for a current theme.
1. Configurations at the theme level for the ancestor themes.
1. Configurations at the theme level for the current theme.

The `baseUrl` parameter for RequireJS is specified in the following files:

*  For the `frontend` area: [app/code/Magento/Theme/view/frontend/templates/page/js/require_js.phtml](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Theme/view/frontend/templates/page/js/require_js.phtml)
*  For the `adminhtml` area: [app/code/Magento/Backend/view/adminhtml/templates/page/js/require_js.phtml](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Backend/view/adminhtml/templates/page/js/require_js.phtml)
