# Invoke Expression Transaction

Invoke Expression transaction executes the attached [call script](/en/ride/functions/callable-function) without assigning the script to an account.

> Invoke Expression transaction type is added in node version 1.4.0 and enabled by feature #17 “Ride V6”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## Fee

The sender can specify a transaction fee nominated in a sponsored asset instead of WAVES, see the [Sponsored Fee](/en/blockchain/waves-protocol/sponsored-fee) article.

The minimum fee in WAVES for an Invoke Script transaction is calculated as follows:

`Fee` = 0.005 + `S` + 1  × `I`

* If the transaction **s**ender is a [dApp or smart account](/en/blockchain/account/dapp), and that the complexity of the account script or dApp script verifier function exceeds the [sender complexity threshold](/en/ride/limits/), then `S` = 0.004, otherwise `S` = 0.
* `I` is the number of **i**ssued assets that are not [NFT](/en/blockchain/token/non-fungible-token).

## Complexity

[Complexity](/en/ride/base-concepts/complexity) of the script attached to the transaction is up to 10,000.

The script can invoke a callable function of any dApp. In particular, if the transaction sender is a dApp, the script can invoke functions of this dApp. [More about dApp-to-dApp invocation](/en/ride/advanced/dapp-to-dapp)

The total complexity of the attached script, all the callable functions and asset scripts of involved smart assets in a single transaction is limited by 26,000. The sender's account script complexity is not included in that limit.

## JSON Representation

```json
{
  "type": 18,
  "id": "DN9Ny8mph4tLjn58e9CqhckPymH9zwPqBSZtcv2bBi3u",
  "sender": "3Mw48B85LvkBUhhDDmUvLhF9koAzfsPekDb",
  "senderPublicKey": "BvJEWY79uQEFetuyiZAF5U4yjPioMj9J6ZrF9uTNfe3E",
  "fee": 1000000,
  "feeAssetId": null,
  "timestamp": 1601652119485,
  "proofs": [
    "2536V2349X3cuVEK1rSxQf3HneJwLimjCmCfoG1QyMLLq1CNp6dpPKUG3Lb4pu76XqLe3nWyo3HAEwGoALgBhxkF"
  ],
  "version": 1,
  "chainId": 84,
  "expression": "base64:AAIEAAAAAAAAAAQIAhIAAAAAAAAA",
  "height": 1203100,
  "applicationStatus": "succeeded",
  "stateChanges": {
    "data": [
      {
        "key": "3Mw48B85LvkBUhhDDmUvLhF9koAzfsPekDb",
        "type": "string",
        "value": "alphabetagamma"
      }
    ],
    "transfers": [],
    "issues": [],
    "reissues": [],
    "burns": [],
    "sponsorFees": [],
    "leases": [],
    "leaseCancels": [],
    "invokes": []
  }
}
```

| Field | Description |
| :--- | :--- |
| chainId | [Chain ID](/en/blockchain/blockchain-network/#chain-id) |
| expression | Compiled call script, base64 encoded, up to 32,768 bytes |

The `stateChanges` structure does not need to be filled when sending a transaction, and it is not stored on the blockchain. The node returns this structure when providing transaction data via the REST API.

The fields that are common to all types of transactions are described in the [Transaction](/en/blockchain/transaction/#json-representation) article.

## Binary Format

See the [Invoke Expression Transaction Binary Format](/en/blockchain/binary-format/transaction-binary-format/invoke-expression-transaction-binary-format) article.

## Ride Structure

The [InvokeExpressionTransaction](/en/ride/v6/structures/transaction-structures/invoke-expression-transaction) structure is used for transaction handling in smart contracts.
