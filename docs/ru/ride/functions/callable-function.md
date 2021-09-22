# Вызываемая функция

**Вызываемая функция** — функция [dApp-скрипта](/ru/ride/script/script-types/dapp-script), которая может быть вызвана с помощью [транзакции вызова скрипта](/ru/blockchain/transaction-type/invoke-script-transaction) или функции `invoke` или `reentrantInvoke` (см. раздел [Вызов dApp из dApp](/ru/ride/functions/built-in-functions/dapp-to-dapp)).

dApp-скрипт может содержать несколько вызываемых функций.

Вызываемая функция может выполнять следующие действия:

* Добавление, изменение, удаление записей в [хранилище данных аккаунта](/ru/blockchain/account/account-data-storage) dApp;
* Переводы токенов.
* Выпуск токенов от имени dApp, довыпуск и сжигание токенов.
* Настройка [спонсирования](/ru/blockchain/waves-protocol/sponsored-fee).
* Лизинг, отмена лизинга.

> Набор доступных действий зависит от версии [Стандартной библиотеки](/ru/ride/script/standard-library).

Вызываемая функция может возвращать значение, которое в случае [вызова dApp из dApp](/ru/ride/advanced/dapp-to-dapp) передается в вызывающую функцию.

Вызов может содержать платежи в пользу dApp. Токены, полученные в этих платежах, могут использоваться в действиях вызываемой функции, а также в платежах, приложенных к вложенным вызовам.

:warning: Оплата комиссии за транзакцию вызова скрипта за счет средств, переведенных dApp-скриптом отправителю, невозможна с момента активации фичи №&nbsp;15 “Ride V4, VRF, Protobuf, Failed transactions”. Если баланс отправителя недостаточен для оплаты комиссии, dApp-скрипт не выполняется.

## Аннотация

Вызываемая функция помечается аннотацией `@Callable(i)`, где `i` — структура [Invocation](/ru/ride/structures/common-structures/invocation), которая содержит поля вызова скрипта, доступные вызываемой функции. Имя переменной в аннотации обязательно, даже если вызываемая функция ее не использует.

## Аргументы

Вызываемая функция может принимать аргументы следующих типов:

* [Boolean](/ru/ride/data-types/boolean),
* [ByteVector](/ru/ride/data-types/byte-vector),
* [Int](/ru/ride/data-types/int),
* [String](/ru/ride/data-types/string),
* [Union](/ru/ride/data-types/union), элементы которого относятся к перечисленным выше типам данных.
* [List](/ru/ride/data-types/list), элементы которого могут относиться к следующим типам:
  * [Boolean](/ru/ride/data-types/boolean),
  * [ByteVector](/ru/ride/data-types/byte-vector),
  * [Int](/ru/ride/data-types/int),
  * [String](/ru/ride/data-types/string),
  * [Union](/ru/ride/data-types/union).

## Результат выполнения<a id="invocation-result"/>

Результат выполнения вызываемой функции представляет собой [кортеж](/ru/ride/data-types/tuple) из двух элементов:
* Список действий скрипта. Действия будут выполнены в порядке, в котором они перечислены в списке.
* Возвращаемое значение, которое передается в вызывающую функцию в случае [вызова dApp из dApp](/ru/ride/advanced/dapp-to-dapp).

Пример:

```scala
(
  [
    BooleanEntry("key1", true),
    IntegerEntry("key2", 42),
    StringEntry("key3", "some string"),
    BinaryEntry("key4", base58'encoded'),
    DeleteEntry("key5"),
    ScriptTransfer(Address(base58'3Ms8fSfAxBLDjKvNVgACRzQoBLCtCWxtawu'), 100, base58'someAssetid'),
    Issue("RegularToken", "This is an ordinary token", 10000, 2, true),
    Reissue("4ZzED8WJXsvuo2MEm2BmZ87Azw8Sx7TVC6ufSUA5LyTV", 1000, true),
    Burn("4ZzED8WJXsvuo2MEm2BmZ87Azw8Sx7TVC6ufSUA5LyTV", 1000)]
    SponsorFee("4ZzED8WJXsvuo2MEm2BmZ87Azw8Sx7TVC6ufSUA5LyTV", 300),
    Lease(Address(base58'3Mn5hzck8nYd52Ytd2ZjzoiQLVoMcn1VAs9',1000),
    LeaseCancel(base58'Pxaf8pGKHS5ufGhqjmwRRcHQtC9T3h4d1XaJMnkhR1Vt')
  ],
  42
)
```

