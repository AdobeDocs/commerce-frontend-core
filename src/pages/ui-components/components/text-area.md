---
title: Textarea |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Textarea component

The Textarea component implements the `<textarea>` form field.

## Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `cols` | The number of columns that will be specified in the `cols` attribute of the textarea DOM element. | Number | `15` |
| `component` | The path to the component’s `.js` file in terms of RequireJS. | String | `'Magento_Ui/js/form/element/textarea'` |
| `elementTmpl` | The path to the `.html` template of the particular type of field (textarea). | String | `'ui/form/element/textarea'` |
| `label` | Label to be displayed in the field. | String | `''` |
| `rows` | The number of rows that will be specified in the `rows` attribute of the textarea DOM element. | Number | `2` |
| `template` | The path to the general field `.html` template. | String | `'ui/form/field'` |

## Source files

Extends [`Abstract`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/element/abstract.js):

-  [app/code/Magento/Ui/view/base/web/js/form/element/textarea.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/element/textarea.js)
-  [app/code/Magento/Ui/view/base/web/templates/form/element/textarea.html](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/form/element/textarea.html)
-  [app/code/Magento/Ui/view/base/web/templates/form/field.html](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/form/field.html)

## Examples

### Integration

This example integrates the Textarea component with the [Form](form.md) component.

```xml
<form>
    ...
    <fieldset>
        ...
        <field name="textarea_example">
            <argument name="data" xsi:type="array">
                <item name="config" xsi:type="array">
                    <item name="formElement" xsi:type="string">textarea</item>
                    <item name="cols" xsi:type="number">15</item>
                    <item name="rows" xsi:type="number">5</item>
                    <item name="label" translate="true" xsi:type="string">Textarea Field Example</item>
                    <item name="dataType" translate="true" xsi:type="string">text</item>
                </item>
            </argument>
        </field>
    </fieldset>
</form>
```

#### Result

![Textarea Component example](../../_images/ui-components/ui-textarea-result.png)
