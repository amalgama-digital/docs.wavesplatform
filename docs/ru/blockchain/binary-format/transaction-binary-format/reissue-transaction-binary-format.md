# Бинарный формат транзакции довыпуска

> Узнать больше о [транзакции довыпуска](/ru/blockchain/transaction-type/reissue-transaction).

## Версия 3

Бинарный формат версии 3 соответствует protobuf-схеме [transaction.proto](https://github.com/wavesplatform/protobuf-schemas/blob/master/proto/waves/transaction.proto). Описание полей, общих для всех типов транзакций, представлено в разделе [Бинарный формат транзакции](/ru/blockchain/binary-format/transaction-binary-format/).

Версия 3 добавлена в версии ноды 1.2.0 и включается с активацией фичи № 15 “Ride V4, VRF, Protobuf, Failed transactions”. В настоящее время версии 1.2.x доступны только на [Stagenet](/ru/blockchain/blockchain-network/).

```
message ReissueTransactionData {
    Amount asset_amount = 1;
    bool reissuable = 2;
};

message Amount {
    bytes asset_id = 1;
    int64 amount = 2;
};
```

| Поле | Размер | Описание |
| :--- | :--- | :--- |
| asset_amount.asset_id | 32 байта | ID довыпускаемого токена |
| asset_amount.amount | 8 байт | Количество токена для довыпуска, в минимальных единицах («копейках») токена |
| reissuable | 1 байт | Флаг возможности довыпуска |

## Версия 2

| Порядковый номер поля | Поле | Название JSON-поля | Тип поля | Размер поля в байтах | Комментарий |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Флаг версии |  | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Указывает, что [версия транзакции](/ru/blockchain/transaction/transaction-version) является второй или выше.<br>Значение должно быть равно 0 |
| 2 | [ID типа транзакции](/ru/blockchain/transaction-type/) | type | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 5 |
| 3 | [Версия транзакции](/ru/blockchain/transaction/transaction-version) | version | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 2 |
| 4 | [Байт сети](/ru/blockchain/blockchain-network/#байт-сети) | chainId | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | 87 — для Mainnet<br>84 — для Testnet<br>83 — для Stagenet |
| 5 | Открытый ключ аккаунта отправителя | senderPublicKey | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 6 | ID токена | assetId | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 7 | Количество токена | amount | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 8 | Флаг довыпуска | reissuable | [Boolean](/ru/blockchain/blockchain/blockchain-data-types) | 1 | 0 — повторный выпуск невозможен<br>1 — повторный выпуск возможен |
| 9 | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) | fee | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 10 | [Временная метка транзакции](/ru/blockchain/transaction/transaction-timestamp) | timestamp | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 11 | [Подтверждения транзакции](/ru/blockchain/transaction/transaction-proof) | proofs | [Подтверждения](/ru/blockchain/transaction/transaction-proof) | S |  |

## JSON-представление транзакции

Смотрите [пример](https://nodes.wavesnodes.com/transactions/info/5CZV9RouJs7uaRkZY741WDy9zV69npX1FTZqxo5fsryL) в Node API.

## Версия 1

| Порядковый номер поля | Название поля | Тип поля | Размер поля в байтах | Комментарий |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [ID типа транзакции](/ru/blockchain/transaction-type/) | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 5 |
| 2 | [Подпись транзакции](/ru/blockchain/transaction/transaction-signature) | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 64 |  |
| 3 | Открытый ключ аккаунта отправителя транзакции | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 4 | ID токена | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 5 | Количество токена | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 6 | Флаг возможности повторного выпуска | [Boolean](/ru/blockchain/blockchain/blockchain-data-types) | 1 | 0 — повторный выпуск невозможен<br>1 — повторный выпуск возможен |
| 7 | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 8 | [Временная метка транзакции](/ru/blockchain/transaction/transaction-timestamp) | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
