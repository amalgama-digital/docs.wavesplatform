# FOLD&lt;N&gt; Macro

`FOLD<N>` macro makes it possible to implement operations on a list of values such as `sum`, `filter`, `map`, `zip`, `exists`, etc. The macro behaves like the `fold` or `reduce` function in other programming languages.

```
FOLD<N>(list, start, foldFunc)
```

| Parameter | Description |
| :--- | :--- |
| `N` | Maximum number of iterations, up to 1000 |
| `list` | List of values |
| `start` | Initial value |
| `foldFunc` | Combining function |

The combining function accepts two input parameters: the intermediate result and the next element of the list. Macro `FOLD<N>(list, start, foldFunc)` means:

* execute up to `N` iterations;
* at each iteration: take the result of the previous iteration (at the first iteration take the `start` value) and the next list item `list`, apply the `foldFunc` function to this pair;
* return the final result.

The value of `N` must be known in advance. If there are more elements in the list than specified in FOLD, the script fails.

The complexity of `FOLD<N>` corresponds to the complexity of `foldFunc` multiplied by `N` plus extras.

The `FOLD<N>` macro is a syntactic sugar; it is unwrapped by the compiler. Therefore, in particular, the size of the script increases linearly with `N`.

## Sum

```scala
func sum(accum: Int, next: Int) = accum + next
let arr = [1,2,3,4,5]
FOLD<5>(arr, 0, sum)    # Result: 15
```

> The expression
> 
> ```scala
> FOLD<5>(arr, 0, sum)
> ``` 
> 
> after compiling and decompiling will look like this:
> 
> ```scala
> let $l = arr
> let $s = size($l)
> let $acc0 = 0
> func 1 ($a,$i) =     if (($i >= $s))
>    then $a
>    else sum($a, $l[$i])
>
> func 2 ($a,$i) =     if (($i >= $s))
>    then $a
>    else throw("List size exceeds 5")
>
> 2(1(1(1(1(1($acc0, 0), 1), 2), 3), 4), 5)
> ```
> 
> You can see such a code in Waves Explorer. [Example](https://testnet.wavesexplorer.com/tx/GaLfaidadeowoZ4vMtEVvJK8RkJiqr5AdPWLvPtTnV4e)

## Product

```scala
func mult(accum: Int, next: Int) = accum * next
let arr = [1,2,3,4,5]
FOLD<5>(arr, 1, mult)    # Result: 120
```

## Filter

The following code composes an array consisting only of even elements of the original array.

```scala
func filterEven(accum: List[Int], next: Int) =
   if (next % 2 == 0) then accum :+ next else accum
let arr = [1,2,3,4,5]
FOLD<5>(arr, [], filterEven)    # Result: [2, 4]
```

## Map

The following code inverts the array, reducing each element by 1:

```scala
func map(accum: List[Int], next: Int) = (next - 1) :: accum
let arr = [1, 2, 3, 4, 5]
FOLD<5>(arr, [], map)    # Result: [4, 3, 2, 1, 0]
```
