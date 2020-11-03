# Expression

An **expression** is a combination of one or more [constants](/en/ride/constants), [variables](/en/ride/variables/), [operators](/en/ride/operators/) and [function](/en/ride/functions/) _calls_.

Ride interprets the expression and calculates its _result_.

## Expression result

An **expression result** is a value, which is obtained by the [fold](https://en.wikipedia.org/wiki/Fold_%28higher-order_function%29) of the [syntactic tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of the expression.

## Expression type

An **expression type** is a [data type](/en/ride/data-types/) of the expression result.

## Examples

The expression that consists of a single constant.

``` ride
7
```

The expression that consists of a single variable.

``` ride
x
```

The expression that consists of the constant `7`, operators `+` and `*`, variable `x` and the `size` function call.

``` ride
7 + x * size("apple")
```
