# Invoke Expression Transaction Binary Format

> Learn more about [Invoke Expression transaction](/en/blockchain/transaction-type/invoke-expression-transaction).

Invoke Expression transaction type is added in node version 1.4.0 and enabled by feature #17 “Ride V6, MetaMask support, Invoke Expression”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## Version 1

Binary format is defined in [transaction.proto](https://github.com/wavesplatform/protobuf-schemas/blob/master/proto/waves/transaction.proto) protobuf scheme. The fields that are common to all types of transactions are described in the [Transaction Binary Format](/en/blockchain/binary-format/transaction-binary-format/) article.

```
message InvokeExpressionTransactionData {
    bytes expression = 1;
}
```

| Field | Size | Description |
| :--- | :--- | :--- |
| expression | Up to 32,768 bytes | Compiled [call script](/en/ride/v6/script/script-types/call-script) |
