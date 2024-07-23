---
title: List | Commerce Frontend Development
description: Learn how to initialize and configure the Adobe Commerce and Magento Open Source List widget.
---

# List widget

<InlineAlert variant="warning" slots="text" />

The list widget is deprecated since version 2.2.0. As an alternative component for the admin area, use [DynamicRows](/src/pages/ui-components/components/dynamic-rows.md).

Provides a way to move items, typically a list, from one content section to another.
The content can be moved using buttons and links.

## Initialize

For information about how to initialize a widget in a JS component or `.phtml` template, see the [Initialize JavaScript](../init.md) topic.

## Options

### `addButton`

Selector for the element used for item adding.

**Type**: String

**Default value**: `[data-button=add]`

### `destinationSelector`

Content destination selector.

**Type**: String

**Default value**: `[data-role=container]`

### `itemCount`

Number of total items.

**Type**: Integer

**Default value**: `0`

### `itemIndex`

Number of the current item.

**Type**: Integer

**Default value**: `0`

### `maxItems`

Number of list items that can be added to the destination.

**Type**: Integer

**Default value**: `null`

### `maxItemsAlert`

Alert message displayed when maximum limit is reached.

**Type**: String

**Default value**: `null`

### `removeButton`

Selector for the element used for item removing.

**Type**: String

**Default value**: `[data-button=remove]`

### `template`

Template for the added item.

**Type**: String

**Default value**: `[data-role=item]`

### `templateClass`

Class attached to the template wrapper.

**Type**: String

**Default value**: `null`

### `templateWrapper`

Element holding the template.

**Type**: String

**Default value**: `null`

## Methods

### `addItem()`

Adds item to the list in the specified order (defined by the index parameter).

### `handleAdd()`

Adds item to the list.

### `checkLimit()`

If the `maxItems` option is set, hides or displays the **Add** button.

### `removeItem()`

Removes an item from the list.
