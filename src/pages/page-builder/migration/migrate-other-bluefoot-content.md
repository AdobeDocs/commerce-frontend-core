---
title: Migrate other BlueFoot content
description: Migrate content that is not usually migrated from the Commerce database.
keywords:
  - Page Builder
edition: pass
---

# Migrate other BlueFoot content

By default, the migration module only migrates content from these tables of the Commerce database:

-  CMS Pages

-  CMS Blocks

-  Catalog Product Attributes

-  Catalog Category Attributes

If you have BlueFoot content in other tables, you must complete the following steps to migrate that content.

## Prerequisites

This topic assumes you have a functioning Magento 2 module. If not, create a basic skeleton module now and verify that Commerce loads the module during `setup:upgrade`.

## Steps for migrating other content

Here are the basic steps for migrating BlueFoot content from other database tables:

1. Add the following directory structure within your module: `Setup/Patch/Data`.

1. Create a [data patch class](https://developer.adobe.com/commerce/php/development/components/declarative-schema/patches/) for your migration. Example: `MigrateBlogToPageBuilder.php`. Commerce executes this class when installing your module.

1. Implement the `Magento\Framework\Setup\Patch\DataPatchInterface`.

1. Define your migration logic within the `apply()` function.

## Data patch class example

The following example shows how you might migrate blog content created with BlueFoot:

```php
<?php
declare(strict_types=1);

namespace VendorName\Blog\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\DB\AggregatedFieldDataConverter;
use Magento\Framework\DB\Select\QueryModifierFactory;
use Magento\Framework\DB\FieldToConvert;
use Magento\PageBuilderDataMigration\Setup\DataConverter\Format;
use Magento\PageBuilderDataMigration\Setup\DataConverter\BlueFootToPageBuilder;

class MigrateToBlogPageBuilder implements DataPatchInterface
{
    /**
     * @var ModuleDataSetupInterface
     */
    private $moduleDataSetup;

    /**
     * @var AggregatedFieldDataConverter
     */
    private $aggregatedFieldConverter;

    /**
     * @var QueryModifierFactory
     */
    private $queryModifierFactory;

    /**
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param AggregatedFieldDataConverter $aggregatedFieldConverter
     * @param QueryModifierFactory $queryModifierFactory
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        AggregatedFieldDataConverter $aggregatedFieldConverter,
        QueryModifierFactory $queryModifierFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->aggregatedFieldConverter = $aggregatedFieldConverter;
        $this->queryModifierFactory = $queryModifierFactory;
    }

    /**
     * @return DataPatchInterface|void
     * @throws \Magento\Framework\DB\FieldDataConversionException
     */
    public function apply()
    {
        $this->aggregatedFieldConverter->convert(
            [
                new FieldToConvert(
                    BlueFootToPageBuilder::class,
                    $this->moduleDataSetup->getTable('blog'),
                    'blog_id',
                    'content',
                    $this->queryModifierFactory->create(
                        'like',
                        [
                            'values' => [
                                'content' => '%' . Format::BLUEFOOT_KEY . '%'
                            ]
                        ]
                    )
                ),
            ],
            $this->moduleDataSetup->getConnection()
        );
    }

    /**
     * @inheritdoc
     */
    public function getAliases()
    {
        return [];
    }

    /**
     * @inheritdoc
     */
    public static function getDependencies()
    {
        return [];
    }
}
```

The key part of this implementation is the logic within the `apply()` function. The function uses the `aggregatedFieldConverter` to iterate over each `blog` table row. For each row, we run the `BlueFootToPageBuilder` data converter. And we optimize it by using a query modifier to retrieve only the BlueFoot content:

```php
$this->aggregatedFieldConverter->convert(
    [
        new FieldToConvert(
            BlueFootToPageBuilder::class,
            $this->moduleDataSetup->getTable('blog'),
            'blog_id',
            'content',
            $this->queryModifierFactory->create(
                'like',
                [
                    'values' => [
                        'content' => '%' . Format::BLUEFOOT_KEY . '%'
                    ]
                ]
            )
        ),
    ],
    $this->moduleDataSetup->getConnection()
);
```

## Run your migration module

<InlineAlert variant="info" slots="text"/>

The above changes will not run when using `bin/magento pagebuilder:migrate`. That command only runs for the default areas mentioned at the start of this topic. If you want to run your setup patch using a similar command, you need to create a console command for your module. Otherwise, you can use the `setup:upgrade` command as follows.

You can now run the `setup:upgrade` command to migrate your other BlueFoot content:

```bash
bin/magento setup:upgrade
```

That's it. Use this same pattern to migrate BlueFoot content from other tables.
