# Union

**Тип объединения** — тип данных, объединяющий два или более типа данных.

Примеры: 

* Аргумент функции `wavesBalance(Address|Alias): BalanceDetails` — объединение типов `Address` и `Alias`. Вызвать функцию можно с аргументом любого из этих типов.

   ```scala
   wavesBalance(Address(base58'3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7'))
   wavesBalance(Alias("merry"))   # Результат одинаковый
   ```

* Функция `getInteger(Address|Alias, String): Int|Unit` возвращает целое число по ключу из хранилища данных указанного, а если запись с таким ключом отсутствует или значение имеет другой тип, возвращает [unit](/ru/ride/data-types/unit).

   ```scala
   let addr = Address(base58'3N4iKL6ikwxiL7yNvWQmw7rg3wGna8uL6LU')
   getInteger(addr,"integerVal")  # Возвращает 1
   getInteger(addr,"nokey")       # Возвращает unit
   ```

* Список `List[Int|String]` может содержать как строки, так и числа.

   ```scala
   let intList  = [1, 2]              # List[Int]
   let strList  = ["3", "4"]          # List[String]
   let joined   = intList ++ strList  # List[Int|String]
   ```

## Функции объединения

Встроенные функции работы со объединениями представлены в разделе [Функции объединения](/ru/ride/functions/built-in-functions/list-functions).

## match-case

Определить конкретный тип значения из `Union` можно с помощью оператора [match-case](/ru/ride/operators/match-case).

```scala
func getAssetName(assetId: ByteVector|Unit) = {
   match assetId {
     case id: ByteVector => assetInfo(id).value().name
     case waves: Unit => "WAVES"
   }
}
```
