# Leased Proof of Stake

**Leased Proof of Stake (LPoS)** is an enhanced type of proof of stake [consensus algorithm](https://en.wikipedia.org/wiki/Consensus_%28computer_science%29) by which the Waves blockchain network aims to achieve the distributed consensus to secure the network.

## Leasing benefits for the node owner

[Nodes](/en/blockchain/node/) can use the leased tokens to generate blocks and get the [mining reward](/en/blockchain/mining/mining-reward). For that purpose, the generating balance of a node must be at least 1000 WAVES.

> In the [node configuration file](/en/waves-node/node-configuration), Use the `enable` parameter to start generating blocks on your node. By default, it’s enabled, but if you disable it your node won’t generate blocks.

## Leasing benefits for the token holder

LPoS allows the token holders to lease their tokens to the Waves nodes and earn a percentage of the payout as a reward.

By using LPoS, leasers will be able to participate in the process of generating new blocks because the larger the amount that is leased to a Waves node, the higher the chances for that node to be selected to generate the next block. If that node is selected, then the leaser will receive a reward.

When the user starts leasing the tokens, those leased tokens are locked and remained in the same address with the full control of their owner (They are not transferred to the node, they just remain unspendable until the lease is canceled by the leaser).

The only thing to consider when leasing is to choose the right node operator, as the operator's node may work with different efficiency and send back different percentages as rewards.

> Fair Proof of Stake is used to select a miner to generate the next block, See [FPoS paper](https://forum.waves.tech/uploads/default/original/2X/7/7397a4cb5fa77d659a7b7ecc9188dd0a4fe0decc.pdf) for more technical details.

### Rewards

* The node owner may send to leaser a part of rewards according to his conditions.
* The more transactions that are made on the network, the more rewards leasers get.
* These rewards mostly are in WAVES but also they can be in the form of different tokens with the unique Waves feature where different tokens can be accepted as a fee.

## LPoS transactions

To start leasing, the token holder needs to create a lease transaction and specify the recipient address \(node address\) along with the amount of WAVES to lease.

There are two types of transactions which are used in the LPoS:

1. [Lease transaction](/en/blockchain/transaction-type/lease-transaction) to activate the leasing process.
2. [Lease cancel transaction](/en/blockchain/transaction-type/lease-cancel-transaction) to deactivate the leasing process.

There are the following options to create the transaction:
* In [Waves.Exchange](https://waves.exchange/) app developed by the third-party team from the community. See the [Lease Waves Tokens](https://docs.waves.exchange/en/waves-exchange/waves-exchange-online-desktop/online-desktop-account/online-desktop-lease) article in Waves.Exchange documentation.
* Using [client libraries](/en/building-apps/waves-api-and-sdk/client-libraries/). See also the [Creating and broadcasting transactions to the blockchain](/en/building-apps/how-to/basic/transaction) article.
