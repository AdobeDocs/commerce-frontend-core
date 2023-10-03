---
title: LinkColumn |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# LinkColumn component

The LinkColumn component implements a column that can display anchor elements instead of plain text.

Constructor: [app/code/Magento/Ui/view/base/web/js/grid/columns/link.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/columns/link.js)

## Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `link` | The key in a field's record object that contains the link value. | String | `link` |
| `bodyTmpl` | Path to the template that is used to render a column's field in the table body. | String | `ui/grid/cells/link` |

## Source files

Extends [Column component](column.md)

-  [`app/code/Magento/Ui/view/base/web/js/grid/columns/link.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/columns/link.js)
-  [`app/code/Magento/Ui/view/base/web/templates/grid/cells/link.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/grid/cells/link.html)

## Examples

### Integration

This example integrates the LinkColumn component with the [Listing](listing-grid.md) component:

```xml
<listing>
    <columns>
        <column name="id" component="Magento_Ui/js/grid/columns/link" sortOrder="10">
            <argument name="data" xsi:type="array">
                <item name="config" xsi:type="array">
                    <item name="link" xsi:type="string">link</item>
                </item>
            </argument>
            <settings>
                <label translate="true">Link</label>
                <sortable>false</sortable>
            </settings>
        </column>
    </columns>
</listing>
```

Data Provider for this listing:

```php
<?php

namespace Vendor\Module\Ui\Component\Listing;

use Magento\Framework\View\Element\UiComponent\DataProvider\DataProvider;

/**
 * Class Actions
 */
class CustomDataProvider extends DataProvider
{
    /**
     * Get data
     *
     * @return array
     */
    public function getData()
    {
     return [
         'items' => [
           [
            'id' => 1,
            'link' => 'https://magento.local/path/to/controller/id/1'
           ],
           [
            'id' => 2,
            'link' => 'https://magento.local/path/to/controller/id/2'
          ],
          ],
          'totalRecords' => 2
        ];
    }
}
```

#### Result

![LinkColumn Component example](../../_images/ui-components/ui-linkcolumn-result.png)
