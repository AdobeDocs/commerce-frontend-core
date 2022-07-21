---
title: uiCollection class | Commerce Frontend Development
description: Learn about the methods and properties available for creating a collection of Adobe Commerce and Magento Open Source child UI components.
---

# uiCollection class

The `uiCollection` library class should be used as a base class by any components that contain a collection of child UI components.  `uiCollection` inherits from the [uiElement class](element.md).

`uiCollection` source code is `<Magento_Ui_module_dir>/view/base/web/js/lib/core/collection.js`, in the Magento Open Source GitHub repository: [app/code/Magento/Ui/view/base/web/js/lib/core/collection.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/core/collection.js).

## Commonly used methods

The `uiCollection` class implements the following methods:

*  The `initElement()` method allows you to add custom functionality to a child UI component or to the current UI component at the moment when the child UI component initializes. The `initElement()` method gets the child [UI component](https://glossary.magento.com/ui-component) instance as a parameter.

   Example:

   ```javascript
   initElement: function (childInstance) {
       childInstance.%customProperty% = 21;
       this.%currentComponentProperty% = 42;
   }
   ```

*  The `destroy()` method removes the following for the child components and itself:
   *  link to the component in `uiRegistry`
   *  link to the component in the parent component
   *  event listeners

  Example:

   ```javascript
   this.destroy();
   ```

*  The `getChild()` method returns an element from the collection of child UI components.

  Example:

   ```javascript
   this.getChild(childIndex)
   ```

   where `childIndex` is the value of the child element's `index` property.

## Commonly used properties

*  `elems` is the observable property that contains the collection of child UI components.

   Example:

   ```javascript
   console.log(this.elems());

   // [
   //   %uiComponentInstance 1 %,
   //   %uiComponentInstance 2 %,
   //   %uiComponentInstance 3 %,
   //   %uiComponentInstance 4 %
   // ]
   ```

*  `childDefaults` can be used to set the children defaults: properties from `childDefaults` are set into child elements' [`defaults` property](class.md#commonly-used-properties).

   This is an example of configuring the provider property by default for all child elements of the [Columns](../columns.md) component.

   ```xml
   <listing>
       ...
       <columns>
           <settings>
               <childDefaults>
                   <param name="provider" xsi:type="string">ui_registry.path.to.provider.component</param>
               </childDefaults>
           </settings>
           ...
       </columns>
   </listing>
   ```

## Template

The `uiCollection` template is `<Magento_Ui_module_dir>/view/base/web/templates/collection.html`, in the Magento Open Source GitHub repository: [`app/code/Magento/Ui/view/base/web/templates/collection.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/templates/collection.html).

This template performs only one task: renders child templates if they exist.

It looks like following:

```html
<each args="data: elems, as: 'element'">
    <render if="hasTemplate()"/>
</each>
```

 Here `elems` is the collection of the child elements of `uiCollection`. As far as `elems` is the observable property, the templates of the components added to `elems` in the runtime, are also rendered.
