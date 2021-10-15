# [Ride v6] Ограничения

:warning: Это документация Стандартной библиотеки версии 6, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/). [Перейти к версии для Mainnet](/ru/ride/limits/)

| Ограничение | Максимальное значение |
| :--- | :--- |
| Размер скрипта dApp или скрипта вызова | 32 Кбайт |
| Размер скрипта аккаунта или скрипта ассета | 8 Кбайт |
| [Сложность](/ru/ride/base-concepts/complexity) вызываемой функции dApp-скрипта | 10&nbsp;000 |
| Сложность скрипта вызова | 10&nbsp;000 |
| Сложность скрипта аккаунта | 2000 |
| Сложность скрипта ассета | 4000 |
| Суммарная сложность всех вызываемых функций, скрипта вызова и скриптов ассетов в одной транзакции<sup>(1)</sup>. Сложность скрипта отправителя не учитывается в этом лимите | 26&nbsp;000 |
| Количество [вызовов dApp из dApp](/ru/ride/advanced/dapp-to-dapp) в одной транзакции<sup>(1)</sup> | 100 |
| Порог сложности для сохранения неуспешных транзакций: если до его превышения вызываемая функция или скрипт вызова завершились ошибкой или выбрасыванием исключения, транзакция<sup>(1)</sup> отклоняется и комиссия за нее не взимается | 1000 |
| Сложность функции-верификатора dApp-скрипта | 2000 |
| Порог сложности отправителя: если сложность скрипта аккаунта или функции-верификатора dApp-скрипта превышает этот порог, минимальная комиссия за отправку транзакции с этого аккаунта увеличивается на 0,004 WAVES | 200 |
| Имя функции или переменной | 255 байт |
| Размер значения переменной типа [String](/ru/ride/data-types/string) | 32&nbsp;767 байт |
| Размер значения переменной типа [ByteVector](/ru/ride/data-types/byte-vector) | 32&nbsp;767 байт (кроме поля `bodyBytes` структуры транзакции) |
| Вес данных | См. [Вес данных](/ru/ride/limits/weight) |
| Количество аргументов вызываемой функции | 22 |
| Количество платежей, приложенных к вызову | 10 |
| Общее количество действий скрипта [Issue](/ru/ride/structures/script-actions/issue), [Reissue](/ru/ride/structures/script-actions/reissue), [Burn](/ru/ride/structures/script-actions/burn), [SponsorFee](/ru/ride/structures/script-actions/sponsor-fee), [ScriptTransfer](/ru/ride/structures/script-actions/script-transfer), [Lease](/ru/ride/structures/script-actions/lease) и [LeaseCancel](/ru/ride/structures/script-actions/lease-cancel), выполняемых скриптом вызова и всеми вызываемыми функциями в одной транзакции<sup>(1)</sup> | 30 |
| Общее количество действий скрипта [BinaryEntry](/ru/ride/structures/script-actions/binary-entry), [BooleanEntry](/ru/ride/structures/script-actions/boolean-entry), [DeleteEntry](/ru/ride/structures/script-actions/delete-entry), [IntegerEntry](/ru/ride/structures/script-actions/int-entry), [StringEntry](/ru/ride/structures/script-actions/string-entry), выполняемых скриптом вызова и всеми вызываемыми функциями в одной транзакции<sup>(1)</sup> | 100 |
| Суммарный размер записей [хранилища данных аккаунта](/ru/blockchain/account/account-data-storage) для всех структур `BinaryEntry`, `BooleanEntry`, `IntegerEntry`, `StringEntry` в результате выполнения вызываемой функции или скрипта вызова | 5 Кбайт |

<sup>(1)</sup> Транзакция вызова скрипта или транзакция применения выражения.
