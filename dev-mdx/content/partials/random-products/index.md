Razorpay Standard Checkout hosts a variety of payment methods for customers to make payments. The order of these payment methods on the Checkout is fixed and cannot be interchanged. There can be situations where you want certain payment methods to be shown more prominently or rearrange the order in which the payment methods are displayed on the Checkout.

Now, you can configure the payment methods of your choice on the Checkout to provide a highly personalized experience for your customers. This simple and accessible experience for them will not only increase your sales but also the success rates.

<table>
**Original Checkout**
**Customized Checkout**
---
<img src="/docs/assets/images/payment-methods-customize-original_checkout.png" width="300" />
<img src="/docs/assets/images/payment-methods-customize-custom_checkout.png" width="300" />

</table>

# Use Cases

Depending on the use cases that you might have, Razorpay allows you to create any configuration of the payment methods, of your choice:

- Highlighting certain payment instruments on the Checkout.<br />For example **Google Pay** could be displayed outside the UPI block as a separate payment method. **HDFC Netbanking** could come out of the Netbanking container as a separate payment method. Similarly, **Freecharge** can be pulled out of the wallet block.

- Restricting the kind of network, issuer, BIN and card type, different properties of the card, to accept payments. <br />For example, you can choose to accept payments only from "HDFC Visa Debit cards" on the Checkout.

- Removing a certain payment method or instrument. <br />For example, **Freecharge** can be removed as a payment method from wallets. The entire **Netbanking** block or a certain bank in Netbanking can be removed from the Checkout.

- Reordering of payment methods on the Checkout. <br />You can choose to arrange **UPI** as the first section instead of **Cards** on the Checkout. Within the UPI block, you can again order the PSPs, according to your need.

- Grouping of payment instruments. <br />For example, you can choose to group **Netbanking** and **UPI** payment methods of a bank as a block that will be labelled as **Pay via Bank** on the Checkout.

# Examples

<table>
**Allow Debit Card Payments Only**
**Regroup Payment Methods**
**Remove Wallets and UPI**
---
<img src="/docs/assets/images/payment-methods-customize-debit_cards_only.png" width="300" />
<img src="/docs/assets/images/payment-methods-customize-hdfc_block.png" width="300" />
<img src="/docs/assets/images/payment-methods-customize-hide_payment_methods.png" width="300" />

</table>

# Configuring Payment Methods

Depending on how you want to control the payment methods on the Checkout, there are different ways in which the configuration can be passed to the Checkout:

