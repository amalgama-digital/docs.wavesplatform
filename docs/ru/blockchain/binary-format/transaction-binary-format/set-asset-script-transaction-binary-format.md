# Бинарный формат транзакции установки скрипта ассета

> Узнать больше о [транзакции установки скрипта ассета](/ru/blockchain/transaction-type/set-asset-script-transaction).

## Версия 2

Бинарный формат версии 2 соответствует protobuf-схеме [transaction.proto](https://github.com/wavesplatform/protobuf-schemas/blob/master/proto/waves/transaction.proto). Описание полей, общих для всех типов транзакций, представлено в разделе [Бинарный формат транзакции](/ru/blockchain/binary-format/transaction-binary-format/).

Версия 2 добавлена в версии ноды 1.2.0 и включается с активацией фичи № 15 “Ride V4, VRF, Protobuf, Failed transactions”. В настоящее время версии 1.2.x доступны только на [Stagenet](/ru/blockchain/blockchain-network/).

```
message SetAssetScriptTransactionData {
    bytes asset_id = 1;
    bytes script = 2;
};
```

| Поле | Размер | Описание |
| :--- | :--- | :--- |
| asset_id | 32 байта | ID токена |
| script | До 8192 байт | [Скрипт ассета](/ru/ride/script/script-types/asset-script) |

## Версия 1

| Порядковый номер поля | Поле | Название JSON-поля | Тип поля | Размер поля в байтах | Комментарий |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Флаг версии |  | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Указывает, что [версия транзакции](/ru/blockchain/transaction/transaction-version) является второй или выше.<br>Значение должно быть равно 0 |
| 2 | [ID типа транзакции](/ru/blockchain/transaction-type/) | type | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 15 |
| 3 | [Версия транзакции](/ru/blockchain/transaction/transaction-version) | version | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 2 |
| 4 | [Байт сети](/ru/blockchain/blockchain-network/#байт-сети) | chainId | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 |87 — для Mainnet<br>84 — для Testnet<br>83 — для Stagenet |
| 5 | Открытый ключ аккаунта отправителя транзакции | senderPublicKey | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 6 | [ID токена](/ru/blockchain/token/token-id), к которому привязывается скрипт ассета | assetId | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 7 | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) | fee | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 8 | [Временная метка транзакции](/ru/blockchain/transaction/transaction-timestamp) | timestamp | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 9 | Флаг наличия скрипта |  | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | 0 — скрипт не установлен1 — скрипт установлен |
| 10 | Размер скрипта в байтах |  | [Short](/ru/blockchain/blockchain/blockchain-data-types) | S | S = 0 если значение поля 9 равно 0.S = 2 если значение поля 9 равно 1 |
| 11 | [Скрипт ассета](/ru/ride/script/script-types/asset-script) | script | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | S | S = 0 если значение поля 9 равно 0.1 <= S <= 8192 если значение поля 9 равно 1 |
| 12 | [Подтверждения транзакции](/ru/blockchain/transaction/transaction-proof) | proofs | Array[[Подтверждение](/ru/blockchain/transaction/transaction-proof)] | `S`  | Если массив пустой, то `S` = 3.<br>Если массив не пустой, то `S` = 3 + 2 × `N` + (`P`<sub>1</sub> + `P`<sub>2</sub> + ... + `P`<sub>n</sub>),<br>где<br>`N` — количество подтверждений в массиве,<br>`P`<sub>n</sub> — размер `N`-го подтверждения в байтах. Максимальное количество подтверждений в массиве — 8. Максимальный размер каждого подтверждения — 64 байта |

## JSON-представление транзакции

Смотрите [пример](https://nodes.wavesnodes.com/transactions/info/FwYSpmVDbWQ2BA5NCBZ9z5GSjY39PSyfNZzBayDiMA88) в Node API.
