# Blockchain functions

|   #  | Name | Description | Complexity |
| :--- | :--- | :--- | :--- |
|   1  | [assetInfo(ByteVector): Аsset&#124;Unit](#assetinfo) | Gets the information about a [token](/en/blockchain/token/) | 100 for [Standard Library](/en/ride/script/standard-library) **version 3**<br>15 for Standard Library **version 4** |
|   2  | [blockInfoByHeight(Int): BlockInfo&#124;Unit](#blockinfobyheight) | Gets the information about a [block](/en/blockchain/block/) by the [block height](/en/blockchain/block/block-height) | 100 for Standard Library **version 3**<br>5 for Standard Library **version 4** |
|   3  | [calculateAssetId(Issue): ByteVector](#calculateassetid) | Calculates the ID of the asset, created by [Issue](/en/ride/structures/script-actions/issue) structure during [invoke script transaction](/en/blockchain/transaction-type/invoke-script-transaction) execution | 10 |
|   4  | [transactionHeightById(ByteVector): Int&#124;Unit](#transactionheightbyid) | Gets the [block height](/en/blockchain/block/block-height) of a transaction | 100 for Standard Library **version 3**<br>20 for Standard Library **version 4** |
|   5  | [transferTransactionById(ByteVector): TransferTransaction&#124;Unit](#transfertransactionbyid) | Gets the data of a transfer transaction | 100 for Standard Library **version 3**<br>60 for Standard Library **version 4** |

## assetInfo

Gets the information about a [token](/en/blockchain/token/).

```
assetInfo(id: ByteVector): Аsset|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `id`: ByteVector | ID of the [token](/en/blockchain/token/) |

### Example

```
let bitcoinId = base58'8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
let x = match assetInfo(bitcoinId) {
    case asset:Asset =>
        asset.decimals # 8
    case _ => throw("Can't find asset")
}
```


## blockInfoByHeight

Gets the information about a [block](/en/blockchain/block/) by the [block height](/en/blockchain/block/block-height).

```
blockInfoByHeight(height: Int): BlockInfo|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `height`: Int | Block height |

### Example

```
let x = match blockInfoByHeight(1234567) {
    case block:BlockInfo =>
        block.generator.toString() # "3P38Z9aMhGKAWnCiyMW4T3PcHcRaTAmTztH"
    case _ => throw("Can't find block")
}
```

## calculateAssetId

Calculates the ID of the asset, created by [Issue](/en/ride/structures/script-actions/issue) structure during [invoke script transaction](/en/blockchain/transaction-type/invoke-script-transaction) execution.

```
calculateAssetId(issue: Issue): ByteVector
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `issue`: Issue | The structure by which the asset is formed |

### Example

```
{-# STDLIB_VERSION 4 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}
  
@Callable(inv)
func issueAndSend() = {
  let issue = Issue("CryptoRouble", "Description", 1000, 2, true)
  let id = calculateAssetId(issue)
  [
    issue,
    ScriptTransfer(inv.caller, issue.quantity, id),
    BinaryEntry("id", id)
  ]
}
 
// Result:
//   {
//     "type": "string",
//     "value": "55jbTUxWkbLbfd6Z7Wy93DcyD7xikBg5GRDmccD4s8uv",
//     "key": "id"
//   }
```

## transactionHeightById

Gets the [block height](/en/blockchain/block/block-height) of a transaction.

```
transactionHeightById(id: ByteVector): Int|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `id`: ByteVector | ID of the transaction |

### Example

```
let bitcoinId = base58'8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
let x = match transactionHeightById(bitcoinId) {
    case h:Int => h # 257457
    case _ => throw("Can't find transaction")
}
```

## transferTransactionById

Gets the data of a [transfer transaction](/en/blockchain/transaction-type/transfer-transaction).

```
transferTransactionById(id: ByteVector): TransferTransaction|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `id`: ByteVector | ID of the transfer transaction |

### Example

```
let transferId = base58'J2rcMzCWCZ1P3SFZzvz9PR2NtBjomDh57HTcqptaAJHK'
let x = match transferTransactionById(transferId) {
    case ttx:TransferTransaction =>
        ttx.amount # 3500000000
    case _ => throw("Can't find transaction")
}
```
