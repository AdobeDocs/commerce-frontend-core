---
title: MassActions |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# MassActions component

The MassActions component allows performing actions with multiple selected items. Must be a child of the [Listing component](listing-grid.md).

See the [Admin Design Pattern Library (MassActions)](https://developer.adobe.com/commerce/admin-developer/pattern-library/displaying-data/datatable/#mass-actions) topic for information about the UI design patterns that can be implemented using the MassActions component.

## Dependencies

The MassActions component has dependencies on the following components:

*  Collapsible: `app\code\Magento\Ui\view\base\web\js\lib\collapsible.js`
*  Modal window with confirmation: `app\code\Magento\Ui\view\base\web\js\modal\confirm.js`
*  Modal window with alert: `app\code\Magento\Ui\view\base\web\js\modal\alert.js`

## Options

| Option       | Description                                                                                                             | Type           | Default Value                      |
|--------------|-------------------------------------------------------------------------------------------------------------------------|----------------|------------------------------------|
| `actions`    | A list of available actions.                                                                                            | `MassAction[]` | -                                  |
| `noItemsMsg` | Message displayed when a user attempts to perform an action without any selected items.                                 | String         | `'You haven't selected any items!'` |
| `stickyTmpl` | Additional component's template that is used when its parent [Toolbar](toolbar.md) component receives a fixed position. | String         | `ui/grid/sticky/actions`           |
| template     | Path to the component’s `.html` template.                                                                               | String         | `ui/grid/paging/sizes`             |

### MassAction interface

| Option     | Description                                                | Type                                                             | Required |
|------------|------------------------------------------------------------|------------------------------------------------------------------|----------|
| `callback` |                                                            | [`ColumnAction`](column.md#columnaction-interface)               | Optional |
| `confirm`  | Confirmation message displayed before applying the action. | `{`\<br /\>`title: string;`\<br /\>`message: string;`\<br /\>`}` | Optional |
| `label`    | Action's label displayed in the list of actions.           | String                                                           | Required |
| `type`     | Action's identifier.                                       | String                                                           | Required |
| `url`      | Path to the controller responsible for action handling.    | String                                                           | Optional |

## Examples

### Redefine the link to the template

```xml
<massaction name="listing_massaction">
    <argument name="data" xsi:type="array">
        ...
        <item name="config" xsi:type="array">
            <item name="template" xsi:type="string">product/grid/columns/massactions</item>
        </item>
    </argument>
</massaction>
```

### Specify action with confirmation

```xml
<massaction name="listing_massaction">
    <argument name="data" xsi:type="array">
        ...
    </argument>
    <action name="edit">
        <argument name="data" xsi:type="array">
            <item name="config" xsi:type="array">
                <item name="confirm" xsi:type="array">
                    <item name="title" xsi:type="string" translate="true">Edit items</item>
                    <item name="message" xsi:type="string" translate="true">Are you sure you want to edit selected items?</item>
                </item>
                <item name="type" xsi:type="string">edit</item>
                <item name="label" xsi:type="string" translate="true">Edit</item>
            </item>
        </argument>
    </action>
</massaction>
```

### Action with a custom callback

Callback is provided by another component.

```xml
<massaction name="listing_massaction">
    <argument name="data" xsi:type="array">
        ...
    </argument>
    <action name="edit">
        <argument name="data" xsi:type="array">
            <item name="config" xsi:type="array">
                <item name="type" xsi:type="string">edit</item>
                <item name="label" xsi:type="string" translate="true">Edit</item>
                <item name="callback" xsi:type="array">
                    <item name="provider" xsi:type="string">product_listing.inline_editing</item>
                    <item name="target" xsi:type="string">startEdit</item>
                </item>
            </item>
        </argument>
    </action>
</massaction>
```

### Instance replacement (one instance of a component)

Redefine link to constructor:

```xml
<massaction name="listing_massaction">
    <argument name="data" xsi:type="array">
        <item name="js_config" xsi:type="array">
            <item name="component" xsi:type="string">Magento_Ui/js/grid/massactions</item>
        </item>
    </argument>
</massaction>
```

## Source files

Extends `Collapsible`:

*  [app\code\Magento\Ui\view\base\web\js\grid\massactions.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/massactions.js)
*  [app\code\Magento\Ui\view\base\web\templates\grid\actions.html](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/grid/actions.html)

### Methods and events

The following API methods are available:

*  `getAction` - returns the action instance found by the provided identifier
*  `addAction` - adds a new action to the actions
*  `applyAction` - applies the specified action as identifier action
*  `getSelections` - returns the object with current selections
