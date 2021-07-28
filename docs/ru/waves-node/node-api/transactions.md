# Работа с транзакциями в REST API ноды

> Прежде чем начать, рекомендуем ознакомиться с разделом [Транзакция](/ru/blockchain/transaction/).

## Шаг 1 (необязательный). Вычисление комиссии

[Минимальная комиссия](/ru/blockchain/transaction/transaction-fee) за транзакцию зависит от типа транзакции, наличия скрипта на аккаунте отправителя, использования смарт-ассетов, размера данных, выполняемых вызываемым скриптом действий и т. п.

Для расчета минимальной комиссии можно использовать метод [POST /transactions/calculateFee](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/calculateFee_1). В теле запроса укажите данные транзакции в JSON, включая `type` и `senderPublicKey`. Если требуется подсчитать комиссию в спонсорском ассете, укажите в теле запроса поле `feeAssetId`. Поля `sender` и `fee` игнорируются.

Пример запроса:

```bash
curl -X POST "https://nodes-testnet.wavesnodes.com/transactions/calculateFee"\
  -H "Content-Type: application/json"\
  -d '{"type":16,"senderPublicKey":"YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS","call":{"function":"deposit","args":[]},"payment":[{"amount":300000000,"assetId":null}],"dApp":"3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk"}'
```

Тело запроса:

```json
{
  "type": 16,
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "call": {
    "function": "deposit",
    "args": []
  },
  "payment": [{
     "amount": 300000000,
     "assetId": null
  }],
  "dApp": "3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk"
}
```

Пример ответа:

```json
{
  "feeAssetId": null,
  "feeAmount": 500000
}
```

## Шаг 2. Подписание транзакции

