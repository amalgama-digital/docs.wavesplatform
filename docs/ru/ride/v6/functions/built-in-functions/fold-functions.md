---
sidebarDepth: 3
---

# [Ride v6] Функции свертки

:warning: Это документация Стандартной библиотеки версии 6, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/). 

| Название | Описание | Сложность |
| :--- | :--- | :--- |
| [fold](#fold) | Семейство функций.<br>Реализуют операции над списком значений | 3–115 |

## fold

Семейство функций свертки. Реализуют операции над списком значений, такие как суммирование (`sum`), фильтрация (`filter`), преобразование (`map`), агрегация элементов (`zip`), проверка наличия (`exists`) и т.&thinsp;п. Аналогичны функциям свертки `fold` или `reduce` в других языках программирования.

| Название | Макс. эл-в | Сложность |
|:---| :--- | :--- |
| fold_20(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 3 |
| fold_50(list: List[A], accumulator: B, function: (B, A) => B): B | 50 | 7 |
| fold_100(list: List[A], accumulator: B, function: (B, A) => B): B | 100 | 9 |
| fold_200(list: List[A], accumulator: B, function: (B, A) => B): B | 200 | 20 |
| fold_500(list: List[A], accumulator: B, function: (B, A) => B): B | 500 | 56 |
| fold_1000(list: List[A], accumulator: B, function: (B, A) => B): B | 1000 | 115 |

Общая сложность вызова `fold_<N>` включает в себя сложность, указанную в таблице, и сложность функции `function`, умноженной на `N`.

Свертка `fold_<N>(list, accumulator, function)` означает:

* выполнить не более `N` итераций;
* на каждой итерации: взять результат предыдущей итерации (на первой итерации взять значение `accumulator`) и следующий элемент списка `list`, применить к этой паре функцию `function`;
* вернуть итоговый результат.

Если в списке оказалось больше `N` элементов, функция `fold_<N>` завершается ошибкой.

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `list` | Список значений |
| `accumulator` | Начальное значение |
| `function` | Cворачиваемая функция. Получает на вход два параметра: промежуточный результат и очередной элемент списка |

## Примеры

### Суммирование

```scala
func sum(accum: Int, next: Int) = accum + next
let arr = [1,2,3,4,5]
fold_20(arr, 0, sum)    # Результат: 15
```

### Произведение

```scala
func mult(accum: Int, next: Int) = accum * next
let arr = [1,2,3,4,5]
fold_20(arr, 1, mult)    # Результат: 120
```

### Фильтрация

Следующий код формирует массив, состоящий только из четных элементов исходного массива.

```scala
func filterEven(accum: List[Int], next: Int) =
   if (next % 2 == 0) then accum :+ next else accum
let arr = [1,2,3,4,5]
fold_20(arr, [], filterEven)    # Результат: [2, 4]
```

### Преобразование

Следующий код инвертирует массив, уменьшая каждый элемент на единицу:

```scala
func map(accum: List[Int], next: Int) = (next - 1) :: accum
let arr = [1, 2, 3, 4, 5]
fold_20(arr, [], map)    # Результат: [4, 3, 2, 1, 0]
```

### Zip

Следующий код сводит два списка в один: создает структуру из каждых двух элементов с одинаковым индексом и формирует список, состоящий из таких структур. Аналогичным образом можно соединять элементы в кортежи.

```scala
let keys = ["key1", "key2", "key3"]
let values = ["value1", "value2", "value3"]

func addStringEntry(accum: (List[StringEntry], Int), nextValue: String) =
   {
      let (result, j) = accum
      (result :+ StringEntry(keys[j], nextValue), j + 1)
   }
let r = fold_20(values, ([], 0), addStringEntry)
r._1
```

В качестве аккумулятора здесь используется [кортеж](/ru/ride/data-types/tuple), который содержит два элемента:
- формируемый список структур [StringEntry](/ru/ride/structures/script-actions/string-entry),
- текущий индекс во всех списках.

Сворачиваемая функция `addStringEntry` добавляет в список структур очередную структуру `StringEntry`, которая содержит ключ из списка `keys` и значение из списка `values`. Кроме того, сворачиваемая функция увеличивает индекс (второй элемент кортежа-аккумулятора) на единицу.

Результат:

```scala
[
   StringEntry(
      key = "key1"
      value = "value1"
   ),
   StringEntry(
      key = "key2"
      value = "value2"
   ),
   StringEntry(
      key = "key3"
      value = "value3"
   )
]
```