## Действия скрипта

Действия скрипта, выполняемые вызываемой функцией, задаются при помощи структур Ride.

| Структура | Описание |
|---|---|
| [BinaryEntry](/ru/ride/structures/script-actions/binary-entry)<br>[BooleanEntry](/ru/ride/structures/script-actions/boolean-entry)<br>[IntegerEntry](/ru/ride/structures/script-actions/int-entry)<br>[StringEntry](/ru/ride/structures/script-actions/string-entry) | Добавление/изменение записи хранилища данных аккаунта. Тип структуры должен соответствовать типу добавляемой/изменяемой записи.<br>- Если в хранилище запись с указанным в структуре ключом отсутствует, то запись будет добавлена.<br>- Если в хранилище присутствует запись с указанным в структуре ключом, то запись будет изменена |
| [DeleteEntry](/ru/ride/structures/script-actions/delete-entry) | Удаление записи |
| [Issue](/ru/ride/structures/script-actions/issue) | Выпуск токена |
| [Reissue](/ru/ride/structures/script-actions/reissue) | Довыпуск токена |
| [Burn](/ru/ride/structures/script-actions/burn) | Сжигание токена |
| [SponsorFee](/ru/ride/structures/script-actions/sponsor-fee) | Настройка спонсирования |
| [ScriptTransfer](/ru/ride/structures/script-actions/script-transfer) | Перевод токена |
| [Lease](/ru/ride/structures/script-actions/lease) | Лизинг |
| [LeaseCancel](/ru/ride/structures/script-actions/lease-cancel) | Отмена лизинга |

## Ограничения

* Общее количество действий скрипта `Issue`, `Reissue`, `Burn`, `SponsorFee`, `ScriptTransfer`, `Lease`, `LeaseCancel`, выполняемых всеми вызываемыми функциями в одной транзакции, — не более 30.
* Общее количество действий скрипта `BinaryEntry`, `BooleanEntry`, `IntegerEntry`, `StringEntry`, `DeleteEntry`, выполняемых всеми вызываемыми функциями в одной транзакции, — не более 100.
* Количество платежей в пользу dApp, приложенных к вызову скрипта, — не более 10.

См. также раздел [Ограничения](/ru/ride/limits/).

## Пример

Приведенный ниже пример представляет собой приложение-кошелек, которое позволяет отправлять WAVES на адрес и выводить только собственные средства с этого адреса (вывод чужих WAVES запрещен). В примере используются две вызываемые функции:

* `deposit` — обеспечивает размещение токенов,
* `withdraw` — обеспечивает вывод токенов.

```scala
{-# STDLIB_VERSION 5 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

@Callable(i)
func deposit() = {
  let pmt =
    if i.payments.size() == 1 then
      i.payments[0]
    else throw("Attached payment is required")
  if (isDefined(pmt.assetId))
    then throw("works with waves only")
    else {
     let currentKey = toBase58String(i.caller.bytes)
     let currentAmount = match getInteger(this, currentKey) {
       case a:Int => a
       case _ => 0
     }
     let newAmount = currentAmount + pmt.amount
     (
       [
         IntegerEntry(currentKey, newAmount)
       ],
       unit
     )
   }
}

@Callable(i)
func withdraw(amount: Int) = {
  let currentKey = toBase58String(i.caller.bytes)
  let currentAmount = match getInteger(this, currentKey) {
    case a:Int => a
    case _ => 0
  }
  let newAmount = currentAmount - amount
  if (amount < 0)
    then throw("Can't withdraw negative amount")
    else if (newAmount < 0)
      then throw("Not enough balance")
      else (
        [
          IntegerEntry(currentKey, newAmount),
          ScriptTransfer(i.caller, amount, unit)
        ],
        unit
      )
}

@Verifier(tx)
func verify() = false
```

## Порог сложности для сохранения неуспешных транзакций

