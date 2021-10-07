# Union

**Union** is a data type that combines two or more data types and represents a value of one of those types. Union can combine primitive types, [lists](/en/ride/data-types/list), [tuples](/en/ride/data-types/tuple), [structures](/en/ride/structures/).

Examples: 

* The type of list items is a union of the types of all items. For example, each element of a list `List[Int|String]` is a string or an integer.

   ```scala
   let aList   = [1, 2, "Waves"]               # List[Int|String]
   let bList   = [true,false]                  # List[Boolean]
   let joined  = aList ++ bList                # List[Boolean|Int|String]
   ```

* An argument type of the function [wavesBalance(Address|Alias): BalanceDetails](/en/ride/functions/built-in-functions/blockchain-functions#waves-balance) is a union of [Address](/en/ride/structures/common-structures/address) and [Alias](/en/ride/structures/common-structures/alias) types. You can call a function with an argument of any of these types.

   ```scala
   wavesBalance(Address(base58'3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7'))
   wavesBalance(Alias("merry"))          # Результат одинаковый
   ```

* A return type of the function [getInteger(Address|Alias, String): Int|Unit](/en/ride/functions/built-in-functions/account-data-storage-functions#get-string) is a union of [Int](/en/ride/v4/data-types/int) and [Unit](/en/ride/data-types/unit) types. The function returns an integer value by key from the data storage of a given account, and if there is no entry with such a key or the value has a different type, the function returns `unit`.

   ```scala
   let addr = Address(base58'3N4iKL6ikwxiL7yNvWQmw7rg3wGna8uL6LU')
   getInteger(addr,"integerVal")         # Возвращает 1
   getInteger(addr,"noKey")              # Возвращает unit
   ```

## Functions and operators

A value of a union type cannot be an argument to a function or operator that requires a particular type. For example, the expression 

```scala
size(getString("key"))
```

causes a compilation error because the argument type of function [size](/en/ride/functions/built-in-functions/string-functions#size-string-int) is `String` and the return type of function [getString](/en/ride/functions/built-in-functions/account-data-storage-functions#getstring-string-unit) is `String|Unit`. You can get a value of `String` type using the [getStringValue](/en/ride/functions/built-in-functions/account-data-storage-functions#getstringvalue-string-string) function.

To get a value of a particular type from a union, you can use:

* [Union functions](/en/ride/functions/built-in-functions/list-functions)
* [match-case operator](/en/ride/operators/match-case)

Example:

```scala
func getAssetName(assetId: ByteVector|Unit) = {
   match assetId {
     case id: ByteVector => assetInfo(id).value().name
     case waves: Unit => "WAVES"
   }
}
```

