# [Ride v6] Limitations

:warning: This is the documentation for the Standard Library version 6, which is currently available for [Stagenet](/en/blockchain/blockchain-network/) only. [Go to Mainnet version](/en/ride/limits/)

| Limitation | Maximum value |
|---|---|
| dApp script size | 32 Kbytes |
| Account script or asset script size | 8 Kbytes |
| [Complexity](/en/ride/base-concepts/complexity) of each callable function of dApp script | 10,000 |
| Complexity of a call script | 10&nbsp;000 |
| Complexity of an account script | 2000 |
| Complexity of an asset script | 4000 |
| Total complexity for all callable functions, a call script and asset scripts involved in a single transaction<sup>(1)</sup>. The sender's account script complexity is not included in this limit | 26,000 |
| Total number of [dApp-to-dApp invocations](/en/ride/advanced/dapp-to-dapp) within a single transaction<sup>(1)</sup> | 100 |
| Complexity threshold for saving failed transactions: if a callable function or a call script failed with an error or throwing an exception before the threshold exceeded, the transaction<sup>(1)</sup> is rejected and the fee is not charged | 1000 |
| Complexity of the verifier function of a dApp script | 2000 |
| Sender complexity threshold: if the complexity of an account script or the verifier function of a dApp script exceeds this limit, the minimum fee for a transaction sent from the account is increased by 0.004 WAVES | 200 |
| Function name or variable name | 255 bytes |
| Size of [String](/en/ride/data-types/string) variable | 32,767 bytes |
| Size of [ByteVector](/en/ride/data-types/byte-vector) variable | 32,767 bytes (except `bodyBytes` field of transaction structure) |
| Data weight | See [Data Weight](/en/ride/limits/weight) |
| Number of callable function arguments | 22 |
| Number of payments attached to an invocation | 10 |
| Total number of [Issue](/en/ride/structures/script-actions/issue), [Reissue](/en/ride/structures/script-actions/reissue), [Burn](/en/ride/structures/script-actions/burn), [SponsorFee](/en/ride/structures/script-actions/sponsor-fee), [ScriptTransfer](/en/ride/structures/script-actions/script-transfer), [Lease](/en/ride/structures/script-actions/lease), and [LeaseCancel](/en/ride/structures/script-actions/lease-cancel) script actions executed by a call script and all callable functions in a single transaction<sup>(1)</sup> | 30 |
| Total number of [BinaryEntry](/en/ride/structures/script-actions/binary-entry), [BooleanEntry](/en/ride/structures/script-actions/boolean-entry), [DeleteEntry](/en/ride/structures/script-actions/delete-entry), [IntegerEntry](/en/ride/structures/script-actions/int-entry), [StringEntry](/en/ride/structures/script-actions/string-entry) script actions executed by a call script and all callable functions in a single transaction<sup>(1)</sup> | 100 |
| Total size of the data written to the [account data storage](/en/blockchain/account/account-data-storage), for all `BinaryEntry`, `BooleanEntry`, `IntegerEntry`, `StringEntry` structures in result of a callable function invocation or a call script execution | 5 Kbytes |

<sup>(1)</sup> Invoke Script transaction or Invoke Expression transaction.
