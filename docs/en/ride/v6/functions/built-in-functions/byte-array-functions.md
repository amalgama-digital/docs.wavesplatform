# [Ride v6] Byte array functions

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/functions/built-in-functions/byte-array-functions)

|Name | Description | Complexity |
| :--- | :--- | :--- |
| [drop(ByteVector, Int): ByteVector](#drop) | Returns a given [byte array](/en/ride/data-types/byte-vector) without the first `N` bytes | 6 |
| [dropRight(ByteVector, Int): ByteVector](#drop-right) | Returns a given byte array without the last `N` bytes | 6 |
| [size(ByteVector): Int](#size) | Returns the number of bytes in a byte array | 1 |
| [take(ByteVector, Int): ByteVector](#take) | Returns the first `N` bytes of a byte array | 6 |
| [takeRight(ByteVector, Int): ByteVector](#take-right) | Returns the last `N` bytes of a byte array | 6 |

## drop(ByteVector, Int): ByteVector<a id="drop"></a>

Returns a given [byte array](/en/ride/data-types/byte-vector) without the first `N` bytes.

```scala
drop(xs: ByteVector, number: Int): ByteVector
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [ByteVector](/en/ride/data-types/byte-vector) | Byte array |
| `number`: [Int](/en/ride/data-types/int) | Number `N`. From 0 to 165,947 |

### Examples

```scala
drop(base64'UmlkZQ==', 1)   # Returns base58'cQCt'
drop(125.toBytes(), 0)      # Returns whole byte array: base58'11111113A'
drop(125.toBytes(), 2)      # Returns base58'111113A'
drop(125.toBytes(), 8)      # Returns the empty byte array: base58''
drop(125.toBytes(), 12)     # Returns the empty byte array: base58''
drop(125.toBytes(), -1)     # Fails
```

## dropRight(ByteVector, Int): ByteVector<a id="drop-right"></a>

Returns a given [byte array](/en/ride/data-types/byte-vector) without the last `N` bytes.

```scala
dropRight(xs: ByteVector, number: Int): ByteVector
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [ByteVector](/en/ride/data-types/byte-vector) | Byte array |
| `number`: [Int](/en/ride/data-types/int) | Number `N`. From 0 to 165,947 |

### Examples

```scala
dropRight(base16'52696465', 3)    # Returns base58'2R'
dropRight("Ride".toBytes(), 0)    # Returns whole byte array: base58'37BPKA'
dropRight("Ride".toBytes(), 3)    # Returns base58'2R'
dropRight("Ride".toBytes(), 4)    # Returns the empty byte array: base58''
dropRight("Ride".toBytes(), 28)   # Returns the empty byte array: base58''
dropRight("Ride".toBytes(), -1)   # Fails
```

## size(ByteVector): Int<a id="size"></a>

Returns the number of bytes in a [byte array](/en/ride/data-types/byte-vector).

```scala
size(byteVector: ByteVector): Int
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `byteBector`: [ByteVector](/en/ride/data-types/byte-vector) | Byte array |

### Examples

```scala
size("Hello".toBytes())         # Returns 5
size("Hello world".toBytes())   # Returns 11
size(64.toBytes())              # Returns 8 because all integers in Ride take 8 bytes
size(200000.toBytes())          # Returns 8 because all integers in Ride take 8 bytes
size(base58'37BPKA')            # Returns 4
```

## take(ByteVector, Int): ByteVector<a id="take"></a>

Returns the first `N` bytes of a [byte array](/en/ride/data-types/byte-vector).

```scala
take(xs: ByteVector, number: Int): ByteVector
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [ByteVector](/en/ride/data-types/byte-vector) | Byte array |
| `number`: [Int](/en/ride/data-types/int) | Number `N`. From 0 to 165,947 |

### Examples

```scala
take(base58'37BPKA', 0)     # Returns the empty byte array: base58''
take(base58'37BPKA', 1)     # Returns the byte array consisting of first byte of initial byte array: base58'2R'
take(base58'37BPKA', 15)    # Returns whole byte array: base58'37BPKA'
take(base58'37BPKA', -10)   # Fails
```

## takeRight(ByteVector, Int): ByteVector<a id="take-right"></a>

Returns the last `N` bytes of a [byte array](/en/ride/data-types/byte-vector).

```scala
takeRight(xs: ByteVector, number: Int): ByteVector
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [ByteVector](/en/ride/data-types/byte-vector) | Byte array |
| `number`: [Int](/en/ride/data-types/int) | Number `N`. From 0 to 165,947 |

### Examples

```scala
takeRight(base16'52696465', 0)     # Returns the empty byte array: base58''
takeRight(base16'52696465', 1)     # Returns the byte array consisting of last byte of initial byte array: base58'2k'
takeRight(base16'52696465', 15)    # Returns whole byte array: base58'37BPKA'
takeRight(base16'52696465', -10)   # Fails
```
