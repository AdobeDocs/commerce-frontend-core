---
title: Listing (grid) component | Commerce Frontend Development
decsription:
---

# Listing (grid) component

Listing is a [basic component](index.md#general-structure) that implements grids, lists, and tiles with filtering, pagination, sorting, and other features.

## Related components

The following components can be used in the scope of the Listing component:

*  [ActionsColumn](actionscolumn.html)
*  [Bookmarks](bookmarks.html)
*  [Button](button.html)
*  [Column](column.html)
*  [Columns](columns.md)
*  [ColumnsControls](columnscontrols.html)
*  [DateColumn](datecolumn.html)
*  [DragAndDrop](draganddrop.html)
*  [Expandable](expandable-column.html)
*  [ExportButton](exportbutton.html)
*  [Filters](filters.html)
*  [FiltersChips](filterschips.html)
*  [ImagePreview](image-preview.html)
*  [LinkColumn](linkcolumn.html)
*  [MassActions](massactions.html)
*  [MultiselectColumn](multiselectcolumn.html)
*  [OnOffColumn](onoffcolumn.html)
*  [Paging](paging.html)
*  [Range](range.html)
*  [Search](search.html)
*  [SelectColumn](selectcolumn.html)
*  [Sizes](sizes.html)
*  [ThumbnailColumn](thumbnailcolumn.html)
*  [ListingToolbar](toolbar.html)
*  [TreeMassActions](treemassactions.html)
*  [UI-select](secondary-uiselect.html)

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
