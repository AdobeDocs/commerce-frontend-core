---
title: Search component | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Search component

The Search component allows searching through the grid records. It is a generic tool for filtering content that aggregates all other filter elements.

## Options

| Option | Description | Type | Default Value |
| --- | --- | --- | --- |
| `label` | The search field label. | String | `$t('Keyword')` |
| `placeholder` | Value displayed when the search field is empty. | String | `'Search by keyword'` |
| `statefull`.`value` | Defines that `value` property is automatically saved in the configured storage if a change. | Boolean | `true` |
| `template` | Path to the component’s `.html` template. | String | `ui/grid/search/search` |

## Source files

Extends [`UiElement`](concepts/element.md):

-  [app/code/Magento/Ui/view/base/web/js/grid/search/search.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/search/search.js)
-  [app/code/Magento/Ui/view/base/web/templates/grid/search/search.html](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/grid/search/search.html)

## Examples

### Integration

This is an example of how the Search component integrates with the [Listing](listing-grid.html) component:

```xml
<listing>
    ...
    <listingToolbar>
        ...
        <filterSearch name="fulltext"/>
    </listingToolbar>
    ...
</listing>
```

#### Result

![Search Component Example](../_images/ui-components/ui-search-result.png)
