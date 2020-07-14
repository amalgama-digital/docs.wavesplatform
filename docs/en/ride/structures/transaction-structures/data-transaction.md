# DataTransaction

Structure of a [data transaction](/en/blockchain/transaction-type/data-transaction).

### Constructor

For [Standard library](/en/ride/script/standard-library) **version 3**:

``` ride
DataTransaction(data: List[DataEntry], id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

For Standard library **version 4**:

``` ride
DataTransaction(data: List[BinaryEntry|BooleanEntry|DeleteEntry|IntegerEntry|StringEntry], id: ByteVector, fee: Int, timestamp: Int, version: Int, sender: Address, senderPublicKey: ByteVector, bodyBytes: ByteVector, proofs: List[ByteVector])
```

[Standard library](/en/ride/script/standard-library) **version 4** is available since node version 1.2.0 after activation of feature #15 “Ride V4, VRF, Protobuf, Failed transactions”. Node versions 1.2.x are currently available on [Stagenet](/en/blockchain/blockchain-network/) only.

### Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | data | For version 3: [List](/en/ride/data-types/list)[[DataEntry](/en/ride/structures/script-actions/data-entry)]<br>For version 4: [List](/en/ride/data-types/list)[[BinaryEntry](/en/ride/structures/script-actions/binary-entry)&#124;[BooleanEntry](/en/ride/structures/script-actions/boolean-entry)&#124;[DeleteEntry](/en/ride/structures/script-actions/delete-entry)&#124;[IntegerEntry](/en/ride/structures/script-actions/int-entry)&#124;[StringEntry](/en/ride/structures/script-actions/string-entry)] | [Transaction](/en/blockchain/transaction/)'s data array |
| 2 | id | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction ID](/en/blockchain/transaction/transaction-id) |
| 3 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 4 | timestamp | [Int](/en/ride/data-types/int) | [Transaction timestamp](/en/blockchain/transaction/transaction-timestamp) |
| 5 | version | [Int](/en/ride/data-types/int) | [Transaction version](/en/blockchain/transaction/transaction-version) |
| 6 | sender | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/address) of a transaction sender |
| 7 | senderPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Account public key of a sender |
| 8 | bodyBytes | [ByteVector](/en/ride/data-types/byte-vector) | [Transaction body bytes](/en/blockchain/transaction/transaction-body-bytes) |
| 9 | proofs | [List](/en/ride/data-types/list)[[ByteVector](/en/ride/data-types/byte-vector)] | Array of [proofs](/en/blockchain/transaction/transaction-proof) |
