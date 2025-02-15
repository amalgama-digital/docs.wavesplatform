# Release Notes

## Версия 1.4 Zegema (Stagenet)

### Развитие протокола

* Добавлена поддержка транзакций в формате Ethereum, выполняющих перевод токена или вызов dApp-скрипта. Благодаря этому пользователи MetaMask могут подписывать транзакции и отправлять их на блокчейн Waves. [Подробнее](/ru/keep-in-touch/metamask)
* Добавлена поддержка ордеров с подписью ECDSA в транзакции обмена. Благодаря этому пользователи могут подписывать ордера с помощью MetaMask. [Подробнее](/ru/keep-in-touch/metamask)
* Добавлен новый тип транзакции — [транзакция применения выражения](/ru/blockchain/transaction-type/invoke-expression-transaction), которая позволяет выполнить приложенный к ней скрипт.

### Ride

* Выпущена [версия 6](/ru/ride/v6/) Стандартной библиотеки.
* Добавлен новый тип скрипта — [скрипт вызова](/ru/ride/v6/script/script-types/call-script), предназначенный для однократного выполнения с помощью транзакции применения выражения.
* Добавлена структура [InvokeExpressionTransaction](/ru/ride/v6/structures/transaction-structures/invoke-expression-transaction), предназначенная для верификации транзакции применения выражения в смарт-контрактах.
* Добавлена встроенная переменная [i](/ru/ride/v6/variables/built-in-variables#i), доступная в скрипте вызова и содержащая структуру [Invocation](/ru/ride/v6/structures/common-structures/invocation).
* Добавлено семейство встроенных функций свертки [fold](/ru/ride/v6/functions/built-in-functions/fold-functions), предназначенных для выполнения операций над списком значений. Семейство функций заменяет макрос `FOLD<N>`, использовавшийся в предыдущих версиях Стандартной библиотеки.
* Добавлены встроенные функции:
   * [sqrt(Int,Int,Int,Union)](/ru/ride/v6/functions/built-in-functions/math-functions#sqrt)
   * [sqrt(BigInt,Int,Int,Union)](/ru/ride/v6/functions/built-in-functions/math-functions#sqrtbigint)
* Для встроенных функций строки [makeString](/ru/ride/v6/functions/built-in-functions/string-functions#makestring-list-string-string-string) и [split](/ru/ride/v6/functions/built-in-functions/string-functions#split-string-string-list-string) добавлены семейства аналогичных функций с различной сложностью в зависимости от размера данных. Если размер данных известен заранее, можно использовать более «дешевую» функцию.
* Изменена сложность некоторых встроенных функций. Сложность всех функций представлена в разделе [[Ride v6] Встроенные функции](/ru/ride/v6/functions/built-in-functions/).

### Node REST API

#### Ломающие изменения

* Добавлена поддержка транзакций в формате Ethereum, выполняющих перевод токена или вызов dApp-скрипта. JSON-представление транзакции зависит от ее содержания:

   <details>
   <summary>Пример перевода в формате Ethereum</summary>
   
   ```json
   {
     "type": 19,
     "id": "C4Fwdsygb6uL6iZ2dd6dHCdnw5FB2oZNCdpQ1F5kQ7Q9",
     "fee": 210000,
     "feeAssetId": null,
     "timestamp": 1634807137059,
     "version": 1,
     "chainId": 83,
     "bytes": "0xf87486017ca21943238502540be4008303345094ae50afd342b8f397bcd1c2af3fd658d5080674058806f05b59d3b200008081caa0e87f0e273e8ad894ab196198747a0363b66c5bd056f1e09bb6f8b18f6c11dbafa07dd6b2ac30d2d1ac1196a34a8db5adbd8f69b8f349b15f45c6bbf4040de7519d",
     "sender": "3MTPx4QwYZg78QwAw4Pdm3feBpwe9qMzL5X",
     "senderPublicKey": "2ZWaWoMYAdkKfUUYwKng29Dgq1ggBPYtbsrvKBxxKcP3SkpXy1USEJiPPL6U7H7ECD3bD3QcZy2mmtN9EzsK2SHV",
     "height": 1040780,
     "applicationStatus": "succeeded",
     "payload": {
       "type": "transfer",
       "recipient": "3MgUB2QfTH8jMLYwuNrYq2SSUJdGcjvBk6n",
       "asset": null,
       "amount": 50000000
     }
   ```
   </details>

   <details>
   <summary>Пример вызова скрипта в формате Ethereum</summary>
   
   ```json
   {
     "type": 19,
     "id": "2Y67uLthNfzEBpEJFyrP7MKqPYTFYjM5nz2NnETZVUYU",
     "fee": 500000,
     "feeAssetId": null,
     "timestamp": 1634881836984,
     "version": 1,
     "chainId": 83,
     "bytes": "0xf9011186017ca68d17b88502540be4008307a120940ea8e14f313237aac31995f9c19a7e0f78c1cc2b80b8a409abf90e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000064672696461790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000081caa0ecb7124f915bd366186a6451aabdde3fbf0db94caa78a6b8d6115bb5ce6407d8a077ab1e756d343b9927c3c4add5c797915aef2de112576213d6a30ce5e040ba3c",
     "sender": "3MRejoFLZ6FsXRjVEzBpnQ27s61FDLLDGxh",
     "senderPublicKey": "3nFhfAYDSRS4UrU22HaAuFT4YHZD5Et3vy7fBTcTxefuAVXs8pHRR4pvpAzvMbmskwjWB7PxFKqPNsioRVZ9mxaa",
     "height": 1042032,
     "applicationStatus": "succeeded",
     "payload": {
       "type": "invocation",
       "dApp": "3MRuzZVauiiX2DGwNyP8Tv7idDGUy1VG5bJ",
       "call": {
         "function": "saveString",
         "args": [
           {
             "type": "string",
             "value": "Friday"
           }
         ]
       },
       "payment": [],
       "stateChanges": {
         "data": [
           {
             "key": "str_1042032",
             "type": "string",
             "value": "Friday"
           }
         ],
         "transfers": [],
         "issues": [],
         "reissues": [],
         "burns": [],
         "sponsorFees": [],
         "leases": [],
         "leaseCancels": [],
         "invokes": []
       }
     }
   }
   ```
   </details>

   Особенности JSON-представления транзакции в формате Ethereum:

   * поле `sender` содержит адрес в представлении Waves в кодировке base58,
   * поле `senderPublicKey` размером 64 байта в кодировке base58,
   * поле `bytes` содержит байты Ethereum-транзакции целиком, включая подпись ECDSA, в кодировке HEX.
   * массив `proofs` отсутствует.

* Добавлена поддержка транзакций обмена, содержащих ордер (или оба ордера) с подписью ECDSA.

   <details>
   <summary>Пример ордера с подписью ECDSA</summary>
   
   ```json
   "order1": {
      "version": 4,
      "id": "2Wx5ctbaU9GqQYXtEkqsin6drfu6SuADdwAyvuYnwai9",
      "sender": "3FzoJXUesFqzf4nmMYejpUDYmFJvkwEiQG6",
      "senderPublicKey": "5BQPcwDXaZexgonPb8ipDrLRXY3RHn1kFLP9fqp1s6M6xiRhC4LvsAq2HueXCMzkpuXsrLnuBA3SdkJyuhNZXMCd",
      "matcherPublicKey": "9BUoYQYq7K38mkk61q8aMH9kD9fKSVL1Fib7FbH6nUkQ",
      "assetPair": {
         "amountAsset": "5fQPsn8hoaVddFG26cWQ5QFdqxWtUPNaZ9zH2E6LYzFn",
         "priceAsset": null
      },
      "orderType": "buy",
      "amount": 1,
      "price": 100,
      "timestamp": 1,
      "expiration": 123,
      "matcherFee": 100000,
      "signature": "",
      "proofs": [],
      "matcherFeeAssetId": null,
      "eip712Signature": "0xe5ff562bfb0296e95b631365599c87f1c5002597bf56a131f289765275d2580f5344c62999404c37cd858ea037328ac91eca16ad1ce69c345ebb52fde70b66251c"
   }
   ```
   </details>

   Особенности JSON-представления ордера с подписью ECDSA:
   * поле `sender` содержит адрес в представлении Waves в кодировке base58,
   * поле `senderPublicKey` размером 64 байта в кодировке base58,
   * поле `eip712Signature` содержит подпись ECDSA в кодировке HEX,
   * массив `proofs` отсутствует.

* Добавлен новый тип транзакции: транзакция применения выражения.

### Активация

Чтобы активировать перечисленные выше улучшения, голосуйте за фичу №&nbsp;17 “Ride V6, MetaMask support, Invoke Expression”.

## Версия 1.3 Jumeirah

Изменения, перечисленные ниже, вступили в силу с активацией фичи №&nbsp;16 “Ride V5, dApp-to-dApp invocations”.

### Развитие протокола

* **Вызов dApp из dApp.** Вызываемая функция dApp-скрипта может выполнять вложенные вызовы. Из dApp можно вызвать вызываемую функцию другого dApp или того же самого dApp, в том числе функция может вызвать сама себя. Все вызванные функции выполняются в рамках одной транзакции вызова скрипта. [Подробнее о вызове dApp из dApp](/ru/ride/advanced/dapp-to-dapp)
* Изменения для [транзакции вызова скрипта](/ru/blockchain/transaction-type/invoke-script-transaction):
   * Отменена дополнительная комиссия 0,004 WAVES за выполнение скриптов ассетов в платежах и действиях скрипта.
   * Транзакция может содержать до 10 приложенных платежей.
   * Суммарная сложность всех вызываемых функций и скриптов ассетов в одной транзакции — не более 26&nbsp;000 (cложность скрипта отправителя не учитывается в этом лимите). 
   * Максимальная сложность вызываемой функции скрипта dApp изменена на 10&nbsp;000.
* Для всех типов транзакций отменена дополнительная комиссия 0,004 WAVES за отправку транзакции со смарт-аккаунта или dApp, в случае если сложность скрипта аккаунта или функции-верификатора dApp-скрипта не превышает 200.

<!--* **Вычисления с продолжением.** Добавлена поддержка dApp-скриптов, сложность которых превышает 10&nbsp;000. Выполнение такого скрипта разбивается на несколько этапов: первый этап вычислений выполняется в рамках транзакции вызова скрипта, последующие этапы — в рамках транзакций продолжения. [Подробнее о вычислениях с продолжением](/ru/ride/advanced/continuation)
   * Добавлен новый тип транзакции: [Continuation](/ru/blockchain/transaction-type/continuation-transaction). Транзакция продолжения создается генератором блока автоматически в случае наличия незавершенной цепочки вычислений. Транзакция не может быть отправлена пользователем.-->

### Ride

* Выпущена [версия 5](/ru/ride/v5/) Стандартной библиотеки.
* Реализована возможность обрабатывать в dApp до 10 платежей, приложенных к транзакции вызова скрипта.
* Добавлены функции для вызова dApp из dApp:
   * [invoke](/ru/ride/functions/built-in-functions/dapp-to-dapp#invoke)
   * [reentrantInvoke](/ru/ride/functions/built-in-functions/dapp-to-dapp#reentrantinvoke)
* Добавлены [нетерпеливые переменные](/ru/ride/variables/), которые вычисляются до следующего выражения, чтобы гарантировать порядок выполнения и применения действий скрипта вызываемых функций.
* Изменен [формат результата](/ru/ride/functions/callable-function#invocation-result) вызываемой функции: добавлено возвращаемое значение.
* Изменена структура [Invocation](/ru/ride/structures/common-structures/invocation): в случае вызова dApp из dApp она содержит адрес и публичный ключ как отправителя транзакции вызова скрипта, так и аккаунта dApp, который вызывает функцию.
* Общее количество действий скрипта `Issue`, `Reissue`, `Burn`, `SponsorFee`, `ScriptTransfer`, `Lease`, `LeaseCancel`, выполняемых всеми вызываемыми функциями в одной транзакции, — не более 30.
* Общее количество действий скрипта `BinaryEntry`, `BooleanEntry`, `IntegerEntry`, `StringEntry`, `DeleteEntry`, выполняемых всеми вызываемыми функциями в одной транзакции, — не более 100.
* Добавлены действия скрипта, которые может выполнять вызываемая функция:
   * [Lease](/ru/ride/structures/script-actions/lease) — передает WAVES в лизинг.
   * [LeaseCancel](/ru/ride/structures/script-actions/lease-cancel) — прекращает лизинг.

   С помощью действий `Lease` и `LeaseCancel` можно изменить сумму лизинга, в частности, извлечь часть средств из лизинга. Если в одном вызове скрипта отменить лизинг на большую сумму и создать новый лизинг на меньшую сумму с тем же получателем, генерирующий баланс получателя уменьшится на разницу. Если же отправить две отдельные транзакции — транзакцию отмены лизинга и транзакцию лизинга,  они могут попасть в разные блоки, и тогда генерирующий баланс сразу же уменьшится на сумму отмененного лизинга, а увеличится на сумму нового лизинга только через 1000 блоков.

* Добавлена встроенная функция [calculateLeaseId](/ru/ride/functions/built-in-functions/blockchain-functions#calculateleaseid) для получения ID лизинга, сформированного структурой `Lease`.
* Добавлен произвольный тип данных — [Any](/ru/ride/data-types/any).
* Добавлен тип данных [BigInt](/ru/ride/data-types/bigint) размером 64 байта (512 бит) и поддерживающие его функции:
   * [fraction(BigInt, BigInt, BigInt): BigInt](/ru/ride/functions/built-in-functions/math-functions#fractionbigint)
   * [fraction(BigInt, BigInt, BigInt, Union): BigInt](/ru/ride/functions/built-in-functions/math-functions#fractionbigintround)
   * [log(BigInt, Int, BigInt, Int, Int, Union): BigInt](/ru/ride/functions/built-in-functions/math-functions#logbigint)
   * [max(List[BigInt]): BigInt](/ru/ride/functions/built-in-functions/list-functions#max-list-bigint-bigint)
   * [median(List[BigInt]): BigInt](/ru/ride/functions/built-in-functions/math-functions#medianbigint)
   * [min(List[BigInt]): BigInt](/ru/ride/functions/built-in-functions/list-functions#min-list-bigint-bigint)
   * [pow(BigInt, Int, BigInt, Int, Int, Union): BigInt](/ru/ride/functions/built-in-functions/math-functions#powbigint)
   * [parseBigInt(String): BigInt|Unit](/ru/ride/functions/built-in-functions/converting-functions#parse-bigint)
   * [parseBigIntValue(String): BigInt](/ru/ride/functions/built-in-functions/converting-functions#parse-bigintvalue)
   * [toBigInt(ByteVector): BigInt](/ru/ride/functions/built-in-functions/converting-functions#to-bigint-bytevector)
   * [toBigInt(ByteVector, Int, Int): BigInt](/ru/ride/functions/built-in-functions/converting-functions#to-bigint-bytevector-int-int)
   * [toBigInt(Int): BigInt](/ru/ride/functions/built-in-functions/converting-functions#to-bigint-int)
   * [toBytes(BigInt): ByteVector](/ru/ride/functions/built-in-functions/converting-functions#to-bytes-bigint)
   * [toInt(BigInt): Int](/ru/ride/functions/built-in-functions/converting-functions#to-int-bigint)
   * [toString(BigInt): String](/ru/ride/functions/built-in-functions/converting-functions#to-string-bigint)
* Добавлены встроенные функции:
   * [isDataStorageUntouched](/ru/ride/functions/built-in-functions/account-data-storage-functions#isdatastorageuntouched) — проверяет, что хранилище данных указанного аккаунта никогда не содержало записей.
   * [scriptHash](/ru/ride/functions/built-in-functions/blockchain-functions#scripthash) — возвращает [BLAKE2b-256](https://en.wikipedia.org/wiki/BLAKE_%28hash_function%29)-хеш скрипта, установленного на аккаунте.
   * [fraction(Int, Int, Int, Union): BigInt](/ru/ride/functions/built-in-functions/math-functions#fractionintround) — умножает два целых числа и делит на третье без переполнения, применяя указанный метод округления.
* Добавлены встроенные [функции хранилища данных аккаунта](/ru/ride/functions/built-in-functions/account-data-storage-functions), позволяющие dApp-скрипту читать записи из собственного хранилища данных:
   * `getBinary(key: String): ByteVector|Unit`
   * `getBinaryValue(key: String): ByteVector`
   * `getBoolean(key: String): Boolean|Unit`
   * `getBooleanValue(key: String): Boolean`
   * `getInteger(key: String): Int|Unit`
   * `getIntegerValue(key: String): Int`
   * `getString(key: String): String|Unit`
   * `getStringValue(key: String): String`
* Максимальная сложность вызываемой функции скрипта dApp изменена на 10&nbsp;000.

### Node REST API

#### Ломающие изменения

<!--* Добавлен новый тип транзакции: [транзакция продолжения](/ru/blockchain/transaction-type/continuation-transaction).-->
Лизинг может быть создан не только в результате транзакции лизинга, но и в результате транзакции вызова скрипта с помощью действия скрипта `Lease`. Поэтому изменен формат ответа следующих методов:
* В ответе методов `/transactions/address/{address}/limit/{limit}` и `/transactions/info/{id}` для транзакции отмены лизинга структура `lease` теперь содержит не транзакцию лизинга, а структуру с параметрами лизинга.
* `/leasing/active/{address}` возвращает не массив транзакций лизинга, а массив структур c параметрами лизингов.

<details>
<summary>Формат</summary>
    
```json
"lease": {
   "id": "7bRbb9DH6V2ztdbmsZhWLdhTPQD14t8W38GjrtW8ug1N",
   "originTransactionId": "7bRbb9DH6V2ztdbmsZhWLdhTPQD14t8W38GjrtW8ug1N",
   "sender": "3MqqqDw65oL423pjsdeAS5vcRyXa9bmruGx",
   "recipient": "3Mz9N7YPfZPWGd4yYaX6H53Gcgrq6ifYiH7",
   "amount": 400000000,
   "height": 1560062,
   "status": "canceled"
}
```

Поле `originTransactionId` может содержать идентификатор транзакции лизинга или транзакции вызова скрипта.
</details>

#### Семантические изменения

<!--* В ответ методов, возвращающих транзакции, для [транзакции вызова скрипта](/ru/blockchain/transaction-type/invoke-script-transaction) версии 3 добавлены поля `extraFeePerStep` и `continuationTransactionIds`, а также значение `script_execution_in_progress` для поля `applicationStatus`.-->
* Результат вызова dApp из dApp добавлен в виде массива `invokes` в структуру `stateChanges`, возвращаемую следующими методами:
   * `/transactions/info/{id}`
   * `/transactions/address/{address}/limit/{limit}`

   Каждый элемент массива `invokes`, в свою очередь, содержит `stateChanges`.
   
   <details>
      <summary>Формат</summary>
    
   ```json
   "stateChanges": {
      "data": [
         {
            "key": "test_key_1",
            "type": "integer",
            "value": 14
         },
         {
            "key": "test_key_2",
            "type": "integer",
            "value": 999000000
         }
      ],
      "transfers": [],
      "issues": [],
      "reissues": [],
      "burns": [],
      "sponsorFees": [],
      "leases": [],
      "leaseCancels": [],
      "invokes": [
         {
            "dApp": "3N4o9UGcFTDxcJptFG2yimYpLqLLoD44diX",
            "call": {
               "function": "bar",
               "args": [
                  {
                     "type": "Int",
                     "value": 7
                  }
               ]
            },
            "payments": [
               {
                  "asset": "25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT",
                  "amount": 1000000
               }
            ],
            "stateChanges": {
               "data": [],
               "transfers": [
                  {
                     "address": "3ND86XoiA9ytxysBCvhkRQez82R3d6wZBzP",
                     "asset": null,
                     "amount": 100000000
                  }
               ],
              "issues": [],
              "reissues": [],
              "burns": [],
              "sponsorFees": [],
              "leases": [],
              "leaseCancels": [],
              "invokes": []
           }
        }
     ]
   }
   ```
   </details>

* Результат действий скрипта `Lease` и `LeaseCancel` также добавлен в структуру `stateChanges`.

   <details>
      <summary>Формат</summary>

   ```json
   "stateChanges": {
      "data": [],
      "transfers": [],
      "issues": [],
      "reissues": [],
      "burns": [],
      "sponsorFees": [],
      "leases": [{
         "id": "94PfEzE3yCo1wVrZGubMwqJgNYLHVBxae5psdeZu9c1c",
         "originTransactionId": "Dc5fzXUKVDd22PbJFt2T5RSsNieFCJwwpuWUsGR4YDZs",
         "sender": "3MopBTg99nDNv4gfQf76WnuPrnPq1TppDEp",
         "recipient": "3MT5dAS4Zr2g8MBLSPnbyAM18pf7A2PUuMY",
         "amount": 444444,
         "height": 817572,
         "status": "active"
      }],
      "leaseCancels": [{
         "id": "5NTgkz8rT8RwSSLbBhyE6yev824Ff8NLStzMreGFEpWk",
         "originTransactionId": "Fr8pwXPK81rXRGs9rwpZaQKHPa8irY3GL4bWXUGemvZi",
         "sender": "3MopBTg99nDNv4gfQf76WnuPrnPq1TppDEp",
         "recipient": "3MT5dAS4Zr2g8MBLSPnbyAM18pf7A2PUuMY",
         "amount": 12000000,
         "height": 817540,
         "status": "canceled"
      }],
      "invokes": []
   }
   ```
   </details>

* Результат действий скрипта `Lease` и `LeaseCancel` добавлен в структуру `trace`, возвращаемую следующими методами:
   * `/transactions/broadcast` c параметром `trace=true`
   * `/debug/validate`

   <details>
      <summary>Формат</summary>

   ```json
   "trace": [
      {
         "id": "3MosFNQAFGskNDnYzRBgMbfod6xXPdG96ME",
         "type": "dApp",
         "vars": [
            {
               "name": "amount",
               "type": "integer",
               "value": 12345
            }
         ],
         "result": {
            "leases": [
               {
                  "id": "F3ZmBbig3gekPu4a8fyrZGiU53MFxtFSWKw5dTyTMvq7",
                  "originTransactionId": "6GLmdBZZeevtbomFYif5ys7Ltf2DuXMGP29bLrSoX9HA",
                  "sender": "3MUAwJP3ThWNrRcxwAB8QHrvo7BEQbRFdu9",
                  "recipient": "3MbwwebM61Y11UFZwkdQ1gXUJjY27ww1r6z",
                  "amount": 200000000,
                  "height": 739442
               },
            ],
            "leaseCancels": [
               {
                  "id": "DH7N1XW7tTNwHBmFsfeArP6hWfzrC4fGcsKPEMfFZpPL",
                  "originTransactionId": "DH7N1XW7tTNwHBmFsfeArP6hWfzrC4fGcsKPEMfFZpPL",
                  "sender": "3MUAwJP3ThWNrRcxwAB8QHrvo7BEQbRFdu9",
                  "recipient": "3MbwwebM61Y11UFZwkdQ1gXUJjY27ww1r6z",
                  "amount": 300000000,
                  "height": 739436
               }
            ]
         }
      }
   ]
   ```
   </details>

#### Улучшения

* Новый метод `/leasing/info` возвращает параметры лизингов с указанными идентификаторами.

   <details>
      <summary>Формат</summary>
    
   ```json
   [
      {
         "id": "DNZ8tpZt6i9fTRW6b7UmBV9LHNmX4c5EgeTMhcNk3ReB",
         "originTransactionId": "Dc5fzXUKVDd22PbJFt2T5RSsNieFCJwwpuWUsGR4YDZs",
         "sender": "3MgPxT7piLX6u3yqDFNUTPL93b5dhdpuYKH",
         "recipient": "3MT5dAS4Zr2g8MBLSPnbyAM18pf7A2PUuMY",
         "amount": 222222,
         "height": 817572,
         "status": "active",
         "cancelHeight": null,
         "cancelTransactionId": null
      },
      {
         "id": "5NTgkz8rT8RwSSLbBhyE6yev824Ff8NLStzMreGFEpWk",
         "originTransactionId": "Fr8pwXPK81rXRGs9rwpZaQKHPa8irY3GL4bWXUGemvZi",
         "sender": "3MopBTg99nDNv4gfQf76WnuPrnPq1TppDEp",
         "recipient": "3MT5dAS4Zr2g8MBLSPnbyAM18pf7A2PUuMY",
         "amount": 12000000,
         "height": 817540,
         "status": "canceled",
         "cancelHeight": 817572,
         "cancelTransactionId": "Dc5fzXUKVDd22PbJFt2T5RSsNieFCJwwpuWUsGR4YDZs"
      }
   ]
   ```

    Если база данных на ноде не была перестроена после активации фичи №&nbsp;16, метод не возвращает поле `leaseCancelTransactionId` для лизингов, отмененных до активации фичи №&nbsp;16.
   </details>

* Новый метод `/blocks/heightByTimestamp/{timestamp}` возвращает высоту блокчейна в указанный момент времени.

## Версия 1.2 Malibu

Изменения, перечисленные ниже, вступили в силу с активацией фичи №&nbsp;15 “Ride V4, VRF, Protobuf, Failed transactions”.

### Развитие протокола

* Усовершенствован механизм [генерации блоков](/ru/blockchain/block/block-generation/) за счет использования [VRF](https://en.wikipedia.org/wiki/Verifiable_random_function) (Verifiable random function). Это улучшение позволяет противостоять атакам типа stake grinding, при помощи которых злоумышленники пытаются повысить для себя вероятность генерации блока.
* Добавлено сохранение транзакций с неудачным результатом выполнения скрипта. Транзакции вызова скрипта и транзакции обмена сохраняются на блокчейне и за них взимается комиссия, даже если результат выполнения dApp-скрипта или скрипта ассета был неудачным (при условии что транзакция прошла проверку подписи отправителя или проверку скриптом аккаунта, а при вызове скрипта сложность вычислений превысила порог для сохранения неуспешных транзакций). [Подробнее](/ru/keep-in-touch/april)
* Реализована возможность изменять наименование и описание ассета. Для этого добавлен новый тип транзакции — [транзакция обновления информации ассета](/ru/blockchain/transaction-type/update-asset-info-transaction). Изменение возможно не чаще чем через 10 блоков на Stagenet и не чаще чем через 100&nbsp;000 блоков на Mainnet и Testnet.
* Реализована возможность удалять записи в хранилище данных аккаунта. Это действие может быть выполнено при помощи [транзакции данных](/ru/blockchain/transaction-type/data-transaction) либо структуры [DeleteEntry](/ru/ride/structures/script-actions/delete-entry) языка Ride.
* Снижена [минимальная комиссия](/ru/blockchain/transaction/transaction-fee) за транзакцию довыпуска и транзакцию спонсирования — с 1 до 0,001 WAVES.
* Бинарные форматы транзакций реализованы на основе [protobuf](https://developers.google.com/protocol-buffers/docs/overview?hl=ru).
* В [транзакции выпуска](/ru/blockchain/transaction-type/issue-transaction) формат полей `name` и `description` изменен с bytes на string.
* В [транзакции данных](/ru/blockchain/transaction-type/transfer-transaction) максимальный размер данных увеличен до 165&nbsp;890 байт.
* В [транзакции обмена](/ru/blockchain/transaction-type/exchange-transaction) ордера на покупку и продажу могут быть указаны в любом порядке.
* Изменена формула расчета price в [ордерах](/ru/blockchain/order). Ранее, при определении price для ассетов с разным количеством десятичных знаков, возникала проблема с величиной price. Её максимальное значение зависело от разности десятичных знаков ассетов. К примеру, price для [NFT](/ru/blockchain/token/non-fungible-token)-ассета не мог превышать 1000 WAVES. Измененная формула исправляет эту проблему. Разность  десятичных знаков больше не влияет на максимальный размер price.
* Минимальный интервал между блоками увеличен с 5 до 15 секунд. Среднее время генерации блока установлено в 60 секунд вместо ~59.
* Изменена схема подписания майнящей нодой транзакций блока. Ранее майнящей ноде требовалось подписывать блок вместе со всеми транзакциями. Теперь в заголовок блока добавлен [корневой хеш транзакций](/ru/blockchain/block/merkle-root), поэтому достаточно подписать только заголовок.
* В качестве идентификатора блока используется хеш BLAKE2b-256 заголовка блока.
* Теперь при валидации транзакции перед ее добавлением в пул неподтвержденных транзакций учитываются изменения состояния блокчейна, внесенные транзакциями, которые были ранее добавлены в блок, но затем возвращены в пул неподтвержденных транзакций из-за появления нового ключевого блока, ссылающегося на один из предшествующих микроблоков.
* dApp не может вызвать самого себя с помощью транзакции вызова скрипта с приложенными платежами. dApp также не может переводить средства самому себе с помощью действия скрипта `ScriptTransfer`.

### Обновления REST API

В релизе ноды 1.2 внесены **семантические и ломающие изменения** в API. Прочитайте внимательно описание изменений: они могут повлиять на работу приложений при миграции с версии 1.1.

#### Семантические изменения

* Транзакции вызова скрипта и транзакции обмена могут быть [сохранены как неуспешные](/ru/keep-in-touch/april). Их присутствие на блокчейне не означает, что изменения применены: нужно проверить также поле `applicationStatus`. Его возвращают следующие методы:
   * `/blocks/{id}`
   * `/blocks/address/{address}/{from}/{to}`
   * `/blocks/at/{height}`
   * `/blocks/last`
   * `/blocks/seq/{from}/{to}`
   * `/debug/stateChanges/address/{address}/limit/{limit}`
   * `/debug/stateChanges/info/{id}`
   * `/transactions/address/{address}/limit/{limit}`
   * `/transactions/info/{id}`
   * `/transactions/status`

   Значения `applicationStatus`:
   * `succeeded` — транзакция успешна;
   * `script_execution_failed` — результат выполнения dApp-скрипта или скрипта ассета был неудачным.

* Для неуспешных транзакций вызова скрипта причина ошибки указывается в структуре `error` в ответе методов:
   * `/debug/stateChanges/address/{address}/limit/{limit}`
   * `/debug/stateChanges/info/{id}`

   Формат:

   ```json
   "stateChanges": {
      "error": { "code": number, "text": string }
   }
   ```

   Коды ошибок:

   1 — ошибка выполнения dApp-скрипта

   2 — недостаточно комиссии для оплаты действий скрипта

   3 — скрипт ассета в действиях dApp-скрипта отклонил транзакцию

   4 — скрипт ассета в приложенных платежах отклонил транзакцию

* Для транзакции вызова скрипта результат новых [действий скрипта](/ru/ride/structures/script-actions/) отображается в ответе методов:
   * `/debug/stateChanges/address/{address}/limit/{limit}`
   * `/debug/stateChanges/info/{id}`

   Формат:

   ```json
   "stateChanges": {
      "data": [],
      "transfers": [],
      "issues": [],
      "reissues": [],
      "burns": [],
      "sponsorFees": []
   }
   ```

* Для блока версии 5 поле `reference` ссылается на `id` предыдущего блока, а не на `signature`, как в версии 4.

#### Ломающие изменения

* Получение блока по `id` вместо `signature`.

   Удалены методы:
   * `/blocks/signature/{signature}` — вместо него используйте `/blocks/{id}`
   * `/blocks/child/{signature}`

   Затронуты методы:
   * `/blocks/delay/{id}/{blockNum}`
   * `/blocks/height/{id}`
   * `/debug/rollback-to/{id}`

* Удален метод `/consensus/generationsignature`.
* Изменена структура `meta` в ответе метода `/addresses/scriptInfo/{address}/meta`. Список аргументов теперь представлен в виде массива объектов, а не map.

   Было:
   
   ```json
   "meta": {
      "callableFuncTypes": {
         "funcName": { 
            "arg1": string,
            "arg2": string
         }
      }
   }
   ```

   Стало:

   ```json
   "meta": {
      "callableFuncTypes": {
         "funcName": [ 
            { "name": string, "type": string },
            { "name": string, "type": string }
         ]
      }
   }
   ```

* Добавлен новый тип транзакции: транзакция обновления информации ассета.
* Транзакция вызова скрипта может содержать аргументы типа `List`.

   Пример:

   ```json
   { "call": { "function": string, "args": [ ["arg1-item1", "arg1-item2", "arg1-item3"] ] } }
   ```

* Записи в хранилище данных аккаунта могут быть удалены транзакциями данных и транзакциями вызова скрипта. Удаление записи выглядит как структура `{ "key": string, "value": null }`, где `value` равно null, а `type` отсутствует. Затронуты методы:
   * `/blocks/{id}`
   * `/blocks/address/{address}/{from}/{to}`
   * `/blocks/at/{height}`
   * `/blocks/last`
   * `/blocks/seq/{from}/{to}`
   * `/debug/stateChanges/address/{address}/limit/{limit}`
   * `/debug/stateChanges/info/{id}`
   * `/transactions/address/{address}/limit/{limit}`
   * `/transactions/info/{id}`

* Транзакция обмена версии 3 может содержать ордера на покупку и продажу в любом порядке.

#### Улучшения

* Метод `/debug/validate` не требует указания API-key.
* Метод `/assets/details` позволяет получать информацию сразу по нескольким ассетам. В ответ добавлено поле `originTransactionId`, содержащее ID транзакции, выпустившей ассет. Кроме того, поддерживаются POST-запросы.
* Метод `/addresses/balance` позволяет получать балансы сразу для нескольких адресов на заданной высоте, не далее 2000 от текущей.
* В ответ метода `/assets/nft/{address}/limit/{limit}` добавлен массив `assetDetails` со списком NFT, принадлежащих адресу. Также поддерживаются POST-запросы.
* Следующие методы возвращают сложность каждой вызываемой функции и функции-верификатора:
   * `/addresses/scriptInfo/{address}`
   * `/utils/script/compileCode`
   * `/utils/script/estimate`

   Формат:

   ```json
   {
      "complexity": number,
      "callableComplexities": { "funcName1": number, "funcName2": number },
      "verifierComplexity": number
   }
   ```

* Новый метод `/transactions/merkleProof` принимает на вход ID транзакции или массив ID транзакций и возвращает массив доказательств для проверки присутствия транзакции в блоке.
* В следующие методы добавлены поля `id` и `transactionsRoot`:
   * `/blocks/{id}`
   * `/blocks/headers/last`
   * `/blocks/headers/seq/{from}/{to}`
   * `/blocks/headers/at/{height}`
   * `/blocks/at/{height}`
   * `/blocks/address/{address}/{from}/{to}`
   * `/blocks/last`
   * `/blocks/seq/{from}/{to}`

### Изменения Ride

* Выпущена версия 4 [Стандартной библиотеки](/ru/ride/script/standard-library).
* Добавлены действия скрипта, которые может выполнять [вызываемая функция](/ru/ride/functions/callable-function) dApp-скрипта:
   * [Issue](/ru/ride/structures/script-actions/issue) — выпуск токена.
   * [Reissue](/ru/ride/structures/script-actions/reissue) — довыпуск токена.
   * [Burn](/ru/ride/structures/script-actions/burn) — сжигание токена.
   * [SponsorFee](/ru/ride/structures/script-actions/sponsor-fee) — настройка спонсирования.
   * [BooleanEntry](/ru/ride/structures/script-actions/boolean-entry), [BinaryEntry](/ru/ride/structures/script-actions/binary-entry), [IntegerEntry](/ru/ride/structures/script-actions/int-entry), [StringEntry](/ru/ride/structures/script-actions/string-entry) — добавление или изменение записи соответствующего типа в хранилище данных аккаунта. Эти действия используются вместо [DataEntry](/ru/ride/v4/structures/script-actions/data-entry), которая не поддерживается в версии 4.
   * [DeleteEntry](/ru/ride/structures/script-actions/delete-entry) — удаление записи из хранилища данных аккаунта.
* Изменен формат результата вызываемой функции: в версии 4 результат представляет собой список действий скрипта. Структуры `ScriptResult`, `WriteSet` и `TransferSet` не поддерживаются.
* Комиссия за выполнение транзакции вызова скрипта увеличивается на 1 WAVES за каждый ассет (кроме NFT), выпущенный при помощи структуры `Issue`.
* Реализована возможность обрабатывать в dApp до двух платежей, приложенных к транзакции вызова скрипта.
* Реализована возможность использовать список в качестве аргумента вызываемой функции.
* Добавлены встроенные функции:
   * [bn256groth16Verify](/ru/ride/functions/built-in-functions/verification-functions#bn256groth16verify) — семейство функций верификации доказательства с нулевым разглашением [zk-SNARK](https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b) по протоколу groth16 на кривой bn254. Сложность 800–1650 в зависимости от размера массива публичных входов.
   * [calculateAssetId](/ru/ride/functions/built-in-functions/blockchain-functions#calculateassetid) — получает ID ассета, сформированного структурой [Issue](/ru/ride/structures/script-actions/issue) при выполнении транзакции вызова скрипта. Сложность равна 10.
   * [contains](/ru/ride/functions/built-in-functions/string-functions#contains-string-string-boolean) — проверяет, содержит ли строка заданную подстроку. Сложность 3.
   * [containsElement](/ru/ride/functions/built-in-functions/list-functions#containselement) — проверяет наличие элемента в списке. Сложность 5.
   * [createMerkleRoot](/ru/ride/functions/built-in-functions/verification-functions##createmerkleroot) — вычисляет [корневой хеш дерева Меркла транзакций блока](/ru/blockchain/block/merkle-root). Сложность 30.
   * [ecrecover](/ru/ride/functions/built-in-functions/verification-functions#ecrecover) — возвращает открытый ключ, восстановленный из хеша сообщения и цифровой подписи [ECDSA](https://ru.wikipedia.org/wiki/ECDSA). Сложность 70.
   * [groth16Verify](/ru/ride/functions/built-in-functions/verification-functions#groth16verify) — семейство функций верификации доказательства с нулевым разглашением [zk-SNARK](https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b) по протоколу groth16 на кривой bls12-381. Сложность 1200–2700 в зависимости от размера массива публичных входов.
   * [indexOf](/ru/ride/functions/built-in-functions/list-functions#indexof) — возвращает индекс первого вхождения элемента в списке. Сложность 5.
   * [lastIndexOf](/ru/ride/functions/built-in-functions/list-functions#lastindexof) — возвращает индекс последнего вхождения элемента в списке. Сложность 5.
   * [makeString](/ru/ride/functions/built-in-functions/string-functions#makestring-list-string-string-string) — объединяет строки из списка, используя разделитель. Сложность 30.
   * [max](/ru/ride/functions/built-in-functions/list-functions#max) — возвращает наибольший элемент в списке. Сложность 3.
   * [median](/ru/ride/functions/built-in-functions/math-functions#median) — вычисляет медиану списка целых чисел. Сложность 20.
   * [min](/ru/ride/functions/built-in-functions/list-functions#min) — возвращает наименьший элемент в списке. Сложность 3.
   * [removeByIndex](/ru/ride/functions/built-in-functions/list-functions#removebyindex) — удаляет элемент из списка по индексу. Сложность 7.
   * [transferTransactionFromProto](/ru/ride/functions/built-in-functions/converting-functions#transfertransactionfromproto) — десериализует транзакцию перевода. Сложность 5.
   * [valueOrElse(t: T|Unit, t0 : T)](/ru/ride/functions/built-in-functions/union-functions#valueOrElse) — получение значения из параметра типа данных объединение. Сложность 2.
* Встроенная функция [wavesBalance](/ru/ride/functions/built-in-functions/blockchain-functions#waves-balance) возвращает структуру [BalanceDetails](/ru/ride/structures/common-structures/balance-details), которая содержит все виды баланса WAVES.
* В структуру [Asset](/ru/ride/structures/common-structures/asset), возвращаемую встроенной функцией [assetInfo](/ru/ride/functions/built-in-functions/blockchain-functions#assetinfo), добавлены поля `name` и `description`.
* Для встроенных [функций хеширования](/ru/ride/functions/built-in-functions/hashing-functions) `blakeb256`, `keccak256`, `sha256` и встроенных [функций верификации](/ru/ride/functions/built-in-functions/verification-functions) `rsaVerify`, `sigVerify` в версии 4 изменена сложность и добавлены семейства аналогичных функций с различной сложностью в зависимости от размера аргумента. Если размер данных известен заранее, можно использовать более «дешевую» функцию.
* Изменена сложность некоторых встроенных функций. Список приведен в разделе [Встроенные функции](/ru/ride/functions/built-in-functions/).
* Следующие функции не поддерживаются в версии 4:
   * [extract](/ru/ride/functions/built-in-functions/union-functions#extract-t-unit-t) — вместо нее рекомендуется использовать [value](/ru/ride/functions/built-in-functions/union-functions#value-t-unit-t);
   * [checkMerkleProof](/ru/ride/functions/built-in-functions/verification-functions#checkmerkleproof) — вместо нее рекомендуется использовать [createMerkleRoot](/ru/ride/functions/built-in-functions/verification-functions#createmerkleroot)
* Добавлены встроенные операторы работы со списками:
   * Конкатенация при помощи оператора `++`. Пример: результатом выражения `[1, 2] ++ [3, 4]` будет `[1, 2, 3, 4]`. Сложность равна 4.
   * Добавление элемента в конец списка. Пример: результатом выражения `["foo","bar"] :+ "baz"` будет `["foo", "bar", "baz"]`. Сложность равна 1.
* Добавлен тип данных [Кортеж](/ru/ride/data-types/tuple).
* Максимальная сложность скрипта аккаунта и функции-верификатора скрипта dApp изменена на 2000 для новых скриптов, независимо от версии Стандартной библиотеки.

   Максимальная сложность скрипта ассета и вызываемой функции скрипта dApp осталась прежней — 4000.
* Изменен максимальный размер данных:
   * [String](/ru/ride/data-types/string) — 32&nbsp;767 байт
   * [ByteVector](/ru/ride/data-types/byte-vector) — 32&nbsp;767 байт (кроме поля `bodyBytes` структуры транзакции)

### Waves Explorer

* Добавлено отображение транзакций с неудачным результатом выполнения dApp-скрипта или скрипта ассета, сохраненных на блокчейне. В списке транзакций они отмечены значком ![](./_assets/stop.png).
* Для транзакции вызова скрипта поддерживается отображение нескольких платежей. Результат выполнения скрипта отображается в виде таблицы.
* Добавлено отображение нового типа транзакций — транзакций обновления информации ассета.
* На страницу с информацией об ассете добавлена ссылка на транзакцию выпуска ассета.
* На страницу с информацией о блоке добавлено поле Block ID.
