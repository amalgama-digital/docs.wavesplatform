# [Ride v6] InvokeExpressionTransaction

:warning: Это документация Стандартной библиотеки версии 6, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/).

Структура [транзакции применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction).

## Конструктор

```ride
InvokeExpressionTransaction(expression: ByteVector, feeAssetId: ByteVector|Unit, id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

## Поля структуры

| # | Название | Тип данных | Описание |
| :--- | :--- | :--- | :--- |
| 1 | expression | [ByteVector](/ru/ride/data-types/byte-vector) | Скомпилированный [скрипт вызова](/ru/ride/v6/script/script-types/call-script) |
| 2 | feeAssetId | [ByteVector](/ru/ride/data-types/byte-vector)&#124;[Unit](/ru/ride/data-types/unit) | [Токен](/ru/blockchain/token/) комиссии |
| 3 | id | [ByteVector](/ru/ride/data-types/byte-vector) | ID транзакции |
| 4 | fee | [Int](/ru/ride/data-types/int) | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) |
| 5 | timestamp | [Int](/ru/ride/data-types/int) | Временная метка транзакции |
| 6 | version | [Int](/ru/ride/data-types/int) | Версия транзакции |
| 7 | sender | [Address](/ru/ride/structures/common-structures/address) | [Адрес](/ru/blockchain/account/address) отправителя транзакции |
| 8 | senderPublicKey | [ByteVector](/ru/ride/data-types/byte-vector) | Открытый ключ отправителя транзакции |
| 9 | bodyBytes | [ByteVector](/ru/ride/data-types/byte-vector) | Байты тела транзакции |
| 10 | proofs | [List](/ru/ride/data-types/list)[[ByteVector](/ru/ride/data-types/byte-vector)] | Список [подтверждений](/ru/blockchain/transaction/transaction-proof) |
