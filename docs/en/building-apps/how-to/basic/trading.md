---
sidebarDepth: 2
---

# How to Buy and Sell Tokens

All the assets issued on the Waves blockchain can be bought or sold on [Waves.Exchange](https://waves.exchange/) developed by Waves.Exchange team (except [NFTs](/en/blockchain/token/non-fungible-token); smart assets trading is temporarily unavailable).

Waves.Exchange app is a part of the Waves ecosystem. It combines user wallet and decentralized exchange that executes trades swiftly and securely.

To buy or sell tokens, you submit an order to matcher (exchange engine). You don't transfer your assets to exchange, money remains on your account until matcher executes the order and creates an exchange transaction. The blockchain guarantees that the transaction will be made on the conditions that are not worse than in the user's order.

See the [Order](/en/blockchain/order) article for more information about orders.

## Create Trading Order

### Using Waves.Exchange

You can use online, desktop or mobile app. See the [Start Trading (Online & Desktop)](https://docs.waves.exchange/en/waves-exchange/waves-exchange-online-desktop/online-desktop-trading) and [Start Trading (Mobile)](https://docs.waves.exchange/en/waves-exchange/waves-exchange-mobile/mobile-trading/mobile-start-trading) articles of the Waves.Exchange documentation.

### Using JavaScript

#### Set Matcher Params

Use the following matcher URL:

* Testnet: <https://matcher-testnet.waves.exchange>
* Mainnet: <https://matcher.waves.exchange>

Use the `GET /matcher` method of matcher API to retrieve matcher public key.

#### Set Asset Pair

An asset pair consists of two assets you want to exchange: amount asset and price asset. Under the order, you can either sell or buy the amount asset for the price asset.

You can see asset pairs and asset IDs on the **Trading** page of Waves.Exchange [on Mainnet](https://waves.exchange) and [on Testnet](https://testnet.waves.exchange). The first asset in pair is the amount asset and the second one is the price asset.

![](./_assets/asset-pair.png)

You can also get asset pairs using `GET /matcher/orderbook` or `GET /matcher/settings` API method. For more information, see [matcher API](https://docs.waves.exchange/en/waves-matcher/matcher-api) article of Waves.Exchange documentation.

> :warning: Asset IDs differ on Mainnet and Testnet.

WAVES, the core token of Waves blockchain, doesn't have an asset ID, use 'WAVES' instead.

#### Set Orders Fields, Sign Order and Send to Matcher

Use functions of `waves-transactions` library:

* `order` function creates and signs an order. Order proof is derived from seed. By default, matcher fee is calculated automatically.
* `submitOrder` sends signed order to matcher.

See function descriptions in [waves-transactions documentation](https://wavesplatform.github.io/waves-transactions/index.html) on Github.

```javascript
import { order, submitOrder } from "@waves/waves-transactions";

const matcherUrl = 'https://matcher-testnet.waves.exchange';
// For Mainnet, specify 'https://matcher.waves.exchange'

const matcherPublicKey = '8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy';
// For Mainnet, specify '9cpfKN9suPNvfeUNphzxXMjcnn974eme8ZhWUjaktzU5'

const amountAssetId = 'WAVES';
const priceAssetId = '3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC'; // USDN on Testnet
// For Mainnet, specify 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p'

const seed = 'insert your seed here';

const orderParams = {

    // Actual volume of amount asset multiplied by 10^amountAssetDecimals
    amount: 100000000, // 1 WAVES

    // Actual price denominated in priceAsset and multiplied by 10^(8 + priceAssetDecimals – amountAssetDecimals)
    price: 1100000, // 1.1 USDN for 1 WAVES

    amountAsset: amountAssetId,
    priceAsset: priceAssetId,
    matcherPublicKey: matcherPublicKey,
    orderType: 'buy'
}

const signedOrder = order(orderParams, seed);
await submitOrder(signedOrder, matcherUrl);

let orderId = signedOrder.id;
console.log('Order ID: '+ orderId);
```

### Using Python

```python
import pywaves as pw

matcher_url = 'https://matcher-testnet.waves.exchange'
pw.setMatcher(matcher_url)

waves = pw.Asset('WAVES')
usdn = pw.Asset('3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC') # USDN on Testnet
# For Mainnet, specify 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p'

asset_pair = pw.AssetPair(waves, usdn)

my_address = pw.Address(privateKey='your_private_key')

buy_order = my_address.buy(asset_pair=asset_pair, amount=1e8, price=1.1e6)

print(f'Buy order ID: {buy_order.orderId}')
```

## Get Order Status

### Using Waves.Exchange

The submitted order is displayed in the **My Open Orders** tab (Online & Desktop app) or in the **My Orders** tab (Mobile) until it is completed. See the [Start Trading (Online & Desktop)](https://docs.waves.exchange/en/waves-exchange/waves-exchange-online-desktop/online-desktop-trading) and [Start Trading (Mobile)](https://docs.waves.exchange/en/waves-exchange/waves-exchange-mobile/mobile-trading/mobile-start-trading) articles of the Waves.Exchange documentation.

### Using Matcher API

To get order status, you need to know order ID and asset pair. Use `GET /matcher/orderbook/{amountAsset}/{priceAsset}/{orderId}` method. Status is returned for orders submitted not earlier than 30 days ago. For partially filled orders, the method aslo returns filled amount.

See method description in [Matcher API](https://docs.waves.exchange/en/waves-matcher/matcher-api) article of Waves.Exchange documentation.

**Request example:**

```
curl 'https://matcher-testnet.waves.exchange/matcher/orderbook/WAVES/3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC/9kRXfmrhWhsGBohygMoo91RgcnmJUB37K4rQQN4rEidT'
```

The example is suitable for the `cURL` utility. You can adjust the proposed request to your app written in any programming language.

### Using JavaScript

```javascript
const matcherUrl = 'https://matcher-testnet.waves.exchange';

const amountAssetId = 'WAVES';
const priceAssetId = '3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC'; // USDN on Testnet
// For Mainnet, specify 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p'

const orderId= '9kRXfmrhWhsGBohygMoo91RgcnmJUB37K4rQQN4rEidT';

let response = await fetch(matcherUrl + '/matcher/orderbook/' + amountAsset + '/' + priceAsset + '/' + orderId);
let json = await response.json();
console.log('Order status: ' + json.status);
```

### Using Python

```python
# Using order from previous example
print(buy_order.status())
```

## Cancel Order

You can cancel previously submitted order if it's not already filled completely.

### Using Waves.Exchange

You can cancel an order:

* In Online or Desktop app: click **Cancel** in **My Open Orders** tab.
* In Mobile app: tap **X** in **My orders** tab.

### Using JavaScript

The request to cancel the order must be signed by the order sender.

Use functions of `waves-transactions` library:

* `cancelOrder` function creates and signs cancel order request.
* `cancelSubmittedOrder` sends signed request to matcher.

See function descriptions in [waves-transactions documentation](https://wavesplatform.github.io/waves-transactions/index.html) on Github.

**Example:**

```javascript
import {cancelOrder, cancelSubmittedOrder } from "@waves/waves-transactions";

const matcherUrl = 'https://matcher-testnet.waves.exchange';

const amountAssetId = 'WAVES';
const priceAssetId = '3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC'; // USDN on Testnet
// For Mainnet, specify 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p'

const seed = 'insert your seed here';
const orderId= '9kRXfmrhWhsGBohygMoo91RgcnmJUB37K4rQQN4rEidT';

const co = cancelOrder({ orderId: orderId }, seed);
const cancelledOrder = await cancelSubmittedOrder(co, amountAsset, priceAsset, matcherUrl);

console.log(cancelledOrder.status);
```

### Using Python

```python
# Using order from previous example
buy_order.cancel()
```

## Get Order List

### Using Waves.Exchange

Your orders are displayed in the **My Open Orders** tab and **My Order History** (Online & Desktop app) or in the **My Orders** tab (Mobile) until it is completed. See the [Start Trading (Online & Desktop)](https://docs.waves.exchange/en/waves-exchange/waves-exchange-online-desktop/online-desktop-trading) and [Start Trading (Mobile)](https://docs.waves.exchange/en/waves-exchange/waves-exchange-mobile/mobile-trading/mobile-start-trading) articles of the Waves.Exchange documentation.

### Using JavaScript

To get the list of orders that are placed by account use the `GET /matcher/orderbook/{publicKey}` method. See method description in [Matcher API](https://docs.waves.exchange/en/waves-matcher/matcher-api) article of Waves.Exchange documentation.

In the request header, you should specify the signature of the byte array that consists of bytes of the public key and bytes of the current timestamp. The signature is generated by the [signBytes](https://github.com/wavesplatform/ts-lib-crypto#signbytes) function using account seed.

```javascript
import { libs } from '@waves/waves-transactions';

const matcherUrl = 'https://matcher-testnet.waves.exchange';
const seed = 'insert your seed here';

const { LONG, BASE58_STRING } = libs.marshall.serializePrimitives;

const getOrdersApiSignature = (seed, senderPublicKey, timestamp) => {
    const pBytes = BASE58_STRING(senderPublicKey);
    const timestampBytes = LONG(timestamp);
    const bytes = Uint8Array.from([
        ...Array.from(pBytes),
        ...Array.from(timestampBytes),
    ]);
    return libs.crypto.signBytes(seed, bytes);
};

const timestamp = Date.now();
const senderPublicKey = libs.crypto.publicKey(seed);
const signature = getOrdersApiSignature(seed, senderPublicKey, timestamp);
const url = `${matcherUrl}/matcher/orderbook/${senderPublicKey}`; // Append ?activeOnly=true to receive active orders only

let response = await fetch(url, {
        headers: {
            "Timestamp": timestamp,
            "Signature": signature
        }
    });

let json = await response.json();
console.table(json);
```

### Using Python

To get order list by a certain asset pair and account public key use the `getOrderHistory` function of the [PyWaves](https://github.com/PyWaves/PyWaves/) library.

```python
import pywaves as pw

my_address = pw.Address(seed='insert your seed here')

matcher_url = 'https://matcher-testnet.waves.exchange'
# For Mainnet, specify 'https://matcher.waves.exchange'
pw.setMatcher(matcher_url)

waves = pw.Asset('WAVES')
usdn = pw.Asset('3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC') # USDN on Testnet
# For Mainnet, specify 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p'

asset_pair = pw.AssetPair(waves, usdn)
my_orders = my_address.getOrderHistory(asset_pair)
```
