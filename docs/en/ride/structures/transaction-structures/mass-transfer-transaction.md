# MassTransferTransaction

Structure of a [mass transfer transaction](/en/blockchain/transaction-type/mass-transfer-transaction).

## Constructor

``` ride
MassTransferTransaction(feeAssetId: ByteVector|Unit, assetId: ByteVector|Unit, totalAmount: Int, transfers: List[Transfer], transferCount: Int, attachment: ByteVector, id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

## Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | feeAssetId | [ByteVector](/en/ride/data-types/byte-vector)&#124;[Unit](/en/ride/data-types/unit) | [Transaction fee](/en/blockchain/transaction/transaction-fee) token.<br>Only [WAVES](/en/blockchain/token/waves) is currently allowed |
| 2 | assetId | [ByteVector](/en/ride/data-types/byte-vector)&#124;[Unit](/en/ride/data-types/unit) | [Token ID](/en/blockchain/token/token-id) |
| 3 | totalAmount | [Int](/en/ride/data-types/int) | Amount of the token to be transferred |
| 4 | transfers | [List](/en/ride/data-types/list)[[Transfer](/en/ride/structures/common-structures/transfer)] | Transfers |
| 5 | transferCount | [Int](/en/ride/data-types/int) | Number of transfers |
| 6 | attachment | [ByteVector](/en/ride/data-types/byte-vector) | Optional data attached to the transaction. This field is often used to attach a comment to the transaction.<br>The maximum data size is 140 bytes |
| 7 | id | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction ID](/en/blockchain/transaction/transaction-id) |
| 8 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 9 | timestamp | [Int](/en/ride/data-types/int) | [Transaction timestamp](/en/blockchain/transaction/transaction-timestamp) |
| 10 | version | [Int](/en/ride/data-types/int) | [Transaction version](/en/blockchain/transaction/transaction-version) |
| 11 | sender | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/address) of the transaction sender |
| 12 | senderPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Public key of the transaction sender |
| 13 | bodyBytes | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction body bytes](/en/blockchain/transaction/transaction-body-bytes) |
| 14 | proofs | [List](/en/ride/data-types/list)[[ByteVector](/en/ride/data-types/byte-vector)] | [Proofs](/en/blockchain/transaction/transaction-proof) |
