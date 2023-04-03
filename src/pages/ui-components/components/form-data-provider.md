---
title: FormDataProvider component | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
contributor_name: Atwix
contributor_link: https://www.atwix.com/
---

# FormDataProvider component

The FormDataProvider UI component is a data provider for the [Form](form.md) component. It stores form data in a specific format that is shared among all UI components in the scope of [Form](form.md) component and provides the functionality for submitting the data.

## Options

| Option | Description | Type | Default Value |
| --- | --- | --- | --- |
| `class` | Path to the PHP class responsible for the backend implementation of the component | String | `Magento\Framework\View\Element\UiComponent\DataProvider\DataProvider` |
| `component` | The path to the component's `.js` file, relative to RequireJS. | String | `Magento_Ui/js/form/provider` |
| `clientConfig` | Configuration of the [FormClient](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/client.js) component. | Object | `urls: {save: '${ $.submit_url }',beforeSave: '${ $.validate_url }'}` |
| `submit_url` | Path to controller that will process the form data submitting request. | String | `-` |
| `validate_url` | Path to controller that will process the form data validation request. | String | `-` |

## Sources files

Extends [`UiElement`](../concepts/element.md):

-  [app/code/Magento/Ui/view/base/web/js/form/provider.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/provider.js)

## Examples

### Integration

This is an example of how the FormDataProvider component integrates with the [Form](form.md) component:

```xml
<form>
    <dataSource name="sales_rule_form_data_source">
        <argument name="data" xsi:type="array">
            <item name="js_config" xsi:type="array">
                <item name="component" xsi:type="string">Magento_Ui/js/form/provider</item>
            </item>
        </argument>
        <settings>
            <submitUrl path="path/to/submit_form_data_controller"/>
            <validateUrl path="path/to/validate_form_data_controller"/>
        </settings>
    </dataSource>
</form>
```
