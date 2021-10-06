# Union

**Тип объединения** — тип данных, объединяющий два или более типа данных.

Примеры: 

* Аргумент функции `wavesBalance(Address|Alias): BalanceDetails` — объединение типов `Address` и `Alias`. Вызвать функцию можно с аргументом любого из этих типов.

   ```scala
   wavesBalance(Address(base58'3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7'))
   wavesBalance(Alias("merry"))          # Результат одинаковый
   ```

* Функция `getInteger(Address|Alias, String): Int|Unit` возвращает целое число по ключу из хранилища данных указанного аккаунта, а если запись с таким ключом отсутствует или значение имеет другой тип, возвращает [unit](/ru/ride/data-types/unit).

   ```scala
   let addr = Address(base58'3N4iKL6ikwxiL7yNvWQmw7rg3wGna8uL6LU')
   getInteger(addr,"integerVal")         # Возвращает 1
   getInteger(addr,"nokey")              # Возвращает unit
   ```

* Тип элементов списка — это объединение типов всех элементов. Например, элемент списка `List[Int|String]` — это строка или число.

   ```scala
   let aList   = [1, 2, "Waves"]         # List[Int|String]
   let bList   = [true, true, false]     # List[Boolean]
   let joined  = aList ++ bList          # List[Boolean|Int|String]
   ```

* Объединение может содержать как простые типы, так и списки, кортежи, структуры.

   ```scala
   let cList = [true,(1,"Ride"),AttachedPayment(unit,1)]    # List[(Int, String)|AttachedPayment|Boolean]
   ```

## Функции и операторы

Значение с типом объединения нельзя использовать в качестве аргумента функции или оператора, если требуется конкретный тип. Например, выражение 

```scala
getString("key") + "_test"
```

приведет к ошибке компиляции, поскольку тип возвращаемого значения функции `getString` — объединение `String|Unit`. Получить значение с типом `String` можно с помощью функции `getStringValue`.

Чтобы извлечь значение конкретного типа из объединения, можно использовать:

* [Функции объединения](/ru/ride/functions/built-in-functions/list-functions)
* Оператор [match-case](/ru/ride/operators/match-case)

Пример:

```scala
func getAssetName(assetId: ByteVector|Unit) = {
   match assetId {
     case id: ByteVector => assetInfo(id).value().name
     case waves: Unit => "WAVES"
   }
}
```
