# Monetary Fields Format

Monetary values and some other numbers in API responses can take up to 64 bit. That can cause issues with programming languages that represent integers with fewer than 64 bit, such as JavaScript. To work around these issues, you can obtain such values as strings by specifying the following HTTP header in the request:

```
Accept: application/json; large-significand-format=string
```

Example:

```bash
curl -X GET --header 'Accept: application/json;large-significand-format=string' 'https://nodes.wavesnodes.com/blocks/headers/last'
```

Below is the list of endpoints accepting this header:

* `GET /addresses/balance/{address}/{confirmations}`

   `GET /addresses/effectiveBalance/{address}/{confirmations}`

   `GET /addresses/effectiveBalance/{address}`

   `GET /addresses/balance/{address}`

   Field: `balance`.

* `GET /addresses/balance/details/{address}`

   Fields: `regular`, `generating`, `available`, `effective`.

* `GET /blocks/headers/last`

   `GET /blocks/headers/at/{height}`

   `GET /blocks/headers/seq/{from}/{to}`

   Fields: `reward`, `desiredReward`, `totalFee`.

* `GET /blocks/at/{height}`

   `GET /blocks/signature/{signature}`

   `GET /blocks/address/{address}/{from}/{to}`

   `GET /blocks/last`

   `GET /blocks/seq/{from}/{to}`

   Fields: `reward`, `desiredReward`, `fee`, `totalFee`, transaction fields: `fee`, `amount`, `totalAmount`, `quantity`, `price`, `matcherFee`, `buyMatcherFee`, `sellMatcherFee`, `minSponsoredAssetFee`, `value`.

* `GET /blockchain/rewards/{height}`

   `GET /blockchain/rewards`

   Fields: `totalWavesAmount`, `currentReward`, `minIncrement`.

* `POST /transactions/calculateFee`

   Field: `feeAmount`.

* `GET /transactions/address/{address}/limit/{limit}`

   `POST /transactions/broadcast`

   `GET /transactions/info`

   `GET /transactions/info/{id}`

   `GET /transactions/unconfirmed`

   `GET /transactions/unconfirmed/info/{id}`

   Fields: `fee`, `amount`, `totalAmount`, `quantity`, `price`, `matcherFee`, `buyMatcherFee`, `sellMatcherFee`, `minSponsoredAssetFee`, `value`.

* `GET /assets/balance/{address}`

   Fields: `balance`, `minSponsoredAssetFee`, `sponsorBalance`, `quantity`, `fee`

* `GET /assets/{assetId}/distribution/{height}/limit/{limit}`

   Field: account balance in asset.

* `GET /assets/details/{assetId}`

   `GET /assets/nft/{address}/limit/{limit}`

   Fields: `quantity`, `minSponsoredAssetFee`.

* `GET /assets/balance/{address}/{assetId}`

   `GET /debug/balances/history/{address}`

   Field: `balance`.

* `GET /debug/portfolios/{address}`

   Fields: `balance`, `in`, `out`.
