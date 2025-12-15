---
title: Navigation |
description: Configure Adobe Commerce and Magento Open Source UI components and integrate them with other components.
---

# Navigation component

The Navigation component implements tabs navigation.

See the [Admin Design Pattern Library (Tabs)](https://developer.adobe.com/commerce/admin-developer/pattern-library/containers/tabs) topic for information about the UI design patterns that can be implemented using the Nav component.

## Options

| Option        | Description                                                             | Type    | Default                                   |
|---------------|-------------------------------------------------------------------------|---------|-------------------------------------------|
| `collapsible` | Enables/disables the collapsible functionality.                         | Boolean | `false`                                   |
| `component`   | The path to the component's JS constructor, in terms of RequireJS.      | String  | `Magento_Ui/js/form/components/tab_group` |
| `opened`      | Initial collapsible state, if the collapsible functionality is enabled. | Boolean | `true`                                    |
| `template`    | The path to the component's `.html` template.                           | String  | `ui/tab`                                  |
