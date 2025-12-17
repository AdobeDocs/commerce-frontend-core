---
title: Migrate content from custom blocks
description: Migrate content from your custom BlueFoot blocks to Page Builder custom content types.
keywords:
  - Page Builder
---

<Edition slot="text"/>

[PaaS only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions)

# Migrate content from custom blocks

This topic describes how to migrate content from your custom BlueFoot blocks to Page Builder custom content types.

The example code used in this topic is for migrating the data for a custom BlueFoot block called `list`.

## Prerequisites

This topic assumes you have taken the following actions:

-  Migrated the core BlueFoot blocks

-  Familiarized yourself with our [content type renderers](how-content-migration-works.md).

-  Familiarized yourself with the [module lifecycle](https://developer.adobe.com/commerce/php/development/prepare/extension-lifecycle/).

-  Re-implemented your custom BlueFoot block as a new Page Builder content type.

  This prerequisite is the most time-consuming. But with careful planning, you can build a simpler version of your BlueFoot block in Page Builder.

## Step 1: Increase version

Increase your module's `version` in the [`composer.json`](https://developer.adobe.com/commerce/php/development/build/composer-integration/) file.

This causes Adobe Commerce to run your module's setup scripts during the migration process.

<InlineAlert variant="info" slots="text"/>

Follow Commerce's [versioning policy](https://developer.adobe.com/commerce/php/development/versioning/) when deciding the value of your module's next version.

## Step 2: Add Page Builder dependency

Add the `Magento_PageBuilder` module dependency to your `composer.json` and `module.xml` files.

This gives your module access to the required migration API during the migration.

## Step 3: Build the renderer

The renderer contains the data conversion code for your content type. It converts the BlueFoot JSON to the HTML storage format used by Page Builder content types.

Create the following class under `Setup/DataConverter/Renderer` and implement the following interface:

```php
Magento\PageBuilder\Setup\DataConverter\RendererInterface
```

```php
namespace VendorName\ModuleName\Setup\DataConverter\Renderer;

use Magento\PageBuilder\Setup\DataConverter\RendererInterface;
use Magento\PageBuilder\Setup\DataConverter\EavAttributeLoaderInterface;
use Magento\PageBuilder\Setup\DataConverter\StyleExtractorInterface;

class List implements RendererInterface
{
    /**
     * @var EavAttributeLoaderInterface
     */
    private $eavAttributeLoader;

    public function __construct(
        EavAttributeLoaderInterface $eavAttributeLoader
    ) {
        $this->eavAttributeLoader = $eavAttributeLoader;
    }

    /**
     * {@inheritdoc}
     */
    public function render(array $itemData, array $additionalData = [])
    {
        $eavData = $this->eavAttributeLoader->load($itemData['entityId']);

        return '<div>Your output HTML here</div>';
    }
}
```

## Step 4: Add renderer to the RenderPool

The `RenderPool` maps BlueFoot blocks to the renderers that migrate their content. You can find the existing renderers in `app/code/Magento/PageBuilderDataMigration/etc/di.xml`.

The migration module uses the `RenderPool` in the `di.xml` file to find the renderer to run for a given block type. For example, if the migration module encounters a BlueFoot entity type of `row`, it searches for the name `row` in the `RenderPool`. If it finds the name, it runs the associated renderer to migrate the row content.

The same logic applies to your _custom_ BlueFoot blocks. If the name of your custom block is `list`, you must add it to the `RenderPool` in your module's `di.xml` file. If you don't add it, the migration module will not migrate your the content from your `list` block.

```xml
<type name="Magento\PageBuilder\Setup\DataConverter\RendererPool">
    <arguments>
        <argument name="renderers" xsi:type="array">
            <item name="list" xsi:type="object">VendorName\ModuleName\Setup\DataConverter\Renderer\List</item>
        </argument>
    </arguments>
</type>
```

Example: List renderer `di.xml` entry

## Step 5: Run migration

If you have not run the migration module yet, do it now using the following command:

```bash
bin/magento setup:upgrade
```

## Step 6: Add a new setup patch

Create a new data patch inline with our [declarative schema documentation](https://developer.adobe.com/commerce/php/development/components/declarative-schema/patches/). For this migration, we first declare the following dependencies in the constructor:

-  `Magento\Framework\EntityManager\MetadataPool`

-  `Magento\Framework\DB\AggregatedFieldDataConverter`

-  `Magento\Framework\DB\Select\QueryModifierFactory`

-  `Magento\Framework\DB\FieldToConvert`

-  `Magento\PageBuilder\Setup\DataConverter\MixedToPageBuilder`

<InlineAlert variant="info" slots="text"/>

The migration module migrates the content from unknown BlueFoot blocks into HTML Code content types. To migrate this content into other content types, use the `MixedToPageBuilder` data converter.

The following example uses the `MixedToPageBuilder` class to convert content from CMS pages (cms_page), CMS blocks (cms_block), product attributes (catalog_product_entity_text), and catalog attributes (catalog_category_entity_text):

```php
$pageMetadata = $this->metadataPool->getMetadata(PageInterface::class);
$blockMetadata = $this->metadataPool->getMetadata(BlockInterface::class);
$this->aggregatedFieldConverter->convert(
    [
        new FieldToConvert(
            DataConverter\MixedToPageBuilder::class,
            $this->setup->getTable('cms_page'),
            $pageMetadata->getIdentifierField(),
            'content',
            $this->createQueryModifier('content', Format::BLUEFOOT_KEY)
        ),
        new FieldToConvert(
            DataConverter\MixedToPageBuilder::class,
            $this->setup->getTable('cms_block'),
            $blockMetadata->getIdentifierField(),
            'content',
            $this->createQueryModifier('content', Format::BLUEFOOT_KEY)
        ),
        new FieldToConvert(
            DataConverter\MixedToPageBuilder::class,
            $this->setup->getTable('catalog_product_entity_text'),
            'value_id',
            'value',
            $this->createQueryModifier('value', Format::BLUEFOOT_KEY)
        ),
        new FieldToConvert(
            DataConverter\MixedToPageBuilder::class,
            $this->setup->getTable('catalog_category_entity_text'),
            'value_id',
            'value',
            $this->createQueryModifier('value', Format::BLUEFOOT_KEY)
        )
    ],
    $this->setup->getConnection()
);
```

## Step 7: Run migration again

Run the following command to start your module's migration process:

```bash
bin/magento setup:upgrade
```

## Next steps

If you have content in other tables, continue to the next step: [Migrate other BlueFoot content](migrate-other-bluefoot-content.md).
