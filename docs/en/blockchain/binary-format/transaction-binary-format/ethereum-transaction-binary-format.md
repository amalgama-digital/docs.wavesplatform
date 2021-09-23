# Ethereum Transaction Binary Format

> Ethereum transaction support is added in node version 1.4.0 and enabled by feature #17 "Ride V6". Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

Waves node supports Ethereum transactions and interpretes  perform token transfers or dApp script invocations. Thanks to this, MetaMask users can sign transactions and send them to the Waves blockchain. [More details](/en/keep-in-touch/metamask)

The Waves node supports transactions in the Ethereum format and interprets them as a dApp script invocation or token transfer, depending on the transaction content. [More about Ethereum transaction support](/en/keep-in-touch/metamask)

Ethereum transactions are not classified as WAVES typed transactions.

```protobuf
message SignedTransaction {
    Transaction transaction = 1;
    oneof transaction {
        Transaction waves_transaction = 1;
        bytes ethereum_transaction = 3;
    }
   repeated bytes proofs = 2;
}
```

The `ethereum_transaction` field contains the entire Ethereum transaction bytes, including the ECDSA signature (values `v`, `r`, `s`).

The `proofs` array is empty in case of Ethereum transaction.

## Fields Interpretation

Although the protobuf schema does not distinguish fields of an Ethereum transaction, the Waves node parses the structure and interprets the fields as follows when validating and executing the transaction:

* `gasLimit` is treated as a transaction fee. Fee can only be in WAVES.
* `gasPrice` must be 10, otherwise the transaction is rejected.
* `nonce` is treated as `timestamp`.
* If the `value` field is non-empty, the transaction is interpreted as a WAVES transfer. In this case the `data` field must be empty.
* If the `data` field contains an invocations of the `transfer` method of the ERC20 smart contract and the `to` field contains the first 20 bytes of a custom token ID, the transaction is interpreted as a transfer of that token.

   The first 20 bytes of the token ID uniquely define the token, since there are no tokens on the blockchain whose first 20 bytes if ID are the same.

* In other cases, the transaction is interpreted as an invocations of dApp script. The last argument of the callable function must be an array; it is treated as a list of payments attached to the call.
