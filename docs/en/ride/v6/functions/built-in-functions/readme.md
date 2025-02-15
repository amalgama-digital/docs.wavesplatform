# [Ride v6] Built-in functions

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/functions/built-in-functions/)

A **built-in function** is a [function](/en/ride/functions/) of the [Standard library](/en/ride/script/standard-library).

## [Account data storage functions](/en/ride/functions/built-in-functions/account-data-storage-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| getBinary(Address&#124;Alias, String): ByteVector&#124;Unit | Gets an array of bytes by key | 10 |
| getBinary(String): ByteVector&#124;Unit | Gets an array of bytes by key from dApp's own data storage | 10 |
| getBinaryValue(Address&#124;Alias, String): ByteVector | Gets an array of bytes by key. Fails if there is no data | 10 |
| getBinaryValue(String): ByteVector | Gets an array of bytes by key from dApp's own data storage. Fails if there is no data | 10 |
| getBoolean(Address&#124;Alias, String): Boolean&#124;Unit | Gets a boolean value by key | 10 |
| getBoolean(String): Boolean&#124;Unit | Gets a boolean value by key from dApp's own data storage | 10 |
| getBooleanValue(Address&#124;Alias, String): Boolean | Gets a boolean value by key. Fails if there is no data | 10 |
| getBooleanValue(String): Boolean | Gets a boolean value by key from dApp's own data storage. Fails if there is no data | 10 |
| getInteger(Address&#124;Alias, String): Int&#124;Unit | Gets an integer by key | 10 |
| getInteger(String): Int&#124;Unit | Gets an integer by key from dApp's own data storage | 10 |
| getIntegerValue(Address&#124;Alias, String): Int | Gets an integer by key. Fails if there is no data | 10 |
| getIntegerValue(String): Int | Gets an integer by key from dApp's own data storage. Fails if there is no data | 10 |
| getString(Address&#124;Alias, String): String&#124;Unit | Gets a string by key | 10 |
| getString(String): String&#124;Unit | Gets a string by key from dApp's own data storage | 10 |
| getStringValue(Address&#124;Alias, String): String | Gets a string by key. Fails if there is no data | 10 |
| getStringValue(String): String | Gets a string by key from dApp's own data storage. Fails if there is no data | 10 |
| isDataStorageUntouched(Address&#124;Alias): Boolean | Checks if the data storage of a given account never contained any entries | 10 |

## [Blockchain functions](/en/ride/functions/built-in-functions/blockchain-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| addressFromRecipient(Address&#124;Alias): Address | Gets the corresponding [address](/en/blockchain/account/address) of the [alias](/en/blockchain/account/alias) | 5 |
| assetBalancе(Address&#124;Alias, ByteVector): Int | Gets account balance by token ID | 10 |
| assetInfo(ByteVector): Аsset&#124;Unit | Gets the information about a [token](/en/blockchain/token/) | 15 |
| blockInfoByHeight(Int): BlockInfo &#124;Unit | Gets the information about a [block](/en/blockchain/block/) by the [block height](/en/blockchain/block/block-height) | 5 |
| calculateAssetId(Issue): ByteVector | Calculates ID of the token formed by the [Issue](/en/ride/structures/script-actions/issue) structure when executing the [callable function](/en/ride/functions/callable-function) | 10 |
| calculateLeaseId(Lease): ByteVector | Calculates ID of the lease formed by the [Lease](/en/ride/structures/script-actions/lease) structure when executing the callable function | 1 |
| scriptHash(Address&#124;Alias): ByteVector&#124;Unit | Returns [BLAKE2b-256](https://en.wikipedia.org/wiki/BLAKE_%28hash_function%29) hash of the script assigned to a given account | 200 |
| transactionHeightById(ByteVector):  Int&#124;Unit | Gets the [block height](/en/blockchain/block/block-height) of a transaction | 20 |
| transferTransactionById(ByteVector): TransferTransaction&#124;Unit | Gets the data of a [transfer transaction](/en/blockchain/transaction-type/transfer-transaction) | 60 |
| wavesBalance(Address&#124;Alias): Int | Gets account balance in [WAVES](/en/blockchain/token/waves) | 10 |

## [Byte array functions](/en/ride/functions/built-in-functions/byte-array-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| drop(ByteVector, Int): ByteVector | Returns the byte array without the first `N` bytes | 6 |
| dropRight(ByteVector, Int): ByteVector | Returns the byte array without the last `N` bytes | 6 |
| size(ByteVector): Int | Returns the number of bytes in the byte array | 1 |
| take(ByteVector, Int): ByteVector | Returns the first `N` bytes of the byte array | 6 |
| takeRight(ByteVector, Int): ByteVector | Returns the last `N` bytes of the byte array | 6 |

## [Converting functions](/en/ride/v6/functions/built-in-functions/converting-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| addressFromPublicKey(ByteVector): Address | Converts account public key to [address](/en/blockchain/account/address) | 1 |
| parseBigInt(String): BigInt&#124;Unit | Converts the string representation of a number to its [big integer](/en/ride/data-types/bigint) equivalent | 65 |
| parseBigIntValue(String): BigInt | Converts the string representation of a number to its big integer equivalent.<br>Fails if the string cannot be parsed | 65 |
| parseInt(String): Int&#124;Unit | Converts the string representation of a number to its integer equivalent | 2 |
| parseIntValue(String): Int | Converts the string representation of a number to its integer equivalent. Fails if the string cannot be parsed | 2 |
| toBigInt(ByteVector): BigInt | Converts an array of bytes to a big integer | 65 |
| toBigInt(ByteVector, Int, Int): BigInt | Converts an array of bytes starting from a certain index to a big integer | 65 |
| toBigInt(Int): BigInt | Converts an integer to a big integer | 1 |
| toBytes(Boolean): ByteVector | Converts a boolean to an array of bytes | 1 |
| toBytes(Int): ByteVector | Converts an integer to an array of bytes | 1 |
| toBytes(String): ByteVector | Converts a string to an array of bytes | 8 |
| toBytes(BigInt): ByteVector | Converts a big integer to an array of bytes | 65 |
| toInt(BigInt): Int | Converts a big integer to an integer.<br>Fails if the number cannot be converted | 1 |
| toInt(ByteVector): Int | Converts an array of bytes to an integer | 1 |
| toInt(ByteVector, Int): Int | Converts an array of bytes to an integer starting from a certain index | 1 |
| toString(Address): String | Converts an [address](/en/blockchain/account/address) to a string | 1 |
| toString(BigInt): String | Converts a big integer to a string | 1 |
| toString(Boolean): String | Converts a boolean to a string | 1 |
| toString(Int): String | Converts an integer to a string | 1 |
| toUtf8String(ByteVector): String | Converts an array of bytes to a UTF-8 string | 7 |
| transferTransactionFromProto(ByteVector): TransferTransaction&#124;Unit | Deserializes transfer transaction | 5 |

## [dApp-to-dApp invocation functions](/en/ride/functions/built-in-functions/dapp-to-dapp)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| invoke(Address&#124;Alias, String, List[Any], List[AttachedPayments]): Any | Invokes a dApp callable function, with [reentrancy restriction](/en/ride/functions/built-in-functions/dapp-to-dapp#reentrancy) | 75 |
| reentrantInvoke(Address&#124;Alias, String, List[Any], List[AttachedPayments]): Any | Invokes a dApp callable function, without reentrancy restriction | 75 |

## [Data transaction functions](/en/ride/functions/built-in-functions/data-transaction-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| getBinary(List[], String): ByteVector&#124;Unit | Gets a binary value from a list of data entires by key | 10 |
| getBinary(List[], Int): ByteVector&#124;Unit | Gets a binary value from a list of data entires by index | 4 |
| getBinaryValue(List[], String): ByteVector | Gets a binary value from a list of data entires by key. Fails if there is no data | 10 |
| getBinaryValue(List[], Int): ByteVector | Gets a binary value from a list of data entires by index. Fails if there is no data | 4 |
| getBoolean(List[], String): Boolean&#124;Unit | Gets a boolean value from a list of data entires by key | 10 |
| getBoolean(List[], Int): Boolean&#124;Unit | Gets a boolean value from a list of data entires by index | 4 |
| getBooleanValue(List[], String): Boolean | Gets a boolean value from a list of data entires by key. Fails if there is no data | 10 |
| getBooleanValue(List[], Int): Boolean | Gets a boolean value from a list of data entires by index. Fails if there is no data | 4 |
| getInteger(List[], String): Int&#124;Unit | Gets an integer value from a list of data entires by key | 10 |
| getInteger(List[], Int): Int&#124;Unit | Gets an integer value from a list of data entires by index | 4 |
| getIntegerValue(List[], String): Int | Gets an integer value from a list of data entires by key. Fails if there is no data | 10 |
| getIntegerValue(List[], Int): Int | Gets an integer value from a list of data entires by index. Fails if there is no data | 4 |
| getString(List[] String): String&#124;Unit | Gets a string value from a list of data entires by key | 10 |
| getString(List[], Int): String&#124;Unit | Gets a string value from a list of data entires by index | 4 |
| getStringValue(List[], String): String | Gets a string value from a list of data entires by key. Fails if there is no data | 10 |
| getStringValue(List[], Int): String | Gets a string value from a list of data entires by index. Fails if there is no data | 4 |

## [Decoding functions](/en/ride/functions/built-in-functions/decoding-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| addressFromString(String): Address&#124;Unit | Decodes address from [base58](https://en.bitcoin.it/wiki/Base58Check_encoding) string | 1 |
| addressFromStringValue(String): Address | Decodes address from base58 string. Fails if the address cannot be decoded | 1 |
| fromBase16String(String): ByteVector | Decodes [base16](https://en.wikipedia.org/wiki/Hexadecimal) string to an array of bytes | 10 |
| fromBase58String(String): ByteVector | Decodes [base58](https://en.bitcoin.it/wiki/Base58Check_encoding) string to an array of bytes | 1 |
| fromBase64String(String): ByteVector | Decodes [base64](https://en.wikipedia.org/wiki/Base64) string to an array of bytes | 40 |

## [Encoding functions](/en/ride/functions/built-in-functions/encoding-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| toBase16String(ByteVector): String | Encodes array of bytes to [base16](https://en.wikipedia.org/wiki/Hexadecimal) string | 10 |
| toBase58String(ByteVector): String | Encodes array of bytes to [base58](https://en.bitcoin.it/wiki/Base58Check_encoding) string | 3 |
| toBase64String(ByteVector): String | Encodes array of bytes to [base64](https://en.wikipedia.org/wiki/Base64) string | 35 |

## [Exception functions](/en/ride/functions/built-in-functions/exception-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| throw() | Raises an exception | 1 |
| throw(String) | Raises an exception with a message | 1 |

## [Fold functions](/en/ride/v6/functions/built-in-functions/fold-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| fold | Range of functions.<br>Implement operations on a list of values | 3–115 |

## [Hashing functions](/en/ride/functions/built-in-functions/hashing-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| blake2b256(ByteVector): ByteVector | Range of functions.<br>Hash an array of bytes using [BLAKE2b-256](https://en.wikipedia.org/wiki/BLAKE_%28hash_function%29) | 10–200 |
| keccak256(ByteVector): ByteVector | Range of functions.<br>Hash an array of bytes using [Keccak-256](https://keccak.team/files/Keccak-submission-3.pdf) | 10–200 |
| sha256(ByteVector): ByteVector | Range of functions.<br>Hash an array of bytes using [SHA-256](https://en.wikipedia.org/wiki/SHA-2) | 10–200 |

## [List functions](/en/ride/functions/built-in-functions/list-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| cons(A, List[B]): List[A&#124;B] | Inserts element to the beginning of the [list](/en/ride/data-types/list) | 1 |
| containsElement(list: List[T], element: T): Boolean | Check if the element is in the list | 5 |
| getElement(List[T], Int): T | Gets element from the list | 2 |
| indexOf(List[T], T): Int&#124;Unit | Returns the index of the first occurrence of the element in the list | 5 |
| lastIndexOf(List[T], T): Int&#124;Unit | Returns the index of the last occurrence of the element in the list | 5 |
| max(List[Int]): Int | Returns the largest element in the list of integers | 3 |
| max(List[BigInt]): BigInt | Returns the largest element in the list of [big integers](/en/ride/data-types/bigint) | 192 |
| min(List[Int]): Int | Returns the smallest element in the list of integers | 3 |
| min(List[BigInt]): BigInt | Returns the smallest element in the list of big integers | 192 |
| removeByIndex(List[T], Int): List[T] | Removes an element from the list by index | 7 |
| size(List[T]): Int | Returns the size of the list | 2 |

`A`, `B`, `T` means any valid type.

## [Math functions](/en/ride/v6/functions/built-in-functions/math-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| fraction(Int, Int, Int): Int | Multiplies and divides integers to avoid overflow | 1 |
| fraction(Int, Int, Int, Union): Int | Multiplies and divides integers to avoid overflow, applying the specified rounding method | 1 |
| fraction(BigInt, BigInt, BigInt): BigInt | Multiplies and divides [bid integers](/en/ride/data-types/bigint) to avoid overflow | 1 |
| fraction(BigInt, BigInt, BigInt, Union): BigInt | Multiplies and divides bid integers to avoid overflow, applying the specified rounding method | 1 |
| log(Int, Int, Int, Int, Int, Union): Int | Calculates logarithm of a number with a base | 100 |
| log(BigInt, Int, BigInt, Int, Int, Union): BigInt | Calculates logarithm of a number to a given base with high accuracy | 200 |
| median(List[Int]): Int | Returns the median of a list of integers | 20 |
| median(List[BigInt]): BigInt | Returns the median of a list of big integers | 160 |
| pow(Int, Int, Int, Int, Int, Union): Int | Raises a number to a given power | 28 |
| pow(BigInt, Int, BigInt, Int, Int, Union): BigInt | Raises a number to a given power with high accuracy | 270 |
| sqrt(Int, Int, Int, Union): Int | Returns the square root of a number | 2 |
| sqrt(BigInt, Int, Int, Union): BigInt | Returns the square root of a number with high accuracy | 5 |

## [String functions](/en/ride/v6/functions/built-in-functions/string-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| contains(String, String): Boolean | Checks whether the string contains substring | 3 |
| drop(String, Int): String | Drops the first `n` characters of a string | 20 |
| dropRight(String, Int): String | Drops the last `n` characters of a string | 20 |
| indexOf(String, String): Int&#124;Unit | Returns the index of the first occurrence of a substring | 3 |
| indexOf(String, String, Int): Int&#124;Unit | Returns the index of the first occurrence of a substring after a certain index | 3 |
| lastIndexOf(String, String): Int&#124;Unit | Returns the index of the last occurrence of a substring | 3 |
| lastindexOf(String, String, Int): Int&#124;Unit | Returns the index of the last occurrence of a substring before a certain index | 3 |
| makeString(List[String], String): String | Range of functions.<br>Concatenate list strings adding a separator | 1–11 |
| size(String): Int | Returns the size of a string | 1 |
| split(String, String): List[String] | Range of functions.<br>Split a string delimited by a separator into a list of substrings | 1–51 |
| take(String, Int): String | Takes the first `n` characters from a string | 20 |
| takeRight(String, Int): String | Takes the last `n` characters from a string | 20 |

## [Union functions](/en/ride/functions/built-in-functions/union-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| isDefined(T&#124;Unit): Boolean | Checks if an argument is not `unit` | 1 |
| value(T&#124;Unit): T | Gets a value from a `union` type argument. Fails if it is `unit` | 2 |
| valueOrElse(T&#124;Unit, T): T | Returns a value from a `union` type argument if it's not `unit`. Otherwise, returns the second argument | 2 |
| valueOrErrorMessage(T&#124;Unit, String): T | Gets a value from a `union` type argument if it's not `unit`. Otherwise, fails with the message specified in the second argument | 2 |

## [Verification functions](/en/ride/functions/built-in-functions/verification-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| bn256groth16Verify(ByteVector, ByteVector, ByteVector): Boolean | Range of functions.<br>Check [zk-SNARK](https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b) by groth16 protocol on the bn254 curve | 800–1650 |
| createMerkleRoot(List[ByteVector], ByteVector, Int) : ByteVector | Calculates the [Merkle root hash](/en/blockchain/block/merkle-root) for transactions of block | 30 |
| ecrecover(messageHash: ByteVector, signature: ByteVector) | Recovers public key from the message hash and the [ECDSA](https://en.wikipedia.org/wiki/ECDSA) digital signature | 70 |
| groth16Verify(ByteVector, ByteVector, ByteVector): Boolean | Range of functions.<br>Check [zk-SNARK](https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b) by [groth16](https://eprint.iacr.org/2016/260.pdf) protocol on the bls12-381 curve | 1200–2700 |
| rsaVerify(digestAlgorithmType, ByteVector, ByteVector, ByteVector): Boolean | Range of functions.<br>Check that the [RSA](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29) digital signature is valid, i.e. it was created by the owner of the public key | 500–1000  |
| sigVerify(ByteVector, ByteVector, ByteVector): Boolean | Range of functions.<br>Check that the [Curve25519](https://en.wikipedia.org/wiki/Curve25519) digital signature is valid, i.e. it was created by the owner of the public key | 47–200 |
