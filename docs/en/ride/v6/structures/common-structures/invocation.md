# [Ride v6] Invocation

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/structures/common-structures/invocation)

Structure that contains fields of a script invocation that can be used by the [callable function](/en/ride/functions/callable-function) or the [call script](/en/ride/v6/script/script-types/call-script).

## Constructor

```ride
Invocation(caller: Address, callerPublicKey: ByteVector, originCaller: Address, originCallerPublicKey: ByteVector, payments: List[AttachedPayment], transactionId: ByteVector, fee: Int, feeAssetId: ByteVector|Unit)
```

## Fields

The field values depend on how the callable function is invoked.

If the script is invoked by an [Invoke Script transaction](/en/blockchain/transaction-type/invoke-script-transaction) or [Invoke Expression transaction](/en/blockchain/transaction-type/invoke-script-transaction):

|   #   | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | caller | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/) of the account that sent the transaction |
| 2 | callerPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Public key of the account that sent the transaction |
| 3 | originCaller | [Address](/en/ride/structures/common-structures/address) | Duplicates the `caller` field |
| 4 | originCallerPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Duplicates the `callerPublicKey` field |
| 5 | payments | List[[AttachedPayment](/en/ride/structures/common-structures/attached-payment)] | Payments indicated in the Invoke Script transaction |
| 6 | transactionId | [ByteVector](/en/ride/data-types/byte-vector) | ID of the transaction |
| 7 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 8 | feeAssetId | [ByteVector](/en/ride/data-types/byte-vector)&#124;[Unit](/en/ride/data-types/unit) | ID of the fee token |

If the callable function is invoked by the `invoke` or `reentrantInvoke` function (see the [dApp-to-dApp invocation](/en/ride/advanced/dapp-to-dapp) article):

|   #   | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | caller | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/) of the dApp that invokes the callable function |
| 2 | callerPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Public key of the dApp that invokes the callable function |
| 3 | originCaller | [Address](/en/ride/structures/common-structures/address) | Address of the account that sent the Invoke Script transaction |
| 4 | originCallerPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Public key of the account that sent the Invoke Script transaction |
| 5 | payments | List[[AttachedPayment](/en/ride/structures/common-structures/attached-payment)] | Payments indicated in the `invoke` or `reentrantInvoke` function |
| 6 | transactionId | [ByteVector](/en/ride/data-types/byte-vector) | ID of the Invoke Script transaction |
| 7 | fee | [Int](/en/ride/data-types/int) | [Transaction fee](/en/blockchain/transaction/transaction-fee) |
| 8 | feeAssetId | [ByteVector](/en/ride/data-types/byte-vector)&#124;[Unit](/en/ride/data-types/unit) | ID of the fee token |

> The `originCaller`, `originCallerPublicKey`, `transactionId`, `fee`, and `feeAssetId` values are the same for all dApp-to-dApp invocations  within a single Invoke Script transaction.

## Example: Payments Processing

The following function checks that the first payment in the Invoke Script transaction is at least 1 WAVES or 5 in the specified asset.

```scala
{-# STDLIB_VERSION 6 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

func isPaymentOk(i: Invocation) = {
  let acceptableAssetId = base58'3JmaWyFqWo8YSA8x3DXCBUW7veesxacvKx19dMv7wTMg'
  if (size(i.payments) == 0) then {
    throw("Payment not attached")
  } else {
    let p = i.payments[0]
    match p.assetId {
      case assetId: ByteVector => assetId == acceptableAssetId && p.amount >= 500000000
      case _ => p.amount >= 100000000
    }
  }
}

@Callable(i)
func foo() = {
  if isPaymentOk(i) then ([],unit) else throw("Wrong payment amount or asset")
}
```