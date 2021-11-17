# [Ride v6] Функции массива байтов

:warning: Это документация Стандартной библиотеки версии 6, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/). [Перейти к версии для Mainnet](/ru/ride/functions/built-in-functions/byte-array-functions)

| Название | Описание | Сложность |
| :--- | :--- | :--- |
| [drop(ByteVector, Int): ByteVector](#drop) | Возвращает [массив байтов](/ru/ride/data-types/byte-vector) без первых `N` байт | 6 |
| [dropRight(ByteVector, Int): ByteVector](#dropright) | Возвращает массив байтов без последних `N` байт | 6 |
| [size(ByteVector): Int](#size) | Возвращает количество байтов в массиве | 1 |
| [take(ByteVector, Int): ByteVector](#take) | Возвращает первые `N` байт массива байтов | 6 |
| [takeRight(ByteVector, Int): ByteVector](#takeright) | Возвращает последние `N` байт массива байтов | 6 |

## drop(ByteVector, Int): ByteVector <a id="drop"></a>

Возвращает [массив байтов](/ru/ride/data-types/byte-vector) без первых `N` байт.

```scala
drop(xs: ByteVector, number: Int): ByteVector
```

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `xs`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов |
| `number`: [Int](/ru/ride/data-types/int) | Число `N`. От 0 до 165&nbsp;947 |

### Примеры

```scala
drop(base64'UmlkZQ==', 1)   # Возвращает base58'cQCt'
drop(125.toBytes(), 0)      # Возвращает массив байтов целиком: base58'11111113A'
drop(125.toBytes(), 2)      # Возвращает base58'111113A'
drop(125.toBytes(), 8)      # Возвращает пустой массив байтов: base58''
drop(125.toBytes(), 12)     # Возвращает пустой массив байтов: base58''
drop(125.toBytes(), -1)     # Завершается ошибкой
```

## dropRight(ByteVector, Int): ByteVector <a id="dropright"></a>

Возвращает [массив байтов](/ru/ride/data-types/byte-vector) без последних `N` байт.

```scala
dropRight(xs: ByteVector, number: Int): ByteVector
```

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `xs`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов |
| `number`: [Int](/ru/ride/data-types/int) | Число `N`. От 0 до 165&nbsp;947 |

### Примеры

```scala
dropRight(base16'52696465', 3)    # Возвращает base58'2R'
dropRight("Ride".toBytes(), 0)    # Возвращает массив байтов целиком: base58'37BPKA'
dropRight("Ride".toBytes(), 3)    # Возвращает base58'2R'
dropRight("Ride".toBytes(), 4)    # Возвращает пустой массив байтов: base58''
dropRight("Ride".toBytes(), 28)   # Возвращает пустой массив байтов: base58''
dropRight("Ride".toBytes(), -1)   # Завершается ошибкой
```

## size(ByteVector): Int <a id="size"></a>

Возвращает количество байтов в [массиве байтов](/ru/ride/data-types/byte-vector).

```scala
size(byteVector: ByteVector): Int
```

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `byteVector`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов |

### Примеры

```scala
size("Hello".toBytes())         # Возвращает 5
size("Hello world".toBytes())   # Возвращает 11
size(64.toBytes())              # Возвращает 8, так как все целые числа в Ride занимают 8 байт
size(200000.toBytes())          # Возвращает 8, так как все целые числа в Ride занимают 8 байт
size(base58'37BPKA')            # Возвращает 4
```

## take(ByteVector, Int): ByteVector <a id="take"></a>

Возвращает первые `N` байт [массива байтов](/ru/ride/data-types/byte-vector).

```scala
take(xs: ByteVector, number: Int): ByteVector
```

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `xs`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов |
| `number`: [Int](/ru/ride/data-types/int) | Число `N`. От 0 до 165&nbsp;947 |

### Примеры

```scala
take(base58'37BPKA', 0)     # Возвращает пустой массив байтов: base58''
take(base58'37BPKA', 1)     # Возвращает массив байтов, состоящий из первого байта исходного массива: base58'2R'
take(base58'37BPKA', 15)    # Возвращает массив байтов целиком: base58'37BPKA'
take(base58'37BPKA', -10)   # Завершается ошибкой
```

## takeRight(ByteVector, Int): ByteVector <a id="takeright"></a>

Возвращает последние `N` байт [массива байтов](/ru/ride/data-types/byte-vector).

```scala
takeRight(xs: ByteVector, number: Int): ByteVector
```

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `xs`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов |
| `number`: [Int](/ru/ride/data-types/int) | Число `N`. От 0 до 165&nbsp;947 |

### Примеры

```scala
takeRight(base16'52696465', 0)     # Возвращает пустой массив байтов: base58''
takeRight(base16'52696465', 1)     # Возвращает массив байтов, состоящий из последнего байта исходного массива: base58'2k'
takeRight(base16'52696465', 15)    # Возвращает массив байтов целиком: base58'37BPKA'
takeRight(base16'52696465', -10)   # Завершается ошибкой
```
