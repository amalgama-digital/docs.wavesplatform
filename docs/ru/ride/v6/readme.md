# [Ride v6] Версия 6 Стандартной библиотеки

Версия 6 [Стандартной библиотеки](/ru/ride/script/standard-library) добавлена в версии ноды 1.4.0 и включается с активацией фичи №&nbsp;17 “Ride V6”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

## Изменения в функциях

* Добавлены встроенные функции:
   * [sqrt(Int,Int,Int,Union)](/ru/ride/v6/functions/built-in-functions/math-functions#sqrt)
   * [sqrt(BigInt,Int,Int,Union)](/ru/ride/v6/functions/built-in-functions/math-functions#sqrtbigint)
* Для встроенных функций строки [makeString](/ru/ride/v6/functions/built-in-functions/string-functions#makestring-list-string-string-string) и [split](/ru/ride/v6/functions/built-in-functions/string-functions#split-string-string-list-string) добавлены семейства аналогичных функций с различной сложностью в зависимости от размера данных. Если размер данных известен заранее, можно использовать более «дешевую» функцию.
* Изменена сложность некоторых встроенных функций. Сложность всех функций представлена в разделе [[Ride v6] Встроенные функции](/ru/ride/v6/functions/built-in-functions/).
