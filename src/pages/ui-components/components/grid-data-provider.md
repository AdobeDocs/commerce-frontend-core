---
title: GridDataProvider component | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
contributor_name: Atwix
contributor_link: https://www.atwix.com/
---

# GridDataProvider component

The GridDataProvider [UI component](https://glossary.magento.com/ui-component) is a data provider for the [Listing](listing-grid.md) component. It provides data in specific format which is shared among all UI components in the scope of the [Listing](listing-grid.md) component.

## Options

| Option | Description | Type | Default Value |
| --- | --- | --- | --- |
| `class` | Path to the [PHP](https://glossary.magento.com/php) class responsible for the [backend](https://glossary.magento.com/backend) implementation of the component | String | `Magento\Framework\View\Element\UiComponent\DataProvider\DataProvider` |
| `component` | The path to the component's `.js` file, relative to RequireJS. | String | `Magento_Ui/js/grid/provider` |
| `firstLoad` | Defines the first loading of data. The value changes to `false` if data reloads. | Boolean | `true` |
| `lastError` | Defines if an error occurred for the latest data reloading. | Boolean | `false` |
| `storageConfig` | Configuration of the GridDataStorage component. | Object | `{component: 'Magento_Ui/js/grid/data-storage',provider: '${ $.storageConfig.name }',name: '${ $.name }_storage',updateUrl: '${ $.update_url }'}` |

## Sources files

Extends [`UiElement`](../concepts/element.md):

-  [app/code/Magento/Ui/view/base/web/js/grid/provider.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/provider.js)

## Examples

### Integration

This is an example of how the GridDataProvider component integrates with the [Listing](listing-grid.md) component:

```xml
<listing>
    <dataSource name="listing_data_source" component="Magento_Ui/js/grid/provider">
        <settings>
            <storageConfig>
                <param name="indexField" xsi:type="string">entity_id</param>
            </storageConfig>
            <updateUrl path="mui/index/render"/>
        </settings>
        <aclResource>Vendor_Module::resource</aclResource>
        <dataProvider class="Magento\Framework\View\Element\UiComponent\DataProvider\DataProvider" name="listing_data_source">
            <settings>
                <requestFieldName>id</requestFieldName>
                <primaryFieldName>entity_id</primaryFieldName>
            </settings>
        </dataProvider>
    </dataSource>
    ...
</listing>
```
