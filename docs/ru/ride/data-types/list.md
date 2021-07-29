# List

`List` — списочный тип данных.

Список может содержать элементы разных типов, в том числе вложенные списки.

Количество элементов списка — не более 1000. Глубина вложенности не ограничена. Ограничения по весу см. в разделе [Вес данных](/ru/ride/limits/weight).

## Операции со списками

Списки поддерживают [конкатенацию](https://ru.wikipedia.org/wiki/Конкатенация), добавление элементов в начало и конец списка.

| Операция | Обозначение | Сложность |
|---|---|---|
| Конкатенация  | ++  | 4 |
| Добавление элемента в конец списка (слева список, справа элемент) | :+ | 1 |
| Добавление элемента в начало списка (слева элемент, справа список) | :: | 2 |

#### Примеры

```ride
nil :+ 1 :+ 2 :+ 3
```

Результат: [1, 2, 3]

```ride
1 :: 2 :: 3 :: nil
```

Результат: [1, 2, 3]

```ride
let intList  = [1, 2]             # List[Int]
let strList  = ["3", "4"]         # List[String]
let joined   = intList ++ strList # List[Int|String]
joined
```

Результат: [1, 2, "3", "4"]

```ride
let appended = joined :+ true     # List[Boolean|Int|String]
appended
```

Результат: [1, 2, "3", "4", true]

```ride
let nested    = intList :: joined  # List[Int|List[Int]|String]
nested
```

Результат: [[1, 2], 1, 2, "3", "4"]

## Функции списка

Встроенные функции работы со списками представлены в разделе [Функции списка](/ru/ride/functions/built-in-functions/list-functions).

Операции над списком удобно выполнять с помощью макроса [FOLD<N>](/ru/ride/fold-macro). Размер списка должен быть известен заранее.

## Список как аргумент функции

Списки, в том числе вложенные, могут быть аргументом функции:

```scala

func foo(arg: List[String|Unit]) = {
...
}

foo(["Ride","Waves",unit])
```

```scala
func bar(arg: List[List[Int]]) = {
...
}

bar([[1],[],[5,7]])
```

Вызываемая функция может принимать список в качестве аргумента, однако вложенные списки не допускаются:

```scala
@Callable(i)
func join(strings: List[String|Int]) = {
   let a = match strings[0] {
      case n:Int => toString(n)
      case s:String => s
   }
   let b = match strings[1] {
      case n:Int => toString(n)
      case s:String => s
   }
   let c = match strings[2] {
      case n:Int => toString(n)
      case t:String => t
   }
 
   [
      StringEntry(toBase58String(i.caller.bytes), a + "_" + b + "_" + c)
   ]
}
```

Транзакция вызова скрипта с этой функцией:

```json
{
   "type": 16,
   ...
   "call": {
      "function": "join",
      "args": [
         {
            "type": "list",
            "value": [
               {
                  "type": "string",
                  "value": "Ride"
               },
               {
                  "type": "integer",
                  "value": 5
               },
               {
                  "type": "string",
                  "value": "Waves"
               }
            ]
         }
      ]
   },
   ...
}
```
