---
title: Columns |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Columns component

The Columns component is a collection of columns. It renders the `<table>` element and displays the records of the [Listing component](listing-grid.md) in this table.

## Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `component` | The path to the component’s `.js` file. | String | `Magento_Ui/js/grid/listing` |
| `displayMode` | Initial display mode. | String | `'grid'` |
| `displayModes` | List of available display modes. | {<br />[name: string]: [DisplayMode](#displaymode-interface)<br />} |  `{grid: {value: 'grid',label: 'Grid',template: '${ $.template }'},list: {value: 'list',label: 'List',template: '${ $.listTemplate }'}}` |
| `dndConfig` | Configuration of the [DragAndDrop component](drag-and-drop.md). | Object | Specified in the [DragAndDrop component configuration](drag-and-drop.md). |
| `stickyTmpl` | Path to the `.html` template used for the [Toolbar component](toolbar.md) when it receives a fixed position. | String | `ui/grid/sticky/listing` |
| `template` | Path to the component’s `.html` template. | String | `ui/grid/listing` |
| `editorConfig` | Configuration of the InlineEditing component. | Object | Specified in the [InlineEditing component configuration](insert-listing.md). |
| `viewSwitcherTmpl` | Path to the `.html` template for rendering the list of available display modes. By default this list is not displayed. | String | `ui/grid/view-switcher` |
| `componentType` | The type of component. | String | `columns` |
| `resizeConfig` | Configurations of [`Resize`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/resize.js) component. | Object | `{name: '${ $.name }_resize',columnsProvider: '${ $.name }',component: 'Magento_Ui/js/grid/resize',enabled: false}` |

### DisplayMode interface

| Option | Description | Type | Required |
| --- | --- | --- | --- |
| `label` | Label for the list of available modes. | String | Optional |
| `template` | Path to the `.html` template used to render listing in the selected mode. | String | Optional |
| `value` | Mode's identifier. | String | Optional |

## Source files

Extends [`uiCollection`](../concepts/collection.md):

-  [`Magento/Ui/view/base/web/js/grid/listing.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/listing.js)
-  [`Magento/Ui/view/base/web/templates/list/listing.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/list/listing.html)

## Examples

### Integration (grid)

This is an example of how the Columns component integrates with the [Listing](listing-grid.md) component:

```xml
<listing>
    ...
    <columns name="columns_example">
        <column name="column1" sortOrder="10">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 1</label>
                <default>1</default>
            </settings>
        </column>
        <column name="column2" sortOrder="13">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 2</label>
                <default>2</default>
            </settings>
        </column>
        <column name="column3" sortOrder="14">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 3</label>
                <default>3</default>
            </settings>
        </column>
        <column name="column4" sortOrder="15">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 4</label>
                <default>4</default>
            </settings>
        </column>
    </columns>
    ...
</listing>
```

#### Result

![Columns Component Example](../../_images/ui-components/ui-columns-result.png)

### Integration (list)

This is an example of how the Columns component with the list display mode integrates with the [Listing](listing-grid.md) component:

```xml
<listing>
    ...
    <columns name="columns_list_example">
        <settings>
            <displayMode>list</displayMode>
        </settings>
        <column name="column1" sortOrder="10">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 1</label>
                <default>1</default>
            </settings>
        </column>
        <column name="column2" sortOrder="13">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 2</label>
                <default>2</default>
            </settings>
        </column>
        <column name="column3" sortOrder="14">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 3</label>
                <default>3</default>
            </settings>
        </column>
        <column name="column4" sortOrder="15">
            <settings>
                <filter>text</filter>
                <dataType>text</dataType>
                <label translate="true">Column 4</label>
                <default>4</default>
            </settings>
        </column>
    </columns>
    ...
</listing>
```

#### Result

![Columns List Component Example](../../_images/ui-components/ui-columns-list-result.png)
