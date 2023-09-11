---
title: ColumnsEditingBulk |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
contributor_name: Atwix
contributor_link: https://www.atwix.com/
---

# ColumnsEditingBulk component

The ColumnsEditingBulk UI component is an extension for the [ColumnsEditor](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/editing/editor.js) component. It provides the bulk update functionality.

## Options

| Option | Description | Type | Default Value |
| --- | --- | --- | --- |
| `template` | The path to the component’s `.html` template. | String | `'ui/grid/editing/bulk'` |
| `active` | Whether multi editing is active. | Boolean | `true` |
| `component` | The path to the component's `.js` file, relative to RequireJS. | String | `Magento_Ui/js/grid/editing/bulk` |

## Sources files

Extends [`record`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/editing/record.js):

-  [app/code/Magento/Ui/view/base/web/js/grid/editing/bulk.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/editing/bulk.js)
-  [app/code/Magento/Ui/view/base/web/templates/grid/editing/bulk.html](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/grid/editing/bulk.html)

## Examples

### Integration

This is an example of how the ColumnsEditingBulk component integrates with the [ColumnsEditor](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/editing/editor.js) component:

```xml
<listing>
    ...
    <columns name="columns">
        <settings>
            <editorConfig>
                <param name="bulkConfig" xsi:type="array">
                    <item name="component" xsi:type="string">Magento_Ui/js/grid/editing/bulk</item>
                    <item name="template" xsi:type="string">ui/grid/editing/bulk</item>
                </param>
                <param name="bulkEnabled" xsi:type="boolean">true</param>
                <param name="enabled" xsi:type="boolean">true</param>
            </editorConfig>
        </settings>
        ...
    </columns>
</listing>
```

#### Result

![ColumnsEditingBulk Component example](../../_images/ui-components/ui-columns-editing-bulk-result.png)

### Disable

This is an example of how the ColumnsEditingBulk component disables the [ColumnsEditor](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/editing/editor.js) component:

```xml
<listing>
    ...
    <columns name="columns">
        <settings>
            <editorConfig>
                <param name="bulkEnabled" xsi:type="boolean">false</param>
                <param name="enabled" xsi:type="boolean">true</param>
            </editorConfig>
        </settings>
        ...
    </columns>
</listing>
```
