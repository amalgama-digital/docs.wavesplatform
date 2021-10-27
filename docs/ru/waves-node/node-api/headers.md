# Формат числовых полей

Значения денежных и некоторых других числовых полей в ответах API могут занимать до 64 бит. Обработка таких чисел может представлять проблему в языках программирования, в которых для хранения целых чисел отведено менее 64 бит, например в JavaScript. Чтобы обойти эту проблему, вы можете получать значения таких полей в виде строк, указав в запросе HTTP-заголовок

```
Accept: application/json; large-significand-format=string
```

Пример:

```bash
curl -X GET --header 'Accept: application/json;large-significand-format=string' 'https://nodes.wavesnodes.com/blocks/headers/last'
```

Список методов, принимающих этот заголовок:

* `GET /addresses/balance/{address}/{confirmations}`

   `GET /addresses/effectiveBalance/{address}/{confirmations}`

   `GET /addresses/effectiveBalance/{address}`

   `GET /addresses/balance/{address}`

   Поле: `balance`.

* `GET /addresses/balance/details/{address}`

   Поля: `regular`, `generating`, `available`, `effective`.

* `GET /blocks/headers/last`

   `GET /blocks/headers/at/{height}`

   `GET /blocks/headers/seq/{from}/{to}`

   Поля: `reward`, `desiredReward`, `totalFee`.

* `GET /blocks/at/{height}`

   `GET /blocks/signature/{signature}`

   `GET /blocks/address/{address}/{from}/{to}`

   `GET /blocks/last`

   `GET /blocks/seq/{from}/{to}`

   Поля: `reward`, `desiredReward`, `fee`, `totalFee`, поля транзакций: `fee`, `amount`, `totalAmount`, `quantity`, `price`, `matcherFee`, `buyMatcherFee`, `sellMatcherFee`, `minSponsoredAssetFee`, `value`.

* `GET /blockchain/rewards/{height}`

   `GET /blockchain/rewards`

   Поля: `totalWavesAmount`, `currentReward`, `minIncrement`.

* `POST /transactions/calculateFee`

   Поле: `feeAmount`.

* `GET /transactions/address/{address}/limit/{limit}`

   `POST /transactions/broadcast`

   `GET /transactions/info`

   `GET /transactions/info/{id}`

   `GET /transactions/unconfirmed`

   `GET /transactions/unconfirmed/info/{id}`

   Поля: `fee`, `amount`, `totalAmount`, `quantity`, `price`, `matcherFee`, `buyMatcherFee`, `sellMatcherFee`, `minSponsoredAssetFee`, `value`.

* `GET /assets/balance/{address}`

   Поля: `balance`, `minSponsoredAssetFee`, `sponsorBalance`, `quantity`, `fee`

* `GET /assets/{assetId}/distribution/{height}/limit/{limit}`

   Поле: баланс в ассете у адреса.

* `GET /assets/details/{assetId}`

   `GET /assets/nft/{address}/limit/{limit}`

   Поля: `quantity`, `minSponsoredAssetFee`.

* `GET /assets/balance/{address}/{assetId}`

   Поле: `balance`.

* `GET /debug/balances/history/{address}`

   Поле: `balance`.

* `GET /debug/portfolios/{address}`

   Поля: `balance`, `in`, `out`.
