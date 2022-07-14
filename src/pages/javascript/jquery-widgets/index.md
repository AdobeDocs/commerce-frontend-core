---
group: javascript-developer-guide
title: jQuery widgets
---

The Magento system uses a jQuery JavaScript library to implement client functionality. This includes a wide usage of standard, customized, and custom jQuery widgets.

{:.bs-callout-info}
Magento 2 supports [jQuery UI 1.9.2](http://blog.jqueryui.com/2012/11/jquery-ui-1-9-2/), widget options added in later versions might be unavailable.

{:.bs-callout-info}
Magento out of the box does not contain jQuery UI styles. Also, it is not recommended to download them as is, because it can break the default Magento design. To use certain jQuery UI styles, you need to add them manually in your custom stylesheets in the `{your_theme_dir}/web/css` or `{your_module_dir}/view/{area}/web/css` directory.
