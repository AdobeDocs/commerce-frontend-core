---
title: XML configuration | Commerce Frontend Development
description: Review information about basic configuration elements of Adobe Commerce and Magento Open Source UI components.
---

# XML configuration

This topic describes the basic elements used in XML configuration files for declaring UI components. These elements core structure is strict and third party developers must follow it when customizing existing UI component configuration or declaring new ones.

## Basic elements

| Element                                   | Attributes                                                                                                                                                                                                                                                                                                   | Parent of                                                                       | Description                                                                                                                                                                                  |
|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<%basic_component%></%basic_component%>` | - `extends`<br />- `provider`<br />component-specific attributes<br />Where a user can find this list of component-specific attributes.<br />For detailed descriptions of general attributes, see [basic attributes](../basic-attributes.md).                                                                   | - `<arguments>`<br />- `<settings>`<br />- `<%component%>`<br />(order matters) | Mandatory root element, the name of the [basic UI component](../index.md#general-structure): `<form>`, `<listing>`, or custom basic component.                                               |
| `<arguments></arguments>`                 | `name='data'`                                                                                                                                                                                                                                                                                                | `<item name=config>` (mandatory)                                                | Introduces the configuration block for UiComponent according to the old structure used in 2.1.x and earlier. In 2.2.x and later, only use for options that are not described in XSD.         |
| `<settings></settings>`                   | ---                                                                                                                                                                                                                                                                                                          |                                                                                 | Introduces the configuration block for UiComponent according to the [new structure](semantic-configuration.md). Use for configuring all options, except those that are not described in XSD. |
| `<component></component>`                 | - `class`<br />- `component`<br />- `displayArea`<br />- `sortOrder`<br />- `template`<br />- component-specific attributes<br />Where a user can find this list of component-specific attributes.<br />For detailed descriptions of the general attributes, see [basic attributes](../basic-attributes.md). | - `<arguments>`<br />- `<settings>`<br />- `<%component%>`<br />(order matters) | UI component name                                                                                                                                                                            |

## Example

```xml
<form>
    <arguments name="data">
        // The old arbitrary structure that declares the configuration of the Form component
    </arguments>
    <settings>
        // The new strict structure that declares the configuration of the Form component
    </settings>
    <fieldset name="fieldsetName">
        <arguments name="data">
            // The old arbitrary structure that declares the configuration of the Fieldset component.
        </arguments>
        <settings>
            // The new strict structure that declares the configuration of the Fieldset component
        </settings>
        <field name="fieldName">
            <settings>
                // The new strict structure that declares the configuration of the Field component
            </settings>
        </field>
    </fieldset>
</form>
```
