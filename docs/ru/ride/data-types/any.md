# Any

`Any` — произвольный тип данных. Он является общим надтипом всех типов: значение типа Any может быть строкой, числом, `unit`, структурой, списком, кортежем и т. п.

## as, exactAs

Если конкретный тип значения известен заранее, привести значение к этому типу можно с помощью макросов:

* `as[T]` — возвращает значение типа `T`, а если значение не соответствует типу, возвращает `unit`.
* `exactAs[T]` — возвращает значение типа `T`, а если значение не соответствует типу, завершается ошибкой.

Примеры:

* Значение — базовый тип:

   ```scala
   func f1(a: Any) = a.as[Int]
   f1(10).value() + 1                      # Возвращает 11
   f1("Waves").isDefined()                 # Возвращает false
   ```

* Значение является кортежем:

   ```scala
   func f2(a: Any) = a.exactAs[(Int,String)]
   f2((11,"Ride"))._2 + " the Waves!"      # Возвращает "Ride the Waves!"
   f2(true)                                # Завершается ошибкой
   ```

* Значение является списком:

   ```scala
   func f3(a: Any) = a.exactAs[List[Any]]
   f3([12,"Ride"])[0].exactAs[Int]         # Возвращает 12
   f3(88)                                  # Завершается ошибкой
   ```
<!--
В следующем примере вызываемая функция `second` возвращает значение, которое использует вызывающая функция `first` (см. раздел [Вызов dApp из dApp](/ru/ride/advanced/dapp-to-dapp)):

```scala
{-# STDLIB_VERSION 5 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

@Callable(i)
func first() = {
  strict d = invoke(this,"second",[],[])
  [
    IntegerEntry("key",d.exactAs[Int])
  ]
}

@Callable(i)
func second() = {
  ( [], 42 )
}
```
-->

## match ... case

Если конкретный тип значения из `Any` заранее неизвестен, определить его можно с помощью оператора [match-case](/ru/ride/operators/match-case).

Пример:

```scala
func findString(a: Any) = {
  match a {
    case a: String => a
    case a: List[Any] =>
      match a[0] {
        case b: String => b
        case _ => throw("Data is not a string")
      }
    case _ => throw("Data is not a string")
  }
}
```
