# [Ride v6] Fold Functions

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only.

| Name | Description | Complexity |
| :--- | :--- | :--- |
| [fold](#fold) | Range of functions.<br>Implement operations on a list of values | 3–115 |

## fold

Range of fold functions that implement operations on a list of values such as `sum`, `filter`, `map`, `zip`, `exists`, etc. The functions are similar to the `fold` or `reduce` functions in other programming languages.

| Name | Max list size | Complexity |
|:---| :--- | :--- |
| fold_20(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 3 |
| fold_50(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 7 |
| fold_100(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 9 |
| fold_200(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 20 |
| fold_500(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 56 |
| fold_1000(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 115 |

The total complexity of the `fold_<N>` call includes the complexity specified in the table and the complexity of the `function` multiplied by `N`.

`fold_<N>(list, accumulator, function)` means:

* execute up to `N` iterations;
* at each iteration: take the result of the previous iteration (at the first iteration take the `accumulator` value) and the next list item `list`, apply the `function` function to this pair;
* return the final result.

If the list contains more than `N` elements, the `fold_<N>` function fails.

| Parameter | Description |
| :--- | :--- |
| `list` | List of values |
| `accumulator` | Initial value |
| `function` | Combining function that accepts two input parameters: the intermediate result and the next element of the list |

### Examples

#### Sum

```scala
func sum(accum: Int, next: Int) = accum + next
let arr = [1,2,3,4,5]
fold_20(arr, 0, sum)    # Result: 15
```

## Product

```scala
func mult(accum: Int, next: Int) = accum * next
let arr = [1,2,3,4,5]
fold_20(arr, 1, mult)    # Result: 120
```

## Filter

The following code composes an array consisting only of even elements of the original array.

```scala
func filterEven(accum: List[Int], next: Int) =
   if (next % 2 == 0) then accum :+ next else accum
let arr = [1,2,3,4,5]
fold_20(arr, [], filterEven)    # Result: [2, 4]
```

## Map

The following code inverts the array, reducing each element by 1:

```scala
func map(accum: List[Int], next: Int) = (next - 1) :: accum
let arr = [1, 2, 3, 4, 5]
fold_20>(arr, [], map)    # Result: [4, 3, 2, 1, 0]
```
