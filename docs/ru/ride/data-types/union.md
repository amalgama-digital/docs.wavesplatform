# Union

**Тип объединения** — тип данных, который объединяет два или более типа данных и представляет значение одного из этих типов. Объединение может включать как простые типы, так и [списки](/ru/ride/data-types/list), [кортежи](/ru/ride/data-types/tuple), [структуры](/ru/ride/structures/).

Примеры: 

* Тип элементов списка — это объединение типов всех элементов. Например, каждый элемент списка `List[Int|String]` — это строка или число.

   ```scala
   let aList   = [1, 2, "Waves"]               # List[Int|String]
   let bList   = [true,false]                  # List[Boolean]
   let joined  = aList ++ bList                # List[Boolean|Int|String]
   ```

* Тип аргумента функции [wavesBalance(Address|Alias): BalanceDetails](/ru/ride/functions/built-in-functions/blockchain-functions#waves-balance) — объединение типов [Address](/ru/ride/structures/common-structures/address) и [Alias](/ru/ride/structures/common-structures/alias). Вызвать функцию можно с аргументом любого из этих типов.

   ```scala
   wavesBalance(Address(base58'3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7'))
   wavesBalance(Alias("merry"))          # Результат одинаковый
   ```

* Тип возвращаемого значения функции [getInteger(Address|Alias, String): Int|Unit](/ru/ride/functions/built-in-functions/account-data-storage-functions#get-string) — объединение типов [Int](/ru/ride/v4/data-types/int) и [Unit](/ru/ride/data-types/unit). Функция возвращает целое число по ключу из хранилища данных указанного аккаунта, а если запись с таким ключом отсутствует или значение имеет другой тип, возвращает `unit`.

   ```scala
   let addr = Address(base58'3N4iKL6ikwxiL7yNvWQmw7rg3wGna8uL6LU')
   getInteger(addr,"integerVal")         # Возвращает 1
   getInteger(addr,"noKey")              # Возвращает unit
   ```

## Функции и операторы

Значение с типом объединения нельзя использовать в качестве аргумента функции или оператора, если требуется конкретный тип. Например, выражение 

```scala
size(getString("key"))
```

приведет к ошибке компиляции, поскольку тип аргумента функции [size](/ru/ride/functions/built-in-functions/string-functions#size-string-int) — `String`, а тип возвращаемого значения функции [getString](/ru/ride/functions/built-in-functions/account-data-storage-functions#getstring-string-string-unit) — объединение `String|Unit`. Получить значение с типом `String` можно с помощью функции [getStringValue](/ru/ride/functions/built-in-functions/account-data-storage-functions#getstringvalue-string-string):

```scala
size(getStringValue("key"))
```

Чтобы получить значение конкретного типа из объединения, можно использовать:

* [Функции объединения](/ru/ride/functions/built-in-functions/list-functions)
* [Оператор match-case](/ru/ride/operators/match-case)

Пример:

```scala
func getAssetName(assetId: ByteVector|Unit) = {
   match assetId {
     case id: ByteVector => assetInfo(id).value().name
     case waves: Unit => "WAVES"
   }
}
```
