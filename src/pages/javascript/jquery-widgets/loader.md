---
title: Loader | Commerce Frontend Development
description: Learn how to initialize and configure the Adobe Commerce and Magento Open Source Loader widget.
---

# Loader widget

The Loader widget blocks page content (all content or a part of it). Its intended use is blocking content when an Ajax request is being sent, but it can be initialized for non-Ajax tasks as well.

The Loader widget source is [lib/web/mage/loader.js].

## Initialize

For information about how to initialize a widget in a JS component or `.phtml` template, see the [Initialize JavaScript][] topic.

The following example shows how to instantiate the Loader widget:

```javascript
$('#example').loader({
    icon: 'path to icon'
});
```

Where:

-  `#element` is the selector of the element for Loader is initialized.

```html
<script>
require(['jquery', 'loader'], function ($) {
    'use strict';

    $('#example').loader({
        icon: 'path to icon'
    });
});
</script>
```

## Options

### `icon`

The URL to the loader image. This image is displayed when the widget is active; that is, between the `ajaxSend` and `ajaxComplete` events.

**Type**: String

**Default value**: No image by default.

### `template`

HTML wrapper for the output, or a DOM element selector.

**Default value**:

```html
<div class="loading-mask" data-role="loader">
    <div class="loader">
         <img alt="<%- data.texts.imgAlt %>" src="<%- data.icon %>">
        <p><%- data.texts.loaderText %></p>
    </div>
</div>
```

### `texts`

An object that contains translations for loader text:

-  `texts.loaderText`: The text that is displayed under the loader image.
   **Default value**: *'Please wait...'*
-  `texts.imgAlt`: The text that is set as the `alt` attribute value of the loader image.
   **Default value**: *'Loading...'*

## Methods

### `show()`

Show the loader.

Invoke the show method:

```javascript
$("#element").loader("show");
```

### `hide()`

Hide the loader.

Invoke the hide method:

```javascript
$("#element").loader("hide");
```

## Events

Loader is subscribed to the following events:

-  [processStart](#processStart)
-  [processStop](#processStop)

### `processStart`

Display the loader. Can be triggered on any page element.

Start show loading:

```javascript
$("body").trigger('processStart');
```

The following is an example of adding a callback to `processStart` event.

```javascript
var callback = function () {
    // do something before showing the loader
};

$("body").on('processStart', callback);
```

### `processStop`

Hide the loader. Can be triggered on any page element.

Stop show loading:

```javascript
$("body").trigger('processStop');
```

The following is an example of adding a callback to a `processStop` event.

```javascript
var callback = function () {
    // do something before hiding the loader
};

$("body").on('processStop', callback);
```

## Code Sample

The following example shows the loader when a `processStart` event triggers for the `#loader-example` element.

```html
<div id="loader-example" data-mage-init='{"loader": { "icon": "{store URL}/static/{static version}/frontend/Magento/luma/en_US/images/loader-2.gif"}}'>
    <h3>Block</h3>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos itaque numquam placeat quam recusandae velit voluptas. Ad architecto asperiores eos eveniet id nostrum officiis saepe soluta totam voluptate! Debitis, quibusdam.
</div>
<script>
require(['jquery', 'loader', 'domReady!'], function ($) {
    'use strict';

    $('#loader-example').trigger('processStart');
});
</script>
```

## Result

The loader shows when a `processStart` event triggers for the `#loader-example` element.

![Loader Widget Example](../../_images/javascript/loader-widget-result.png)

[lib/web/mage/loader.js]: https://github.com/magento/magento2/blob/2.4/lib/web/mage/loader.js
[Initialize JavaScript]: ../init.md
