---
group: ui-components-guide
title: Add Custom Editor
---

## Before you begin...

This tutorial goes through the process of adding [CKEditor4] as an editor that can be used by the WYSIWYG UI component.

As a developer, use this tutorial as a guide for adding your own custom JavaScript editor to Magento.

## Step 1. Make the editor library available

Download and install your editor's library into your module's `view/base/web/js` directory to have the application publish it under `pub/static`.

## Step 2. Register editor

In your module's `etc/adminhtml/di.xml` file, add your editor to the list of `adapterOptions` to include it to the list of available WYSIWYG editors in the Admin.

Provide unique values for the `name` parameter and the `value` and `label` entries for your editor to avoid naming collisions.

If you are also extending or overriding the configuration for Variable, Widget, or Gallery, you must use the same string as the `value` entry.

> CKEditor registration in `app/code/CKEditor/CKEditor4/etc/adminhtml/di.xml`

```xml
<type name="Magento\Cms\Model\Config\Source\Wysiwyg\Editor">
    <arguments>
        <argument name="adapterOptions" xsi:type="array">
            <item name="ckeditor" xsi:type="array">
                <item name="value" xsi:type="string">CKEditor_CKEditor4/ckeditor4Adapter</item>
                <item name="label" xsi:type="string" translatable="true">ckeditor</item>
            </item>
        </argument>
    </arguments>
</type>
```

To avoid issues in the case that we remove or disable the adapter module, add this configuration to the `di.xml` file:

> Configuration in `di.xml`

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Ui\Block\Wysiwyg\ActiveEditor">
        <arguments>
            <argument name="availableAdapterPaths" xsi:type="array">
                <item name="CKEditor_CKEditor4/ckeditor4Adapter" xsi:type="string"/>
            </argument>
        </arguments>
    </type>
