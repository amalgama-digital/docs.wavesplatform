# Data transaction with user's rate

When a user rates a token inside the token's card, a [data transaction](/en/blockchain/transaction-type/data-transaction) is sent from the user's [address](/en/blockchain/account/address).

An example of the `data` field of such a transaction:

```
"data": [
  {
    "key": "tokenRating",
    "type": "string",
    "value": "tokenRating"
  },
  {
    "key": "assetId",
    "type": "string",
    "value": "BrjUWjndUanm5VsJkbUip8VRYy6LWJePtxya3FNv4TQa"
  },
  {
    "key": "score",
    "type": "integer",
    "value": 4
  }
]
```

| Key | Data type | Value  |
|---|---|---|
| tokenRating | String |  Service field. <br>The value must be "tokenRating" |
| assetId | String | ID of the token |
| score  |  Integer | Rate |
