# [Ride v6] Версия 6 Стандартной библиотеки

Версия 6 [Стандартной библиотеки](/ru/ride/script/standard-library) добавлена в версии ноды 1.4.0 и включается с активацией фичи №&nbsp;17 “Ride V6”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

## Скрипт вызова

Добавлен новый тип скрипта: скрипт вызова.

Скрипт вызова предназначен для однократного выполнения без установки на аккаунт. Скрипт содержит выражение, которое представляет собой массив [действий скрипта](/ru/ride/structures/script-actions/), которые будут выполнены на блокчейне. Скрипт выполняется путем отправки [транзакция применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction), которая содержит скомпилированный скрипт.

[Подробнее о скрипте вызова](/ru/ride/v6/script/script-types/call-script)

Для верификации транзакции применения выражения в смарт-контрактах используется структура [InvokeExpressionTransaction](/ru/ride/v6/structures/transaction-structures/invoke-expression-transaction).

## Поддержка MetaMask

[Подробнее о поддержке MetaMask на блокчейне Waves](/ru/keep-in-touch/metamask)

Функция [addressFromPublicKey](/ru/ride/v6/functions/built-in-functions/converting-functions#addressfrompublickey-bytevector-address) принимает на вход как публичный ключ аккаунта Waves (32 байта), так и публичный ключ аккаунта MetaMask (64 байта) и возвращает адрес в формате Waves (26 байт).

В случае вызова скрипта с помощью Ethereum-транзакции структура [Invocation](/ru/ride/structures/common-structures/invocation), доступная вызываемой функции, содержит:
- в полях `caller`, `originCaller` — адрес отправителя в формате Waves (26 байт),
- в полях `callerPublicKey`, `originCallerPublicKey` — открытый ключ пользователя MetaMask (64 байта).

Ситуация, когда требуется проверить транзакцию 

В случае верификации скриптом ассета транзакция в формате Ethereum интерпретируется как структура [TransferTransaction](/ru/ride/structures/transaction-structures/transfer-transaction) или [InvokeScriptTransaction](/ru/ride/structures/transaction-structures/invoke-script-transaction), которая содержит:
- в поле `sender` — адрес отправителя в формате Waves (26 байт),
- в поле `senderPublicKey` — открытый ключ пользователя MetaMask (64 байта).
- в поле `bodyBytes` — пустой массив байтов.

> Подпись транзакции недоступна в скрипте ассета.

Транзакция в формате Ethereum никогда не проверяется смарт-аккаунтом или функцией-верификатором dApp-скрипта, потому что транзакция в формате Ethereum не может быть отправлена со смарт-аккаунта или dApp.

<!--## Вычисления с продолжением

Добавлена поддержка dApp-скриптов, сложность которых превышает 10&nbsp;000. Выполнение такого скрипта разбивается на несколько этапов: первый этап вычислений выполняется в рамках транзакции вызова скрипта, последующие этапы — в рамках транзакций продолжения. Транзакции продолжения создаются генераторами блоков автоматически. [Подробнее о вычислениях с продолжением](/ru/ride/advanced/continuation)

> Вычисления с продолжением и вызов dApp из dApp несовместимы, то есть не могут быть инициированы одной и той же транзакцией. -->
