---
title: Custom Knockout.js bindings | Commerce Frontend Development
description: Learn about the Knockout.js binding syntax for HTML templates in Adobe Commerce and Magento Open Source.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Custom Knockout.js bindings

This topic lists the custom [Knockout.js](http://knockoutjs.com/) bindings used in the core application files. These bindings can also be used by third-party developers.

## Aliases

The standard way to reference a knockout.js binding is using the `data-bind` attribute: `[data-bind="%binding_name%: %value%"]`. You can also use aliases to declare bindings. Some bindings may be defined as attributes (`[%binding_alias%="%value%"]`) or nodes (`%binding_alias% args="%value%">`).

## Binding values

Apart from the value type specified for each binding, every value may be wrapped in Knockout's observable.

## Custom bindings

### `afterRender`

The `afterRender` binding notifies its subscriber when an associated element is inserted into the DOM.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/after-render.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/after-render.js).

**Value type**: `(element: Element, viewModel: Object) => void`.
Function that is invoked after the element is rendered.

**Aliases**: `[afterRender]`

**Usage example**:

```html
<div afterRender="function (target, viewModel) {
    console.log('Rendered element:', target);
    console.log('Associated view model:', viewModel);
    console.log(this === viewModel);
}"></div>
```

### `autoselect`

The `autoselect` binding automatically highlights the text in an input element, when it gets focus.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/autoselect.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/autoselect.js).
**Value type**: Boolean

Defines whether the binding is enabled (`true`) or disabled (`false`).

**Aliases**: `[autoselect]`

**Usage example**:

```html
<!-- as an attribute -->
<input type="text" autoselect/>

<!-- in a standard KO form -->
<input type="text" data-bind="autoselect: true"/>
```

### `bindHtml`

The `bindHtml` binding renders the provided string, as a collection of HTML elements, inside of the associated node.

It also instantiates all bindings defined for the rendered elements in the scope of the current [view model](http://knockoutjs.com/documentation/observables.html).

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/bind-html.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/bind-html.js).

**Value type**: String

**Aliases**: `[bindHtml]`

**Usage example**:

```html
<div bindHtml="
    <div data-bind='text: \'String from the text binding\''></div>
"></div>
```

### `collapsible`

The `collapsible` binding provides methods and properties required for implementing collapsible panels. It can automatically collapse panel when clicking outside of the associated node, toggle optional CSS class when node changes its visibility. It has additional helper bindings: `toggleCollapsible`, `openCollapsible` and `closeCollapsible`.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/collapsible.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/collapsible.js).

**Value type**: Object

Binding's configuration that may include the following properties:

| Property       | Description                                                                                                                                                                                | Type    | Default        |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|----------------|
| `as`           | A key for accessing the binding in the current scope.                                                                                                                                      | String  | `$collapsible` |
| `closeOnOuter` | Whether the panel needs to be closed on outside boundaries click.                                                                                                                          | Boolean | `true`         |
| `onTarget`     | Toggles panel's visibility on the target node click.                                                                                                                                       | Boolean | `false`        |
| `openClass`    | CSS class that is added to or removed from the target node, when the panel changes visibility. If the option values is left empty, then the binding does not modify the element's classes. | String  | `_active`      |

**Aliases**: `[collapsible]`

**Usage example**:

```html
<div data-mage-init='{"collapsible":{"openedState": "active", "saveState": true}}'>
    <div data-role="title">
        Title
    </div>
    <div data-role="content">
        Collapsible content
    </div>
</div>
```

### `colorPicker`

The `colorPicker` binding is a part of the ColorPicker component.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/color-picker.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/color-picker.js)

**Value type**: Object

**Aliases**: [colorPicker]

**Usage example**:

```html
<input type="hidden" data-bind="colorPicker: config">

<input type="hidden" colorPicker="config">
```

### `datepicker`

The `datepicker` binding is an adapter for the [mage/calendar.js](../../javascript/jquery-widgets/calendar.md) widget.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/datepicker.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/datepicker.js)

**Value type**: String\|Object

**Aliases**: -

