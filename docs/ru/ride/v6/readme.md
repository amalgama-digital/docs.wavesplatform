# [Ride v6] Версия 6 Стандартной библиотеки

Версия 6 [Стандартной библиотеки](/ru/ride/script/standard-library) добавлена в версии ноды 1.4.0 и включается с активацией фичи №&nbsp;17 “Ride V6”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

## Скрипт вызова

Добавлен новый тип скрипта: скрипт вызова.

Скрипт вызова предназначен для однократного выполнения без установки на аккаунт. Скрипт содержит выражение, которое представляет собой массив [действий скрипта](/ru/ride/structures/script-actions/), которые будут выполнены на блокчейне. Скрипт выполняется путем отправки [транзакция применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction), которая содержит скомпилированный скрипт.

[Подробнее о скрипте вызова](/ru/ride/v6/script/script-types/call-script)

Для верификации транзакции применения выражения в смарт-контрактах используется структура [InvokeExpressionTransaction](/ru/ride/v6/structures/transaction-structures/invoke-expression-transaction).

## Поддержка MetaMask

* Функция [addressFromPublicKey](/ru/ride/v6/functions/built-in-functions/converting-functions#addressfrompublickey-bytevector-address) принимает на вход как публичный ключ аккаунта Waves (32 байта), так и публичный ключ аккаунта MetaMask (64 байта) и возвращает адрес в формате Waves (26 байт).
* Функция [transferTransactionById](/ru/ride/functions/built-in-functions/blockchain-functions#transfertransactionbyid) возвращает Ethereum-транзакцию по ее идентификатору, если эта транзакция была интерпретирована как транзакция перевода. Массив `proofs` при этом содержит 8 пустых значений.

[Подробнее о поддержке MetaMask на блокчейне Waves](/ru/keep-in-touch/metamask)
