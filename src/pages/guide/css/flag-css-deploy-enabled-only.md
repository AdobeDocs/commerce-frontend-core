---
title: Trigger flag deploy styles for only enabled modules
description: Trigger deploy css styles
keywords:
  - Native Frontend Development
  - Storefront
  - Themes
---

# Overview

Default all css by default will build to final css no matter modules enabled or disabled. With this flag explain below allow developers able to control how we want css generate


## Changing flag trigger deploy static contents

1. Add inside to app/etc/env.php or app/etc/config.php. Add following line to the top array

```php
return [
'static_content_only_enabled_modules' => true,
//...other lines
]
```

With true value meaning magento will deploy static content styles from enabled module to final css files (styles-l.css, styles-m.css). If set value to false magento will deploy all styles no matter modules enabled or disabled!


2. After modify php file. Make sure re-run setup upgrade for update config flag 


sync-up config

```bash
php bin/magento app:config:import
```

and run setup command

```bash
php bin/magento setup:upgrade
```

Now re-run deploy static content if need

```bash
php bin/magento setup:static-content:deploy en_US --area frontend
```

Ensure you replace en_US with the appropriate locale code if your store uses a different language