# Ethereum Transaction

> Ethereum transaction support is added in node version 1.4.0 and enabled by feature #17 “Ride V6, MetaMask support, Invoke Expression”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

A MetaMask user can sign an Ethereum transaction that invokes a dApp script or transfers a token and send the transaction to the Waves blockchain. [More about MetaMask support](/en/keep-in-touch/metamask)

## Transaction Fee

If an Ethereum transaction invokes a dApp script, the minimum fee is defined as for an [Invoke Script transaction](/en/blockchain/transaction-type/invoke-script-transaction).

If an Ethereum transaction transfers a token, the minimum fee is defined as for a [Transfer transaction](/en/blockchain/transaction-type/transfer-transaction).

An Ethereum transaction cannot be sent from a smart account or dApp.

## JSON Representation

JSON representation of an Ethereum transaction depends on its content.

For a dApp script invocation:

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

For a token transfer:

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

The fields that are common to all types of transactions are described in the [Transaction](/en/blockchain/transaction/#json-representation) article.

Features of the Ethereum transaction JSON representation:

* `sender` contains Waves address base58 encoded,
* `senderPublicKey` is 64 bytes base58 encoded,
* `bytes` contains the entire Ethereum transaction bytes, including the ECDSA signature, HEX encoded.
* `proofs` array is missing.

## Binary Format

See the [Ethereum Transaction Binary Format](/en/blockchain/binary-format/transaction-binary-format/ethereum-transaction-binary-format) article.

## Ride Structure

If an Ethereum transaction is verified by an asset script, the transaction is interpreted as [TransferTransaction](/en/ride/structures/transaction-structures/transfer-transaction) or [InvokeScriptTransaction](/en/ride/structures/transaction-structures/invoke-script-transaction). See details in the [Support in Ride](/en/keep-in-touch/metamask#support-in-ride) section.