- Pass the configuration to the `options` parameter of the Checkout code at the run time. <br /> This is useful when you want to modify the order of the payment methods for a particular set of payments while rendering the Checkout. See the [sample code](#sample-code) for details.

- Create a global setting of the payments as a **Configuration ID** and pass these values while creating the Order.<br />This is useful when you want to fix the order of the payment methods on all the Checkout renderences.<br /><callout info>**Note:**<br />Contact our <a href="https://razorpay.com/support/#raise-a-request" target="_blank">Support Team</a> for more details about the Configuration ID.</callout>

# Understanding the Configuration

Let us understand the building blocks that are required to build a configuration of your choice:

1. [Payment Methods](#payment-methods)
2. [Payment Instruments](#payment-instruments)
3. [Blocks](#blocks)
4. [Sequence](#sequence)
5. [Preferences](#preferences)

## Payment Methods

Before deciding the payment methods or payment instruments that you want to configure on the Checkout, refer to the [payment methods](/docs/payment-methods) supported by Razorpay.

## Payment Instruments

A payment instrument is a combination of the payment method and its associated properties. For example, a payment instrument can be an **AXIS Debit card**, where **card** is the payment method and the issuer (AXIS bank) is the associated **instrument**.

An instrument is a JSON object with a key named `method`. Each method and its associated properties are described in the sections below:

#### Card

Payment instruments for the `method: card` are listed below:

<table>
  name type description values examples --- issuers array List of issuers that
  are allowed [Any bank
  code](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-banks)
  issuers: ["HDFC", "ICIC"] --- networks array List networks that are allowed
  [Any card
  network](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-card-networks)
  `networks: ["Visa", "MasterCard"]` --- types array List of card types that are
  allowed [Any card
  type](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-card-types)
  `types: ["credit"]`
</table>

```js: JavaScript
// beginning of the code
....
card: { \\name for cards
    name: "Pay Via Cards"
    instruments: [
      {
        method: "card",
        issuers: ["UTIB"],
        networks: ["MasterCard"],
        types: ["debit","credit"]
      }
    ]
},
...
//rest of the code
```

### Netbanking

Payment instruments for the `method: netbanking` are listed below:

<table>
  name type description values examples --- banks array List of all banks that
  are allowed [Any bank
  code](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-banks)
  `banks: ["HDFC", "ICIC"]`
</table>

### Wallet

Payment instruments for the `method: wallet` are listed below:

<table>
  name type description values examples --- wallets string Wallets to be allowed
  [Any wallet
  code](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-wallets)
  `wallets: ["olamoney", "freecharge"]`
</table>

### UPI

Payment instruments for the `method: upi` are listed below:

<table>
  name type description values examples --- flows string Flows to show [Any
  supported UPI
  flow](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-upi-flows)
  `flows: [ "qr"]` --- apps string Apps to show, for intent [Any supported UPI
  apps](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-upi-apps)
  `apps: ["google_pay", "phonepe"]`
</table>

### Cardless EMI

Payment instruments for the `method: cardless_emi` are listed below:

<table>
  name type description values examples --- providers string Providers to be
  allowed [Any Cardless EMI
  provider](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-cardless-emi-providers)
  `providers: ["zestmoney"]`
</table>

### PayLater

For the method: `paylater`, the payment instruments are listed below:

{' '}

<table>
  name type description values examples --- providers string Providers to be
  allowed [Any paylater
  provider](/docs/payment-gateway/web-integration/standard/configure-payment-methods/#supported-paylater-providers)
  `providers: ["hdfc"]`
</table>

### Apps

For the method `app`, the payment instrument is listed below:

<table>
  name type description values examples --- providers string Providers to be
  allowed [Any app provider](#supported-apps) `providers: ["cred"]`
</table>

```js: JavaScript
// beginning of the code
....
{
  "custom": {
    "name": "Pay with Apps",
    "instruments": [
      {
        "method": "app",
        "providers": [
          "cred"
        ]
      }
    ]
  }
}
...
//rest of the code
```

## Blocks

A block is a collection of one or more payment instruments. Each block has a `name` and `code` associated as shown below:

```js: JavaScript
// Block creation
let myPayments = {
  name: "My Custom Block",
  instruments: ["gpay", "freecharge"]
};
// Usage in config
let config = {
  display: {
    block: {
      highlighted: myPayments
    }
  }
};
```

Here, `highlighted` is the code associated with `myPayments`. Multiple blocks can be added to the config at the same time.

## Sequence

You can specify the `sequence`, that is the order, in which the payment methods should be displayed on the Checkout.

A sequence is an `array` of strings, where each string is the name of the payment method or a `block`.

In a sequence, you can include any block using the `block.${code}` format. The block with code **highlighted** should be represented as `block.highlighted` as shown below:

```js: JavaScript
let sequence = ["block.highlighted", "upi", "netbanking"];
```

The above sequence will place the code `highlighted` first followed by the payment methods `upi` and `netbanking` in that particular order.

<callout info>
  **Important**
  <br />
  Every block defined has to be present in the sequence. If you do not wish to
  reorder the methods and want to place your block, the sequence should contain
  `block.highlighted` with just one item in it.
</callout>

## Preferences

Using the `preferences` object, you can enhance the configuration of the Checkout. By setting this value, you can decide whether the default list of payment methods should be displayed or not.

Possible values are:

`true`
: Checkout will display the sequence of the payment methods configured by you alongside with the default order of payment methods available in the Checkout.

`false`
: Checkout will only show the sequence of the payment methods configured by you.

## Hide Payment Instruments

You can also hide or remove certain instruments from the Checkout.

This is an `array` containing the `method` key used to hide either the payment method and/or the payment instrument associated with that payment method. For example, you can hide the methods, `card` and `HDFC netbanking` on the Checkout.

```js: JavaScript
let cardInstrument = {
  method: "card"
};

let instrumentOfSomeBank = {
  method: "netbanking",
  banks: ["HDFC"]
};

let hiddenInstruments = [cardInstrument, instrumentOfSomeBank];
```

<callout info>
  **Note**:
  <br />
  Hiding any instrument using `hide` does not affect the similar instrument
  defined in `blocks`. So, if you want to hide `HDFC` bank from `netbanking` and
  have defined the same instrument in one of your blocks, HDFC bank will still
  be displayed in that block.
</callout>

<img
  src="/docs/assets/images/payment-methods-customize-hide_combo.png"
  width="300"
/>

# Building the Display Configuration

This section details about the `display` configuration.

Using the `display` config, you can put together all the modules, that is, `blocks`, `sequence`, `preferences`, `hide` instruments as shown below:

The `display` config can be passed in the Checkout options.

````js: display config
let config = {
  display: {
    blocks: {
      code: {
        name: "The name of the block", // The title of the block
        instruments: [instrument, instrument] // The list of instruments
      },

      anotherCode: {
        name: "Another block",
        instruments: [instrument]
      }
    },

    hide: [
      {
        method: "method"
      }
    ],

    sequence: ["block.code"], // The sequence in which blocks and methods should be shown

    preferences: {
      show_default_blocks: true // Should Checkout show its default blocks?
    }
  }
};
```js: JavaScript Checkout options
// beginning of the Checkout code
.....

let options = {
  key: "[YOUR_KEY_ID]",
  amount: 60000,
  currency: "INR",

  config: {
    display: {
      // The display config
    }
  }
};

let razorpay = new Razorpay(options);

razorpay.open();
....
//rest of the Checkout code
```curl: Orders Sample Request
curl -u [YOUR_KEY_ID]:[YOUR_KEY_SECRET] \
-X POST https://api.razorpay.com/v1/orders \
-H "content-type: application/json" \
-d '{
  "amount": 50000,
  "currency": "INR",
  "receipt": "receipt#1",
  "checkout_config_id": "config_Ep0eOCwdSfgkco",
  "notes": {
    "reference_no": "IBFA10106201500002"
    }
}'
````

<a href="/docs/api/orders" target="_blank">
  Learn more about Orders API
</a>
.

# Sample Code

If you want to list all the payment methods offered by `HDFC` bank, allow card payments for `ICICI` bank only and hide `upi` payment method from the Checkout, you can do so as follows:

<img
  src="/docs/assets/images/payment-methods-customize-display_config.png"
  width="300"
/>

```html: Checkout Code
<html>
<button id="rzp-button1" class="btn btn-outline-dark btn-lg"><i class="fas fa-money-bill"></i> Own Checkout</button>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
  var options = {
    "key": "[YOUR_KEY_ID]", // Enter the Key ID generated from the Dashboard
    "amount": "1000",
    "currency": "INR",
    "description": "Acme Corp",
    "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.png",
    "prefill":
    {
      "email": "gaurav.kumar@example.com",
      "contact": +919900000000,
    },
    config: {
      display: {
        blocks: {
          hdfc: { //name for HDFC block
            name: "Pay using HDFC Bank",
            instruments: [
              {
                method: "card",
                issuers: ["HDFC"]
              },
              {
                method: "netbanking",
                banks: ["HDFC"]
              },
            ]
          },
          other: { //  name for other block
            name: "Other Payment modes",
            instruments: [
              {
                method: "card",
                issuers: ["ICIC"]
              },
              {
                method: 'netbanking',
              }
            ]
          }
        },
        hide: [
          {
          method: "upi"
          }
        ],
        sequence: ["block.hdfc", "block.other"],
        preferences: {
          show_default_blocks: false // Should Checkout show its default blocks?
        }
      }
    },
    "handler": function (response) {
      alert(response.razorpay_payment_id);
    },
    "modal": {
      "ondismiss": function () {
        if (confirm("Are you sure, you want to close the form?")) {
          txt = "You pressed OK!";
          console.log("Checkout form closed by the user");
        } else {
          txt = "You pressed Cancel!";
          console.log("Complete the Payment")
        }
      }
    }
  };
  var rzp1 = new Razorpay(options);
  document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
  }
</script>
</html>
```
