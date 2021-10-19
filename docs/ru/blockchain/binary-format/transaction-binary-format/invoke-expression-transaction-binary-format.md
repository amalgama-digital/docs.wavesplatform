# Бинарный формат транзакции применения выражения

> Узнать больше о [транзакции применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction).

> Транзакция применения выражения добавлена в версии ноды 1.4.0. Возможность использовать эту транзакцию включается после активации фичи №&nbsp;17 “Ride V6, MetaMask support, Invoke Expression”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

## Версия 1

Бинарный формат соответствует protobuf-схеме [transaction.proto](https://github.com/wavesplatform/protobuf-schemas/blob/master/proto/waves/transaction.proto). Описание полей, общих для всех типов транзакций, представлено в разделе [Бинарный формат транзакции](/ru/blockchain/binary-format/transaction-binary-format/).

```
message InvokeExpressionTransactionData {
    bytes expression = 1;
}
```

| Поле | Размер | Описание |
| :--- | :--- | :--- |
| expression | До 32&nbsp;768 байт | Скомпилированный [скрипт вызова](/ru/ride/v6/script/script-types/call-script) |
