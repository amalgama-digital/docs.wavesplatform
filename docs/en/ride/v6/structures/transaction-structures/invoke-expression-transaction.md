# [Ride v6] InvokeExpressionTransaction

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only.

Structure of an [Invoke Expression transaction](/en/blockchain/transaction-type/invoke-expression-transaction).

### Constructor

```ride
InvokeExpressionTransaction(expression: ByteVector, feeAssetId: ByteVector|Unit, id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

### Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | expression | [ByteVector](/en/ride/data-types/byte-vector) | Compiled [call script](/en/ride/v6/script/script-types/call-script) |
| 2 | feeAssetId | [ByteVector](/en/ride/data-types/byte-vector)&#124;[Unit](/en/ride/data-types/unit) | [Token](/en/blockchain/token/) to pay the commission |
| 3 | id | [ByteVector](/en/ride/data-types/byte-vector) | Transaction ID |
| 4 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 5 | timestamp | [Int](/en/ride/data-types/int) | Transaction timestamp |
| 6 | version | [Int](/en/ride/data-types/int) | Transaction version |
| 7 | sender | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/address) of the transaction sender |
| 8 | senderPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Account public key of the transaction sender |
| 9 | bodyBytes | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction body bytes](/en/blockchain/glossary#t) |
| 10 | proofs | [List](/en/ride/data-types/list)[[ByteVector](/en/ride/data-types/byte-vector)] | Array of [proofs](/en/blockchain/transaction/transaction-proof) |
