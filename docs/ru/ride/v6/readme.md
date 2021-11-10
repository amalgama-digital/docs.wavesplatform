# [Ride v6] Версия 6 Стандартной библиотеки

Версия 6 [Стандартной библиотеки](/ru/ride/script/standard-library) добавлена в версии ноды 1.4.0 и включается с активацией фичи №&nbsp;17 “Ride V6, MetaMask support, Invoke Expression”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

## Скрипт вызова

Добавлен новый тип скрипта: скрипт вызова.

Скрипт вызова предназначен для однократного выполнения без установки на аккаунт. Скрипт содержит выражение, которое представляет собой массив [действий скрипта](/ru/ride/structures/script-actions/), которые будут выполнены на блокчейне. Скрипт выполняется путем отправки [транзакция применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction), которая содержит скомпилированный скрипт.

[Подробнее о скрипте вызова](/ru/ride/v6/script/script-types/call-script)

Для верификации транзакции применения выражения в смарт-контрактах используется структура [InvokeExpressionTransaction](/ru/ride/v6/structures/transaction-structures/invoke-expression-transaction).

## Изменения в функциях

* Добавлено семейство встроенных функций свертки [fold](/ru/ride/v6/functions/built-in-functions/fold-functions), предназначенных для выполнения операций над списком значений. Семейство функций заменяет макрос `FOLD<N>`, использовавшийся в предыдущих версиях Стандартной библиотеки.
* Добавлены встроенные функции:
   * [sqrt(Int,Int,Int,Union)](/ru/ride/v6/functions/built-in-functions/math-functions#sqrt)
   * [sqrt(BigInt,Int,Int,Union)](/ru/ride/v6/functions/built-in-functions/math-functions#sqrtbigint)
* Для встроенных функций строки [makeString](/ru/ride/v6/functions/built-in-functions/string-functions#makestring-list-string-string-string) и [split](/ru/ride/v6/functions/built-in-functions/string-functions#split-string-string-list-string) добавлены семейства аналогичных функций с различной сложностью в зависимости от размера данных. Если размер данных известен заранее, можно использовать более «дешевую» функцию.
* Изменена сложность некоторых встроенных функций. Сложность всех функций представлена в разделе [[Ride v6] Встроенные функции](/ru/ride/v6/functions/built-in-functions/).
