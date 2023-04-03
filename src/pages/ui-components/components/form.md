---
title: Form component | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Form component

The Form component is a collection of fields that can be grouped in tabs and fieldsets. It enables [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations.

Form is a [basic component](../index.md#general-structure).

## Related components

The following components can be used in the scope of the Form component:

*  [ActionDelete](action-delete.md)
*  [Checkbox](checkbox.md)
*  [Checkboxset](checkbox-set.md)
*  [DataSource](../concepts/data-source.md)
*  [Email](email.md)
*  [FieldSet](fieldset.md)
*  [File](file.md)
*  [FileUploader](file-uploader.md)
*  [Hidden](hidden.md)
*  [HtmlContent](html-content.md)
*  [Input](input.md)
*  [Multiline](multiline.md)
*  [Multiselect](multiselect.md)
*  [Radioset](radio-set.md)
*  [Select](select.md)
*  [Text](text.md)
*  [Textarea](text-area.md)
*  [Wysiwyg](wysiwyg/index.md)

## Options

| Option                                                   | Description                                                                                                                                                                                                                                                                                                                                                                             | Type                               | Default                        |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|--------------------------------|
| `ajaxSave`                                               | Save Form values by AJAX.                                                                                                                                                                                                                                                                                                                                                               | Boolean                            | `false`                        |
| `ajaxSaveType`                                           | There are two possible approaches to collect form data for `ajaxSave`:<br />- `default` - collections data using native `FormData` JavaScript class<br />- `simple` - collections data to simple key value pair objects                                                                                                                                                                 | String                             | `default`                      |
| `buttons`                                                | A list of buttons that should be added to form.                                                                                                                                                                                                                                                                                                                                         | Object                             | `{}`                           |
| `component`                                              | The path to the component’s JS constructor in terms of RequireJS.                                                                                                                                                                                                                                                                                                                       | String                             | `Magento_Ui/js/form/form`      |
| `exports`<br />- `selectorPrefix`<br />- `messagesClass` | Used to notify some external entity about property changing.`exports` value is an object, composed of the following:<br />- `key` - name of the internal property or method which is tracked for changes<br />- `value` - name of the property or method which receives the notification (can use string templates)<br />For more details see [Linking properties](../concepts/linking.md) | Object<br />- String<br />- String |                                |
| `listens`<br />- `selectorPrefix`                        | Used for events listening.                                                                                                                                                                                                                                                                                                                                                              | String                             | `'destroyAdapter initAdapter'` |
| `errorClass`                                             | The CSS class added to the component's DOM block if an error appears.                                                                                                                                                                                                                                                                                                                   | String                             | `'.admin__field._error'`       |
| `imports`<br />- `reloadUrl`                             | Used for tracking changes to an external entity property.`import`'s value is an object composed of the following:<br />- `key` - name of the internal property or method that receives the notification<br />- `value` - name of the property or method that is tracked for changes (can use string templates)                                                                          | Object<br />- String               | `'${$.provider}:reloadUrl'`    |
| `messagesClass`                                          | The CSS class assigned to the `<div>` element, where the form elements validation error is rendered.                                                                                                                                                                                                                                                                                    | String                             | `'messages'`                   |
| `namespace`                                              | Form identifier that is passed to backend when performing actions (for example, validate or submit).                                                                                                                                                                                                                                                                                    | String                             |                                |
| `selectorPrefix`                                         | The name that can be used to address the block to which this attribute is assigned. The name must be unique per generated page. If not specified, the name is assigned automatically in the format: `ANONYMOUS_n`                                                                                                                                                                       | String                             | `'.page-content'`              |
| `template`                                               | The path to the component's `.html` template.                                                                                                                                                                                                                                                                                                                                           | String                             | `'ui/form/field'`              |

## Examples

### Create an instance

To create an instance of the Form component, you need to do the following:

1. In your custom module, add a configuration file for the instance, for example: `customer_form.xml`.
1. Add a set of fields (the Fieldset component with the component of the Field) for entity or     to implement the upload of meta info in the DataProvider.
1. Create the DataProvider class for the entity that implements DataProviderInterface

   *  Add a component in the layout as a node: `<uiComponent name="customer_form"/>`

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceContainer name="content">
            ...
            <uiComponent name="customer_form"/>
        </referenceContainer>
    </body>
</page>
```

### Configure the component

Component could be configured in two ways:

*  globally: using any module's `view/ui_component/etc/definition.xml` file. All settings declared in     this file will be applied to all component's instances
*  locally: using concrete component instance configuration, such as `<your module root dir>view/base/ui_component/customer_form`

Create configuration file: `<your module root dir>view/base/ui_component/customer_form.xml`

```xml
<form xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <argument name="data" xsi:type="array">
        <item name="js_config" xsi:type="array">
            <item name="provider" xsi:type="string">customer_form.customer_form_data_source</item>
        </item>
        <item name="label" xsi:type="string" translate="true">Customer Information</item>
        <item name="reverseMetadataMerge" xsi:type="boolean">true</item>
    </argument>
    <settings>
        <buttons>
            <button name="save_and_continue" class="Magento\Customer\Block\Adminhtml\Edit\SaveAndContinueButton"/>
            <button name="save" class="Magento\Customer\Block\Adminhtml\Edit\SaveButton"/>
            <button name="reset" class="Magento\Customer\Block\Adminhtml\Edit\ResetButton"/>
            <button name="order" class="Magento\Customer\Block\Adminhtml\Edit\OrderButton"/>
            <button name="resetPassword" class="Magento\Customer\Block\Adminhtml\Edit\ResetPasswordButton"/>
            <button name="unlock" class="Magento\Customer\Block\Adminhtml\Edit\UnlockButton"/>
            <button name="invalidateToken" class="Magento\Customer\Block\Adminhtml\Edit\InvalidateTokenButton"/>
            <button name="delete" class="Magento\Customer\Block\Adminhtml\Edit\DeleteButton"/>
            <button name="back" class="Magento\Customer\Block\Adminhtml\Edit\BackButton"/>
        </buttons>
        <layout>
            <navContainerName>left</navContainerName>
            <type>tabs</type>
        </layout>
        <deps>
            <dep>customer_form.customer_form_data_source</dep>
        </deps>
        ...
    </settings>
</form>
```

Nodes are optional and contain parameters required for component:

*  settings -> deps - sets the dependency on component initialization

*  js_config -> provider - specifies the name of the component data

*  settings -> layout - configuration class meets the visualization component. Names for deps and provider are specified with a complete path from the root component with the separator "."

Add a description of the fields in the form using components and Field Fieldset:

```xml
...
<fieldset name="customer">
    <settings>
        <label translate="true">Account Information</label>
    </settings>
    <field name="entity_id" formElement="input">
        <argument name="data" xsi:type="array">
            <item name="config" xsi:type="array">
                <item name="source" xsi:type="string">customer</item>
            </item>
        </argument>
        <settings>
            <dataType>text</dataType>
            <visible>false</visible>
        </settings>
    </field>
    ...
</fieldset>
```

To group components you can use the component container as in example below:

```xml
<container name="container_group" component="Magento_Ui/js/form/components/group" sortOrder="20">
    <argument name="data" xsi:type="array">
        <item name="type" xsi:type="string">group</item>
        <item name="config" xsi:type="array">
            <item name="label" xsi:type="string" translate="true">Group</item>
            <item name="required" xsi:type="boolean">true</item>
            <item name="dataScope" xsi:type="boolean">false</item>
            <item name="validateWholeGroup" xsi:type="boolean">true</item>
        </item>
    </argument>
    <field name="group_id">
    ...
    </field>
    <field name="disable_auto_group_change">
    ...
    </field>
</container>
```

### Configure DataSource

You must configure a component's DataSource in order to provide data and meta information for your Form component.

DataSource aggregates an object of class implements the interface `\Magento\Framework\View\Element\UiComponent\DataProvider\DataProviderInterface`

An example of the configuration of the DataSource object:

```xml
<form xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <argument name="data" xsi:type="array">
        ...
    </argument>
    <dataSource name="customer_form_data_source">
        <argument name="data" xsi:type="array">
            <item name="js_config" xsi:type="array">
                <item name="component" xsi:type="string">Magento_Ui/js/form/provider</item>
            </item>
        </argument>
        <settings>
            <validateUrl path="customer/index/validate"/>
            <submitUrl path="customer/index/save"/>
        </settings>
        <dataProvider class="Magento\Customer\Model\Customer\DataProvider" name="customer_form_data_source">
            <settings>
                <requestFieldName>id</requestFieldName>
                <primaryFieldName>entity_id</primaryFieldName>
            </settings>
        </dataProvider>
    </dataSource>
</form>
```

Component configuration:

*  argument `"dataProvider"` - contains configuration, class name, and arguments

*  `"js_config"` -> `"component"` -> JavaScript indication of a responsible component

Data provided by data source is shared and available for all components in the Assembly (in this case for all child components of UI Form).

Data Source is another UI Component that provides data in specific format which is shared among all UI Components.

### Replace instances of component

<InlineAlert variant="info" slots="text" />

Replacing principles are the same for all UI Components.

#### Global replacement

To replace all instances, globally, of a UI Form with a custom implementation redefine link to a constructor in `definition.xml`.

`app/code/Magento/Ui/view/base/ui_component/etc/definition.xml`

```xml
<form class="Magento\Ui\Component\Form">
    <argument name="data" xsi:type="array">
        <item name="js_config" xsi:type="array">
            <item name="component" xsi:type="string">Magento_Ui/js/form/customFormConstructor</item>
        </item>
    </argument>
</form>
```

#### Single replacement

To replace one instance of a UI Form Component redefine link to a constructor in your module's form configuration file:

`app/code/Magento/Customer/view/base/ui_component/customer_form.xml`

```xml
<form xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Ui/etc/ui_configuration.xsd">
    <argument name="data" xsi:type="array">
        <item name="js_config" xsi:type="array">
            <item name="component" xsi:type="string">Magento_Customer/js/form/customFormConstructor</item>
        </item>
    </argument>
</form>
```

## Source files

Extends [`uiCollection`](../concepts/collection.md):

*  [app/code/Magento/Ui/view/base/web/js/form/form.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/form/form.js)
