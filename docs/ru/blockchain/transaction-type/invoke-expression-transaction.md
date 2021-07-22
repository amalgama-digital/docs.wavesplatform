# Транзакция применения выражения

Транзакция применения выражения выполняет приложенный к ней [скрипт вызова](/ru/rive/v6/script/script-types/call-script) без установки этого скрипта на аккаунт.

> Транзакция применения выражения добавлена в версии ноды 1.4.0. Возможность использовать эту транзакцию включается после активации фичи №&nbsp;17 “Ride V6”.

## Комиссия за транзакцию

Минимальная комиссия в WAVES за транзакцию применения выражения рассчитывается по формуле:

`Fee` = 0,01 + `S` + 1 × `I`

* Если отправитель транзакции — [dApp или смарт-аккаунт](/ru/blockchain/account/dapp), а сложность скрипта аккаунта или функции-верификатора dApp-скрипта больше [порога сложности отправителя](/ru/ride/limits/), то `S` = 0,004, в ином случае `S` = 0.
* Скрипт может выполнить выпуск токенов. `I` (issue) — количество выпущенных токенов, не являющихся [NFT](/ru/blockchain/token/non-fungible-token).

## Сложность

[Сложность](/ru/ride/base-concepts/complexity) скрипта, приложенного к транзакции, — не более 10&nbsp;000.

Скрипт может вызывать функции любых dApp. В том числе, если отправителем транзакции является dApp, скрипт может вызывать функции этого dApp. [Подробнее о вызове dApp из dApp](/ru/ride/advanced/dapp-to-dapp)

Суммарная сложность выражения, всех вызываемых функций и скриптов ассетов в одной транзакции — не более 26&nbsp;000. Сложность скрипта отправителя не учитывается в этом лимите.

## JSON-представление

```json
{
  "type": 18,
  "id": "DN9Ny8mph4tLjn58e9CqhckPymH9zwPqBSZtcv2bBi3u",
  "sender": "3Mw48B85LvkBUhhDDmUvLhF9koAzfsPekDb",
  "senderPublicKey": "BvJEWY79uQEFetuyiZAF5U4yjPioMj9J6ZrF9uTNfe3E",
  "fee": 1000000,
  "feeAssetId": null,
  "timestamp": 1601652119485,
  "proofs": [
    "2536V2349X3cuVEK1rSxQf3HneJwLimjCmCfoG1QyMLLq1CNp6dpPKUG3Lb4pu76XqLe3nWyo3HAEwGoALgBhxkF"
  ],
  "version": 1,
  "chainId": 84,
  "expression": "base64:AAIEAAAAAAAAAAQIAhIAAAAAAAAA",
  "height": 1203100,
  "applicationStatus": "succeeded",
  "stateChanges": {
    "data": [
      {
        "key": "3Mw48B85LvkBUhhDDmUvLhF9koAzfsPekDb",
        "type": "string",
        "value": "alphabetagamma"
      }
    ],
    "transfers": [],
    "issues": [],
    "reissues": [],
    "burns": [],
    "sponsorFees": [],
    "leases": [],
    "leaseCancels": [],
    "invokes": []
  }
}
```

| Поле | Описание |
| :--- | :--- |
| chainId | [Байт сети](/ru/blockchain/blockchain-network/#байт-сети) |
| expression | Скомпилированный скрипт вызова в кодировке base64. До 32&nbsp;767 байт |

Структуру `stateChanges` не нужно заполнять при отправке транзакции: ее добавляет нода при предоставлении данных о транзакции через REST API.

Описание полей, общих для всех типов транзакций, представлено в разделе [JSON-представление транзакции](/ru/blockchain/transaction/#json-представление-транзакции).

## Бинарный формат

См. раздел [Бинарный формат транзакции применения выражения](/ru/blockchain/binary-format/transaction-binary-format/invoke-expression-transaction-binary-format).

## Структура Ride

Для операций с транзакцией в смарт-контрактах используется структура [InvokeExpressionTransaction](/ru/ride/structures/transaction-structures/invoke-expression-transaction).
