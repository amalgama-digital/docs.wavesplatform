# SponsorFee

> :warning: The `SponsorFee` structure is added in Standard library **version 4** which becomes available since node version 1.2.0, after activation of feature #15 “Ride V4, VRF, Protobuf, Failed transactions”. Versions 1.2.x are currently available on [Stagenet](/en/blockchain/blockchain-network/) only.

`SponsorFee` is a structure that sets up sponsorship. For information about sponsorship, see the [Spensored Fee](/en/blockchain/waves-protocol/sponsored-fee) article. The sponsorship setup is performed only if the structure is included in the resulting expression of the callable function. See details in the [Callable Function](/en/ride/functions/callable-function) article.

## Constructor

```ride
SponsorFee(assetId: ByteVector, minSponsoredAssetFee: Int|Unit)
```

## Fields

| # | Name | Data type | Description |
| :--- | :--- | :--- | :--- |
| 1 | assetId | [ByteVector](/en/ride/data-types/byte-vector) | Asset ID. Any asset (except smart assets) issued by the dApp account is acceptable, including an asset issued by the same script invocation |
| 2 | minSponsoredAssetFee | [Int](/en/ride/data-types/int)&#124;[Unit](/en/ride/data-types/unit) | Amount of sponsored asset that is equivalent to 0.001 WAVES, specified in the minimum fraction (“cent”) of the sponsored asset.<br>`unit` — disable the sponsorship |

## Example

```
{-# STDLIB_VERSION 4 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}
  
@Callable(i)
func issueAndSponsor() = {
  let issue = Issue("Spring", "", 100000, 2, true, unit, 0)
  let id = calculateAssetId(issue)
  [
    issue,
    SponsorFee(id, 300)
  ]
}
```

The `issueAndSponsor` callable function issues an asset and enables sponsorship. The minimum fee in sponsored asset is 3 Spring.
