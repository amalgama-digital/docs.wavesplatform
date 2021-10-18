# Транзакция создания псевдонима

Транзакция создания псевдонима создает [псевдоним](/ru/blockchain/account/alias) для адреса отправителя.

Созданный псевдоним невозможно удалить.

## Комиссия за транзакцию

Минимальная комиссия за транзакцию создания псевдонима — 0,001 WAVES.

Если отправитель транзакции — [dApp или смарт-аккаунт](/ru/blockchain/account/dapp), а сложность скрипта аккаунта или функции-верификатора dApp-скрипта больше [порога сложности отправителя](/ru/ride/limits/), минимальная комиссия увеличивается на 0,004 WAVES. (До активации фичи №&nbsp;16 “Ride V5, dApp-to-dApp invocations” дополнительная комиссия 0,004 WAVES требовалась независимо от сложности скрипта аккаунта или наличия и сложности функции-верификатора скрипта dApp.)

## JSON-представление

```json
{
  "senderPublicKey": "BVv1ZuE3gKFa6krwWJQwEmrLYUESuUabNCXgYTmCoBt6",
  "sender": "3N8S4UtauvDAzpLiaRyDdHn9muexWHhBP4D",
  "feeAssetId": null,
  "proofs": [
    "22QJfRKX7kUQt4qjdnUqZAnhqukqhnofE27uvP8Q5xnBf8M6PCNtWVGq2ngm6m7Voe7duys59D1yU9jhKrmdXDCe"
  ],
  "fee": 100000,
  "alias": "91f452553298770f",
  "id": "AD7KmXwoVNc2fXsmaxsHsrnT1tfPF3HsWYtfjFijVsvM",
  "type": 10,
  "version": 2,
  "timestamp": 1548443069053,
  "height": 466104
}
```

| Поле | Описание |
| :--- | :--- |
| alias | Псевдоним. См. [Требования к псевдониму](/ru/blockchain/account/alias#требования-к-псевдониму) |

Описание полей, общих для всех типов транзакций, представлено в разделе [JSON-представление транзакции](/ru/blockchain/transaction/#json-представление-транзакции).

## Бинарный формат

См. раздел [Бинарный формат транзакции создания псевдонима](/ru/blockchain/binary-format/transaction-binary-format/create-alias-transaction-binary-format).

## Структура Ride

Для операций с транзакцией в смарт-контрактах используется структура [CreateAliasTransaction](/ru/ride/structures/transaction-structures/create-alias-transaction).
