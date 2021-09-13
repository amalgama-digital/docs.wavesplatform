# Sign transactions and orders in MetaMask (Stagenet)

[Metamask](https://metamask.io/) is a browser extension popular with Ethereum users. MetaMask provides a cryptocurrency wallet and a way to interact with decentralized applications.

To attract MetaMask users to the Waves blockchain, the Waves protocol adds:
* support for Ethereum transactions,
* support for ECDSA signed orders in an [Exchange transaction](/en/blockchain/transaction-type/exchange-transaction).

As a result, MetaMask users are now able to:
* transfer tokens:  both native token WAVES and custom tokens;
* invoke a dApp script;
* sign an exchange order.

MetaMask support is added in node version 1.4.0 and enabled by feature #17 "Ride V6". Versions 1.4.x are now available for [Stagenet](/en/blockchain/blockchain-network/) only.

## User Address

An address of a MetaMask user consists of 20 bytes. A Waves address also contains 20 significant bytes, with addition of a prefix that is the same for all addresses of the blockchain network and a checksum (see also [Address Binary Format](/en/blockchain/binary-format/address-binary-format)). So, each address in MetaMask corresponds to a single Waves address and vice versa: the same 20 bytes are used as the address in the Ethereum representation and as the basis of the address in the Waves format.

In UIs, the MetaMask user address is represented in HEX encoding, and the Waves address in base58. You can use [Waves Explorer](/en/ecosystem/waves-explorer/) to convert the address from one format to another.

## Connect to Waves Network

A Waves node provides RPC API functions required for using MetaMask.

To connect the Waves network, a user selects “Custom RPC” in the list of networks and specifies the connection parameters:

* Network Name: for example, Waves Stagenet.
* New RPC URL: the URL of a Waves node with an open RPC API, for example, the URL of the pool of public nodes `https://nodes-stagenet.wavesnodes.com/`.
* Chain ID: 83 for Stagenet.
* Currency Symbol: WAVES.

As a result, MetaMask displays the Waves network as available.

Connection to the Waves network can also be done programmatically. For example, a web app can use the [Signer](/en/building-apps/waves-api-and-sdk/client-libraries/signer) library with ProviderMetaMask:
1. The application calls the `login()` function.
2. Signer calls the corresponding function of ProviderMetaMask, and ProviderMetaMask calls the MetaMask API.
3. MetaMask opens a window where the user confirms the connection to the network.
4. After receiving the confirmation, MetaMask adds the connection and returns the address of the user.

## Token Transfer

To transfer a token from MetaMask wallet, a user should:

1. Connect the Waves network (see above).

   The balance of WAVES is displayed automatically. To add a balance display for a custom token, the user should specify the Token Contract Address that is the first 20 bytes of the token ID, HEX encoded.

2. Transfer the token to another address. The address should be specified in Ethereum representation.

MetaMask creates the transaction in Ethereum format, signs it with the user's private key, and sends the transaction to the Waves node.

> Users of Waves wallets such as Waves.Exchange, WavesFX and others (applications developed by third-party teams from the community) can transfer tokens to a MetaMask user. Some wallets only support Waves addresses, so you should first convert the recipient address from Ethereum representation to Waves. As a result a regular [Transfer transaction](/en/blockchain/transaction-type/transfer-transaction) is created, and the recipient will see the received tokens in MetaMask (for custom token, the recipient should add a balance display first).

## Script Invocation

A web app can invoke a dApp script on behalf of a MetaMask user, using the [Signer](/en/building-apps/waves-api-and-sdk/client-libraries/signer) library with ProviderMetaMask:

1. The app builds an Invoke Script transaction using the `invoke()` function and calls the `signAndBroadcast()` function.
2. Signer calls the corresponding ProviderMetaMask method, and ProviderMetaMask calls the MetaMask API.
3. MetaMask opens a window where the user can view the details of the transaction, confirm or reject it.
4. Having received the user's confirmation, MetaMask generates an Ethereum transaction with ECDSA signature and sends the transaction to a Waves node via the RPC API.
5. MetaMask displays the transaction status.

Notes:
- MetaMask does not support signing a transaction without broadcasting it, so the `sign()` method should not be used.
- Waves node does not support transaction speeding up or cancellation. Speeding up creates a new transaction with a different `timestamp`, so both transactions may be added to the blockchain. Cancellation of the transaction is rejected by the node.

## Ethereum Transaction Features

* Transaction cannot be sent from a smart account or dApp, since a MetaMask user can only transfer tokens and invoke dApp scripts and cannot assign a script to their account.
* [Sponsored fee](/en/blockchain/waves-protocol/sponsored-fee) is not available: the transaction fee can only be specified in WAVES.

See also [Ethereum Transaction Binary Format](/en/blockchain/binary-format/transaction-binary-format/ethereum-transaction-binary-format).

## Exchange Order

In an [Exchange transaction](/en/blockchain/transaction-type/exchange-transaction) one of the orders (or both) may have an ECDSA signature. ECDSA signatures are only supported on version 4 orders.

1. An exchange UI passes an order to MetaMask as a data structure according to [EIP-712](https://eips.ethereum.org/EIPS/eip-712).
2. MetaMask opens a window where the user can see order details, sign it or reject it.
3. MetaMask returns the ECDSA signature for this data structure.
4. The exchange UI passes the signed order to the matcher.
5. The matcher executes orders and creates exchange transactions.

## Support in Ride

The [addressFromPublicKey](/en/ride/v6/functions/built-in-functions/converting-functions#addressfrompublickey-bytevector-address) function accepts both Waves account public key (32 bytes) and the MetaMask account public key (64 bytes) and returns address in Waves format (26 bytes).

If an Ethereum transaction invokes a dApp script, the [Invocation](/en/ride/structures/common-structures/invocation) structure, available to the callable function, contains:
- in the `caller` and `originCaller` fields: the sender's address in Waves format (26 bytes),
- in the `callerPublicKey` and `originCallerPublicKey` fields: the public key of MetaMask user (64 bytes).

If an Ethereum transaction is verified by an asset script, the transaction is interpreted as [TransferTransaction](/en/ride/structures/transaction-structures/transfer-transaction) or [InvokeScriptTransaction](/en/ride/structures/transaction-structures/invoke-script-transaction):
- the `sender` field contains the sender's address in Waves format (26 bytes),
- the `senderPublicKey` field contains the public key of MetaMask user (64 bytes).
- the `bodyBytes` field is empty.

> A transaction signature is not available in an asset script.

An Ethereum transaction is never verified by a smart account or a dApp script verifier function, since th Ethereum transaction cannot be sent from a smart account or dApp.
