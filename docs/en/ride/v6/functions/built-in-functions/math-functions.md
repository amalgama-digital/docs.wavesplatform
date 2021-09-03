# [Ride v6] Math functions

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/functions/built-in-functions/math-functions)

| Name | Description | Complexity |
| :--- | :--- | :--- |
| [fraction(Int, Int, Int): Int](#fraction) | Multiplies and divides [integers](/en/ride/data-types/int) to avoid overflow | 1 |
| [fraction(Int, Int, Int, Union): Int](#fractionintround) | Multiplies and divides integers to avoid overflow, applying the specified rounding method | 4 |
| [fraction(BigInt, BigInt, BigInt): BigInt](#fractionbigint) | Multiplies and divides [bid integers](/en/ride/data-types/bigint) to avoid overflow | 3 |
| [fraction(BigInt, BigInt, BigInt, Union): BigInt](#fractionbigintround) | Multiplies and divides bid integers to avoid overflow, applying the specified rounding method | 4 |
| [log(Int, Int, Int, Int, Int, Union): Int](#log)| Calculates logarithm of a number to a given base | 100 |
| [log(BigInt, Int, BigInt, Int, Int, Union): BigInt](#logbigint) | Calculates logarithm of a number to a given base with high accuracy | 200 |
| [median(List[Int]): Int](#median)| Returns the median of a list of integers | 20 |
| [median(List[BigInt]): BigInt](#medianbigint) | Returns the median of a list of big integers | 160 |
| [pow(Int, Int, Int, Int, Int, Union): Int](#pow) | Raises a number to a given power | 28 |
| [pow(BigInt, Int, BigInt, Int, Int, Union): BigInt](#powbigint) | Raises a number to a given power with high accuracy | 270 |
| [sqrt(Int, Int, Int, Union): Int](#sqrt) | Returns the square root of a number | 2 |
| [sqrt(BigInt, Int, Int, Union): BigInt](#sqrtbigint) | Returns the square root of a number with high accuracy | 6 |

## fraction(Int, Int, Int): Int<a id="fraction"></a>

Multiplies [integers](/en/ride/data-types/int) `a`, `b` and divides the result by the integer `c` to avoid overflow.

Fraction `a × b / c` should not exceed the maximum value of the integer type 9,223,372,036,854,755,807.

The rounding method is DOWN, see [Rounding variables](#rounding-variables) below.

```ride
fraction(a: Int, b: Int, c: Int): Int
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `a`: [Int](/en/ride/data-types/int) | Integer `a` |
| `b`: [Int](/en/ride/data-types/int) | Integer `b` |
| `c`: [Int](/en/ride/data-types/int) | Integer `c` |

### Example

Lets assume that:

a = 100,000,000,000,

b = 50,000,000,000,000,

c = 2,500,000.

The following formula, with [operators](/en/ride/operators/) `*` and `/`, fails due to overflow:

```ride
a * b / c #  overflow, because a × b exceeds max integer value
```

The fraction function with no overflow:

```ride
fraction(a, b, c) # Result: 2,000,000,000,000,000,000
```

## fraction(Int, Int, Int, Union): Int<a id="fractionintround"></a>

Multiplies [integers](/en/ride/data-types/int) `a`, `b` and divides the result by the integer `c` to avoid overflow, applying the specified rounding method.

Fraction `a × b / c` should not exceed the maximum value of the integer type 9,223,372,036,854,755,807.

```ride
fraction(a: Int, b: Int, c: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): Int
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `a`: [Int](/en/ride/data-types/int) | Integer `a` |
| `b`: [Int](/en/ride/data-types/int) | Integer `b` |
| `c`: [Int](/en/ride/data-types/int) | Integer `c` |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

## fraction(BigInt, BigInt, BigInt): BigInt<a id="fractionbigint"></a>

Multiplies [big integers](/en/ride/data-types/bigint) `a`, `b` and divides the result by the integer `c` to avoid overflow.

Fraction `a × b / c` should not exceed the maximum value of the big integer type.

The rounding method is DOWN, see [Rounding variables](#rounding-variables) below.

```ride
fraction(a: BigInt, b: BigInt, c: BigInt): BigInt
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `a`: BigInt | Big integer `a` |
| `b`: BigInt | Big integer `b` |
| `c`: BigInt | Big integer `c` |

## fraction(BigInt, BigInt, BigInt, Union): BigInt<a id="fractionbigintround"></a>

Multiplies [big integers](/en/ride/data-types/bigint) `a`, `b` and divides the result by the integer `c` to avoid overflow, applying the specified rounding method.

Fraction `a × b / c` should not exceed the maximum value of the big integer type.

```ride
fraction(a: BigInt, b: BigInt, c: BigInt, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): BigInt
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `a`: BigInt | Big integer `a` |
| `b`: BigInt | Big integer `b` |
| `c`: BigInt | Big integer `c` |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

## log(Int, Int, Int, Int, Int, Union): Int<a id="log"></a>

Calculates `log`<sub>`b`</sub>`a`.

``` ride
log(value: Int, vp: Int, base: Int, bp: Int, rp: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): Int
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate `log`<sub>2.7</sub>16.25 then the number `value` = 1625, `vp` = 2 and the `base` = 27, `bp` = 1.

More examples:

| a | value | vp |
| :--- | :--- | :--- |
| 16.25 | 1625 | 2 |
| 5 | 5 | 0 |
| 5.00 | 500 | 2 |

If the `log` function returns, for example, 2807, and the parameter `rp` = 3, then the result is 2.807; in the number 2807 the last 3 digits is a fractional part.

### Parameters

| Parameter | Description |
| :--- | :--- |
| `value`: [Int](/en/ride/data-types/int) | Number `a` without decimal point |
| `vp`: [Int](/en/ride/data-types/int) | Number of decimals of `a` |
| `base`: [Int](/en/ride/data-types/int) | Logarithm base `b` without decimal point |
| `bp`: [Int](/en/ride/data-types/int) | Number of decimals of `b` |
| `rp`: [Int](/en/ride/data-types/int) | Number of decimals in the resulting value, from 0 to 8 inclusive. Specifies the accuracy of the calculated result |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

### Examples

`log`<sub>2.7</sub>16.25 = 2.807035421...

```ride
log(1625, 2, 27, 1, 2, HALFUP) # Function returns 281, so the result is: 2.81
log(1625, 2, 27, 1, 5, HALFUP) # Function returns 280703542, so the result is: 2.80704
```

```ride
log(0, 0, 2, 0, 0, HALFUP)     # Result: -Infinity
```

## log(BigInt, Int, BigInt, Int, Int, Union): BigInt<a id="logbigint"></a>

Calculates `log`<sub>`b`</sub>`a` with high accuracy.

``` ride
log(value: BigInt, ep: Int, base: BigInt, bp: Int, rp: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): BigInt
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate `log`<sub>2.7</sub>16.25 then `value` = 1625, `vp` = 2 and the `base` = 27, `bp` = 1.

If the `log` function returns, for example, 2807035420964590265, and the parameter `rp` = 18, then the result is 2.807035420964590265; in the number 2807035420964590265 the last 18 digits is a fractional part.

### Parameters

| Parameter | Description |
| :--- | :--- |
| `value`: [BigInt](/en/ride/data-types/bigint) | Number `a` without decimal point |
| `vp`: [Int](/en/ride/data-types/int) | Number of decimals of `a` |
| `base`: [BigInt](/en/ride/data-types/bigint) | Logarithm base `b` without decimal point |
| `bp`: [Int](/en/ride/data-types/int) | Number of decimals of `b` |
| `rp`: [Int](/en/ride/data-types/int) | Number of decimals in the resulting value, from 0 to 18 inclusive. Specifies the accuracy of the calculated result |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

## median(List[Int]): Int<a id="median"></a>

Returns the median of the [list](/en/ride/data-types/list) of integers. Fails if the list is empty.

```ride
median(arr: List[Int]): Int
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `arr`: [List](/en/ride/data-types/list)[[Int](/en/ride/data-types/int)] | List of integers |

### Examples

```ride
median([1, 2, 3])         # Returns 2
median([2, 4, 9, 20])     # Returns 6
median([-2, -4, -9, -20]) # Returns -7
```

## median(List[BigInt]): BigInt<a id="medianbigint"></a>

Returns the median of a [list](/en/ride/data-types/list) of [big integers](/en/ride/data-types/bigint). Fails if the list is empty or contains more than 100 elements.

``` ride
median(arr: List[BigInt]): BigInt
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `arr`: [List](/en/ride/data-types/list)[[BigInt](/en/ride/data-types/bigint)] | List of big integers |

## pow(Int, Int, Int, Int, Int, Union): Int<a id="pow"></a>

Calculates `a`<sup>`b`</sup>.

``` ride
pow(base: Int, bp: Int, exponent: Int, ep: Int, rp: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): Int
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate 16.25<sup>2.7</sup>, then the number `base` = 1625, `bp` = 2, and the `exponent` = 27, `ep` = 1.

If the `pow` function returns, for example, 18591057, and the parameter `rp` = 4, then the result is 1859.1057; in the number 18591057 the last 4 digits is a fractional part.

### Parameters

| Parameter | Description |
| :--- | :--- |
| `base`: [Int](/en/ride/data-types/int) | Number `a` without decimal point |
| `bp`: [Int](/en/ride/data-types/int) | Number of decimals of `a` |
| `exponent`: [Int](/en/ride/data-types/int) | Exponent `b` without decimal point |
| `ep`: [Int](/en/ride/data-types/int) | Number of decimals of `b` |
| `rp`: [Int](/en/ride/data-types/int) | Number of decimals in the resulting value, from 0 to 8 inclusive. Specifies the accuracy of the calculated result |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

### Examples

16.25<sup>2.7</sup> = 1859,1057168...

```ride
pow(1625, 2, 27, 1, 2, HALFUP) # function returns 185911, so the result is: 1859.11
pow(1625, 2, 27, 1, 5, HALFUP) # function returns 185910572, so, the result is: 1859.10572
```

## pow(BigInt, Int, BigInt, Int, Int, Union): BigInt<a id="powbigint"></a>

Calculates `a`<sup>`b`</sup> with high accuracy.

``` ride
pow(base: BigInt, bp: Int, exponent: BigInt, ep: Int, rp: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): BigInt
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate 16.25<sup>2.7</sup>, then the number `base` = 1625, `bp` = 2, and the `exponent` = 27, `ep` = 1.

If the `pow` function returns, for example, 1859105716849757217692, and the parameter `rp` = 18, then the result is 1859.105716849757217692; in the number 1859105716849757217692 the last 18 digits is a fractional part.

### Parameters

| Parameter | Description |
| :--- | :--- |
| `base`: [BigInt](/en/ride/data-types/bigint) | Number `a` without decimal point |
| `bp`: [Int](/en/ride/data-types/int) | Number of decimals of `a` |
| `exponent`: [BigInt](/en/ride/data-types/bigint) | Exponent `b` without decimal point |
| `ep`: [Int](/en/ride/data-types/int) | Number of decimals of `b` |
| `rp`: [Int](/en/ride/data-types/int) | Number of decimals in the resulting value, from 0 to 18 inclusive. Specifies the accuracy of the calculated result |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

## sqrt(Int, Int, Int, Union): Int<a id="sqrt"></a>

Calculates the square root of a number: `√a`.

``` ride
sqrt(base: Int, bp: Int, rp: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): Int
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate √16.25, specify `base` = 1625 and `bp` = 2.

If the `sqrt` function returns, for example, 40311, and the parameter `rp` = 4, then the result is 4.0311; in the number 40311 the last 4 digits is a fractional part.

### Parameters

| Parameter | Description |
| :--- | :--- |
| `base`: [Int](/en/ride/data-types/int) | Number `a` without decimal point |
| `bp`: [Int](/en/ride/data-types/int) | Number of decimals of `a` |
| `rp`: [Int](/en/ride/data-types/int) | Number of decimals in the resulting value, from 0 to 8 inclusive. Specifies the accuracy of the calculated result |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

### Examples

√16,25 = 4,03112887...

```ride
sqrt(1625, 2, 2, HALFUP) # function returns 403, so the result is 4.03
sqrt(1625, 2, 5, HALFUP) # function returns 403113, so the result is 4.03113
```

## sqrt(BigInt, Int, Int, Union): BigInt<a id="sqrtbigint"></a>

Calculates the square root of a number with high accuracy.

``` ride
sqrt(base: BigInt, bp: Int, rp: Int, round: DOWN|CEILING|FLOOR|HALFUP|HALFEVEN): BigInt
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate √16.25, specify `base` = 1625 and `bp` = 2.

If the `sqrt` function returns, for example, 4031128874149274826, and the parameter `rp` = 18, then the result is 4.031128874149274826; in the number 4031128874149274826 the last 18 digits is a fractional part.

### Parameters

| Parameter | Description |
| :--- | :--- |
| `base`: [BigInt](/en/ride/data-types/bigint) | Number `a` without decimal point |
| `bp`: [Int](/en/ride/data-types/int) | Number of decimals of `a` |
| `rp`: [Int](/en/ride/data-types/int) | Number of decimals in the resulting value, from 0 to 18 inclusive. Specifies the accuracy of the calculated result |
| `round`: DOWN&#124;CEILING&#124;FLOOR&#124;HALFUP&#124;HALFEVEN | One of the [rounding variables](#rounding-variables) |

## Rounding Variables

Below is the list of built-in rounding variables. Every variable corresponds to the [rounding method](https://en.wikipedia.org/wiki/Rounding).

The rounding variables are _only_ used as the parameters of functions `fraction`, `log`, `pow`.

| Name | Description |
| :--- | :--- |
| DOWN | Rounds towards zero |
| CEILING | Rounds towards positive infinity |
| FLOOR | Rounds towards negative infinity |
| HALFUP   | Rounds towards the nearest integer; if the integers are equidistant, then rounds away from zero   |
| HALFEVEN | Rounds towards the nearest integer; if the integers are equidistant, then rounds towards the nearest even integer |

### Examples

| Input number/Rounding method | DOWN | CEILING | FLOOR | HALFUP | HALFEVEN |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 5.5 | 5 | 6 | 5 | 6 | 6 |
| 2.5 | 2 | 3 | 2 | 3 | 2 |
| 1.6 | 1 | 2 | 1 | 2 | 2 |
| 1.1 | 1 | 2 | 1 | 1 | 1 |
| 1.0 | 1 | 1 | 1 | 1 | 1 |
| -1.0 | -1 | -1 | -1 | -1 | -1 |
| -1.1 | -1 | -1 | -2 | -1 | -1 |
| -1.6 | -1 | -1 | -2 | -2 | -2 |
| -2.5 | -2 | -2 | -3 | -3 | -2 |
| -5.5 | -5 | -5 | -6 | -6 | -6 |
