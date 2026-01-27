---
title: Masonry (grid) |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
contributor_name: Shankar Konar
contributor_link: https://github.com/konarshankar07
---

# Masonry (grid) component

The Masonry component is a collection of columns. It renders the masonry grid layout in the Ui component.

## Dependencies

The Masonry component has dependencies on the following components:

*  Listing: `app/code/Magento/Ui/view/base/web/js/grid/listing.js`
*  Request Animation Frame: `app/code/Magento/Ui/view/base/web/js/lib/view/utils/raf.js`

## Options

|      Option              |   Description                                                                    |      Type      |  Default Value             |
|--------------------------|----------------------------------------------------------------------------------|----------------| ---------------------------|
| containerId              | Images container id.                                                             |  String        | -                          |
| minRatio                 | Minimum aspect ratio for each image.                                             |  Int           | -                          |
| containerWidth           | Width of the container.                                                          |  Int           | window.innerWidth          |
| imageMargin              | Margin between images.                                                           |  Int           | 20                         |
| maxImageHeight           | Maximum height of the image.                                                     |  Int           | 240                        |
| containerWidthToMinRatio | Minimum width and height ratio when the container width is less than default key.|  Object        | `{640: 3, 1280: 5, 1920: 8}` |
| defaultMinRatio          | Default minimal image width to height ratio.                                     |  Int           | 10                         |
| refreshFPS               | Layout update FPS during window resizing.                                        |  Int           | 60                         |
| template                 | Path to the component's `.html` template.                             |  String        | ui/grid/masonry            |

## Examples

```xml
<columns name="masonry_images_columns" component="Magento_Ui/js/grid/masonry">
        <argument name="data" xsi:type="array">
            <item name="config" xsi:type="array">
                <item name="containerId" xsi:type="string">masonry-grid-example</item>
            </item>
        </argument>
        ...
</columns>
```

## Source files

Extends `Listing`:

*  [app\code\Magento\Ui\view\base\web\js\grid\masonry.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/grid/masonry.js)
*  [app\code\Magento\Ui\view\base\web\templates\grid\masonry.html](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/grid/masonry.html)

## Result

![Masonry Grid](../../_images/ui-components/masonry-grid-result.png)
