---
sidebarDepth: 3
---

# [Ride v6] Fold Functions

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only.

| Name | Description | Complexity |
| :--- | :--- | :--- |
| [fold](#fold) | Range of functions.<br>Implement operations on a list of values | 3–115 |

## fold

Range of fold functions that implement operations on a list of values such as `sum`, `filter`, `map`, `zip`, `exists`, etc. The functions are similar to `fold` or `reduce` functions in other programming languages.

| Name | Max list size | Complexity |
|:---| :--- | :--- |
| fold_20(list: List[A], accumulator: B, function: (B, A) => B): B | 20 | 3 |
| fold_50(list: List[A], accumulator: B, function: (B, A) => B): B | 50 | 7 |
| fold_100(list: List[A], accumulator: B, function: (B, A) => B): B | 100 | 9 |
| fold_200(list: List[A], accumulator: B, function: (B, A) => B): B | 200 | 20 |
| fold_500(list: List[A], accumulator: B, function: (B, A) => B): B | 500 | 56 |
| fold_1000(list: List[A], accumulator: B, function: (B, A) => B): B | 1000 | 115 |

The total complexity of the `fold_<N>` call includes the complexity specified in the table and the complexity of the `function` multiplied by `N`.

`fold_<N>(list, accumulator, function)` means:

* execute up to `N` iterations;
* at each iteration: take the result of the previous iteration (at the first iteration take the `accumulator` value) and the next item of `list`, apply the `function` to this pair;
* return the final result.

If the list contains more than `N` elements, the `fold_<N>` function fails.

| Parameter | Description |
| :--- | :--- |
| `list` | List of values |
| `accumulator` | Initial value |
| `function` | Combining function that accepts two input parameters: the intermediate result and the next element of the list |

## Examples

### Sum

```scala
func sum(accum: Int, next: Int) = accum + next
let arr = [1,2,3,4,5]
fold_20(arr, 0, sum)    # Result: 15
```

### Product

```scala
func mult(accum: Int, next: Int) = accum * next
let arr = [1,2,3,4,5]
fold_20(arr, 1, mult)    # Result: 120
```

### Filter

The following code composes an array consisting only of even elements of the original array.

```scala
func filterEven(accum: List[Int], next: Int) =
   if (next % 2 == 0) then accum :+ next else accum
let arr = [1,2,3,4,5]
fold_20(arr, [], filterEven)    # Result: [2, 4]
```

### Map

The following code inverts the array, reducing each element by 1:

```scala
func map(accum: List[Int], next: Int) = (next - 1) :: accum
let arr = [1, 2, 3, 4, 5]
fold_20(arr, [], map)    # Result: [4, 3, 2, 1, 0]
```

### Zip

The following code brings two lists into one. Every two elements with the same index are joined into a structure, and the result is a list of such structures. Similarly, you can join elements into tuples.

```scala
let keys = ["key1", "key2", "key3"]
let values = ["value1", "value2", "value3"]

func addStringEntry(accum: (List[StringEntry], Int), nextValue: String) =
   {
      let (result, j) = accum
      (result :+ StringEntry(keys[j], nextValue), j + 1)
   }
let r = fold_20(values, ([], 0), addStringEntry)
r._1
```

Here we use a [tuple](/en/ride/data-types/tuple) as an accumulator, which contains two elements:
- the list of [StringEntry](/ru/ride/structures/script-actions/string-entry) structures,
- the current index in all lists.

The combining function `addStringEntry` forms a `StringEntry` structure which contains a key from the `keys` list and a value from the `values` list. The structure is added to the list of structures (the first element of the accumulator tuple). In addition, the combining function increments the index (the second element of the accumulator tuple).

Result:

```scala
[
   StringEntry(
      key = "key1"
      value = "value1"
   ),
   StringEntry(
      key = "key2"
      value = "value2"
   ),
   StringEntry(
      key = "key3"
      value = "value3"
   )
]
```
