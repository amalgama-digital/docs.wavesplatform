# Sign transactions and orders in MetaMask (Stagenet)

[Metamask](https://metamask.io/) is a browser extension popular with Ethereum users. MetaMask provides a cryptocurrency wallet and a way to interact with decentralized applications.

To enable MetaMask users to perform actions on the Waves blockchain, the Waves protocol adds:
* support for Ethereum transactions,
* support for ECDSA signed orders in an [Exchange transaction](/en/blockchain/transaction-type/exchange-transaction).

As a result, MetaMask users are now able to:
* transfer tokens: both native WAVES token and custom tokens;
* invoke a dApp script;
* sign an exchange order.

Application developers can use [Signer](/en/building-apps/waves-api-and-sdk/client-libraries/signer) library together with [ProviderMetamask](https://github.com/wavesplatform/provider-metamask) to sign and send transactions on behalf of the MetaMask user.

MetaMask support is added in node version 1.4.0 and enabled by feature #17 “Ride V6, MetaMask support, Invoke Expression”. Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## User Address

An address of a MetaMask user consists of 20 bytes. A Waves address also contains 20 significant bytes, with addition of a prefix that is the same for all addresses of the blockchain network and a checksum (see also [Address Binary Format](/en/blockchain/binary-format/address-binary-format)). So, each address in MetaMask corresponds to a single Waves address and vice versa: the same 20 bytes are used as the address in the Ethereum representation and as the basis of the address in the Waves format.

:warning: If you generate a key pair and an address from the MetaMask seed phrase according to Waves rules (see [Cryptographic practical details](/en/blockchain/waves-protocol/cryptographic-practical-details)), you get **another** account; its address does not match the address of the MetaMask user converted to the Waves format. There is no way to get the Waves seed phrase from the MetaMask seed phrase so that they generate the same address.

In UIs, the MetaMask user address is represented in HEX encoding, and the Waves address in base58. To convert the address from one format to another, use:
* [Waves Explorer](https://stagenet.wavesexplorer.com/converters),
* `wavesAddress2eth` and `ethAddress2waves` functions of [node-api-js](https://github.com/wavesplatform/node-api-js) library.

## Connect to Waves Network

A Waves node provides RPC API functions required for using MetaMask.

MetaMask can be connected to the Waves network manually or programmatically.

To connect manually, a user selects “Custom RPC” in the list of networks and specifies the connection parameters:

* Network Name: for example, Waves Stagenet.
* New RPC URL: the URL of a Waves node with an open RPC API, for example, the URL of the pool of public nodes `https://nodes-stagenet.wavesnodes.com/eth`.
* Chain ID: 83 for Stagenet.
* Currency Symbol: WAVES.

To connect programmatically, a web app can use the [Signer](/en/building-apps/waves-api-and-sdk/client-libraries/signer) library with [ProviderMetamask](https://github.com/wavesplatform/provider-metamask):
1. The app calls the `login()` function.
2. Signer calls the corresponding function of ProviderMetamask, and ProviderMetamask calls the MetaMask API.
3. MetaMask opens a window where the user confirms the connection to the network.
4. After receiving the confirmation, MetaMask creates the connection and returns the address of the user.

As a result, MetaMask displays the Waves network as available, and the `login()` function returns the user address in Waves format.

For a programmatic connection example, see the [MetaMask Usage Examples](#examples) below.

## Token Transfer

To transfer a token from MetaMask wallet, a user should:

1. Connect the Waves network (see above).

   The balance of WAVES is displayed automatically. To add a balance display for a custom token, the user should specify the Token Contract Address that is the first 20 bytes of the token ID, HEX encoded.

2. Transfer the token to another address. The address should be specified in Ethereum representation.

MetaMask creates the transaction in Ethereum format, signs it with the user's private key, and sends the transaction to the Waves node.

> Users of Waves wallets such as Waves.Exchange, WavesFX and others (applications developed by third-party teams from the community) can transfer tokens to a MetaMask user. Some wallets only support Waves addresses, so you should first convert the recipient address from Ethereum representation to Waves. As a result, a regular [Transfer transaction](/en/blockchain/transaction-type/transfer-transaction) is created, and the recipient will see the received tokens in MetaMask (for custom token, the recipient should add a balance display first).

To convert the token ID from one format to another, use:
* [Waves Explorer](https://stagenet.wavesexplorer.com/converters)
* `/eth/assets` endpoint of Node REST API that returns token parameters by ID in Ethereum representation.

## Script Invocation

A web app can invoke a dApp script on behalf of a MetaMask user, using the [Signer](/en/building-apps/waves-api-and-sdk/client-libraries/signer) library with [ProviderMetamask](https://github.com/wavesplatform/provider-metamask):

1. The app builds and sends an Invoke Script transaction using the `invoke({...}).broadcast()` function.
2. Signer calls the corresponding ProviderMetamask function, and ProviderMetamask calls the MetaMask API.
3. MetaMask opens a window where the user can view the details of the transaction, confirm it or reject.
4. Having received the user's confirmation, MetaMask generates an Ethereum transaction with ECDSA signature and sends the transaction to a Waves node via the RPC API.
5. MetaMask displays the transaction status.

Notes:
- MetaMask does not support signing a transaction without broadcasting it, so the `sign()` function of Signer should not be used.
- Waves node does not support transaction speeding up or cancellation and only processes the original transaction.

For an example of invoking the script, see the [MetaMask Usage Examples](#examples) below.

## Ethereum Transaction Features

* Transaction cannot be sent from a smart account or dApp, since a MetaMask user can only transfer tokens and invoke dApp scripts and cannot assign a script to their account.
* [Sponsored fee](/en/blockchain/waves-protocol/sponsored-fee) is not available: the transaction fee can only be specified in WAVES.

See also [Ethereum Transaction Binary Format](/en/blockchain/binary-format/transaction-binary-format/ethereum-transaction-binary-format).

## Exchange Order

In an [Exchange transaction](/en/blockchain/transaction-type/exchange-transaction) one of the orders (or both) may have an ECDSA signature. ECDSA signatures are only supported on version 4 orders.

1. The app calls the `signOrder()` function of ProviderMetamask passing order parameters.

    * Asset IDs should be specified in Waves format: 32 bytes in base58; for WAVES, asset ID should be `WAVES`.
    * `senderPublicKey` must be omitted.

2. ProviderMetamask passes an order to MetaMask as a data structure according to [EIP-712](https://eips.ethereum.org/EIPS/eip-712).
3. MetaMask opens a window where the user can see order details, confirm it or reject.
4. MetaMask returns the ECDSA signature for this data structure.
5. The app passes the signed order to the matcher.
6. The matcher executes orders and creates Exchange transactions.

## Support in Ride

If an Ethereum transaction invokes a dApp script, the [Invocation](/en/ride/structures/common-structures/invocation) structure that is available to the callable function contains:
- in the `caller` and `originCaller` fields: the sender's address in Waves format (26 bytes),
- in the `callerPublicKey` and `originCallerPublicKey` fields: the public key of MetaMask user (64 bytes).

If an Ethereum transaction is verified by an asset script, the transaction is interpreted as [TransferTransaction](/en/ride/structures/transaction-structures/transfer-transaction) or [InvokeScriptTransaction](/en/ride/structures/transaction-structures/invoke-script-transaction):
- the `sender` field contains the sender's address in Waves format (26 bytes),
- the `senderPublicKey` field contains the public key of MetaMask user (64 bytes).
- the `bodyBytes` field is empty,
- the `version` field is 0.

> A transaction signature is not available in an asset script.

An Ethereum transaction is never verified by a smart account or a dApp script verifier function, since the Ethereum transaction cannot be sent from a smart account or dApp.

The [addressFromPublicKey](/en/ride/v6/functions/built-in-functions/converting-functions#addressfrompublickey-bytevector-address) function accepts both Waves account public key (32 bytes) and the MetaMask account public key (64 bytes) and returns address in Waves format (26 bytes).

The [transferTransactionById](/en/ride/functions/built-in-functions/blockchain-functions#transtransactionbyid) function returns an Ethereum transaction by its ID if the transaction is interpreted as a Transfer transaction. The `proofs` array contains 8 empty values.

## MetaMask <a id="examples">Usage Examples

### Invoke Script

You can see an example of connecting to the Waves network and signing an Invoke Script transaction in the [Waves Dapp Ui](https://dev-dapps.wavesplatform.com).

Click **Sign In** and select **Sign in with Metamask**. In MetaMask, confirm the connection to the network. Waves Dapp Ui by default displays the user address in Waves format, and the ![](./_assets/waves-addr-button.png) and ![](./_assets/eth-addr-button.png) buttons switch the address format.

> To get WAVES to pay transaction fees, copy the address in Waves format and use [Stagenet Faucet](https://stagenet.wavesexplorer.com/faucet).

Paste the address of any smart contract on Stagenet, such as [3MRuzZVauiiX2D2DGwNyP8Tv7idDGUy1VG5bJ](https://waves-dapp.com/3MRuzZVauiiX2DGwNyP8Tv7idDGUy1VG5bJ). Specify the callable function arguments and payments (if necessary). Confirm the transaction in MetaMask. The transaction status is displayed in MetaMask on the **Activity** tab with a slight delay.

The transaction link displayed by MetaMask opens the transaction page in Waves Explorer.

Example code is given in [ProviderMetamask documentation](https://github.com/wavesplatform/provider-metamask/blob/master/README.md). Install ProviderMetamask and the latest version of Signer for your app.

### Sign Order

You can see an example of order signing on the [Dapp test](https://metamask.wvservices.com/metamask/) page.

In the **Order** field fill in the order parameters and click **Sign order**. In MetaMask, allow access to your public key, then confirm the data signing. The order signature will appear on the Dapp test page in the **result** field.

Example code is given in [ProviderMetamask documentation](https://github.com/wavesplatform/provider-metamask/blob/master/README.md).
