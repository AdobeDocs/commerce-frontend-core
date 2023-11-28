---
title: FileUploader |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# FileUploader component

The File Uploader component is an adapter for the [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki) plugin used in Magento. This component integrates file upload functionality with UI components.

## Options

| Title | Description | Type | Default Value |
| --- | --- | --- | --- |
| `allowedExtensions` | List of allowed file extensions. For example, `'jpg jpeg gif png svg'`. If set to "false" - then no extension is allowed, "true" - any extension is allowed. | Boolean/String | `false` |
| `component` | The path to the component's JS constructor in terms of RequireJS. | String | `'Magento_Ui/js/form/element/file-uploader'` |
| `dropZone` | CSS selector of a drop zone element. | String | `[data-role=drop-zone]` |
| `isMultipleFiles` | Defines whether multiple files can be uploaded. | Boolean | `false` |
| `maxFileSize` | Defines the maximum allowed file size in bytes. | Boolean/Number | `false` |
| `placeholderType` | Defines the preview type. (When set to `document`, the file information is displayed.) | `document` \| `image` \| `video` | `document` |
| `previewTmpl` | Path to the file's preview `.html` template | String | `ui/form/element/uploader/preview` |
| `uploaderConfig` | Configuration passed to jquery-file-upload plugin. | Object | `{dataType: 'json', sequentialUploads: true, formData: {'form_key': window.FORM_KEY}}` |

## Examples

### Integration

Here is an example of how File Uploader component integrates with [Form](form.md) component:

```xml
<form xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    ...
    <fieldset name="foo">
        ...
        <settings>
            <label translate="true">Foo</label>
            <collapsible>true</collapsible>
            <opened>true</opened>
        </settings>
        <field name="bar" formElement="fileUploader">
            <settings>
                <label translate="true">Sound Check</label>
            </settings>
            <formElements>
                <fileUploader>
                    <settings>
                        <uploaderConfig>
                            <param xsi:type="string" name="url">path/to/controller</param>
                        </uploaderConfig>
                    </settings>
                </fileUploader>
            </formElements>
        </field>
    </fieldset>
</form>
```

#### Result

![FileUploader Component example](../../_images/ui-components/ui-fileuploader-result.png)

## Source files

Extends `abstract`:

-  [`<Magento_Ui_module_dir>/view/base/web/js/form/element/file-uploader.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/element/file-uploader.js)
-  [`<Magento_Ui_module_dir>/view/base/web/templates/form/element/uploader/uploader.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/form/element/uploader/uploader.html)
-  [`<Magento_Ui_module_dir>/view/base/web/templates/form/element/uploader/preview.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/form/element/uploader/preview.html)
