# Math functions

| # | Name | Description | Complexity |
|:---| :--- | :--- | :--- |
| 1 | [fraction(Int, Int, Int): Int](#fraction) | Multiplies [integers](/en/ride/data-types/int) `a`, `b` and divides the result by the integer `c` to avoid the integer overflow | 1 |
| 2 | [log(Int, Int, Int, Int, Int, Union): Int](#log)|  Calculates logarithm of the number `a` with the base `b` | 100 |
| 3 | [median(List[Int]): Int](#median)|  Returns the median of a list of integers | 20 |
| 4 | [pow(Int, Int, Int, Int, Int, Union): Int](#pow) | Raises the number `a` to the power `b`| 100 |

## fraction(Int, Int, Int): Int<a id="fraction"></a>

Multiplies [integers](/en/ride/data-types/int) `a`, `b` and divides the result by the integer `c` to avoid the integer overflow.

Fraction `(a × b)/c` should not exceed the maximum value of the integer type 9 223 372 036 854 755 807.

```ride
fraction(value: Int, numerator: Int, denominator: Int): Int
```

### Parameters

#### `value`: [Int](/en/ride/data-types/int)

Integer `a`.

#### `numerator`: [Int](/en/ride/data-types/int)

Integer `b`.

#### `denominator`: [Int](/en/ride/data-types/int)

Integer `c`.

### Conversion formula

Conversion is performed according to the following formula:

```ride
fraction = value × numerator / denominator
```

### Examples

Lets assume that:

a = 100 000 000 000,

b =50 000 000 000 000,

c = 250 0000.

The following formula, with [operators](/en/ride/operators/) `*` and `/`, will throw integer overflow exception:

```ride
let result = a * b # integer overflow, because a * b exceeds max integer type value 9 223 372 036 854 755 807
```

The fraction function with no integer overflow:

```ride
let result = fraction(a, b, c) # result = 2000 000 000 000 000 000
fraction(2,2,3) # Returns 1
fraction(3,3,3) # Returns 3
fraction(3,2,3) # Returns 2
```

## log(Int, Int, Int, Int, Int, Union): Int<a id="log"></a>

Calculates logarithm of the number `a` with the base `b`.

``` ride
log(value: Int, ep: Int, base: Int, bp: Int, rp: Int, round: Union): Int
```

In Ride, there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate `log<sub>2,7</sub>(16,25)` then the number `a` = 1625, and the logarithm base `b` = 27.

If the `log` function returns, for example, 64391, and the parameter of function `rp` = 4, then the result is  — 6,4391; in the number 64391 the last 4 digits (`rp` = 4) — fractional part. The `rp` parameter specifies the calculation accuracy of the result of the function, — number of decimals in the result.

### Parameters

#### `value`: [Int](/en/ride/data-types/int)

Given number without decimals.

For example, if `a` = 2,715, then `value` = 2715; if `a` = 230,9, then `value` = 2309; if `a` = 5, then value = `5`; if `a` = 5,00, then `value` = 500.

#### `ep`: [Int](/en/ride/data-types/int)

Number of decimals of the given number `a`.

For example, if `a` = 2,715, then `ep` = 3; if `a` = 230,9, then `ep` = 1; if `a` = 5, then `ep` = 0; if `a` = 5,00, then `ep` = 2.

#### `base`: [Int](/en/ride/data-types/int)

Logarithm base without the decimals.

#### `bp`: [Int](/en/ride/data-types/int)

Number of decimals of the logarithm base.

#### `rp`: [Int](/en/ride/data-types/int)

Number of decimals in the resulting value. Specifies the accuracy of the calculated result.

The value of the variable can be 0 to 8 integer inclusive.

#### `round`: UP|DOWN|CEILING|FLOOR|HALFUP|HALFDOWN|HALFEVEN

One of the [rounding functions](#rounding-functions).

The `HalfUp()` function may be used as the default value.

### Examples

The value of `log<sub>2,7</sub>(16,25)` equals to 2,807035421: 

```ride
log(1625, 2, 27, 1, 2, HALFUP) # function returns 281, so, the result is: 2,81
log(1625, 2, 27, 1, 5, HALFUP) # function returns 280703542, so, the result is: 2,80704
```

## median(List[Int]): Int<a id="median"></a>

Returns the median of the [list](/en/ride/data-types/list). The list can't be empty, otherwise, the script will be finished with the error.

> The `median` function becomes available since node version 1.2.0, after activation of feature #15 “Ride V4, VRF, Protobuf, Failed transactions”. Versions 1.2.x are currently available on [Stagenet](/en/blockchain/blockchain-network/) only.

```ride
median(arr: List[Int]): Int
```

### Parameters

#### `arr`: [List[Int]](/en/ride/data-types/list)

List of integers.

### Examples

```ride
median([1, 2, 3]) # Returns 2
median([2, 4, 9, 20]) # Returns 6
median([-2, -4, -9, -20]) # Returns -7
```

## pow(Int, Int, Int, Int, Int, Union): Int<a id="pow"></a>

Raises the number `a` to the power `b`.

``` ride
pow(base: Int, bp: Int, exponent: Int, ep: Int, rp: Int, round: Union): Int
```

there is no [data type](/en/ride/data-types/) with the floating point. That is why, for example, when you need to calculate, 16,25<sup>2,7</sup>, then the number `a` = 1625, and the logarithm base `b` = 27.

 If the `pow` function returns, for example, 64391, and the parameter of function `rp` = 4, then the result is  — 6,4391; in the number 64391 the last 4 digits (`rp` = 4) — fractional part. The `rp` parameter specifies the calculation accuracy of the result of the function, — number of decimals in the result.

### Parameters

#### `base`: [Int](/en/ride/data-types/int)

Given number without decimals.

#### `bp`: [Int](/en/ride/data-types/int)

Number of decimals of the given number `a`.

#### `exponent`: [Int](/en/ride/data-types/int)

Power without decimals.

#### `ep`: [Int](/en/ride/data-types/int)

Number of decimals of the power.

#### `rp`: [Int](/en/ride/data-types/int)

Number of decimals of the resulting value. Specifies the accuracy of the calculated result.

The value of the variable can be 0 to 8 integer inclusive.

#### `round`: UP|DOWN|CEILING|FLOOR|HALFUP|HALFDOWN|HALFEVEN

One of the [rounding functions](#rounding-functions).

The `HalfUp()` function may be used as the default value.

### Examples

The value of 16,25<sup>2,7</sup> equals to 1859,1057168497582: 

```ride
pow(1625, 2, 27, 1, 2, HALFUP) # function returns 185911, so, the result is: 1859,11
pow(1625, 2, 27, 1, 5, HALFUP) # function returns 185910572, so, the result is: 1859,10572
```

## Built-in rounding variables

Below is the list of built-in rounding variables. Every variable corresponds to the [rounding method](https://en.wikipedia.org/wiki/Rounding).

The rounding variables are _only_ used as the parameters of functions [log](#log) and [pow](#pow).

|Name | Description |
| :--- | :--- |
| CEILING | Rounds towards positive infinity |
| DOWN | Rounds towards zero |
| FLOOR | Rounds towards negative infinity |
| HALFDOWN | Rounds towards the nearest integer; if the integers are equidistant - rounds towards zero |
| HALFEVEN | Rounds towards the nearest integer; if the integers are equidistant - rounds towards the nearest even integer |
| HALFUP   | Rounds towards the nearest integer; if the integers are equidistant - rounds away from zero   |
| UP | Rounding away from zero |

### Examples

|Input number/Rounding method | UP | DOWN | CEILING | FLOOR | HALFUP | HALFDOWN | HALFEVEN |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 5,5 | 6 | 5 | 6 | 5 | 6 | 5 | 6 |
| 2,5 | 3 | 2 | 3 | 2 | 3 | 2 | 2 |
| 1,6 | 2 | 1 | 2 | 1 | 2 | 2 | 2 |
| 1,1 | 2 | 1 | 2 | 1 | 1 | 1 | 1 |
| 1,0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| -1,0 | -1 | -1 | -1 | -1 | -1 | -1 | -1 |
| -1,1 | -2 | -1 | -1 | -2 | -1 | -1 | -1 |
| -1,6 | -2 | -1 | -1 | -2 | -2 | -2 | -2 |
| -2,5 | -3 | -2 | -2 | -3 | -3 | -2 | -2 |
| -5,5 | -6 | -5 | -5 | -6 | -6 | -5 | -6 |
