# BalanceDetails

Structure that contains WAVES balances of account. The structure is returned by the [wavesBalance](/en/ride/functions/built-in-functions/blockchain-functions#waves-balance) built-in function. For description of balance types, see the [Account Balance](/en/blockchain/account/account-balance) article.

## Constructor

``` ride
BalanceDetails(available: Int, regular: Int, generating: Int, effective: Int)
```

## Fields

|   #   | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | available | [Int](/en/ride/data-types/int) | Available balance |
| 2 | regular | [Int](/en/ride/data-types/int) | Regular balance |
| 3 | generating | [Int](/en/ride/data-types/int) | Generating balance |
| 4 | effective | [Int](/en/ride/data-types/int) | Effective balance |

All balances are given in [WAVELETs](/en/blockchain/token/waves).
