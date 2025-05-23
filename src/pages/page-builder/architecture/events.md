---
title: Page Builder events
description: How to consume and bind Page Builder events in JavaScript.
keywords:
  - Page Builder
edition: paas
---

# Page Builder events

The pattern for consuming Page Builder events in JavaScript, such as within the `preview.js` component, is to import `Magento_PageBuilder/js/events` and use the `events.on()` method to bind to the event you want to handle, as shown here:

```js
define([
    'Magento_PageBuilder/js/events',
], function (events) {
    'use strict';

    events.on("event:name", function (args) {
        // do logic
    });
});
```

## Events list

The following table lists the Page Builder events you can bind to and handle within your content type.

| Content Type Events                                                 | Stage Events                                                                                     |
|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [contentType:createAfter](#contenttypecreateafter)                  | [stage:childFocusStart](#stagechildfocusstart)                                                   |
| [contentType:dropAfter](#contenttypedropafter)                      | [stage:childFocusStop](#stagechildfocusstop)                                                     |
| [contentType:duplicateAfter](#contenttypeduplicateafter)            | [stage:interactionStart](#stageinteractionstart)                                                 |
| [contentType:mountAfter](#contenttypemountafter)                    | [stage:interactionStop](#stageinteractionstop)                                                   |
| [contentType:moveAfter](#contenttypemoveafter)                      | [stage:error](#stageerror)                                                                       |
| [contentType:moveBefore](#contenttypemovebefore)                    | [stage:{{preview.contentType.stageId}}:masterFormatRenderAfter](#stagepreviewcontenttypestageidmasterformatrenderafter) |
| [contentType:redrawAfter](#contenttyperedrawafter)                  | [stage:{{preview.contentType.stageId}}:readyAfter](#stagepreviewcontenttypestageidreadyafter)                           |
| [contentType:removeAfter](#contenttyperemoveafter)                  | [stage:{{preview.contentType.stageId}}:renderAfter](#stagepreviewcontenttypestageidrenderafter)                    |
| [contentType:renderAfter](#contenttyperenderafter)                  | [stage:{{preview.contentType.stageId}}:fullScreenModeChangeAfter](#stagepreviewcontenttypestageidfullscreenmodechangeafter)      |
| [contentType:renderAfter](#contenttyperenderafter)                  | [stage:{{preview.contentType.stageId}}:viewportChangeAfter](#stagepreviewcontenttypestageidviewportchangeafter)         |
| [contentType:renderAfter](#contenttyperenderafter)                  | [stage:viewportChangeAfter](#stageviewportchangeafter)                                           |
|                                                                     | [stage:updateAfter](#stageupdateafter)                                                           |
|                                                                     |                                                                                                  |
| **Column Events**                                                   | **Preview Events**                                                                               |
| [column:dragStart](#columndragstart)                                | [childContentType:sortstart](#childcontenttypesortstart)                                         |
| [column:dragStop](#columndragstop)                                  | [childContentType:sortupdate](#childcontenttypesortupdate)                                       |
| [column:initializeAfter](#columninitializeafter)                    |                                                                                                  |
|                                                                     |                                                                                                  |
| **Image Events**                                                    | **Other Events**                                                                                 |
| [image:{{preview.contentType.id}}:assignAfter](#imagepreviewcontenttypeidassignafter) | [googleMaps:authFailure](#googlemapsauthfailure)                                                 |
| [image:mountAfter](#imagemountafter)                                | [state](#state)                                                                                  |
| [image:uploadAfter](#imageuploadafter)                              | [{{config.name}}:{{preview.contentType.id}}:updateAfter](#confignamepreviewcontenttypeidupdateafter)               |

## Event details

## `contentType:*` events

Events starting with `contentType:` are triggered for every content type on the stage. These events can also be called for specific content types by prefixing the content type's name before the event (`name:event`). For example:

-  `text:createAfter`
-  `row:mountAfter`
-  `tab-item:mountAfter`

### `contentType:createAfter`

```js
events.on("contentType:createAfter", function (params) {});
```

| Params        | Type                                     |
|---------------|------------------------------------------|
| `id`          | `string`                                 |
| `contentType` | `ContentType` or `ContentTypeCollection` |

[Back to top]

### `contentType:mountAfter`

#### ContentType

```js
events.on("contentType:mountAfter", function (params) {});
```

| Params        | Type          |
|---------------|---------------|
| `id`          | `string`      |
| `contentType` | `ContentType` |

#### ContentTypeCollection

```js
events.on("contentType:mountAfter", function (params) {});
```

| Params           | Type                    |
|------------------|-------------------------|
| `id`             | `string`                |
| `contentType`    | `ContentTypeCollection` |
| `expectChildren` | `number`                |

[Back to top]

### `contentType:dropAfter`

```js
events.on("contentType:dropAfter", function (params) {});
```

| Params        | Type                                     |
|---------------|------------------------------------------|
| `id`          | `string`                                 |
| `contentType` | `ContentType` or `ContentTypeCollection` |

[Back to top]

### `contentType:renderAfter`

```js
events.on("contentType:renderAfter", function (params) {});
```

| Params        | Type                                     |
|---------------|------------------------------------------|
| `id`          | `string`                                 |
| `element`     | `HTMLElement`                            |
| `contentType` | `ContentType` or `ContentTypeCollection` |

[Back to top]

### `contentType:removeAfter`

```js
events.on("contentType:removeAfter", function (params) {});
```

| Params              | Type                                     |
|---------------------|------------------------------------------|
| `contentType`       | `ContentType` or `ContentTypeCollection` |
| `index`             | `number`                                 |
| `parentContentType` | `ContentType` or `ContentTypeCollection` |
| `stageId`           | `string`                                 |

[Back to top]

### `contentType:duplicateAfter`

```js
events.on("contentType:duplicateAfter", function (params) {});
```

| Params                 | Type                                     |
|------------------------|------------------------------------------|
| `originalContentType`  | `ContentType` or `ContentTypeCollection` |
| `duplicateContentType` | `ContentType` or `ContentTypeCollection` |
| `index`                | `number`                                 |
| `direct`               | `boolean`                                |

[Back to top]

### `contentType:moveBefore`

```js
events.on("contentType:moveBefore", function (params) {});
```

| Params         | Type                    |
|----------------|-------------------------|
| `contentType`  | `ContentType`           |
| `sourceParent` | `ContentTypeCollection` |
| `targetParent` | `ContentTypeCollection` |
| `targetIndex`  | `number`                |
| `stageId`      | `string`                |

[Back to top]

### `contentType:moveAfter`

```js
events.on("contentType:moveAfter", function (params) {});
```

| Params         | Type                    |
|----------------|-------------------------|
| `contentType`  | `ContentType`           |
| `sourceParent` | `ContentTypeCollection` |
| `targetParent` | `ContentTypeCollection` |
| `targetIndex`  | `number`                |
| `stageId`      | `string`                |

[Back to top]

### `contentType:redrawAfter`

```js
events.on("contentType:redrawAfter", function (params) {});
```

#### Backend

| Params        | Type                                     |
|---------------|------------------------------------------|
| `id`          | `string`                                 |
| `contentType` | `ContentType` or `ContentTypeCollection` |

#### Frontend

| Params    | Type          |
|-----------|---------------|
| `element` | `HTMLElement` |

[Back to top]

### `column:dragStart`

```js
events.on("column:dragStart", function (params) {});
```

| Params    | Type                    |
|-----------|-------------------------|
| `column`  | `ContentTypeCollection` |
| `stageId` | `string`                |

[Back to top]

### `column:dragStop`

```js
events.on("column:dragStop", function (params) {});
```

| Params    | Type                    |
|-----------|-------------------------|
| `column`  | `ContentTypeCollection` |
| `stageId` | `string`                |

[Back to top]

### `column:initializeAfter`

```js
events.on("column:initializeAfter", function (params) {});
```

| Params        | Type          |
|---------------|---------------|
| `column`      | `Column`      |
| `element`     | `Element`     |
| `columnGroup` | `ColumnGroup` |

[Back to top]

### `image:{{preview.contentType.id}}:assignAfter`

```js
events.on(`image:${this.contentType.id}:assignAfter`, function (params) {});
```

| Params        | Type   |
|---------------|--------|
| `imageObject` | `File` |

[Back to top]

### `image:mountAfter`

```js
events.on("image:mountAfter", function (params) {});
```

| Params           | Type          |
|------------------|---------------|
| `id`             | `string`      |
| `contentType`    | `ContentType` |
| `expectChildren` | `number`      |

[Back to top]

### `image:uploadAfter`

```js
events.on("image:uploadAfter", function (params) {});
```

| Params | Type   |
|--------|--------|
| `file` | `File` |

[Back to top]

### `stage:{{preview.contentType.stageId}}:readyAfter`

```js
events.on(`stage:${this.contentType.stageId}:readyAfter`, function (params) {});
```

| Params  | Type    |
|---------|---------|
| `stage` | `Stage` |

[Back to top]

### `stage:{{preview.contentType.stageId}}:renderAfter`

```js
events.on(`stage:${this.contentType.stageId}:renderAfter`, function (params) {});
```

| Params  | Type    |
|---------|---------|
| `stage` | `Stage` |

[Back to top]

### `stage:interactionStart`

```js
events.on("stage:interactionStart", function (params) {});
```

| Params    | Type     |
|-----------|----------|
| `stageId` | `string` |

[Back to top]

### `stage:interactionStop`

```js
events.on("stage:interactionStop", function (params) {});
```

| Params    | Type     |
|-----------|----------|
| `stageId` | `string` |

[Back to top]

### `stage:{{preview.contentType.stageId}}:fullScreenModeChangeAfter`

```js
events.on(`stage:${this.contentType.stageId}:fullScreenModeChangeAfter`, function (params) {});
```

| Params       | Type      |
|--------------|-----------|
| `fullScreen` | `boolean` |

[Back to top]

### `childContentType:sortStart`

```js
events.on("childContentType:sortStart", function (params) {});
```

| Params             | Type                        |
|--------------------|-----------------------------|
| `instance`         | `ContentTypeCollection`     |
| `originalPosition` | `number`                    |
| `ui`               | `JQueryUI.SortableUIParams` |

[Back to top]

### `childContentType:sortUpdate`

```js
events.on("childContentType:sortUpdate", function (params) {});
```

| Params             | Type                        |
|--------------------|-----------------------------|
| `instance`         | `ContentTypeCollection`     |
| `newPosition`      | `number`                    |
| `originalPosition` | `number`                    |
| `ui`               | `JQueryUI.SortableUIParams` |
| `event`            | `jQuery.Event`              |

[Back to top]

### `stage:error`

```js
events.on("stage:error", function (params) {});
```

| Params  | Type    |
|---------|---------|
| `error` | `Error` |

[Back to top]

### `stage:{{preview.contentType.stageId}}:readyAfter`

```js
events.on(`stage:${this.contentType.stageId}:readyAfter`, function (params) {});
```

| Params  | Type    |
|---------|---------|
| `stage` | `Stage` |

[Back to top]

### `stage:{{preview.contentType.stageId}}:masterFormatRenderAfter`

```js
events.on(`stage:${this.contentType.stageId}:masterFormatRenderAfter`, function (params) {});
```

| Params           | Type     |
|------------------|----------|
| `renderedOutput` | `string` |

[Back to top]

### `stage:updateAfter`

```js
events.on("stage:updateAfter", function (params) {});
```

| Params    | Type     |
|-----------|----------|
| `stageId` | `string` |

[Back to top]

### `stage:childFocusStart`

```js
events.on("stage:childFocusStart", function () {});
```

| Params | Type |
|--------|------|
| `None` |      |

[Back to top]

### `stage:childFocusStop`

```js
events.on("stage:childFocusStop", function () {});
```

| Params | Type |
|--------|------|
| `None` |      |

[Back to top]

### `stage:viewportChangeAfter`

Triggered on viewport changes in the Admin stage.
Handle this event to control in your content type's widget (`widget.js`) for cases in which your content type is rendered on the Admin stage from within a Block or Dynamic Block.
In these cases, Page Builder loads your `widget`, not the `preview` component, to the Admin stage. This means that your widget as to make changes to your content type when users change the viewports on the stage.

```js
events.on(`stage:viewportChangeAfter`, function (args) {});
```

| Args               | Type     |
|--------------------|----------|
| `viewport`         | `string` |
| `previousViewport` | `string` |

[Back to top]

### `stage:{{preview.contentType.stageId}}:viewportChangeAfter`

Triggered on viewport changes in the Admin stage.
Handle this event to control responsive changes to your content type from within your `preview` component.

```js
events.on(`stage:${this.contentType.stageId}:viewportChangeAfter`, function (args) {});
```

| Args               | Type     |
|--------------------|----------|
| `viewport`         | `string` |
| `previousViewport` | `string` |

[Back to top]

### `state`

```js
events.on("state", function (params) {});
```

| Params  | Type        |
|---------|-------------|
| `state` | `DataStore` |

[Back to top]

### `{{config.name}}:{{preview.contentType.id}}:updateAfter`

```js
events.on(`${this.config.name}:${this.contentType.id}:updateAfter`, function (params) {});
```

| Params        | Type          |
|---------------|---------------|
| `contentType` | `ContentType` |

[Back to top]

### `googleMaps:authFailure`

```js
events.on("googleMaps:authFailure", function () {});
```

| Params | Type |
|--------|------|
| `None` |      |

[Back to top]

[Back to top]: #events-list
