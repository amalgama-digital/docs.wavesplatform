# Asset

Structure of a [token](/en/blockchain/token/). The structure is returned by the [assetInfo](/en/ride/functions/built-in-functions/blockchain-functions#assetinfo) built-in function.

## Constructor

For [Standard library](/en/ride/script/standard-library) **version 3**:

``` ride
Asset(id: ByteVector, quantity: Int, decimals: Int, issuer: Address, issuerPublicKey: ByteVector, reissuable: Boolean, scripted: Boolean, sponsored: Boolean)
```

For Standard library **version 4**:

``` ride
Asset(id: ByteVector, quantity: Int, decimals: Int, issuer: Address, issuerPublicKey: ByteVector, reissuable: Boolean, scripted: Boolean, minSponsoredFee: Int|Unit, name: String, description: String)
```

[Standard library](/en/ride/script/standard-library) **version 4** is available since node version 1.2.0 after activation of feature #15 “Ride V4, VRF, Protobuf, Failed transactions”. Node versions 1.2.x are currently available on [Stagenet](/en/blockchain/blockchain-network/) only.

## Fields

|   #   | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | id | [ByteVector](/en/ride/data-types/byte-vector) | [Token ID](/en/blockchain/token/token-id) |
| 2 | quantity | [Int](/en/ride/data-types/int) | Amount of issued token, multiplied by 10<sup>decimals</sup>. Up to 9&nbsp;223&nbsp;372&nbsp;036&nbsp;854&nbsp;775&nbsp;806 |
| 3 | decimals | [Int](/en/ride/data-types/int) | Number of decimal places, 0 to 8 |
| 4 | issuer | [Address](/en/ride/structures/common-structures/address) | [Address](/en/blockchain/account/address) of the [account](/en/blockchain/account/) that issued a token |
| 5 | issuerPublicKey | [ByteVector](/en/ride/data-types/byte-vector) | Public key of the account that issued a token |
| 6 | reissuable | [Boolean](/en/ride/data-types/boolean) | true — token can be reissued, false — cannot be reissued |
| 7 | scripted | [Boolean](/en/ride/data-types/boolean) | true — [smart asset](/en/building-apps/smart-contracts/what-is-smart-asset), false — regular token |
| 8 | sponsored | [Boolean](/en/ride/data-types/boolean) | true — sponsorship is enabled, false — sponsorhip is disabled.<br>:warning: The field is deleted in Standard library version 4 |
| 9 | minSponsoredFee | [Int](/en/ride/data-types/int)&#124;[Unit](/en/ride/data-types/unit) | Amount of asset that is equivalent to 0.001 WAVES (100,000 WAVELET), specified in the minimum fraction (“cents”) of asset. See the [Sponsored fee](/en/blockchain/waves-protocol/sponsored-fee) article<br>`unit`: sponrship is disables.<br>The field is added in Standard library version 4 |
| 10 | name | [String](/en/ride/data-types/string) | Token name, up to 16 characters.<br>The field is added in Standard library version 4 |
| 11 | description | [String](/en/ride/data-types/string) | Token description, up to 1000 characters.<br>The field is added in Standard library version 4 |
