# Транзакция в формате Ethereum

> Поддержка транзакций в формате Ethereum добавлена в версии ноды 1.4.0. Возможность использовать этот тип транзакций включается после активации фичи №&nbsp;17 “Ride V6, MetaMask support, Invoke Expression”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

Пользователь MetaMask может подписать и отправить на блокчейн Waves транзакцию в формате Ethereum, которая выполняет вызов dApp-скрипта или перевод токена. [Подробнее](/ru/keep-in-touch/metamask)

## Комиссия за транзакцию

Если Ethereum-транзакция выполняет вызов dApp-скрипта, минимальная комиссия рассчитывается как для [транзакции вызова скрипта](/ru/blockchain/transaction-type/invoke-script-transaction).

Если Ethereum-транзакция выполняет перевод токена, минимальная комиссия рассчитывается как для [транзакции перевода](/ru/blockchain/transaction-type/transfer-transaction).

Транзакция в формате Ethereum не может быть отправлена со смарт-аккаунта или dApp.

## JSON-представление

JSON-представление транзакции зависит от ее содержания.

В случае вызова скрипта:

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

В случае перевода токена:

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
}
```

Описание полей, общих для всех типов транзакций, представлено в разделе [JSON-представление транзакции](/ru/blockchain/transaction/#json-представление-транзакции).

Особенности JSON-представления транзакции в формате Ethereum:

* поле `sender` содержит адрес в представлении Waves в кодировке base58,
* поле `senderPublicKey` размером 64 байта в кодировке base58,
* поле `bytes` содержит байты Ethereum-транзакции целиком, включая подпись ECDSA, в кодировке HEX.
* массив `proofs` отсутствует.

## Бинарный формат

См. раздел [Бинарный формат транзакции в формате Ethereum](/ru/blockchain/binary-format/transaction-binary-format/ethereum-transaction-binary-format).

## Структура Ride

В случае верификации скриптом ассета транзакция в формате Ethereum интерпретируется как структура [TransferTransaction](/ru/ride/structures/transaction-structures/transfer-transaction) или [InvokeScriptTransaction](/ru/ride/structures/transaction-structures/invoke-script-transaction). Подробнее в разделе [Поддержка в Ride](/ru/keep-in-touch/metamask#support-in-ride).
