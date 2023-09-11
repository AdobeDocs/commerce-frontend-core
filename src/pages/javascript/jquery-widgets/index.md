---
title: jQuery widgets | Commerce Frontend Development
description: Review introductory material about how Adobe Commerce and Magento Open Source use jQuery.
---

# jQuery widgets

The Adobe Commerce and Magento Open Source applications use a jQuery JavaScript library to implement client functionality. This includes a wide usage of standard, customized, and custom jQuery widgets.

<InlineAlert variant="info" slots="text" />

The application supports [jQuery UI 1.13.2](https://blog.jqueryui.com/2022/07/jquery-ui-1-13-2-released/), widget options added in later versions might be unavailable.

<InlineAlert variant="info" slots="text" />

The application does not contain jQuery UI styles out-of-the-box. Also, it is not recommended to download them as is, because it can break the default application design. To use certain jQuery UI styles, you need to add them manually in your custom stylesheets in the `{your_theme_dir}/web/css` or `{your_module_dir}/view/{area}/web/css` directory.
