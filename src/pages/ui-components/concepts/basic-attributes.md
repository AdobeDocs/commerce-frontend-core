---
title: Basic attributes | Commerce Frontend Development
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Basic attributes

This topic describes the general UI components configuration attributes. There's a set of attributes available for all UI components, and a set of attributes which are specific for [basic components](../index.md#general-structure) only.

## General attributes

The following attributes are available for all UI components, including the basic UI components.

| Option        | Description                                                                                                                                  | Type    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `class`       | The name of associated PHP interface.                                                                                                        | String  |
| `component`   | The path to the component’s `.js` file.                                                                                                      | String  |
| `displayArea` | The name of parent component's template region where component needs to be rendered (the list of available regions defined by the template). | String  |
| `sortOrder`   | Component's sort order.                                                                                                                      | Integer |
| `template`    | The path to the component’s `.html` template.                                                                                                | String  |

## Basic component options

The following options are available for all basic components:

| Option     | Description                                                                                          | Type   |
|------------|------------------------------------------------------------------------------------------------------|--------|
| `extends`  | Reference to a UI component whose configuration to inherit. Only a basic component can be specified. | String |
| `provider` | The path in the [registry](registry.md) to the linked data provider.                        | String |
