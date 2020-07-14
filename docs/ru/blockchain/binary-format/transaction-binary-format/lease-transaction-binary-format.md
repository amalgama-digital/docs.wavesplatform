# Бинарный формат транзакции лизинга

> Узнать больше о [транзакции лизинга](/ru/blockchain/transaction-type/lease-transaction).

## Версия 3

Бинарный формат версии 3 соответствует protobuf-схеме [transaction.proto](https://github.com/wavesplatform/protobuf-schemas/blob/master/proto/waves/transaction.proto). Описание полей, общих для всех типов транзакций, представлено в разделе [Бинарный формат транзакции](/ru/blockchain/binary-format/transaction-binary-format/).

Версия 3 добавлена в версии ноды 1.2.0 и включается с активацией фичи № 15 “Ride V4, VRF, Protobuf, Failed transactions”. В настоящее время версии 1.2.x доступны только на [Stagenet](/ru/blockchain/blockchain-network/).

```
message LeaseTransactionData {
     Recipient recipient = 1;
     int64 amount = 2;
};

message Recipient {
    oneof recipient {
        bytes public_key_hash = 1;
        string alias = 2;
    };
};
```

| Поле | Размер | Описание |
| :--- | :--- | :--- |
| recipient.public_key_hash | 20 байт | Хеш открытого ключа аккаунта получателя (компонент адреса, см. раздел [Бинарный формат адреса](/ru/blockchain/binary-format/address-binary-format)) |
| recipient.alias | От 4 до 30 байт | [Псевдоним адреса](/ru/blockchain/account/alias) получателя |
| amount | 8 байт | Количество WAVELET, отдаваемое в лизинг (то есть количество WAVES, умноженное на 10<sup>8</sup>) |

## Версия 2

| Порядковый номер поля | Поле | Название JSON-поля |Тип поля | Размер поля в байтах | Комментарий |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Флаг версии | | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Указывает что [версия транзакции](/ru/blockchain/binary-format/transaction-binary-format/) является второй или выше.<br>Значение должно быть равно 0 |
| 2 | [ID типа транзакции](/ru/blockchain/transaction-type/) | type | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 8 |
| 3 | [Версия транзакции](/ru/blockchain/transaction/transaction-version) |version| [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 2 |
| 4 | Зарезервированное поле |  | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 0 |
| 5 | Открытый ключ аккаунта отправителя транзакции | senderPublicKey | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 6 | [Адрес](/ru/blockchain/account/address) или [псевдоним](/ru/blockchain/account/alias) получателя | recipient | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | `S` | Если первым байтом поля является 1, то за ним следует адрес. `S` в этом случае равняется 26.<br>Если первым байтом поля является 2, то за ним следует псевдоним. В этом случае 8 <= `S` <= 34 |
| 7 | Количество токенов, отдаваемых в лизинг | amount | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 8 | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) | fee | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 9 | [Временная метка транзакции](/ru/blockchain/transaction/transaction-timestamp) | timestamp | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 10 | [Подтверждения транзакции](/ru/blockchain/transaction/transaction-proof) |proofs| [Подтверждения](/ru/blockchain/transaction/transaction-proof) | `S` | Если массив пустой, то `S`= 3. <br>Если массив не пустой, то `S`= 3 + 2 × `N` + (`P`<sub>1</sub> + `P`<sub>2</sub> + ... + `P`<sub>n</sub>), <br>где <br>`N` — количество подтверждений в массиве, <br>`P`<sub>n</sub> — размер `N`-го подтверждения в байтах.<br> Максимальное количество подтверждений в массиве — 8. Максимальный размер каждого подтверждения — 64 байта |

## JSON-представление транзакции

Смотрите [пример](https://nodes.wavesnodes.com/transactions/info/J6jZCzLpWJX8EDVhopKFx1mcbFizLGHVb44dvqPzH4QS) в Node API.

## Версия 1

| Порядковый номер поля | Поле | Тип поля | Размер поля в байтах | Комментарий |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [ID типа транзакции](/ru/blockchain/transaction-type/) | [Byte](/ru/blockchain/blockchain/blockchain-data-types) | 1 | Значение должно быть равно 8 |
| 2 | Открытый ключ аккаунта отправителя транзакции | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 32 |  |
| 3 | [Адрес](/ru/blockchain/account/address) или [псевдоним](/ru/blockchain/account/alias) получателя | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | `S` | Если первым байтом поля является 1, то за ним следует адрес. `S` в этом случае равняется 26.<br>Если первым байтом поля является 2, то за ним следует псевдоним. В этом случае 8 <= `S` <= 34 |
| 4 | Количество токенов, отдаваемых в лизинг | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 5 | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) | [Long](/ru/blockchain/blockchain/blockchain-data-types) | 8 |  |
| 6 | [Временная метка транзакции](/ru/blockchain/transaction/transaction-timestamp) | [Long](/ru/blockchain/blockchain/blockchain-data-types)| 8 |  |
| 7 | [Подпись транзакции](/ru/blockchain/transaction/transaction-signature) | Array[[Byte](/ru/blockchain/blockchain/blockchain-data-types)] | 64 |  |  |
