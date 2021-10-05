# Union

**Тип объединения** — тип данных, который содержит два или более типа данных.

Примеры: 

* 


```scala
let valueFromBlockchain = getString("3PHHD7dsVqBFnZfUuDPLwbayJiQudQJ9Ngf", "someKey") # Union(String | Unit)
```

Union-типы — это удобный способ работы с абстракциями. `Union(String | Unit)` означает, что результат представляет собой пресечение этих типов.

Простой пример (пожалуйста, имейте в виду, что определение пользовательских типов будет поддержано в следующих версиях Ride):

```scala
type Human : { firstName: String, lastName: String, age: Int}
type Cat : {name: String, age: Int }
```

`Union(Human | Cat)` — объект с одним полем `age`:

```scala
Human | Cat => { age: Int }
```

Сравнение типов:

```scala
  let t = ...               # Cat | Human
  t.age                     # OK
  t.name                    # Ошибка компиляции
  let name = match t {      # OK
    case h: Human => h.firstName
    case c: Cat   => c.name
  }
```

Механизм сравнения типов используется для работы с транзакциями:

```scala
let amount = match tx {              # tx — исходящая транзакция
  case t: TransferTransaction => t.amount
  case m: MassTransferTransaction => m.totalAmount
  case _ => 0
}
```

В Waves есть несколько типов транзакций, и в зависимости от типа количество переводимых токенов может быть указано в разных полях. Для транзакций перевода и массового перевода используется значение соответствующего поля, а в остальных случаях — 0.