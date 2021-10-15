# [Ride v6] Standard Library Version 6

Standard library version 6 is added in node version 1.4.0 and enabled by feature #17 “Ride V6”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## Call Script

Added a new type of script: call script.

The call script type is designed for to be executed once without assigning to an account. The script contains an expression, which is an array of [script actions](/en/ride/structures/script-actions/) to be performed on the blockchain. The script is executed by an [Invoke Expression transaction](/en/blockchain/transaction-type/invoke-expression-transaction), which contains the compiled script.

[More about call script](/en/ride/v6/script/script-types/call-script)

The [InvokeExpressionTransaction](/en/ride/v6/structures/transaction-structures/invoke-expression-transaction) structure is used to verify the an Invoke Expression transaction by smart contracts.

<!-- ## Continued Computations

Added support for dApp scripts with complexity over 10,000. The execution of such a script is split into several stages. The first stage of computations is performed within the Invoke Script transaction. The further stages are performed within Continuation transactions that are created automatically by block generators. [More about continued computations](/en/ride/advanced/continuation)

> Continued computations and dApp-to-dApp invocation are mutually exclusive, that is, they cannot be initiated by the same transaction.
-->

## MetaMask Support

* The [addressFromPublicKey](/en/ride/v6/functions/built-in-functions/converting-functions#addressfrompublickey-bytevector-address) function accepts both Waves account public key (32 bytes) and the MetaMask account public key (64 bytes) and returns address in Waves format (26 bytes).
* The [transferTransactionById](/en/ride/functions/built-in-functions/blockchain-functions#transtransactionbyid) function returns an Ethereum transaction by its ID if the transaction is interpreted as a Transfer transaction. The `proofs` array contains 8 empty values.

[More about MetaMask support on the Waves blockchain](/en/keep-in-touch/metamask)
