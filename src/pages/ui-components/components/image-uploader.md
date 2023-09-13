---
title: ImageUploader |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# ImageUploader component

The ImageUploader UI component gives users the ability to upload images to the Media Gallery.

This component is a variation of the [FileUploader component](file-uploader.md) and uses the same configuration settings.

## Options

| Title             | Type   | Default | Description                                                                    |
| ----------------- | ------ | ------- | ------------------------------------------------------------------------------ |
| `openDialogTitle` | String |   ---   | Defines the title that appears when opening the media browser dialog slideout. |

## Source files

Extends [`FileUploader`](file-uploader.md):

-  [`app/code/Magento/Ui/view/base/web/js/form/element/image-uploader.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/element/image-uploader.js)
-  [`app/code/Magento/Ui/view/base/web/templates/form/element/uploader/image.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/form/element/uploader/image.html)
-  [`app/code/Magento/Ui/view/base/ui_component/etc/definition/imageUploader.xsd`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/ui_component/etc/definition/imageUploader.xsd)
-  [`app/code/Magento/Ui/Component/Form/Element/DataType/Media/Image.php`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/Component/Form/Element/DataType/Media/Image.php)

## Example

```xml
<form>
    ...
    <fieldset>
        ...
        <field name="imageUploaderExample" formElement="imageUploader">
            <settings>
                <notice translate="true">Some notice.</notice>
                <label translate="true">Image Uploader Example</label>
                <componentType>imageUploader</componentType>
            </settings>
            <formElements>
                <imageUploader>
                    <settings>
                        <allowedExtensions>jpg jpeg gif png</allowedExtensions>
                        <maxFileSize>2097152</maxFileSize>
                        <uploaderConfig>
                            <param xsi:type="string" name="url">path/to/save</param>
                        </uploaderConfig>
                    </settings>
                </imageUploader>
            </formElements>
        </field>
        ...
    </fieldset>
    ...
</form>
```

## Result

![ImageUploader Component Example](../../_images/ui-components/ui-image-uploader-example.png)
