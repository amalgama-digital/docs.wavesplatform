# ByteVector

`ByteVector` is a [data type](/en/ride/data-types/) for byte array.

To assign a value to a `ByteVector` variable, you can use a string in [Base16](https://en.wikipedia.org/wiki/Hexadecimal#Base16_&#40;Transfer_encoding&#41;), [Base58](https://ru.wikipedia.org/wiki/Base58), or [Base64](https://ru.wikipedia.org/wiki/Base64) with the appropriate prefix:

``` ride
let a = base16'52696465'
let b = base58'8t38fWQhrYJsqxXtPpiRCEk1g5RJdq9bG5Rkr2N7mDFC'
let c = base64'UmlkZQ=='
```

This method, unlike the [fromBase16String](/en/ride/functions/built-in-functions/decoding-functions#from-base-16-string), [fromBase58String](/en/ride/functions/built-in-functions/decoding-functions#from-base-58-string), and [fromBase64String](/en/ride/functions/built-in-functions/decoding-functions#from-base-64-string) functions, does not increase the complexity of the script, since decoding is performed by the compiler.

To convert [integer](/en/ride/data-types/int), [boolean](/en/ride/data-types/boolean) and [string](/en/ride/data-types/string) values to a byte array use [toBytes](/en/ride/functions/built-in-functions/converting-functions) function:

``` ride
let a = 42.toBytes()
let b = true.toBytes()
let c = "Ride".toBytes()
```

For more byte array functions, see the [Built-in Functions](/en/ride/functions/built-in-functions/).

## Limitations

The maximum size of a `ByteVector` variable is 32,767 bytes.

   Exception: the `bodyBytes` field of [transaction structure](/en/ride/structures/transaction-structures/). You can pass this value as an argument to the `rsaVerify` and `sigVerify` [verification functions](/en/ride/functions/built-in-functions/verification-functions) (but cannot concatenate with other byte arrays in case the limit is exceeded).