**Usage example**:

```html
<input type="text" data-bind="datepicker: value"/>
```

### `fadeVisible`

The `fadeVisible` binding performs the gradual change of the element's visibility  (with an animation effect).

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/fadeVisible.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/fadeVisible.js).

**Value type**: Boolean

Defines whether the element is visible (`true`) or hidden (`false`).

**Aliases**: -

**Usage example**:

```html
<div data-bind="fadeVisible: isVisible">Foo Bar</div>
<button click="function () { isVisible(!isVisible()); }">Toggle</button>
```

### `i18n`

The `i18n` binding is used to translate a string according to the currently enabled locale. Additionally, it creates the necessary elements for the Translate Inline jQuery widget, if it's enabled on the page.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/i18n.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/i18n.js).

**Value type**: `string`

**Aliases**: `[translate]`, `<translate>`

**Usage example**:

```html
<!-- ko i18n: 'Translate using the virtual element' --><!-- /ko -->

<div data-bind="i18n: 'Translate using the standard knockout binding'"></div>

<div translate="'Translate using the attribute'"></div>

<translate args="'Translate using the tag'"></translate>
```

### `keyboard`

The keyboard binding allows setting up listeners for the `keypress` event of a specific key.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/keyboard.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/keyboard.js).

**Value type**:`[name: number]: (e: KeyboardEvent) => void`

A collection in which keys represent keyboard keys codes and values are callback functions invoked when the associated key is pressed.

**Aliases**: `[keyboard]`

**Usage example**:

```html
<input type="text" keyboard="{
    13: function (e) {
        console.log('Enter key has been pressed!');
    }
}"/>
```

### `mageInit`

The `mageInit` binding is an adapter for the `[data-mage-init]` attribute that is used to initialize jQuery widgets on the associated element.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/mage-init.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/mage-init.js).

**Value type**: `[path: string]:` Object

**Aliases**: -

**Usage example**: creating modal window

```html
<div mageInit="{
    'Magento_Ui/js/modal/modal': {
        autoOpen: true,
        buttons: false,
        modalClass: 'modal-system-messages',
        title: 'Hello world!'
    }
}"></div>
```

### `optgroup`

The `optgroup` binding is a decorator for the standard Knockout's options binding which adds the support of nested options, and renders them as the `<optgroup>` element.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/optgroup.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/optgroup.js).

**Value type**: `Array<string>` \| `Array<Object>`

**Aliases**: -

**Usage example**:

```html
<select data-bind="
    optionsValue: 'value',
    optionsText: 'label',
    optgroup: [{
        label: 'Swedish Cars',
        value: [{
            label: 'Volvo',
            value: 'volvo'
        }, {
            label: 'Saab',
            value: 'saab'
        }]
    }, {
        label: 'German Cars',
        value: [{
            label: 'Mercedes',
            value: 'mercedes'
        }]
    }]"></select>
```

### `outerClick`

The `outerClick` binding allows to subscribe for the "click" event that happens outside of the boundaries of the associated element.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/outer_click.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/outer_click.js).

**Value type**: Function.

Callback that is invoked when user clicks outside of the element.

**Aliases**: `[outerClick]`

**Usage example**:

```html
<div id="target" outerClick="function () {
    console.log('Clicked outside of the &quot;target&quot; node.');
    }">
</div>
```

### `range`

