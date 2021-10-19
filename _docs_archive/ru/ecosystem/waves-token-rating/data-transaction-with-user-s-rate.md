# Транзакция данных с оценкой пользователя

Когда пользователь оценивает токен в карточке токена, с его [адреса](/ru/blockchain/account/address) отправляется [транзакция данных](/ru/blockchain/transaction-type/data-transaction). 

Пример поля `data` такой транзакции:

```js
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

| Ключ | Тип данных | Значение  |
|---|---|---|
| tokenRating | Строка |  Сервисное поле. <br>Значение должно быть равно "tokenRating" |
| assetId | Строка | ID токена |
| score  |  Целое число | Оценка |
