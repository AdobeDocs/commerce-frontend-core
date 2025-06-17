---
title: Troubleshooting
description: Troubleshoot adding content types.
keywords:
  - Page Builder
edition: paas
---

# Troubleshooting

## Change in the master.html is not visible

When you are working on a page and changing the master.html template, you need to Save the page in the Admin UI and make some kind of change to the preview template on the Admin UI. Otherwise, you will not see your changes in the browser. This is due to how Page Builder updates changes: it will not update the master template until changes have been made to the page.

## Change in the configuration is not visible

If you change something in the configuration of your extension, and the change is not visible, run `bin/magento cache:clean` to ensure that the configuration is updated.
