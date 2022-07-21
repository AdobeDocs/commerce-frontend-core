---
title: Listing (grid) component | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Listing (grid) component

Listing is a [basic component](introduction/index.md#general-structure) that implements grids, lists, and tiles with filtering, pagination, sorting, and other features.

## Related components

The following components can be used in the scope of the Listing component:

*  [ActionsColumn](actions-column.md)
*  [Bookmarks](bookmarks.md)
*  [Button](button.md)
*  [Column](column.md)
*  [Columns](columns.md)
*  [ColumnsControls](columns-controls.md)
*  [DateColumn](date-column.md)
*  [DragAndDrop](drag-and-drop.md)
*  [Expandable](expandable-column.md)
*  [ExportButton](export-button.md)
*  [Filters](filters.md)
*  [FiltersChips](filters-chips.md)
*  [ImagePreview](image-preview.md)
*  [LinkColumn](link-column.md)
*  [MassActions](mass-actions.md)
*  [MultiselectColumn](multiselect-column.md)
*  [OnOffColumn](on-off-column.md)
*  [Paging](paging.md)
*  [Range](range.md)
*  [Search](search.md)
*  [SelectColumn](select-column.md)
*  [Sizes](sizes.md)
*  [ThumbnailColumn](thumbnail-column.md)
*  [ListingToolbar](toolbar.md)
*  [TreeMassActions](tree-mass-actions.md)
*  [UI-select](secondary-ui-select.md)

## Examples

### Create an instance

Example configuration of Listing component instance:

`<your module root dir>/Magento/Cms/view/adminhtml/ui_component/cms_page_listing.xml`

```xml
<listing xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <argument name="data" xsi:type="array">
        <item name="js_config" xsi:type="array">
            <item name="provider" xsi:type="string">cms_page_listing.cms_page_listing_data_source</item>
        </item>
    </argument>
    <settings>
        <buttons>
            <button name="add">
                <url path="*/*/new"/>
                <class>primary</class>
                <label translate="true">Add New Page</label>
            </button>
        </buttons>
        <spinner>cms_page_columns</spinner>
        <deps>
            <dep>cms_page_listing.cms_page_listing_data_source</dep>
        </deps>
    </settings>
</listing>
```

## Configure DataSource

DataSource is another [UI component](https://glossary.magento.com/ui-component) that provides data in specific format which is shared among all UI components.

The listing component requires the data source to be properly configured and associated with it:

`<your module root dir>/Magento/Cms/view/adminhtml/ui_component/cms_page_listing.xml`

```xml
<listing xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <dataSource name="cms_page_listing_data_source" component="Magento_Ui/js/grid/provider">
        <settings>
            <storageConfig>
                <param name="indexField" xsi:type="string">page_id</param>
            </storageConfig>
            <updateUrl path="mui/index/render"/>
        </settings>
        <aclResource>Magento_Cms::page</aclResource>
        <dataProvider class="Magento\Cms\Ui\Component\DataProvider" name="cms_page_listing_data_source">
            <settings>
                <requestFieldName>id</requestFieldName>
                <primaryFieldName>page_id</primaryFieldName>
            </settings>
        </dataProvider>
    </dataSource>
</listing>
```

## Source files

*  [app/code/Magento/Ui/view/base/web/js/lib/core/collection.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/core/collection.js)