The `range` binding is an adapter for the [jQuery UI Slider widget](https://jqueryui.com/slider/). It also implements necessary handlers to work with mobile devices.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/range.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/range.js).

**Value type**: Object.

Configuration that is passed to the Slider widget.

**Aliases**: `[range]`

**Usage example**:

```html
<div
    class="data-slider"
    range="{
        value: scale,
        min: 1,
        max: 200,
        step: 1
}"></div>
```

### `resizable`

The `resizable` binding is an adapter for the [jQuery UI Resizable](http://api.jqueryui.com/resizable/) widget.

**Source:** `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/resizable.js`. [See on GitHub](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/resizable.js).

**Value type:** Object.

Configuration for the Resizable widget.

**Aliases:** `[resizable]`

**Usage example**:

```html
<div data-bind="resizable: {maxHeight: 200}"></div>
```

### `scope`

A binding that allows evaluating descendant nodes in the scope of an object found in the UiRegistry by provided string.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/scope.js`. [See on Github](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/scope.js).

**Value type**: String.

Component's name by which to perform a lookup in the registry.

**Aliases**: `[ko-scope]`, `<scope>`

**Usage example**:

```html
<!-- as an attribute -->
<div ko-scope="'name.of.component'"></div>

<!-- in a standard KO form -->
<div data-bind="scope: 'name.of.component'"></div>

<!-- without an extra container node -->
<scope args="'name.of.component'"></scope>

<!-- as a virtual element -->
<!-- ko scope: name.of.component --><!-- /ko -->
```

### `staticChecked`

The `staticChecked` binding implements the behavior similar to the standard [`checked`](http://knockoutjs.com/documentation/checked-binding.html) binding. The difference is that `staticChecked` doesn't change the array of the already selected elements if the value of the associated DOM element changes.

**Source**: `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/staticChecked.js`. [See on Github](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/staticChecked.js).

**Value type:** Boolean \| String \| Number \| Array<String\|Number\|Number>

**Aliases:** `[staticChecked]`

```html
<input type="checkbox" data-bind="staticChecked: observable"/>
```

### `template`

Application `template` binding is a customization of the existing Knockout [`template` binding](http://knockoutjs.com/documentation/template-binding.html). It is used to render a template inside of the associated element. The original Knockout's  implementation was overridden to support asynchronous loading of templates by the provided path, instead of searching for them on the page.

**Source:** `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/template/engine.js`. [See on Github](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/template/engine.js).

**Value type:** String \| Object

Configuration for the `template` binding. If the provided value is a string, it is processed as a path to `.html` file.

**Aliases:** `[render]`, `<render>`

**Usage example**:

```html
<div data-bind="template: 'path/to/the/template'"></div>

<!-- ko template: getTemplate() --><!-- /ko -->

<render args="template" />

<div each="getRegion('displayArea')" render=""/>
```

### `tooltip`

Application custom knockout binding for displaying a tooltip.

**Source:** `<Magento_Ui_module_dir>/view/base/web/js/lib/knockout/bindings/tooltip.js`. [See on Github](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/knockout/bindings/tooltip.js).

**Value type:** Object

Binding's configuration that may include the following options:

| Property        | Description                                                          | Type                                | Default |
|-----------------|----------------------------------------------------------------------|-------------------------------------|---------|
| `action`        | An action that triggers displaying a tooltip.                        | String (`click\|hover`)             | `click` |
| `center`        | Center the tooltip relatively to the element it is bound to.         | Boolean                             | `false` |
| `closeButton`   | Whether the tooltip has a Close button.                              | Boolean                             | `false` |
| `closeOnScroll` | Whether the tooltip closes automatically when user scrolls the page. | Boolean                             | `true`  |
| `delay`         | A delay before displaying the tooltip, in seconds.                   | Number                              | `0`     |
| `position`      | The priority position for the tooltip.                               | String (`top\|right\|left\|bottom`) | `top`   |
| `track`         | Whether the tooltip moves together with the pointer.                 | Boolean                             | `false` |
| `trigger`       | The selector's action that triggers displaying a tooltip.            | String                              | `''`    |

**Aliases:** `[tooltip]`

**Usage example**:

Adding the tooltip binding as an attribute:

```html
<div tooltip="
     trigger: '[data-tooltip-trigger=trigger]',
     action: 'click',
     delay: 300,
     track: true,
     position: 'top'
 "> Tooltip data </div>

<div data-tooltip-trigger="trigger"/>
```

Adding the tooltip binding as a node:

```html
<div data-bind="
    tooltip: {
        trigger: '[data-tooltip-trigger=trigger]',
        action: 'click',
        delay: 300,
        track: true,
        position: 'top'
    }
"> Tooltip data </div>

<div data-tooltip-trigger="trigger"/>
```
