# Version 1.2 (Stagenet)

## Node Improvements

* Failed transactions. Invoke script transactions and exchange transactions are saved on the blockchain and a fee is charged for them even if the dApp script or the asset script failed, provided that the sender's signature or account script verification passed and the complexity of calculations performed during script invocation exceeded the threshold for saving failed transactions. [More details](/en/keep-in-touch/april)
* Implemented the feature of the deletion of the records from the account data storage. This action can be performed using a [data transaction](/en/blockchain/transaction-type/data-transaction) or the [DeleteEntry](/en/ride/structures/script-actions/delete-entry) structure of the Ride language.
* Implemented the feature of changing the asset name and description. For this means, the [update asset info transaction](/en/blockchain/transaction-type/update-asset-info-transaction) is used. Change is possible after 10 or more blocks on Stagenet and after 100,000 or more blocks on Mainnet and Testnet.
* The [minimum fee](/en/blockchain/transaction/transaction-fee) for the reissue transaction and sponsor fee transaction is reduced from 1 to 0.001 WAVES.
* [Issue transaction](/en/blockchain/transaction-type/issue-transaction)'s `name` and `description` fields type changed from bytes to string.
* [Transfer](/en/blockchain/transaction-type/transfer-transaction) and [mass transfer transaction](/en/blockchain/transaction-type/mass-transfer-transaction)'s attachment field type was changed to [union](/en/ride/data-types/union) `(type: Int|Boolean|ByteVector|String)`.
* The maximum data size in [data transaction](/en/blockchain/transaction-type/data-transaction) increased to 165890 bytes.
* [Exchange transaction](/en/blockchain/transaction-type/transfer-transaction) may contain buy and sell orders in any order.
* Binary transaction formats based on [protobuf](https://developers.google.com/protocol-buffers/docs/overview) are implemented.
* Changed the [orders](/en/blockchain/order)' price calculation formula. Earlier, when determining the price for assets with different numbers of decimal places, there was a price value size issue. The maximum value depended on the difference of decimal digits of assets. For example, the price for an [NFT](/en/blockchain/token/non-fungible-token) asset could not exceed 1000 WAVES. The modified formula corrects this problem. Decimal places no longer affect the maximum price.
* The mechanism for [generating blocks](/en/blockchain/block/block-generation/) has been improved through the use of [VRF](https://en.wikipedia.org/wiki/Verifiable_random_function) (Verifiable random function). This improvement allows withstanding stake grinding attacks, which are used by the attackers to try to increase the probability of generating a block for themselves.
* Changed the scheme for signing the block transactions by the mining node. Previously, the miner needed to sign the block header along with all transactions. Now [transactions root hash](/en/blockchain/block/merkle-root) is added to the header, so it is enough to sign only the header.
* The BLAKE2b-256 hash of the block header is used as the block unique identifier.

## REST API Updates

* Updated `GET /assets/details/{assetId}` endpoint. Multiple assets details can be acquired by passing the array of `assetId`. Response JSON now contains `originTransactionId` field which contains the ID of the transaction that issued the `{assetId}` asset. Also, the POST request can be made to this endpoint.
* Updated `GET /assets/nft/{address}/limit/{limit}` endpoint. Response JSON now includes `assetDetails` array containing the list of NFT assets belonging to the designated address. Also, the POST request can be made to this endpoint.
* Implemented the `GET /transactions/merkleProof?id=some1&id=some2` endpoint. This endpoint gets the transaction ID or the array of transactions IDs and returns the array of proofs for checking that the transaction is in a block.
* Added the `id` and `transactionsRoot` to the following endpoints:
  * `GET /blocks/headers/last`
  * `GET /blocks/headers/seq/{from}/{to}`
  * `GET /blocks/headers/at/{height}`
  * `GET /blocks/at/{height}`
  * `GET /blocks/signature/{signature}`
  * `GET /blocks/address/{address}/{from}/{to}`
  * `GET /blocks/last`
  * `GET /blocks/seq/{from}/{to}`
* Added the `applicationStatus` field to the following endpoints:
   * `GET /blocks/{id}`
   * `GET /blocks/address/{address}/{from}/{to}`
   * `GET /blocks/at/{height}`
   * `GET /blocks/last`
   * `GET /blocks/seq/{from}/{to}`
   * `GET /debug/stateChanges/address/{address}/limit/{limit}`
   * `GET /debug/stateChanges/info/{id}`
   * `GET /transactions/address/{address}/limit/{limit}`
   * `GET /transactions/info/{id}`
   * `GET /transactions/status`
   * `POST /transactions/status`

   `"applicationStatus": "scriptExecutionFailed"` means that the dApp script or the asset script failed.

* The following endpoints return results of token issue, reisse, burning and sponsorship setups for invoke script transactions, and the `errorMessage` structure indicating script failure reason for failed transactions:
   * `/debug/stateChanges/address/{address}/limit/{limit}`
   * `/debug/stateChanges/info/{id}`

* The following endpoints, in addition to the total script complexity, provide the complexity of each callable function and the verifier function of dApp scripts:
   * `GET /addresses/scriptInfo/{address}`
   * `POST /utils/script/compileCode`
   * `POST /utils/script/estimate`

## Ride Improvements

* Version 4 of the Ride [standard library](/en/ride/script/standard-library) was issued.
* Added script actions that the callable function of dApp can perform:
   * [Issue](/en/ride/structures/script-actions/issue)
   * [Reissue](/en/ride/structures/script-actions/reissue)
   * [Burn](/en/ride/structures/script-actions/burn)
   * [SponsorFee](/en/ride/structures/script-actions/sponsor-fee)
   * [BooleanEntry](/en/ride/structures/script-actions/boolean-entry), [BinaryEntry](/en/ride/structures/script-actions/binary-entry), [IntegerEntry](/en/ride/structures/script-actions/int-entry), [StringEntry](/en/ride/structures/script-actions/string-entry) that add or update the [account data storage](/en/blockchain/account/account-data-storage) entries of the corresponding type. These actions replace [DataEntry](/en/ride/structures/script-actions/data-entry) that is not supported in version 4.
   * [DeleteEntry](/en/ride/structures/script-actions/delete-entry) that deletes the account data storage entry.
* The [callable](/en/ride/functions/callable-function) function result format is modified. Since version 4 the result is the list of script actions. The `ScriptResult`, `WriteSet` and `TransferSet` structures are not supported.
* Invoke script transaction's fee increased by 1 WAVES for each non-NFT asset issued by the transaction's Issue structure.
* List of primitives can be used as a callable function argument.
* dApp can process up to two payments attached to the invoke script transaction.
* Added the following built-in functions:
   * [bn256groth16Verify](/en/ride/functions/built-in-functions/verification-functions#bn256groth16verify) range of functions that verify the zero-knowledge proof [zk-SNARK](https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b). Complexity is 800–1650 depending on the argument size limit.
   * [calculateAssetId](/en/ride/functions/built-in-functions/blockchain-functions#calculate) that calculates ID of asset generated by the [Issue](/en/ride/structures/script-actions/issue) structure when executing a dApp script. Complexity is 10.
   * [contains](/en/ride/functions/built-in-functions/string-functions#contains-string-string-boolean) that checks whether the second argument (substring) is contained in the first string argument. Complexity is 3.
   * [containsElement](/en/ride/functions/built-in-functions/list-functions#containselement) that check if the element is in the list. Complexity is 5.
   * [createMerkleRoot](/en/ride/functions/built-in-functions/verification-functions##createmerkleroot) that calculates [transactions root hash](/en/blockchain/block/merkle-root). Complexity is 30.
   * [ecrecover](/en/ride/functions/built-in-functions/verification-functions#ecrecover) — recovers public key from the message hash and the [ECDSA](https://en.wikipedia.org/wiki/ECDSA) digital signature. Complexity is 70.
   * [makeString](/en/ride/functions/built-in-functions/string-functions#makestring-list-string-string-string) — concatenates list strings adding a separator. Complexity is 10.
   * [groth16Verify](/en/ride/functions/built-in-functions/verification-functions#groth16verify) range of functions that verify the zero-knowledge proof [zk-SNARK](https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b). Complexity is 1200–2700 depending on the argument size limit.
   * [indexOf](/en/ride/functions/built-in-functions/list-functions#indexof) that returns the index of the first occurrence of the element in the list. Complexity is 5.
   * [lastIndexOf](/en/ride/functions/built-in-functions/list-functions#lastindexof) that returns the index of the last occurrence of the element in the list. Complexity is 5.
   * [max](/en/ride/functions/built-in-functions/list-functions#max) that returns the largest element in the list. Complexity is 3.
   * [median](/en/ride/functions/built-in-functions/math-functions#median) that calculates a median of the list of integers. Complexity is 20.
   * [min](/en/ride/functions/built-in-functions/list-functions#min) that returns the smallest element in the list. Complexity is 3.
   * [removeByIndex](/en/ride/functions/built-in-functions/list-functions#removebyindex) that removes an element from the list by index. Complexity is 7.
   * [transferTransactionFromProto](/en/ride/functions/built-in-functions/converting-functions#transfertransactionfromproto) — deserializes a transfer transaction. Complexity is 5.
   * [valueOrElse(t: T|Unit, t0 : T)](/en/ride/functions/built-in-functions/union-functions#valueOrElse) that returns a value from the union type if it's not [unit](/en/ride/data-types/unit). Complexity is 2.
* The [wavesBalance](/en/ride/functions/built-in-functions/account-data-storage-functions#waves-balance) built-in function returns the [BalanceDetails](/en/ride/structures/common-structures/balance-details) structure which contains all types of WAVES balances.
* Added `name` and `description` fields to the [Asset](/en/ride/structures/common-structures/asset) structure which is returned by the [assetInfo](/en/ride/functions/built-in-functions/blockchain-functions#assetinfo) built-in function.
* For the built-in [hashing functions](/en/ride/functions/built-in-functions/hashing-functions) `blakeb256`, `keccak256`, `sha256` and the built-in [verification functions](/en/ride/functions/built-in-functions/verification-functions) `rsaVerify`, `sigVerify` the complexity is changed in version 4 along with adding the range of similar functions with different complexity depending on the argument size limit. When data size is known in advance, the “cheaper” function can be used.
* Changed the complexity of certain built-in functions and operators. Changes are listed in the [Built-in Functions](/en/ride/functions/built-in-functions/) article.
* Added the following list operators:
   * ++ for the concatenation of lists. Example: the result of `[1, 2] ++ [3, 4]` is `[1, 2, 3, 4]`. Complexity is 4.
   * `:+` for adding an element to the end of the list. Example: the result of `["foo","bar"] :+ "baz"` is `["foo", "bar", "baz"]`. Complexity is 1.
* Added the [Tuple](/en/ride/data-types/tuple) data type.
* The maximum complexity of account script and verifier function of dApp script is changed to 2000 for new scripts, regardless of the Standard library version.
   The maximum complexity of asset script and callable function of dApp script remains 4000.
* The maximum data size is changed:
   * [String](/en/ride/data-types/string): 32,767 bytes
   * [ByteVector](/en/ride/data-types/byte-vector): 32,767 bytes (except the `bodyBytes` field of the transaction structure)

## Waves Explorer

<https://stagenet.wavesexplorer.com/stagenet>

* Transactions with failed dApp script or asset script results are now displayed, and marked with ![](./_assets/stop.png) icon in lists of transactions.
* Added support of two payments for invoke script transactions. The dApp script result is displayed as a table.
* Added display of the new transaction type: update asset info transaction.
* Added support of all types of attachements for transfer transactions and mass transfer transactions.
* Added the link to the issue transaction on the asset information page.
* Added Block ID field to the block information page.

## Activation

To activate the improvements listed above, vote for feature #15 “Ride V4, VRF, Protobuf, Failed transactions”.
