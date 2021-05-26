# DeleteEntry

`DeleteEntry` — cтруктура, задающая параметры удаления записи из [хранилища данных аккаунта](/ru/blockchain/account/account-data-storage). Удаление записи выполняется, только если структура включена в [результирующее выражение](/ru/ride/functions/callable-function#резуnьтат-выпоnнения-2) вызываемой функции.

## Конструктор

`DeleteEntry(key: String)`

## Поля

|   #   | Название | Тип данных | Описание |
| :--- | :--- | :--- | :--- |
| 1 | key | [String](/ru/ride/data-types/string) | Ключ записи.  Максимальный размер — 400 байт |

## Пример

```ride
{-# STDLIB_VERSION 5 #-}
{-# SCRIPT_TYPE ACCOUNT #-}
    
@Callable(inv)
func default() = {
  (
    [
      DeleteEntry(inv.caller.toString())
    ],
    unit
  )
}
```
