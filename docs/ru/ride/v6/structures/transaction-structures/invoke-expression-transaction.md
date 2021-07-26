# [Ride v6] InvokeScriptTransaction

:warning: Это документация Стандартной библиотеки версии 6, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/).

Структура [транзакции применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction).

## Конструктор

```ride
InvokeExpressionTransaction(expression: ByteVector, feeAssetId: ByteVector|Unit, id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

## Поля структуры

| # | Название | Тип данных | Описание |
| :--- | :--- | :--- | :--- |
| 1 | expression | [ByteVector](/ru/ride/data-types/byte-vector) | Скомпилированный [скрипт вызова](/ru/ride/v6/script/call-script) в кодировке base64 |
| 2 | feeAssetId | [ByteVector](/ru/ride/data-types/byte-vector)&#124;[Unit](/ru/ride/data-types/unit) | [Токен](/ru/blockchain/token/) комиссии |
| 4 | function | [String](/ru/ride/data-types/string) | Имя [вызываемой функции](/ru/ride/functions/callable-function) |
| 5 | args | [List](/ru/ride/data-types/list)[[Boolean](/ru/ride/data-types/boolean)&#124;[ByteVector](/ru/ride/data-types/byte-vector)&#124;[Int](/ru/ride/data-types/int)&#124;[String](/ru/ride/data-types/string)&#124;[List](/ru/ride/data-types/list)[[Boolean](/ru/ride/data-types/boolean)&#124;[ByteVector](/ru/ride/data-types/byte-vector)&#124;[Int](/ru/ride/data-types/int)&#124;[String](/ru/ride/data-types/string)]]  | Параметры вызываемой функции |
| 6 | id | [ByteVector](/ru/ride/data-types/byte-vector) | ID транзакции |
| 7 | fee | [Int](/ru/ride/data-types/int) | [Комиссия за транзакцию](/ru/blockchain/transaction/transaction-fee) |
| 8 | timestamp | [Int](/ru/ride/data-types/int) | Временная метка транзакции |
| 9 | version | [Int](/ru/ride/data-types/int) | Версия транзакции |
| 10 | sender | [Address](/ru/ride/structures/common-structures/address) | [Адрес](/ru/blockchain/account/address) отправителя транзакции |
| 11 | senderPublicKey | [ByteVector](/ru/ride/data-types/byte-vector) | Открытый ключ отправителя транзакции |
| 12 | bodyBytes | [ByteVector](/ru/ride/data-types/byte-vector) | Байты тела транзакции |
| 13 | proofs | [List](/ru/ride/data-types/list)[[ByteVector](/ru/ride/data-types/byte-vector)] | Список [подтверждений](/ru/blockchain/transaction/transaction-proof) |
