# List

`List` is a list data type.

The list may contain elements of various types, including nested lists.

The maximim number of list items is 1000. The nesting depth is not limited. For weight restrictions, see the [Data Weight](/en/ride/limits/weight) article.

## List Operations

Lists support [concatenation](https://en.wikipedia.org/wiki/Concatenation), as well as adding items to the beginning and the end.

| Operation  | Symbol  | Complexity |
|---|---|---|
| Concatenation  | ++ | 4 |
| Adding the element to the end of the list (the list is on the left, the element is on the right) | :+ | 1 |
| Adding the element to the beginning of the list (the element is on the left, the list is on the right) | :: | 2 |

#### Examples

```ride
nil :+ 1 :+ 2 :+ 3
```

Result: [1, 2, 3]

```ride
1 :: 2 :: 3 :: nil
```

Result: [1, 2, 3]

```ride
let intList  = [1, 2]             # List[Int]
let strList  = ["3", "4"]         # List[String]
let joined   = intList ++ strList # List[Int|String]
joined
```

Result: [1, 2, "3", "4"]

```ride
let appended = joined :+ true     # List[Boolean|Int|String]
appended
```

Result: [1, 2, "3", "4", true]

```ride
let nested    = intList :: joined  # List[Int|List[Int]|String]
nested
```

Result: [[1, 2], 1, 2, "3", "4"]

## List Functions

The built-in list functions are presented in the [List Functions](/en/ride/functions/built-in-functions/list-functions) article.

Operations on a list can be implemented via the [FOLD<N>](/ru/ride/fold-macro) macro. The size of the list must be known in advance.

## List As Function Argument

A list, including nested one, can be a function argument:

```scala

func foo(arg: List[String|Unit]) = {
...
}

foo(["Ride","Waves",unit])
```

```scala
func bar(arg: List[List[Int]]) = {
...
}

bar([[1],[],[5,7]])
```

A callable function can take a list as an argument, but nested lists are not allowed:

```scala
@Callable(i)
func join(strings: List[String|Int]) = {
   let a = match strings[0] {
      case n:Int => toString(n)
      case s:String => s
   }
   let b = match strings[1] {
      case n:Int => toString(n)
      case s:String => s
   }
   let c = match strings[2] {
      case n:Int => toString(n)
      case t:String => t
   }
 
   [
      StringEntry(toBase58String(i.caller.bytes), a + "_" + b + "_" + c)
   ]
}
```

Invoke Script transaction example:

```json
{
   "type": 16,
   ...
   "call": {
      "function": "join",
      "args": [
         {
            "type": "list",
            "value": [
               {
                  "type": "string",
                  "value": "Ride"
               },
               {
                  "type": "integer",
                  "value": 5
               },
               {
                  "type": "string",
                  "value": "Waves"
               }
            ]
         }
      ]
   },
   ...
}
```
