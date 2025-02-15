# Block Generation FAQ

This article provides answers for frequently asked questions about block generation.

## `My node is running but it does not generate blocks. What do I do?`

**Answer**:

* Check your [generating balance](/en/blockchain/account/account-balance#account-balance-in-waves-token). To start generating blocks, you need to have 1000 WAVES on your balance during 1000 blocks (including WAVES leased to the node). [How to check or top up balance](/en/blockchain/account/account-balance#top-up-and-view-account-balance).

* Check that there is no script assigned to node's account.

* Make sure that the node is not on fork. [How to detect and fix fork](/en/waves-node/#deal-with-forks).

* Make sure that the node wallet is properly setup. To do this, in the `waves.log` file find messages about the node's attempts to generate blocks (`Next attempt`) and check the address (`acc=`) of the generating node. If the address does not match the address of your node, check the [wallet settings](/en/waves-node/node-configuration#wallet-settings) in your node configuration file.

* Make sure that the node has enough connections to the peers (other nodes).
To do this, in the node configuration file check the line with parameter [`waves.miner.quorum`](/en/waves-node/node-configuration#miner-settings) (by default `quorum` = 1). This parameter allows to specify the minimal number of connections to peers required to start generating blocks. If the node fails to connect to the specified number of peers (for example, due to bad internet connection or the node being blacklisted), the block generation will be suspended. You can check your current connections to peers with [GET /peers/connected](https://nodes.wavesnodes.com/api-docs/index.html#/peers/getConnectedPeers) API operation. You can get the list of blacklisted nodes with [GET /peers/blacklisted](https://nodes.wavesnodes.com/api-docs/index.html#/peers/getBannedPeers) API operation.

## `Where can I find waves.log file?`

**Answer**: If your node is installed from Deb-package, by default the `waves.log` file is located in `/var/log/waves/` folder, in other cases in `${waves.directory}/logs/` folder. By default the log files can be read only by the user running the node. [Read more about logging](/en/waves-node/logging-configuration).

## `My node is running (not on fork), the balance is more than 1000 WAVES, the records in waves.log file display correct generating node address (acc=), however the node does not generate blocks. Why?`

**Answer**: Block generation process is probabilistic and is going on in accordance with [LPoS](/en/blockchain/glossary#lpos) algorithm. The chances to generate block are proportional to the node's generating balance. The minimal generating balance (1000 WAVES) provides the lowest chances to generate block (1 block or less per month). [Read more about generating nodes performance](#how-many-blocks-can-a-node-generate-per-day-month). Every node begins to generate block independently in the time allowed by the algorithm. There is always a chance that another node starts to generate block earlier than yours. You can detect the reason why your node failed to generate block by looking through the records (`Next attempt`) of the attempts to generate in `waves.log` file. In the records, you can also review which node successfully generated block.

## `How to check that the node makes attempts to generate blocks?`

**Answer**: In the `waves.log` file check the records (`Next attempt`) indicating the attempts to generate blocks.

Find the records with the following grep command:

```bash
sudo grep "Next attempt\|Forging\| Block(" /var/log/waves/waves.log
```

**Example of the generating attempt record**:

```bash
2020-09-07 10:27:55,076 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 508.710 seconds
2020-09-07 10:27:55,147 DEBUG [ecution-context-global-48] c.w.s.a.BlockAppender$ - [2ecdf572 134.209.30.86:56992] Appended Block(DeB2bwPeJkpDMpLEvHm8MRg3axpYtwupMZi5uRigrLZo,CPX3P6rvYttUhUFtM2MTHdJ4AALFyfdfDey5oH9CGJXP,3PJEPHsDNtfDRxxaja8wEp3mCXp5kpLYsLS,1599474474614,[])
2020-09-07 10:29:50,072 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 457.722 seconds
2020-09-07 10:29:50,161 DEBUG [ecution-context-global-48] c.w.s.a.BlockAppender$ - [7895562c 173.249.1.184:60940] Appended Block(2fXUoLdh4XmDkuTfdZ7bPyvubBfEdhQ989X5P27nbHby,8hs8fTy52sJyzJwxMb75A38JAxsEPjycMTyfCbbrW9XB,3PEFQiFMLm1gTVjPdfCErG8mTHRcH2ATaWa,1599474589929,[],600000000)
```

This example record indicates that the node `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` received block `DeB2bwPeJkpDMpLEvHm8MRg3axpYtwupMZi5uRigrLZo` and at `2020-09-07 10:27:55,076` the node planned an attempt to generate the next block in `508.710` seconds (~ at 10:34:23). The response also says that the processing of block `DeB2bwPeJkpDMpLEvHm8MRg3axpYtwupMZi5uRigrLZo` is complete and then the node received the next validated block `2fXUoLdh4XmDkuTfdZ7bPyvubBfEdhQ989X5P27nbHby` generated by `3PEFQiFMLm1gTVjPdfCErG8mTHRcH2ATaWa` node at `2020-09-07 10:29:50,072` (earlier than the node `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` planned generating the next block). In this case the node `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` did not succeed to generate new block at 10:34:23 because the new block was generated earlier by another node `3PEFQiFMLm1gTVjPdfCErG8mTHRcH2ATaWa`.

## `How to detect that the node generated block?`

**Answer**: In the `waves.log` file find `Forged and applied...` records.

**Example of the successful generating attempt record**:

```bash
2020-09-06 04:06:13,517 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 41.305 seconds
2020-09-06 04:06:13,556 DEBUG [ecution-context-global-48] c.w.s.a.BlockAppender$ - [560c392d 5.189.182.6:52504] Appended Block(3bQwytTjwQCkQs2DWuoR5oqNKFtjAyDSftHQXrW2ALLQ29MpVBuX96231JW9joTGsYbbuyHaEuhrfUVvgFxdnJBs,2rTRaJqMrp2L3HvUfJ4FRQQGZGPM23kHVdhy1pAQucHLAvyG7QEHy6mMw9MfV7cjf7r2BDWYeyv7Eih3Uz83yVog,3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb,1599365173456,[],600000000)
2020-09-06 04:06:54,829 DEBUG [block-miner-35] c.w.mining.MinerImpl - Forging with <3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N>, Time 41369 > Estimated Time 41361, balance 3485157657499, prev block 2qNW6zpp419atqZbstbwnAijUAmk55ggWiSvFLu6eDDSMuMciMta9f8aNXWh1HybQe2i2R2KwMcRrhHwd8by2Ya7 at 2228616 with target 61
2020-09-06 04:06:54,842 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 412.766 seconds
2020-09-06 04:06:54,887 DEBUG [block-miner-35] c.w.mining.MinerImpl - Forged and applied Block(5sWqTZbHP2p5T1ss31FnGx4s48an8Uf1czTbcHrkBwomRnN9j4HU9zw4Y7YvB1yWeHx3a17up3rF8397Upmbdntm,2qNW6zpp419atqZbstbwnAijUAmk55ggWiSvFLu6eDDSMuMciMta9f8aNXWh1HybQe2i2R2KwMcRrhHwd8by2Ya7,<3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N>,1599365214825,[],2000000000) with cumulative score 525712542186004822512224
```

This example record indicates that at `2020-09-06 04:06:13,517` the node `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` planned to generate block in `41.305` seconds and then in `41.305` seconds it started generating block and succeeded (`Forged and applied Block 5sWqTZbHP2p5T1ss31FnGx4s48an8Uf1czTbcHrkBwomRnN9j4HU9zw4Y7YvB1yWeHx3a17up3rF8397Upmbdntm`).

## `The log says that my node generates blocks but they do not appear on the blockchain. Why?`

**Answer**: In some cases, a block can be successfully generated by your node and that is indicated in the log, however that does not guarantee that the block will be accepted by the blockchain. The blockchain will accept the first uploaded block. There is a chance that another node generates block simultaneously with yours and uploads it to the network faster than yours. When a new block is uploaded to the blockchain, every node verifies if the block could really be generated in the time by such address. Use [wavesexplorer.com](https://wavesexplorer.com/) website to check timestamps and IDs on the nodes that succeed to generate blocks that appear on the blockchain.

## `How many blocks can a node generate per day/month?`

**Answer**: Use [dev.pywaves.org](https://dev.pywaves.org/) website to review block generators performance ratio (Performance ratio = Generated blocks / Estimated blocks). Review the estimated number of blocks by switching to `Generators >> 30 days generators`. The generator is selected based on probablistic (non-deterministic) algortigm , that is why **actual number of generated blocks might be not the same as estimated**. Shorter timespan provides the biggest difference between actual and estimated number of blocks. Please keep in mind that short-term (daily) estimates are for reference only.

## `How to generate more blocks?`

**Answer**: To generate more blocks increase your generating balance, use fast internet connection and up-to-date hardware that suits [node system requirements](/en/waves-node/how-to-install-a-node/how-to-install-a-node#system-requirements).

## Other Issues

If you have other node-related questions to discuss with Waves community, see [Keep in Touch](/en/keep-in-touch/) chapter for contact information.