Транзакция вызова скрипта сохраняется на блокчейне и с отправителя взимается комиссия, даже если при ее добавлении в блок результат выполнения dApp-скрипта или скрипта ассета оказался неудачным (при условии что транзакция прошла проверку подписи отправителя или проверку скриптом аккаунта).

Однако если вызываемая функция завершилась ошибкой или [выбрасыванием исключения](/ru/ride/exceptions) прежде, чем [сложность](/ru/ride/base-concepts/complexity) выполненных вычислений превысила [порог для сохранения неуспешных транзакций](/ru/ride/limits/), транзакция вызова скрипта отклоняется и комиссия не взимается.

Этот порядок действует с момента активации фичи №&nbsp;15 “Ride V4, VRF, Protobuf, Failed transactions” независимо от используемой версии Стандартной библиотеки. Учитывайте его при разработке dApp-скрипта. Подробнее см. в разделе [Валидация транзакции](/ru/blockchain/transaction/transaction-validation).

## <a id="default-callable-function">Вызываемая функция по умолчанию

Вызываемая функция по умолчанию — это функция с именем `default`, не имеющая аргументов:

```scala
@Callable(i)
func default() = {
   ...
}
```

Если в dApp-скрипте определена вызываемая функция по умолчанию, а в [транзакции вызова скрипта](/ru/blockchain/transaction-type/invoke-script-transaction) не указано поле `call`, то вызывается функция по умолчанию.

<details><summary>Пример транзакции</summary>

```json
[
  {
    "type": 16,
    "id": "FgohhmifAVteaXJo2hdFLY8WZw2mr28ZbGWg4FSTdYCZ",
    "sender": "3MsX9C2MzzxE4ySF5aYcJoaiPfkyxZMg4cW",
    "senderPublicKey": "AXbaBkJNocyrVpwqTzD4TpUY8fQ6eeRto9k1m2bNCzXV",
    "fee": 100500000,
    "feeAssetId": null,
    "timestamp": 1631535715165,
    "proofs": [
      "2gmg4vQfuxYyfmNz3sdgcSQJapQnW9Dgvtn7ud1GQxoo9jq1KGL5QV3ibCfEJFFvdhVy2iMTrUsBin7U15hbgDKH"
    ],
    "version": 2,
    "chainId": 84,
    "dApp": "3MsAegXUbgdqWvVLJwukbHHys6m1h2o8XXi",
    "payment": [
      {
        "amount": 1,
        "assetId": null
      }
    ],
    "height": 1701274,
    "applicationStatus": "succeeded",
    "stateChanges": {
      "data": [
        {
          "key": "bin",
          "type": "binary",
          "value": "base64:ASmhAx9X"
        },
        {
          "key": "bool",
          "type": "boolean",
          "value": true
        },
        {
          "key": "int",
          "type": "integer",
          "value": 1
        },
        {
          "key": "str",
          "type": "string",
          "value": "test"
        }
      ],
      "transfers": [
        {
          "address": "3MsX9C2MzzxE4ySF5aYcJoaiPfkyxZMg4cW",
          "asset": "5yWcsRhLqhhVRfbi7VsuZH4ZC4e4sB9SWAcpNVVgv8Ud",
          "amount": 1
        }
      ],
      "issues": [
        {
          "assetId": "5yWcsRhLqhhVRfbi7VsuZH4ZC4e4sB9SWAcpNVVgv8Ud",
          "name": "Asset",
          "description": "",
          "quantity": 1,
          "decimals": 0,
          "isReissuable": true,
          "compiledScript": null,
          "nonce": 0
        }
      ],
      "reissues": [
        {
          "assetId": "5yWcsRhLqhhVRfbi7VsuZH4ZC4e4sB9SWAcpNVVgv8Ud",
          "isReissuable": false,
          "quantity": 1
        }
      ],
      "burns": [
        {
          "assetId": "5yWcsRhLqhhVRfbi7VsuZH4ZC4e4sB9SWAcpNVVgv8Ud",
          "quantity": 1
        }
      ],
      "sponsorFees": [],
      "leases": [],
      "leaseCancels": [],
      "invokes": []
    }
  }
]
```
</details>
