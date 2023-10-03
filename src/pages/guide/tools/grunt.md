---
title: Grunt | Commerce Frontend Development
description: Follow this tutorial to install and configure Grunt for Adobe Commerce and Magento Open Source theme development.
keywords:
  - Native Luma Frontend Development
  - Storefront
  - Themes
  - Tools
---

# Grunt

The topic describes how to install and configure [Grunt JavaScript task runner](http://gruntjs.com/).

You can use Grunt to automate any tasks you need, but out of the box the application comes with pre-configured grunt tasks for compiling LESS files.

## Prerequisites

Make sure that you [set](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/set-mode.html) your application to the developer or default [mode](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/setup/application-modes.html).

## Install and configure Grunt

The application has built-in Grunt tasks configured, but there are still several steps you need to take to be able to use it:

1. Install [node.js](https://nodejs.org/en/download/package-manager/) to any location on your machine.

1. Install Grunt CLI tool globally. To do this, run the following command in a command prompt:

   ```bash
   npm install -g grunt-cli
   ```

1. From the `<Magento_root>` directory, copy and paste the contents of the following files:

   -  `package.json.sample` into `package.json`
   -  `Gruntfile.js.sample` into `Gruntfile.js`
   -  `grunt-config.json.sample` into `grunt-config.json`

1. Install (or refresh) the `node.js` project dependency, including Grunt, for your instance. To do this, run the following commands in a command prompt:

   ```bash
   cd your_Magento_instance_directory
   ```

   ```bash
   npm install
   ```

   ```bash
   npm update
   ```

## Configuration file

Copy the contents of `themes.js` into `local-themes.js` in the `dev/tools/grunt/configs/` directory.

If installed as described above, Grunt will use the default configuration files located in the `dev/tools/grunt/configs/` directory. You can define your theme in the `local-themes.js` file. The following shows an example of how you can define your theme.

```javascript
<theme>: {
  area: '<area>',
  name: '<Vendor>/<theme>,
  locale: '<language>',
  files: [
    '<path_to_file1>', //path to root source file
    '<path_to_file2>'
  ],
dsl: 'less'
}
```

Where the following notation is used:

-  `<Vendor>`: vendor name.
-  `<theme>`: your theme code, conventionally should correspond to the theme directory name.
-  `<area>`: area code, can be either `frontend` or `adminhtml`.
-  `<language>`: specified in the `code_subtag` format, for example `en_US`. Only one locale can be specified here. To debug the theme with another locale, create one more theme declaration, having specified another value for `language`.
-  `<path_to_file>`: path to the root source file, relative to the `app/design/frontend/<Vendor>/<theme>/web` directory. You need to specify all [root source files of the theme](../css/preprocess.md). If your theme [inherits] from a certain theme, and does not contain its own root source files, specify the root source files of the parent theme.

Once these are set correctly, run grunt to watch your changes.

-  Run `grunt exec:<theme>` from the root directory to republish the symlinks.
-  Run `grunt watch:<theme>` so that grunt will watch for file changes.

## Custom Grunt configuration files

There are several ways to declare a custom configuration file.

### Declare a custom configuration file (option 1)

To use a custom file for Grunt configuration:

1. Copy the default configuration file to the preferred location in the instance directory. Do not change the file name.
1. Open the `grunt-config.json` file in the installation and set configurations object as follows.

   -  key: file alias
   -  value: path to your custom file

   Example:
   If your custom configuration file `local-themes.js` is located in the `<magento_root>/dev/tools/grunt/configs` directory, the following is already set in your `grunt-config.json`:

   ```json
   {
       "themes": "dev/tools/grunt/configs/local-themes.js"
   }
   ```

This path is also added to your .gitignore by default.

### Declare a custom configuration file (option 2)

You can also use the other way to declare a custom config file:

1. In your Grunt related scripts, in the file router, set the alias and path to the custom configuration file. For example, to set the custom `themes.loc.js` configuration file, this would look like the following:

   ```js
   filesRouter.set('themes', 'dev/tools/grunt/configs/themes.loc.js');
   ```

   It must be added earlier, than the `get()` method with this alias is called.

1. In the `dev/tools/grunt/configs/` directory, create a copy of the default configuration file. Change its name by adding the ".loc" suffix. For example, your copy of `themes.js` will be `themes.loc.js`.

### How to use a custom configuration file

To tell Grunt to use a custom configuration file, instead of the default one, add the following in your script:

1. Require file-router:

   ```js
   var fileRouter = require('/files-router');
   ```

1. Call the `get(%file_alias%)` method to get the configuration file.

   ```js
   var themes = fileRouter.get('themes');
   ```