</config>
```

## Step 3. Create editor adapter

Create an adapter for your editor in your module's `view/base/web` directory.
This adapter should implement the extensions points called by `wysiwygInstance` in the following file:

`lib/mage/adminhtml/wysiwyg/tiny_mce/setup.js`

At minimum your adapter should implement the following methods:

*  `getAdapterPrototype()`
*  `setup( mode )`
*  `openFileBrowser( o )`
*  `toggle()`
*  `onFormValidation()`
*  `encodeContent(content)`

If you are integrating entities such as variable and widget as plugins, your adapter must also implement the following methods:

*  `get( id )` - returns the editor by it element id
*  `getContent()` - returns the content stored in the WYSIWYG field
*  `setContent(content)` - replaces the entire contents of the WYSIWYG with the string content parameter
*  `insertContent( content )` - inserts content into the editor
*  `setCaretOnElement( targetElement )` - sets the caret location in the editor
*  `activeEditor()` - returns the active editor as an object with a `selection` property.

   The `selection` property returns an instance of the editor with the following additional methods defined:

   *  `getBookmark( type:Number, normalized:Boolean ):Object` - returns a bookmark object that has the location for the current selection.

      This is used to restore the selection after content modification in the document.

   *  `moveToBookmark( bookmark:Object ):Boolean` - restores the selection of the specified bookmark.
   *  `getNode():Element` - returns the currently selected element or common ancestor element for both start and end of the selection.
   *  `select( targetElement )` - selects the specified element.

      This places the start and end of the selection range around the element.

   *  `collapse( to_start:Boolean ):void` - collapse the selection to start or end of range.

**Example:** CKEditor/CKEditor4/view/base/web/ckeditor4Adapter.js

``` js
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/* global varienGlobalEvents, tinyMceEditors, MediabrowserUtility, closeEditorPopup, Base64 */
/* eslint-disable strict */
define([
    'jquery',
    'underscore',
    'CKEditor_CKEditor4/js/ckeditor4/ckeditor',
    'mage/translate',
    'prototype',
    'mage/adminhtml/events',
    'jquery/ui'
], function (jQuery, _, ckeditor4) {

    var ckeditorWysiwyg = Class.create();

    ckeditorWysiwyg.prototype = {
        mediaBrowserOpener: null,
        mediaBrowserTargetElementId: null,

        /**
         * @param {*} htmlId
         * @param {Object} config
         */
        initialize: function (htmlId, config) {
            this.id = htmlId;
            this.config = config;

            if (typeof ckeditorWysiwyg === 'undefined') {
                window.ckeditorWysiwyg = $H({});
            }

            var settings = '';
            ckeditorWysiwyg.settings = this.config;
            settings = $H({});
            if (this.config.plugins) {
                this.config.plugins.each(function (plugin) {
                    settings.set(plugin.name, plugin.options);
                });
                this.config.magentoPluginsOptions = settings;
            }
            this.config.elements = this.id;
            ckeditor4.settings = this.config;
        },

        /**
         * @param {*} mode
         */
        setup: function (mode) {
            ckeditor4.replaceAll();
        },

        /**
         * Insert content to active editor.
         *
         * @param {String} content
         * @param {Boolean} ui
         */
        insertContent: function (content, ui) {
            this.activeEditor().insertText(content);
        },

        /**
         * @param {Object} o
         */
        openFileBrowser: function (o) {
        },

        /**
         * Encodes the content so it can be inserted into the wysiwyg
         * @param {String} content - The content to be encoded
         *
         * @returns {*} - The encoded content
         */
        updateContent: function (content) {
        },

        /**
         * On form validation.
         */
        onFormValidation: function () {
            if (tinyMCE4.get(this.id)) {
                $(this.id).value = tinyMCE4.get(this.id).getContent();
            }
        },
        /**
         * @param {String} id
         */
        get: function (id) {
            return ckeditor4.instances[id];
        },

        /**
         * @return {Object}
         */
        activeEditor: function () {
            var activeInstance = false;
            _.each(ckeditor4.instances, function (instance) {
                if (instance.activeEnterMode === 1) {
                    activeInstance = instance;
                    instance.getBookmark = function () {
                        return null;
                    };
                    instance.moveToBookmark = function () {
                        return instance;
                    };
                    instance.getNode = function () {
                        return instance.getSelection();
                    };
                    instance.getNode = function () {
                        return instance.getSelection();
                    };
                    activeInstance.selection = instance;

                }
            });
            return activeInstance;
        },

        /**
         * @param {*} mode
         * @return {tinyMceWysiwygSetup}
         */
        turnOn: function (mode) {
        },

        /**
         * @return {tinyMceWysiwygSetup}
         */
        turnOff: function () {

            return this;
        },

        /**
         * Retrieve directives URL with substituted directive value.
         *
         * @param {String} directive
         */
        makeDirectiveUrl: function (directive) {

        },

        /**
         * @param {Object} content
         * @return {*}
         */
        encodeDirectives: function (content) {

        },

        /**
         * @param {Object} content
         * @return {*}
         */
        encodeWidgets: function (content) {

        },

        /**
         * @param {Object} content
         * @return {*}
         */
        decodeDirectives: function (content) {

        },

        /**
         * @param {Object} content
         * @return {*}
         */
        decodeWidgets: function (content) {

        },

        /**
         * @param {Object} attributes
         * @return {Object}
         */
        parseAttributesString: function (attributes) {

        },

        /**
         * Update text area.
         */
        updateTextArea: function () {

        },
        setCaretOnElement: function (targetElement) {
            this.activeEditor().selection.select(targetElement);
            this.activeEditor().selection.collapse();
        },

        /**
         * @param {Object} content
         * @return {*}
         */
        decodeContent: function (content) {

        },

        /**
         * @return {Boolean}
         */
        toggle: function () {
            return this.wysiwygInstance.toggle();
        },

        /**
         * @param {Object} content
         * @return {*}
         */
        encodeContent: function (content) {
        },

        /**
         * @param {Object} o
         */
        beforeSetContent: function (o) {

        },

        /**
         * @param {Object} o
         */
        saveContent: function (o) {

        },

        /**
         * @returns {Object}
         */
        getAdapterPrototype: function () {
            return ckeditorWysiwyg;
        },

        /**
         * Return the content stored in the WYSIWYG field
         * @param {String} id
         * @return {String}
         */
        getContent: function (id) {

        }
    };

    return ckeditorWysiwyg.prototype;
});
```

## Step 4. Load editor library

After loading, modifying, and merging all configurations, the application serializes the result into a JSON object and passes it to the UI component.

In your module's `view/base/requirejs-config.js` file, add a shim configuration entry for your editor in order to have RequireJS load it correctly.

**Example:** CKEditor\CKEditor4\view\base\requirejs-config.js

```json
var config = {
    "shim": {
        "CKEditor_CKEditor4/js/ckeditor4/ckeditor": { "exports": "CKEDITOR" }
    }
};
```
[CKEditor4]: https://ckeditor.com/ckeditor-4/
