---
title: PasswordStrengthIndicator | Commerce Frontend Development
description: Learn how to initialize and configure the Adobe Commerce and Magento Open Source PasswordStrengthIndicator widget.
---

# PasswordStrengthIndicator widget

The password strength indicator widget provides immediate feedback on the validity and strength of a password while it is being typed.
If the password is not strong enough, the application prompts the user to choose a new password.

The PasswordStrengthIndicator widget can be used only on the frontend area.

The password strength indicator widget source is [`<Magento_Customer_module_dir>/view/frontend/web/js/password-strength-indicator.js`].

The widget is being used in the following templates:

-  [`<Magento_Customer_module_dir>/view/frontend/templates/form/register.phtml`] customer register template.
-  [`<Magento_Customer_module_dir>/view/frontend/templates/form/forgotpassword.phtml`] customer forgot password template.
-  [`<Magento_Customer_module_dir>/view/frontend/templates/form/edit.phtml`] customer account edit template.

## Initialize

To initialize the widget in your script, use the following general notation:

```javascript
$('#password-input').passwordStrengthIndicator({
    <option1>: <value1>,
    <option2>: <value2>,
    ...
});
```

Where:

-  `#password-input` is the selector of the element for which PasswordStrengthIndicator is initialized.

The following example shows a PHTML file using the script:

```html
<script>
    require([
        'jquery',
        'passwordStrengthIndicator'
    ], function ($) {
        'use strict';

        $("#password-input").passwordStrengthIndicator({
              "passwordStrengthMeterSelector":"[data-role=strength-meter]",
              "passwordStrengthMeterLabelSelector":"[data-role=strength-meter-label]"
        });
    });
</script>
```

For details about how to initialize the widget in a`.phtml` template, refer to the [JavaScript initialization](../init.md) topic.

## Options

### passwordSelector

Selector for the password input.

**Type**: String

**Default value**: `[type=password]`

### passwordStrengthMeterSelector

Selector for the password strength visualization block.

**Type**: String

**Default value**: `[data-role=password-strength-meter]`

### passwordStrengthMeterLabelSelector

Selector for the password strength visualization block label.

**Type**: String

**Default value**: `[data-role=password-strength-meter-label]`

### formSelector

The selector for the form block.

**Type**: String

**Default value**: `form`

### emailSelector

The selector for the email input.

**Type**: String

**Default value**: `input[type="email"]`

## Events

The password strength indicator widget listens for `change`, `keyup`, and `paste` events on the password and the email inputs. Listening to the email input is optional.

## Code sample

The following example shows how to initialize the password strength indicator widget and pass options during the initialization.

```html
<form action="BACKEND_ACTION" method="post" data-mage-init='{"validation":{}}'>
    <fieldset class="fieldset">
        <div class="field password required" data-mage-init='{"passwordStrengthIndicator": {
            "passwordStrengthMeterSelector":"[data-role=strength-meter]",
            "passwordStrengthMeterLabelSelector":"[data-role=strength-meter-label]"
        }}'>
            <label class="label" for="password">Password</label>
            <div class="control">
                <input type="password" class="input-text" name="password" id="password">
                <div id="password-strength-meter-container" data-role="strength-meter" aria-live="polite">
                    <div id="password-strength-meter" class="password-strength-meter">
                        <span id="password-strength-meter-label" data-role="strength-meter-label">
                            No Password
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <div class="actions-toolbar">
        <div class="primary">
            <button type="submit" class="action submit primary"><span>Set a New Password</span></button>
        </div>
    </div>
</form>
```

### Result

The result is an indication of the strength of the user's password.

![Password Strength Indicator Widget](../../_images/javascript/password-strength-indicator-widget-result.png)

<!-- Link Definitions -->
[`<Magento_Customer_module_dir>/view/frontend/web/js/password-strength-indicator.js`]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/view/frontend/web/js/password-strength-indicator.js
[`<Magento_Customer_module_dir>/view/frontend/templates/form/register.phtml`]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/view/frontend/templates/form/register.phtml
[`<Magento_Customer_module_dir>/view/frontend/templates/form/forgotpassword.phtml`]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/view/frontend/templates/form/forgotpassword.phtml
[`<Magento_Customer_module_dir>/view/frontend/templates/form/edit.phtml`]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/view/frontend/templates/form/edit.phtml
