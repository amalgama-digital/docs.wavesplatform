# InvokeScriptTransaction

Structure of an [Invoke Script transaction](/en/blockchain/transaction-type/invoke-script-transaction).

### Constructor

```ride
InvokeScriptTransaction(dApp: Address|Alias, payments: List[AttachedPayments], feeAssetId: ByteVector|Unit, function: String, args: List[Boolean|ByteVector|Int|String|List[Boolean|ByteVector|Int|String]], id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

### Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | dApp | [Address](/en/ride/structures/common-structures/address)&#124;[Alias](/en/ride/structures/common-structures/alias) | [Address](/en/blockchain/account/address) or [alias](/en/blockchain/account/alias) of the [account](/en/blockchain/account/) which is calling a function |
| 2 | payments | List[[AttachedPayment](/en/ride/structures/common-structures/attached-payment)] | Payments attached to the transaction |
| 3 | feeAssetId | [ByteVector](/en/ride/data-types/byte-vector)&#124;[Unit](/en/ride/data-types/unit) | [Token](/en/blockchain/token/) to pay the commission |
| 4 | function | [String](/en/ride/data-types/string) | Name of the [callable function](/en/ride/functions/callable-function) |
| 5 | args | [List](/en/ride/data-types/list)[[Boolean](/en/ride/data-types/boolean)&#124;[ByteVector](/en/ride/data-types/byte-vector)&#124;[Int](/en/ride/data-types/int)&#124;[String](/en/ride/data-types/string)&#124;[List](/en/ride/data-types/list)[[Boolean](/en/ride/data-types/boolean)&#124;[ByteVector](/en/ride/data-types/byte-vector)&#124;[Int](/en/ride/data-types/int)&#124;[String](/en/ride/data-types/string)]] | Parameters of the callable function |
| 6 | id | [ByteVector](/en/ride/data-types/byte-vector) | Transaction ID |
| 7 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 8 | timestamp | [Int](/en/ride/data-types/int) | Transaction timestamp |
| 9 | version | [Int](/en/ride/data-types/int) | Transaction version |
| 10 | sender | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/address) of the transaction sender |
| 11 | senderPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Account public key of the transaction sender |
| 12 | bodyBytes | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction body bytes](/en/blockchain/glossary#t) |
| 13 | proofs | [List](/en/ride/data-types/list)[[ByteVector](/en/ride/data-types/byte-vector)] | Array of [proofs](/en/blockchain/transaction/transaction-proof) |
