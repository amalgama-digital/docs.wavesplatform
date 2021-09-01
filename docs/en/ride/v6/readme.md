# [Ride v6] Standard Library Version 6

Standard library version 6 is added in node version 1.4.0 and enabled by feature #17 “Ride V6”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## Built-in functions

* Added the following built-in functions:
   * [sqrt(Int,Int,Int,Union)](/en/ride/v6/functions/built-in-functions/math-functions#sqrt)
   * [sqrt(BigInt,Int,Int,Union)](/en/ride/v6/functions/built-in-functions/math-functions#sqrtbigint)
* For the built-in string functions [makeString](/en/ride/v6/functions/built-in-functions/string-functions#makestring-list-string-string-string) and [split](/en/ride/v6/functions/built-in-functions/string-functions#split-string-string-list-string) added the range of similar functions with different complexity depending on the data size limit. When data size is known in advance, the “cheaper” function can be used.
* Changed the complexity of certain built-in functions. The complexity is given in the [[Ride v6] Built-in functions](/en/ride/v6/functions/built-in-functions/) article.
