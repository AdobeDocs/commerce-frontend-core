---
title: Page Caching | Commerce Frontend Development
description: Learn how to use page caching to improve the performance of your Adobe Commerce and Magento Open Source frontends.
keywords:
  - Cache
  - Native Luma Frontend Development
  - Storefront
  - Themes
---

# Page caching

Caching is one of the most effective ways to improve website performance. Generally speaking, there are two methods of caching content:

-  Client-side (browser)
-  Server-side

Retrieving stored (cached) content from a previous request for the same client instead of requesting files from your server every time someone visits your site is a more efficient use of network bandwidth.

The Adobe Commerce and Magento Open Source page cache library contains a simple PHP reverse proxy that enables full page caching out of the box. A reverse proxy acts as an intermediary between visitors and your application and can reduce the load on your server.

We recommend using [Varnish](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cache/varnish/config-varnish.html), but you can use the default caching mechanism instead, which stores cache files in any of the following:

-  File system (You don't need to do anything to use file-based caching.)
-  [Database](https://developer.adobe.com/commerce/php/development/cache/partial/database-caching/)
-  [Redis](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cache/redis/redis-pg-cache.html)

## Cacheable and uncacheable pages

*Cacheable* and *uncacheable* are terms we use to indicate whether or not a page should be cached at all. (By default, all pages are cacheable except the checkout pages.) If any block in a layout is designated as uncacheable, the entire page is uncacheable.

To create an uncacheable page, mark any block on that page as uncacheable in the layout using `cacheable="false"`.

```xml
<block class="Magento\Customer\Block\Form\Edit" name="customer_edit" template="Magento_Customer::form/edit.phtml" cacheable="false">
    <container name="form.additional.info" as="form_additional_info"/>
</block>
```

Examples of uncacheable pages include the compare products, cart, checkout pages, and so on.

[Example](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Paypal/view/frontend/layout/paypal_payflow_returnurl.xml)

<InlineAlert variant="warning" slots="text"/>

Do not configure content pages (i.e., catalog, product, and CMS pages) to be uncacheable. Doing so has an adverse affect on performance.

## Public and private content

Reverse proxies serve "public" or shared content to more than one user. However, most Adobe Commerce and Magento Open Source websites generate dynamic and personalized "private" content that should only be served to one user, which presents unique caching challenges. To address these challenges, the application can distinguish between two types of content:

-  **[Public](https://developer.adobe.com/commerce/php/development/cache/page/public-content/)** - Public content is stored server side in your reverse proxy cache storage (e.g., file system, database, Redis, or Varnish) and is available to multiple customers. Examples of public content include header, footer, and category listing.

-  **[Private](https://developer.adobe.com/commerce/php/development/cache/page/private-content/)** - Private content is stored client side (e.g., browser) and is specific to an individual customer. Examples of private content include wishlist, shopping cart, customer name, and address. You should limit stored private content to a small portion of the page's total content.

<InlineAlert variant="info" slots="text"/>

Only HTTP [GET](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) and [HEAD](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.4) requests are cacheable. For more information about caching, see [RFC-2616 section 13](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html).

## Cache types

The following cache types mostly have impact on frontend development process:

| Cache type "friendly" name | Cache type code name | Description                                                                                                                                                                                                                                                                                                                                       |
|----------------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Layout                     | `layout`             | Compiled page layouts (that is, the layout components from all components). Clean or flush this cache type after modifying layout files.                                                                                                                                                                                                          |
| Block HTML output          | `block_html`         | HTML page fragments per block. Clean or flush this cache type after modifying the view layer.                                                                                                                                                                                                                                                     |
| Page cache                 | `full_page`          | Generated HTML pages. If necessary, the application cleans up this cache automatically, but third-party developers can put any data in any segment of the cache. Clean or flush this cache type after modifying code level that affects HTML output. It's recommended to keep this cache enabled because caching HTML improves performance significantly. |
| Translations               | `translate`          | Merged translations from all modules.                                                                                                                                                                                                                                                                                                             |

<InlineAlert variant="help" slots="text"/>

The full list of cache types can be found in the [Overview of cache types](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/manage-cache.html) topic.

## Clean cache

To clean cache, run

```bash
bin/magento cache:clean <type> <type>
```

To view the status of the cache, run:

```bash
bin/magento cache:status
```

For more details about working with cache, see [Manage the cache](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/manage-cache.html)

## Clean static files cache

You can clean generated static view files in any of the following ways:

-  In the Admin. Go to **System** > **Tools** > **Cache Management** and click **Flush Static Files Cache**.

   <InlineAlert variant="info" slots="text"/>

   This option is only available in `developer` mode. Refer to the [static view files overview](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment.html) for more information. For more details about the application modes, see [application modes](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/set-mode.html)

-  Manually by clearing the `pub/static` and `var/view_preprocessed` directories and subdirectories *except* for `pub/static/.htaccess`.

   To clear the `pub/static` directory of all files except `.htaccess` (which is a hidden file), enter the following command:

   ```bash
   rm -r pub/static/*/*
   ```

   To clear the `var/view_preprocessed`, enter the following command:

   ```bash
   rm -r var/view_preprocessed/*
   ```

-  Several commands support an optional parameter `--clear-static-content`, which cleans generated static view files:

   -  [`magento module:enable` and `magento module:disable`](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules)
   -  [`magento theme:uninstall`](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/themes)
   -  [`magento module:uninstall`](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/uninstall-modules)

## Clean static files

Besides the cached files, in theme development process developers also deal with other saved files - static view files that are preprocessed and published to the `var/view_preprocessed` and `pub/static` directories correspondingly. In most cases when working on a custom theme, for example, if you are only working on styles, you do not need to clean cache, but need to clean the previously preprocessed and published static view files. To clean them, run  `grunt clean <theme>` or manually clear the `pub/static` and `var/view_preprocessed` directories.
