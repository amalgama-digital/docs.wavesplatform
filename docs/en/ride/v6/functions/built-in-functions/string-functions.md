# [Ride v6] String functions

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/functions/built-in-functions/string-functions)

| Name | Description | Complexity | 
| :--- | :--- | :--- |
| [contains(String, String): Boolean](#contains-string-string-boolean) | Checks whether the string contains substring | 3 |
| [drop(String, Int): String](#drop-string-int-string) | Returns a given string without the first `n` characters  | 20 |
| [dropRight(String, Int): String](#dropright-string-int-string) | Returns a given string without the last `n` characters | 20 |
| [indexOf(String, String): Int&#124;Unit](#indexof-string-string-int-unit) | Returns the index of the first occurrence of a substring | 3 |
| [indexOf(String, String, Int): Int&#124;Unit](#indexof-string-string-int-int-unit) | Returns the index of the first occurrence of a substring after a certain index | 3 |
| [lastIndexOf(String, String): Int&#124;Unit](#lastindexof-string-string-int-unit) | Returns the index of the last occurrence of a substring | 3 |
| [lastindexOf(String, String, Int): Int&#124;Unit](#lastindexof-string-string-int-int-unit) | Returns the index of the last occurrence of a substring before a certain index | 3 |
| [makeString(List[String], String): String](#makestring-list-string-string-string) | Range of functions.<br>Concatenate list strings adding a separator | 1–11 |
| [size(String): Int](#size-string-int) | Returns the size of a string | 1 |
| [split(String, String): List[String]](#split-string-string-list-string) | Range of functions.<br>Split a string delimited by a separator into a list of substrings | 1–51 |
| [take(String, Int): String](#take) | Takes the first `N` characters from a string | 20 |
| [takeRight(String, Int): String](#take-right) | Takes the last `N` characters from a string | 20 |

## contains(String, String): Boolean

Checks whether the string contains substring.

``` ride
contains(haystack: String, needle: String): Boolean
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `haystack`: [String](/en/ride/data-types/string) | String to search in |
| `needle`: [String](/en/ride/data-types/string) | String to search for |

### Examples

```ride
"hello".contains("hell") # Возвращает true
"hello".contains("world") # Возвращает false
```

## drop(String, Int): String<a id="drop"></a>

Returns a given string without the first `n` characters.

``` ride
drop(xs: String, number: Int): String
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [String](/en/ride/data-types/string) | String |
| `number`: [Int](/en/ride/data-types/int) | Number `N` |

### Examples

```ride
drop("Apple", 0) # Returns "Apple"
drop("Apple", 1) # Returns "pple"
drop("Apple", 3) # Returns "le"
drop("Apple", 5) # Returns an empty string
drop("Apple", 15) # Returns an empty string
```

## dropRight(String, Int): String<a id="drop-right"></a>

Returns a given string without the last `N` characters of a string.

``` ride
dropRight(xs: String, number: Int): String
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [String](/en/ride/data-types/string) | String |
| `number`: [Int](/en/ride/data-types/int) | Number `N` |

### Examples

```ride
dropRight("Apple", 0) # Returns "Apple"
dropRight("Apple", 1) # Returns "Appl"
dropRight("Apple", 3) # Returns "Ap"
dropRight("Apple", 5) # Returns an empty string
dropRight("Apple", 15) # Returns an empty string
```

## indexOf(String, String): Int|Unit<a id="index-of-string"></a>

Returns the index of the first occurrence of a substring.

``` ride
indexOf(str: String, substr: String): Int|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `str`: [String](/en/ride/data-types/string) | String |
| `substr`: [String](/en/ride/data-types/string) | Substring |

### Examples

```ride
indexOf("Apple","ple") # Returns 3
indexOf("Apple","le") # Returns 4
indexOf("Apple","e") # Returns 5
```

## indexOf(String, String, Int): Int|Unit<a id="index-of-string-int"></a>

Returns the index of the first occurrence of a substring after a certain index.

``` ride
indexOf(str: String, substr: String, offset: Int): Int|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `str`: [String](/en/ride/data-types/string) | String |
| `substr`: [String](/en/ride/data-types/string) | Substring |
| `offset`: [Int](/en/ride/data-types/int) | Index |

### Examples

```ride
indexOf("Apple","ple", 1) # Returns 2
indexOf("Apple","le", 2) # Returns 3
indexOf("Apple","e", 3) # Returns 4
```

## lastIndexOf(String, String): Int|Unit

Returns the index of the last occurrence of a substring.

``` ride
lastIndexOf(str: String, substr: String): Int|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `str`: [String](/en/ride/data-types/string) | String |
| `substr`: [String](/en/ride/data-types/string) | Substring |

### Examples

```ride
lastIndexOf("Apple","pp") # Returns 1
lastIndexOf("Apple","p") # Returns 2
lastIndexOf("Apple","s") # Returns unit
```

## lastIndexOf(String, String, Int): Int|Unit

Returns the index of the last occurrence of a substring before a certain index.

``` ride
lastIndexOf(str: String, substr: String, offset: Int): Int|Unit
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `str`: [String](/en/ride/data-types/string) | String |
| `substr`: [String](/en/ride/data-types/string) | Substring |
| `offset`: [Int](/en/ride/data-types/int) | Index |

### Examples

```ride
lastIndexOf("mamamama","ma",4) # Returns 4
lastIndexOf("mamamama","ma",3) # Returns 2
```

## makeString(List[String], String): String

Range of functions. Concatenate list strings adding a separator.

```ride
makeString_1С(arr: List[String], separator: String): String
makeString_2С(arr: List[String], separator: String): String
makeString(arr: List[String], separator: String): String
```

| Name | Limitations | Complexity |
|:---| :--- | :--- |
| makeString_1С | Input list up to 70 elements; result up to 500 bytes | 1 |
| makeString_2С | Input list up to 100 elements; result up to 6000 bytes | 2 |
| makeString | — | 11 |

### Parameters

| Parameter | Description |
| :--- | :--- |
| `arr`: [List](/en/ride/data-types/list)[[String](/en/ride/data-types/string)] | List of strings to concatenate |
| `separator`: [String](/en/ride/data-types/string) | Separator |

### Example

```ride
makeString(["Apple","Orange","Mango"], " & ") # Returns "Apple & Orange & Mango"
```

## size(String): Int<a id="size"></a>

Returns the size of a string.

``` ride
size(xs: String): Int
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [String](/en/ride/data-types/string) | String |

### Examples

```ride
size("Ap") # Returns 2
size("Appl") # Returns 4
size("Apple") # Returns 5
```

## split(String, String): List[String]<a id="split"></a>

Range of functions. Split a string delimited by a separator into a list of substrings.

``` ride
split_1С(str: String, separator: String): List[String]
split_4С(str: String, separator: String): List[String]
split(str: String, separator: String): List[String]
```

| Name | Limitations | Complexity |
|:---| :--- | :--- |
| split_1С | Input string up to 500 bytes; result up to 20 elements | 1 |
| split_4С | Input string up to 6000 bytes; result up to 100 elements | 4 |
| split | — | 51 |

### Parameters

| Parameter | Description |
| :--- | :--- |
| `str`: [String](/en/ride/data-types/string) | String |
| `separator`: [Int](/en/ride/data-types/int) | Separator |

### Examples

```ride
split("A.p.p.l.e", ".") # Returns ["A", "p", "p", "l", "e"]
split("Apple", ".") # Returns ["Apple"]
split("Apple", "") # Returns ["A", "p", "p", "l", "e"]
split("Ap.ple", ".") # Returns ["Ap","ple"]
```

## take(String, Int): String<a id="take"></a>

Takes the first `N` characters from a string.

``` ride
take(xs: String, number: Int): String
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [String](/en/ride/data-types/string) | String |
| `number`: [Int](/en/ride/data-types/int) | Number `N` |

### Examples

```ride
take("Apple", 0) # Returns an empty string
take("Apple", 1) # Returns "A"
take("Apple", 3) # Returns "App"
take("Apple", 5) # Returns "Apple"
take("Apple", 15) # Returns "Apple"
take("Apple", -10) # Returns an empty string
```

## takeRight(String, Int): String<a id="take-right"></a>

Takes the last `n` characters from a string.

``` ride
takeRight(xs: String, number: Int): String
```

### Parameters

| Parameter | Description |
| :--- | :--- |
| `xs`: [String](/en/ride/data-types/string) | String |
| `number`: [Int](/en/ride/data-types/int) | Number `N` |

### Examples

```ride
takeRight("Apple", 0) # Returns an empty string
takeRight("Apple", 1) # Returns "A"
takeRight("Apple", 3) # Returns "ple"
takeRight("Apple", 5) # Returns "Apple"
takeRight("Apple", 15) # Returns "Apple"
```
