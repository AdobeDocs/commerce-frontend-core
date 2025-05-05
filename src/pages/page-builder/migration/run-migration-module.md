---
title: Run the migration module
description: Run and debug the migration module.
keywords:
  - Page Builder
edition: pass
---

# Run the migration module

<InlineAlert variant="warning" slots="text"/>

We strongly recommend creating database backups before running the migration module. Once you migrate your data, you can't revert it if you don't like the results. You can only rollback to one of your backup databases. During development, you will probably need to rerun your migration more than once to ensure that your BlueFoot content migrates to Page Builder as you intend. So keep those database backups handy.

You can run the migration module in one of two ways:

1. **Run it manually** using the console command: `bin/magento pagebuilder:migrate` (for migration during development).

1. **Run it on installation** using `bin/magento setup:upgrade` (for migration-on-deployment within production environments).

## Run Manually

Running the migration module manually is ideal during development when you need to adjust the migration code before running it.
To run the module manually, use the following command:

```bash
bin/magento pagebuilder:migrate
```

## Run on Installation

Migrating your content during installation is ideal when deploying to production environments. In such cases, your content is migrated when you install your modules, as follows:

```bash
bin/magento setup:upgrade
```

## Debugging

When the migration module encounters an error, it does not show those errors in the console. Instead, it preserves the content and labels it as unmigrated within the HTML output. This happens when custom content types do not have corresponding renderer's, or when existing content types throw general errors.

The module stores the unmigrated content within a HTML comment starting with `<!--UNMIGRATED_CONTENT...-->`.

If you encounter unmigrated content during your migration, see the data converters and the unmigrated content sections in [How content migration works](how-content-migration-works.md).

## Next steps

Before running the migration suite, it helps to understand [how content migration works](how-content-migration-works.md).