:warning: Подписать транзакцию можно только от имени аккаунта, который присутствует в [кошельке ноды](/ru/waves-node/how-to-work-with-node-wallet). Если вы не владелец ноды или хотите подписать транзакцию от имени аккаунта не из кошелька ноды, используйте для подписания транзакции [клиентские библиотеки](/ru/building-apps/waves-api-and-sdk/client-libraries/). См. также разделы [Безопасное подписание транзакций](/ru/building-apps/#безопасное-подписание-транзакций), [Как создать транзакцию и отправить ее на блокчейн](/ru/building-apps/how-to/basic/transaction).

Для генерации подписи предназначены методы:

* [POST /transactions/sign](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/sign) — подписание транзакции от имени аккаунта из поля `sender` транзакции.
* [POST /transactions/sign/{signerAddress}](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/signWithSigner_1) — подписание транзакции от имени указанного аккаунта.

> Методы не подходят для транзакций обмена и транзакций обновления информации ассета.

Методы являются приватными, для их вызова необходим [API-ключ](/ru/waves-node/node-api/api-key). В теле запроса укажите данные транзакции в JSON, включая `type` и `sender`. Если не указано поле `timestamp`, используется текущее время ноды. Поле `senderPublicKey` игнорируется.


Методы возвращают подписанную транзакцию в формате JSON. Тело ответа можно передать в качестве тела запроса в методы [POST /debug/validate](https://nodes.wavesnodes.com/api-docs/index.html#/debug/validate), [POST /transactions/broadcast](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/signedBroadcast_1) (см. следующие шаги).

Пример запроса:

```bash
curl -X POST "http://127.0.0.1:6869/transactions/sign"\
  -H "X-API-Key: my-api-key"\
  -H "Content-Type: application/json"\
  -d '{"type":16,"sender":"3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT","call":{"function":"deposit","args":[]},"payment":[{"amount":300000000,"assetId":null}],"dApp":"3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk","feeAssetId":null,"fee":500000}'
```

Тело запроса:

```json
{
  "type": 16,
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "call": {
    "function": "deposit",
    "args": []
  },
  "payment": [{
    "amount":300000000,
    "assetId":null
  }],
  "dApp": "3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk",
  "feeAssetId": null,
  "fee":500000
}
```

Пример ответа:

```
{
  "type": 16,
  "id": "FZp47sYFC4BXKfJqRQrcYNJQmaNiD3YSxMQk9XJtyEMN",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 500000,
  "feeAssetId": null,
  "timestamp": 1603966204510,
  "proofs": [
    "R3QeLwQL7LFzMxd2vBGw7f9P73SgMLBPMh5FkuQLMzBtkoi6PCzhtRLMw9PpjSKVDbHgVEMPDn9BQYjEKZpeDPZ"
  ],
  "version": 1,
  "dApp": "3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk",
  "payment": [
    {
      "amount": 300000000,
      "assetId": null
    }
  ],
  "call": {
    "function": "deposit",
    "args": []
  }
}
```

Примеры запросов и ответов для подписания различных типов транзакций (только тело HTTP-сообщения):

<details><summary>Выпуск токена</summary>
<p>Запрос:<p>
 <pre class="language-json"><code>
{
   "type": 3,
   "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
   "fee": 100000000,
   "name": "My awesome asset",
   "quantity": 100000000000,
   "description": "Some description",
   "decimals": 8,
   "reissuable": true
}
</code></pre>

<p>Ответ:<p>
 <pre class="language-json"><code>
{
  "type": 3,
  "id": "3P2bbWLmTSGjMR3QndmsjoK8qfoFmF8WS3CZgBa9oXAT",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000000,
  "feeAssetId": null,
  "timestamp": 1603800170840,
  "proofs": [
    "3AwKNaYkqVQiGe7t8ja4Uedu7Fej1dYxj2pWQ6cWTtSp25Txxd4amGBBbGSwGe6vpmHgcqt8sMnyVFBf3qiMRYM6"
  ],
  "signature": "3AwKNaYkqVQiGe7t8ja4Uedu7Fej1dYxj2pWQ6cWTtSp25Txxd4amGBBbGSwGe6vpmHgcqt8sMnyVFBf3qiMRYM6",
  "version": 1,
  "assetId": "3P2bbWLmTSGjMR3QndmsjoK8qfoFmF8WS3CZgBa9oXAT",
  "name": "My awesome asset",
  "quantity": 100000000000,
  "reissuable": true,
  "decimals": 8,
  "description": "Some description"
}
</code></pre>

</details>

<details><summary>Довыпуск токена</summary>
<p>Запрос:<p>
 <pre class="language-json"><code>
{
  "type": 5,
  "quantity": 22300000,
  "assetId": "3P2bbWLmTSGjMR3QndmsjoK8qfoFmF8WS3CZgBa9oXAT",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "reissuable": true,
  "fee": 100000
}
</code></pre>

<p>Ответ:<p>
 <pre class="language-json"><code>
{
  "type": 5,
  "id": "GPCpzoBHLB8DwAhnHqKBGMYXtHCBTbnvcd926b71PjcM",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000,
  "feeAssetId": null,
  "timestamp": 1603800874579,
  "proofs": [
    "3YpxnYvLGYycPW5xjTr2XjKYFEz4ueNBddgS8L77H1T4RjPkhyBjoXn4cdKdsLrt9covjWtAyCUyLfcRDXVYC8Nf"
  ],
  "signature": "3YpxnYvLGYycPW5xjTr2XjKYFEz4ueNBddgS8L77H1T4RjPkhyBjoXn4cdKdsLrt9covjWtAyCUyLfcRDXVYC8Nf",
  "version": 1,
  "assetId": "3P2bbWLmTSGjMR3QndmsjoK8qfoFmF8WS3CZgBa9oXAT",
  "quantity": 22300000,
  "reissuable": true
}
</code></pre>

</details>

<details><summary>Сжигание токена</summary>
<p>Запрос:<p>
 <pre class="language-json"><code>
{
  "type": 6,
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "fee": 100000,
  "assetId": "AP5dp4LsmdU7dKHDcgm6kcWmeaqzWi2pXyemrn4yTzfo",
  "amount": 50000
}
</code></pre>

<p>Ответ:<p>
 <pre class="language-json"><code>
{
  "type": 6,
  "id": "DucNGQJBRpXenfSgarCkR3DUYuQj5MMr1TW1ABfCUc3t",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000,
  "feeAssetId": null,
  "timestamp": 1603801004117,
  "proofs": [
    "4rFoAFvkpijj2kqSaxCmiYFkR1WNCTrN8ptH1aZpQSTCq8bTcHUNTFvpkfPKcpERiGp1jEW7MfxG3N3Bog48GLVN"
  ],
  "signature": "4rFoAFvkpijj2kqSaxCmiYFkR1WNCTrN8ptH1aZpQSTCq8bTcHUNTFvpkfPKcpERiGp1jEW7MfxG3N3Bog48GLVN",
  "version": 1,
  "assetId": "AP5dp4LsmdU7dKHDcgm6kcWmeaqzWi2pXyemrn4yTzfo",
  "amount": 50000
}
</code></pre>
</details>

<details><summary>Перевод токена</summary>
<p>Запрос:<p>
 <pre class="language-json"><code>
{
  "type": 4,
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
  "fee": 100000,
  "amount": 55000000,
  "attachment": "BJa6cfyGUmzBFTj3vvvaew"
}
</code></pre>

<p>Ответ:<p>
 <pre class="language-json"><code>
{
  "type": 4,
  "id": "GGwwGp1LcjeTVCxbMG8moWnoWcEk2cEaXGnModccTqNK",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000,
  "feeAssetId": null,
  "timestamp": 1603801131797,
  "proofs": [
    "3ZirDPKF5kiVvtP4vLyDrmuGch1QU6jv5agqHAV37Efzsim992Y9DBRK7UZnaD4TB34JTGn4xPSCJ8c1dUBXSYiZ"
  ],
  "signature": "3ZirDPKF5kiVvtP4vLyDrmuGch1QU6jv5agqHAV37Efzsim992Y9DBRK7UZnaD4TB34JTGn4xPSCJ8c1dUBXSYiZ",
  "version": 1,
  "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "feeAsset": null,
  "amount": 55000000,
  "attachment": "BJa6cfyGUmzBFTj3vvvaew"
}
</code></pre>

</details>

<details><summary>Массовый перевод</summary>
<p>Запрос:<p>
 <pre class="language-json"><code>
{
  "type": 11,
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "fee" : 200000,
  "assetId" : null,
  "attachment" : "59QuUcqP6p",
  "transfers" : [ {
    "recipient" : "3NCpyPuNzUaB7LFS4KBzwzWVnXmjur582oy",
    "amount" : 100000000
  }, {
    "recipient" : "3N4RfbJ3CH8x77UNd61ufSiwg1BHBHoec74",
    "amount" : 200000000
  } ]
}
</code></pre>

<p>Ответ:<p>
 <pre class="language-json"><code>
{
  "type": 11,
  "id": "7M3ckLwiyuiJNsfhsxCahmRt9Q1nrsgP2MMUqQL2YSpu",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 200000,
  "feeAssetId": null,
  "timestamp": 1603801437593,
  "proofs": [
    "STaYrxE5Wk83XtumYGPu7yfbbAHm1R76w9PjyPjNBV9vXJR1h93oTHEP8Z9CLeTYUNZpLMBae3mmPicxyckUwf6"
  ],
  "version": 1,
  "assetId": null,
  "attachment": "59QuUcqP6p",
  "transferCount": 2,
  "totalAmount": 300000000,
  "transfers": [
    {
      "recipient": "3NCpyPuNzUaB7LFS4KBzwzWVnXmjur582oy",
      "amount": 100000000
    },
    {
      "recipient": "3N4RfbJ3CH8x77UNd61ufSiwg1BHBHoec74",
      "amount": 200000000
    }
  ]
}
</code></pre>
</details>


<details><summary>Лизинг</summary>
<p>Запрос:<p>
 <pre class="language-json"><code>
{
  "type": 8,
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "fee": 100000,
  "amount": 500000000,
  "recipient": "3MsiqWCW2b42CiCpz9mjYXXJPZ1YN4bBsex"
}
</code></pre>
<p>Ответ:<p>
<pre class="language-json"><code>
{
  "type": 8,
  "id": "EStUvNzQC2tKZrZoAcgLteq8zcABYMHXjTBjs46L9WdT",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000,
  "feeAssetId": null,
  "timestamp": 1603794794973,
  "proofs": [
    "2SfpDto35Ta78jfRCKdLpYXpVEv8FVTXvTpjhyqHvd6CJS2SBZ7Jxjw6a2Ty1SysaFcwY9rFwHYK9vWjtUz62fDT"
  ],
  "signature": "2SfpDto35Ta78jfRCKdLpYXpVEv8FVTXvTpjhyqHvd6CJS2SBZ7Jxjw6a2Ty1SysaFcwY9rFwHYK9vWjtUz62fDT",
  "version": 1,
  "amount": 500000000,
  "recipient": "3MsiqWCW2b42CiCpz9mjYXXJPZ1YN4bBsex"
}
</code></pre>
</details>

<details><summary>Отмена лизинга</summary>
<p>Запрос:<p>
<pre class="language-json"><code>
{
  "type": 9,
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "fee": 100000,
  "leaseId": "EStUvNzQC2tKZrZoAcgLteq8zcABYMHXjTBjs46L9WdT"
}
</code></pre>

<p>Ответ:<p>
 <pre class="language-json"><code>
{
  "type": 9,
  "id": "2pSaHnJJfg4Nbkas9bRQR7AAtPUJSAwFfRppemkhuhh2",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000,
  "feeAssetId": null,
  "timestamp": 1603795159001,
  "proofs": [
    "xEhNg4HEYLBr9k3mM8iEhKeyD7F7uHVvr5zusNzXJVoLa3d9R1Dn9trjaXvjGLsPVnpQe9pTDtxCennvMZ12Gfk"
  ],
  "signature": "xEhNg4HEYLBr9k3mM8iEhKeyD7F7uHVvr5zusNzXJVoLa3d9R1Dn9trjaXvjGLsPVnpQe9pTDtxCennvMZ12Gfk",
  "version": 1,
  "leaseId": "EStUvNzQC2tKZrZoAcgLteq8zcABYMHXjTBjs46L9WdT"
}
</code></pre>
</details>


<details><summary>Создание псевдонима</summary>
<p>Запрос:<p>
<pre class="language-json"><code>
{
  "type": 10,
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "fee": 100000,
  "alias": "my-interesting-name"
}
</code></pre>

<p>Ответ:</p>
<pre class="language-json"><code>
{
  "type": 10,
  "id": "GWdGQtoDxQvKS3WDAvYUVtA6pdvt38HUBz6tSq7M5JVp",
  "sender": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
  "senderPublicKey": "YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",
  "fee": 100000,
  "feeAssetId": null,
  "timestamp": 1603794108196,
  "proofs": [
    "4UWDu4eAqMVQT2a4UPYuFNr1ipEWS9ccfJNCsM2Wf9oapsZRS6fYm95BD17h9stKPLACaNSQ7eBEvFQL8TqdAnGc"
  ],
  "signature": "4UWDu4eAqMVQT2a4UPYuFNr1ipEWS9ccfJNCsM2Wf9oapsZRS6fYm95BD17h9stKPLACaNSQ7eBEvFQL8TqdAnGc",
  "version": 1,
  "alias": "my-interesting-name"
}
</code></pre>
</details>

## Шаг 3 (необязательный). Предварительная валидация транзакции

Подписанную транзакцию можно сразу же отправить на блокчейн. Однако с момента активации фичи № 15 “Ride V4, VRF, Protobuf, Failed transactions” некоторые транзакции могут оказаться неуспешными, при этом отправитель все равно заплатит комиссию (подробнее в разделе [Валидация транзакции](/ru/blockchain/transaction/transaction-validation):
* Транзакция вызова скрипта — в случае ошибки выполнения вызываемого dApp-скрипта после того как сложность уже выполненных вычислений превысила порог для сохранения неуспешных транзакций.
* Транзакция вызова скрипта или транзакция обмена, в которых участвует смарт-ассет, — в случае если скрипт ассета отклонил транзакцию.

Для таких транзакций можно использовать предварительную валидацию, чтобы уменьшить неоправданные расходы. Не следует предварительно валидировать транзакции других типов, а также транзакции, в которых сложность вызываемой функции меньше пороговой, а смарт-ассеты не используются.

Валидация проверяет, будет ли транзакция выполнена успешно при текущем состоянии блокчейна. К моменту отправки состояние блокчейна может измениться, поэтому предварительная валидация не гарантирует успех.

Для предварительной валидации транзакции используйте публичный метод [POST /debug/validate](https://nodes.wavesnodes.com/api-docs/index.html#/debug/validate). В тело запроса вставьте подписанную транзакцию в формате JSON — например, тело ответа из шага 2.

Результат валидации представлен в ответе в поле `valid`. Если транзакция не прошла валидацию, причина ошибки указана в поле `error`.

<details><summary>Пример запроса</summary>
<pre class="language-bash"><code>
curl -X POST "https://nodes-testnet.wavesnodes.com/debug/validate"\
  -H "Content-Type: application/json"\
  -d '{\
  "type":16,\
  "id":"FZp47sYFC4BXKfJqRQrcYNJQmaNiD3YSxMQk9XJtyEMN",\
  "sender":"3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",\
  "senderPublicKey":"YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",\
  "fee":500000,\
  "feeAssetId":null,\
  "timestamp":1603966204510,\
  "proofs":["R3QeLwQL7LFzMxd2vBGw7f9P73SgMLBPMh5FkuQLMzBtkoi6PCzhtRLMw9PpjSKVDbHgVEMPDn9BQYjEKZpeDPZ"],\
  "version":1,\
  "dApp":"3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk",\
  "payment":[{"amount":300000000,"assetId":null}],\
  "call":{"function":"deposit","args":[]}\
  }'
</code></pre>
</details>

<details><summary>Пример ответа в случае успешной валидации</summary>
 <pre class="language-json"><code>
{
  "valid": true,
  "validationTime": 10,
  "trace": [
    {
      "dApp": "3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk",
      "function": "deposit",
      "args": [],
      "result": {
        "actions": [
          {
            "key": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",
            "value": 600000000,
            "type": "dataItem"
          }
        ],
        "vars": [
          {
            "name": "i",
            "value": "Invocation(\n\tpayments = [AttachedPayment(\n\tamount = 300000000\n\tassetId = Unit\n)]\n\tcallerPublicKey = base58'YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS'\n\tfeeAssetId = Unit\n\ttransactionId = base58'FZp47sYFC4BXKfJqRQrcYNJQmaNiD3YSxMQk9XJtyEMN'\n\tcaller = Address(\n\t\tbytes = base58'3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT'\n\t)\n\tfee = 500000\n)"
          },
          {
            "name": "pmt",
            "value": "AttachedPayment(\n\tamount = 300000000\n\tassetId = Unit\n)"
          },
          {
            "name": "@p",
            "value": "true"
          },
          {
            "name": "currentKey",
            "value": "3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT"
          },
          {
            "name": "this",
            "value": "Address(\n\tbytes = base58'3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk'\n)"
          },
          {
            "name": "$match0",
            "value": "300000000"
          },
          {
            "name": "a",
            "value": "300000000"
          },
          {
            "name": "currentAmount",
            "value": "300000000"
          },
          {
            "name": "newAmount",
            "value": "600000000"
          }
        ]
      }
    }
  ]
}
</code></pre>
</details>

<details><summary>Пример ответа в случае ошибки</summary>
 <pre class="language-json"><code>
{
  "valid": false,
  "validationTime": 13,
  "trace": [
    {
      "dApp": "3N4NS7d4Jo9a6F14LiFUKKYVdUkkf2eP4Zx",
      "function": "finalizeCurrentPrice",
      "args": [
        "3349803",
        "4do4rns1wYViDz2ebFXVZ31Bc2gRi8jT9TqLaq7HZGNWQDetCoUjZwcrRbbaUU7j5mJaKXx9uQj2BpG6BGD6mtVK",
        "3349803",
        "4jnxoCVKPpNyQD6zqSDz9HmYQyyxvCUdeq5rY1CdiEnh2MkHtUoNJuRDMDc56R2AUaTPdDgzSYsUWAtRpQm78f36",
        "3349803",
        "49bMpgqbjLGwf4kszH11xyCiztoeTKWWeo22sdizwrgcj1dYKXextzrRGfVWV2DpEhKmKxfSHyZ7RhB2eCDgjCMu",
        "3349803",
        "4cCRstr5c69gT7otZvVgzGDRwzi2MfGFusKmUaUsATw65qjJz7hbDbJssQzEhxfHxDQkhY5Sn1oJiMmRCahxfVDz",
        "3349803",
        "65EqRPVDQzCd7xgZVZhEHgJGb6U1FYacSA3EwrgVtLovNNXak7wVRg5E79UxJYEYkL3gyT1Q15CeYWUc3tJq8bfg"
      ],
      "error": {
        "type": "Account",
        "vars": [
          {
            "name": "this",
            "value": "Address(\n\tbytes = base58'3N4NS7d4Jo9a6F14LiFUKKYVdUkkf2eP4Zx'\n)"
          },
          {
            "name": "@value",
            "value": "false"
          },
          {
            "name": "isBlocked",
            "value": "false"
          },
          {
            "name": "height",
            "value": "1239024"
          },
          {
            "name": "@alternative",
            "value": "0"
          },
          {
            "name": "@b",
            "value": "0"
          },
          {
            "name": "@p",
            "value": "true"
          },
          {
            "name": "@value",
            "value": "57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv"
          },
          {
            "name": "pubKeyOracles",
            "value": "57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv,57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv"
          },
          {
            "name": "pubKeyOraclesList",
            "value": "[\"57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv\", \"57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv\", \"57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv\", \"57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv\", \"57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv\"]"
          },
          {
            "name": "i",
            "value": "Invocation(\n\tpayments = []\n\tcallerPublicKey = base58'BvJEWY79uQEFetuyiZAF5U4yjPioMj9J6ZrF9uTNfe3E'\n\tfeeAssetId = Unit\n\ttransactionId = base58'2c8gRgHf6jYAUBNnPhXEBUePcoCJPujAmxzaxGNzQv6F'\n\tcaller = Address(\n\t\tbytes = base58'3Mw48B85LvkBUhhDDmUvLhF9koAzfsPekDb'\n\t)\n\tfee = 500000\n)"
          },
          {
            "name": "@a",
            "value": "57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv"
          },
          {
            "name": "@b",
            "value": "BvJEWY79uQEFetuyiZAF5U4yjPioMj9J6ZrF9uTNfe3E"
          },
          {
            "name": "@p",
            "value": "false"
          }
        ],
        "reason": "Out of turn finalization: 1239024 block should be finalize by 57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv"
      }
    }
  ],
  "error": "Error while executing account-script: Out of turn finalization: 1239024 block should be finalize by 57C4SttrQ3a2s6nHqTyPoKo6g7JFKhvojLkS3qgrVqyv"
}
</code></pre>
</details>

## <a id="broadcast"></a>Шаг 4. Отправка транзакции

Чтобы отправить транзакцию на блокчейн, используйте публичный метод [POST /transactions/broadcast](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/signedBroadcast_1). В тело запроса вставьте подписанную транзакцию в формате JSON — например, тело ответа из шага 2.

<details><summary>Пример запроса</summary>
 <pre class="language-bash"><code>
curl -X POST "https://nodes-testnet.wavesnodes.com/transactions/broadcast"\
  -H "Content-Type: application/json"\
  -d '{\
  "type":16,\
  "id":"FZp47sYFC4BXKfJqRQrcYNJQmaNiD3YSxMQk9XJtyEMN",\
  "sender":"3NAM4ijPv7rwFBqcshqv41CVhKoSK22nEoT",\
  "senderPublicKey":"YTuAsoF3fqvdgyuGRXJGY4WFEfDCvMwjyJdWYuiEBRS",\
  "fee":500000,\
  "feeAssetId":null,\
  "timestamp":1603966204510,\
  "proofs":["R3QeLwQL7LFzMxd2vBGw7f9P73SgMLBPMh5FkuQLMzBtkoi6PCzhtRLMw9PpjSKVDbHgVEMPDn9BQYjEKZpeDPZ"],\
  "version":1,\
  "dApp":"3N9yCRmNsLK2aPStjLBne3EUiPSKvVHYgKk",\
  "payment":[{"amount":300000000,"assetId":null}],\
  "call":{"function":"deposit","args":[]}\
  }'

</code></pre>
</details>

HTTP-коды ответа:

- 200 — транзакция добавлена в UTX pool.
- 4xx или 501 — транзакция отброшена.
- 500 или 503 — ошибка сервера, при этом неизвестно, добавлена транзакция в UTX pool или нет.

В последнем случае рекомендуем проверить статус транзакции (см. следующий шаг) либо повторно отправить ту же самую транзакцию (с тем же ID). Если создать и подписать новую транзакцию с другим значением `timestamp` (по умолчанию подставляется текущее время), у нее будет другой ID, в результате может оказаться, что выполнены обе транзакции — например, два одинаковых перевода одному получателю.

В случае успешной отправки метод возвращает JSON-представление транзакции со всеми параметрами, включая необязательные (фактически, тело ответа может совпадать с телом запроса).

> Чтобы нода могла принимать транзакции методом `POST /transactions/broadcast`, должно быть установлено соединение не менее чем с количеством peer-нод, указанным в параметре `waves.rest-api.minimum-peers` (по умолчанию 3), см. раздел [Настройки REST API](/ru/waves-node/node-configuration#настройки-rest-api). Иначе метод возвращает ошибку c HTTP-кодом 400:
> ```json
> {
>   "error": 199,
>   "message": "There are not enough connections with peers ... to accept transaction"
> }
> ```

## Шаг 5. Проверка статуса транзакции

Чтобы проверить наличие транзакции на блокчейне, используйте один из публичных методов: 
* [GET /transaction/status](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/status_3) — для проверки статуса одной или нескольких транзакций.
* [POST /transaction/status](https://nodes.wavesnodes.com/api-docs/index.html#/transactions/status_4) — для большого количества транзакций.

Пример запроса:

```
curl -X GET "https://nodes-testnet.wavesnodes.com/transactions/status?id=FZp47sYFC4BXKfJqRQrcYNJQmaNiD3YSxMQk9XJtyEMN"
```

Пример ответа:

```json
[
  {
    "status": "confirmed",
    "height": 1241807,
    "confirmations": 1,
    "applicationStatus": "succeeded",
    "id": "FZp47sYFC4BXKfJqRQrcYNJQmaNiD3YSxMQk9XJtyEMN"
  }
]
```

где:

- `status` — статус транзакции:
   - `not_found` — транзакция не найдена,
   - `unconfirmed` — транзакция в UTX pool,
   - `confirmed` — транзакция добавлена в блок или микроблок.
- `height` — порядковый номер блока, в который добавлена транзакция.
- `confirmations` — текущая высота блокчейна минус высота блока, в который добавлена транзакция.
- `applicationStatus` — результат выполнения (подробнее в разделе [Валидация транзакции](/ru/blockchain/transaction/transaction-validation)):
   - `succeeded` — транзакция успешна,
   - `script_execution_failed` — результат выполнения dApp-скрипта или скрипта ассета был неудачным. Такая транзакция не приводит к изменениям в балансах (кроме взимания комиссии с отправителя) и в хранилищах данных аккаунтов.

В редких случаях на блокчейне может произойти откат последнего блока или микроблока. Поэтому, если требуется выполнить несколько транзакций в определенной последовательности, рекомендуем дождаться 1–2 подтверждений (`"confirmations"`) — блоков, добавленных поверх того, в который попала транзакция, и только потом отправлять следующую.
