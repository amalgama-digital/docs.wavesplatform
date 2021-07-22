# Бинарный формат транзакции вызова скрипта

> Узнать больше о [транзакции применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction).

> Транзакция применения выражения добавлена в версии ноды 1.4.0. Возможность использовать эту транзакцию включается после активации фичи №&nbsp;17 “Ride V6”.

## Версия 1

Бинарный формат соответствует protobuf-схеме [transaction.proto](https://github.com/wavesplatform/protobuf-schemas/blob/master/proto/waves/transaction.proto). Описание полей, общих для всех типов транзакций, представлено в разделе [Бинарный формат транзакции](/ru/blockchain/binary-format/transaction-binary-format/).

```
message InvokeExpressionTransactionData {
    bytes expression = 1;
}
```

| Поле | Размер | Описание |
| :--- | :--- | :--- |
| expression | До 32&nbsp;767 байт | Скомпилированный [скрипт вызова](/ru/ride/script/script-types/call-script) |

## JSON-представление транзакции

Смотрите [пример](https://nodes.wavesnodes.com/transactions/info/7CVjf5KGRRYj6UyTC2Etuu4cUxx9qQnCJox8vw9Gy9yq) в Node API.
