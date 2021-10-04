# Any

`Any` is an arbitrary data type. It is a common supertype of all types: an `Any` type value can be a string, a number, `unit`, a structure, a list, a tuple, etc.

If the particular type is known in advance, you can cast the value to that type using macros:

* `as[T]`: returns a value of type `T`; if the value does not match the type, returns `unit`.
* `exactAs[T]`: returns a value of type `T`; if the value does not match the type, fails.

Examples:

* The value is of a base type:

   ```scala
   func f1(a: Any) = a.as[Int]
   f1(10).value() + 1                      # Returns 11
   f1("Waves").isDefined()                 # Возвращает false
   ```

* The value is a tuple:

   ```scala
   func f2(a: Any) = a.exactAs[(Int,String)]
   f2((11,"Ride"))._2 + " the Waves!"      # Returns "Ride the Waves!"
   f2(true)                                # Fails
   ```

* The value is a list:

   ```scala
   func f3(a: Any) = a.exactAs[List[Any]]
   f3([12,"Ride"])[0].exactAs[Int]         # Returns 12
   f3(88)                                  # Fails
   ```

In the following example, the `second` function returns the value used by the `first` function (see [dApp-to-dApp Invocation](/en/ride/advanced/dapp-to-dapp)):

```scala
{-# STDLIB_VERSION 5 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

@Callable(i)
func first() = {
  strict d = invoke(this,"second",[],[])
  [
    IntegerEntry("key",d.exactAs[Int])
  ]
}

@Callable(i)
func second() = {
  ( [], 42 )
}
```

If the particular type of the `Any` is not known in advance, you can spot it using the [match-case](/en/ride/operators/match-case) operator.

Example:

```scala
func findString(a: Any) = {
  match a {
    case a: String => a
    case a: List[Any] =>
      match a[0] {
        case b: String => b
        case _ => throw("Data is not a string")
      }
    case _ => throw("Data is not a string")
  }
}
```
