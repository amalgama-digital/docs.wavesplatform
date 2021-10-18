# [Ride v6] Standard Library Version 6

Standard library version 6 is added in node version 1.4.0 and enabled by feature #17 “Ride V6, MetaMask support, Invoke Expression”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## Call Script

Added a new type of script: call script.

The call script type is designed for to be executed once without assigning to an account. The script contains an expression, which is an array of [script actions](/en/ride/structures/script-actions/) to be performed on the blockchain. The script is executed by an [Invoke Expression transaction](/en/blockchain/transaction-type/invoke-expression-transaction), which contains the compiled script.

[More about call script](/en/ride/v6/script/script-types/call-script)

The [InvokeExpressionTransaction](/en/ride/v6/structures/transaction-structures/invoke-expression-transaction) structure is used to verify the an Invoke Expression transaction by smart contracts.

## Built-in functions

* Added the [fold](/en/ride/v6/functions/built-in-functions/fold-functions) range of functions, designed to implement operations on a list of values. The functions replace the `FOLD<N>` macro used in previous versions of the Standard Library.
* Added the following built-in functions:
   * [sqrt(Int,Int,Int,Union)](/en/ride/v6/functions/built-in-functions/math-functions#sqrt)
   * [sqrt(BigInt,Int,Int,Union)](/en/ride/v6/functions/built-in-functions/math-functions#sqrtbigint)
* For the built-in string functions [makeString](/en/ride/v6/functions/built-in-functions/string-functions#makestring-list-string-string-string) and [split](/en/ride/v6/functions/built-in-functions/string-functions#split-string-string-list-string) added the range of similar functions with different complexity depending on the data size limit. When data size is known in advance, the “cheaper” function can be used.
* Changed the complexity of certain built-in functions. The complexity is given in the [[Ride v6] Built-in functions](/en/ride/v6/functions/built-in-functions/) article.
