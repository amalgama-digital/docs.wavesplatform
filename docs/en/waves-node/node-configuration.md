---
sidebarDepth: 2
---

# Node Configuration

Waves [node](/en/blockchain/node/) parameters are stored in the **node configuration file** (`*.conf`). The system uses HOCON (Human-Optimized Config Object Notation) format that provides simple syntax and ability to use comments. [Read more about HOCON](https://github.com/lightbend/config/blob/master/HOCON.md).

For a node installed from the APT repository or from a DEB package, the configuration file is embedded into the package, see the [Install Node on Ubuntu](/en/waves-node/how-to-install-a-node/on-ubuntu) article. For a node installed from a JAR file, download the sample configuration file [waves-sample.conf](https://github.com/wavesplatform/Waves/blob/master/node/waves-sample.conf).

## Required Parameters

In most cases, such as running a node from scratch, it is sufficient to set the following required parameters specific for your node:

* [waves.wallet.seed](#seed) if you want the node to generate blocks or sign transactions on behalf of a particular account;
* [waves.wallet.password](#password);
* [waves.rest-api.api-key-hash](#api-key-hash) to use node API;
* [waves.blockchain.type](#blockchain-type).

For the rest of the parameters, we recommend to leave the default values.

## Changing Node Parameters

After editing the configuration file, restart the node.

For the node installed from a JAR file, specify the path to the edited configuration file in the start command (replace `{*}` with the actual file name):

```bash
java -jar {*}.jar {*}.conf
```

## Sections of the Configuration File

Node configuration file contains parameters grouped into the following sections:

| Section         | Description                                                   |
|-----------------|---------------------------------------------------------------|
| [waves](#waves-configuration-section)| Essential node parameters and other configuration subsections |
| &nbsp; &nbsp; &nbsp; [db](#db-settings)              | Blockchain database parameters                                |
| &nbsp; &nbsp; &nbsp; [network](#network-settings)| Peer to peer network parameters                               |
| &nbsp; &nbsp; &nbsp; [wallet](#wallet-settings)| Built in node wallet parameters                               |
| &nbsp; &nbsp; &nbsp; [blockchain](#blockchain-settings)| Blockchain parameters                                         |
| &nbsp; &nbsp; &nbsp; [miner](#miner-settings)| Blocks generator parameters                                   |
| &nbsp; &nbsp; &nbsp; [rest-api](#rest-api-settings)        | Node API parameters                                           |
| &nbsp; &nbsp; &nbsp; [synchronization](#synchronization-settings) | Node synchronization parameters                               |
| &nbsp; &nbsp; &nbsp; [utx](#utx-pool-settings)| Unconfirmed transactions pool parameters                      |
| &nbsp; &nbsp; &nbsp; [features](#features-settings)        | Features parameters                                           |
| &nbsp; &nbsp; &nbsp; [rewards](#rewards-settings)| Rewards parameters                                            |
| &nbsp; &nbsp; &nbsp; extensions| Extensions parameters                                            |
| kamon           | Performance metrics parameters                                |
| metrics         | Blocks, transactions and other info metrics parameters        |

### Waves Configuration Section

Root configuration section `waves` holds essential application parameters and other configuration subsections.

The `directory` parameter allows to set a path to the base application directory. It is possible to use environment variables to set configuration parameters. For example, by default, the base directory constructed relative to the user’s `HOME` environment variable. Please, do not enclose environment variables references in quotes, in this case, they will be handled as strings and won’t be resolved.

> After upgrading to version 1.0.2 please note if your `/etc/waves/waves.conf` was originally copied from a template, make sure that waves.directory points to the correct directory. If this option doesn't exist in the config, default directory will be used.

Make sure the defined directory has a correct owner set: `waves`, `waves-testnet` or `waves-stagenet` for mainnet, testnet or stagenet.

#### Default Application Directory

For nodes installed from DEB package:

| | *nix |
| :--- | :--- |
| Mainnet | `/var/lib/waves` |
| Testnet | `/var/lib/waves-testnet` |
| Stagenet| `/var/lib/waves-stagenet` |

The following default application directories, depending on the operating system and the type of blockchain, are used for jar nodes if the `directory` parameter is not set in the node configuration `.conf` file:

| | *nix | macOS | Windows |
| :--- | :--- | :--- | :--- |
| Mainnet | `$XDG_DATA_HOME/waves-mainnet` or `$HOME/.local/share/waves-mainnet` | `$HOME/Library/Application Support/waves-mainnet` | `%LOCALAPPDATA%/waves-mainnet` |
| Testnet | `$XDG_DATA_HOME/waves-testnet` or `$HOME/.local/share/waves-testnet` | `$HOME/Library/Application Support/waves-testnet` | `%LOCALAPPDATA%/waves-testnet` |
| Stagenet | `$XDG_DATA_HOME/waves-stagenet` or `$HOME/.local/share/waves-stagenet` | `$HOME/Library/Application Support/waves-stagenet` | `%LOCALAPPDATA%/waves-stagenet` |
| Custom | `$XDG_DATA_HOME/waves-custom-<character>*` or `$HOME/.local/share/waves-custom-<character>*` | `$HOME/Library/Application Support/waves-custom-<character>*` | `%LOCALAPPDATA%/waves-custom-<character>*` |

\* See [`address-scheme-character`](#address-scheme-character) parameter description.

**Note:** The cache size parameters are set in bytes, but you can use size units: <ul><li>K - for kilobyte</li><li>M - for megabytes</li><li>G - for gigabytes</li></ul>

### DB Settings

In `DB` section you can set blockchain database parameters.

| Name                        | Description                                                                                                                                                                                                                                                                  | Default value                                                                                                                                                                                                         |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `directory`                        | Sets the location of database file.                                                                                                                                                                              | `${waves.directory}"/data"` The path is resolved with regard to `directory` parameter from `waves` section.                                                                                                                                 |
| `store-transactions-by-address` |   This parameter allows to store transactions by address in database. If disabled, you will not be able to get information from the node.                                                                                                                                                                            | `true`                                                                                                                                 |
| `store-invoke-script-results` |  This parameter allows to store state changes in database. If disabled, you will not be able to get the state changes on your node.                                                                                                                                                                             | `true`                                                                                                                                 |
| `max-cache-size` |      Limits the size of caches which are used during block validation. Lower values slightly decrease memory consumption, while higher values might increase node performance. Setting this value to 0 disables caching.                                                                                                                                                                         | `100000`                                                                                                                                 |
| `max-rollback-depth` |      By default a node can process rollback to up to 2000 blocks without rebuilding blockchain database. The default limit can be changed with this.                                                                                                                                                                        | `2000`                                                                                                                                 |
| `use-bloom-filter` | Enabling bloom filter allows to speed up blockchain import. Should be disabled in normal node operation.                                                                                                                                                                              | `false`                                                                                                                                 |
| `store-state-hashes` |       This setting enables `/debug/stateHash/{height}` api method                                                                                                                                                                        | `false`                                                                                                                                 |

### Network Settings

In `network` section you can set P2P network parameters.

| Name                        | Description                                                                                                                                                                                                                                                                  | Default value                                                                                                                                                                                                         |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`                        | Sets the location of database file where the node stores lists of known and blacklisted peers.                                                                                                                                                                              | `${waves.directory}"/peers.dat` By default, the path is resolved with regard to `directory` parameter from `waves` section.                                                                                                                                 |
| `declared-address`            | <a id="declared-address"></a> Sets the IP address and port (`address:port`) that is sent as external address during handshake.<br>• Can be set automatically if [UPnP](#upnp) is enabled. If the `declared-address` is not set and UPnP is enabled, the node will attempt to connect to an IGD (Internet Gateway Device), retrieve its external IP address and configure the gateway to allow traffic through. If the node succeeds, the IGD's external IP address becomes the node's `declared-address`.<br>• If the `declared-address` is set and the UPnP is disabled, the node will listen to incoming connections on `bind-address:port` and broadcast specified `declared-address` to peers.<br>• If the `declared-address` is not set and UPnP is disabled, the node will not listen to incoming connections at all.<br>• In some cases, however, this setup is not recommended, you can set `declared-address` and enable UPnP (e.g. when IGD can't reliably determine its external IP address), so that the node attempts to configure an IGD to pass traffic from external port to `bind-address:port`. | |
| `bind-address`                | Sets the IP address of local network interface on which Waves Node will accept incoming connections.                                                                                                                                                                         | By default, node binds to `0.0.0.0` that means that it will listen on all available network adapters.                                                                                                                  |
| `port`                        | Sets the network port number to which other Waves nodes will connect. Check that the port is reachable from outside, otherwise your node will connect to P2P network using only outgoing connections. If this the port is used by other application, your node won’t start. | `6868` for Mainnet<br>`6863` for Testnet<br>`6862` for Stagenet |
| `node-name`                   | <a id="node-name"></a> Sets the name of your node visible to other participants of the P2P network. The name is transmitted during initial handshake.                                                                                                                                         | Generated randomly as `Node-${random-nonce}` |
| `nonce`                       | This value is sent during handshake. The value is used to distinguish nodes connected from one IP address.                                                                                                                                                                 | Generated randomly                                                                                                                                                                     |
| `known-peers`                 | This parameter stores the list of bootstrap nodes to which your node will establish outgoing connections while initializing.                                                                                                                                                      |          no value                                                                                                                                                                         |
| `peers-data-residence-time`   | Sets the period of time during which the node stores information about external peer since last communication session with it.                                                                                                                       |        `1d`                                                                                                                                                                                                               |
| `black-list-residence-time`   | Sets the period of time for which the information about external peer stays in the blacklist.                                                                                                                                                            |           `15m`                                                                                                                                                                                                            |
| `break-idle-connections-timeout`   | Sets the period of time for which the information about external peer stays in the blacklist.                                                                                                                                                            |           `5m`                                                                                                                                                                                                            |
| `max-inbound-connections`     | Sets the maximum number of simultaneous inbound connections handled by the node.                                                                                                                                                                                             |          `100`                                                                                                                                                                                                             |
| `max-outbound-connections`    | Sets the number of maximum outgoing network connections.                                                                                                                                                                                                               |    `100`                                                                                                                                                                                                                   |
| `max-single-host-connections` | Sets the allowed number of network connections made from single IP address.                                                                                                                                                                                  |         `3`                                                                                                                                                                                                              |
| `connection-timeout`          | Sets the network communication timeout.                                                                                                                                                                                                           |    `30s`                                                                                                                                                                                                                   |
| `max-unverified-peers`        | Sets the maximum size of the buffer to store information about peers during handshake process.                                                                                                                                                                          |        `100`                                                                                                                                                                                                               |
| `enable-peers-exchange`       | Enables or disables requesting and sending the information about peers.                                                                                                                                                                                                      |     `yes`                                                                                                                                                                                                                  |
| `enable-blacklisting`         | Enables or disables blacklisting of peers.                                                                                                                                                                                                                 |       `yes`                                                                                                                                                                                                                |
| `peers-broadcast-interval`    | Sets the period of time between broadcasts of known peers list to other nodes.                                                                                                                                                                                   |       `2m`                                                                                                                                                                                                                |
| `handshake-timeout`           | Sets time period to wait for reply during handshake. In case of no reply the peer will be blacklisted.                                                                                                                                                           |         `30s`                                                                                                                                                                                                              |
| `upnp`                        | <a id="upnp"></a> This section allows to set the UPnP settings. The settings are useful if your node is running in the network where the node can ask your router (Internet Gateway Device) to establish a tunnel.                                                                                     | By default, this functionality is disabled. To enable set the `enable` parameter to `yes`.                                                                                                            |
| `traffic-logger`              | This section allows to enable or disable logging of some of the incoming or outgoing network messages. Network messages are logged at TRACE level.                                                                                                                                  |                                                                                                                                                                                                                       |

**Note:** The time span parameters are set in milliseconds, but you can use duration units to shorten the value. Supported units are: <ul><li>s - second, seconds</li><li>m - minute, minutes</li><li>h - hour, hours</li><li>d - day, days</li></ul> For usage examples see the [list of default settings](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/application.conf) (do not copy this file and do not use it as the configuration file for your node).

### Wallet Settings

In `wallet` section you can configure parameters of the [wallet built in Waves node](/en/waves-node/how-to-work-with-node-wallet).

| Name     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default value                                                                              |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `file`     | Sets the path to the wallet file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | By default, the path to the file is calculated relative to the base application directory. |
| `password` | <a id="password"></a> Sets the password string to protect the wallet file.                                                                                                                                                                                                                                                                                                                                                                                                                                                |      "password string"                                                                                      |
| `seed`     | <a id="seed"></a> This parameter is used to recreate an existing wallet on a new node. Provide the BASE58 string of your seed here. If you don’t have any existing wallet, comment out this parameter and start the node. During the first run, the application will create a new wallet with a random seed for you. In this case, the seed will be displayed in the application log. If you miss it or if you don’t want to check the log files, it will also be available in REST API using the wallet/seed method. |      "seed in BASE58"                                                                                     |

**Warning:** Wallet is a critical part of your node. It is better to create its file in a safe and protected location. Don’t forget to backup your wallet’s file. It’s recommended to remove the seed from the configuration file immediately after the start of the node. If an attacker gains access to the seed string, he will have access to your funds on all your addresses!

### Blockchain Settings

In `blockchain` section you can select the blockchain type or create your own blockchain.

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                 | Default value |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `type`                            | <a name="blockchain-type"></a>Blockchain type: MAINNET, TESTNET, STAGENET, or CUSTOM. For MAINNET or TESTNET or STAGENET types, parameters of blockchain are built in the application so you don’t have to configure the parameters. See [standard parameters for different types of blockchain](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/network-defaults.conf). But if you select CUSTOM blockchain type, you have to provide parameters in the `custom` configuration section. | TESTNET |

#### Configuring Custom Blockchain

The `custom` section allows to set parameters of your [custom blockchain](/en/waves-node/private-waves-network).

| Name                     | Description                                                                                                                                                                                                                                                                                                                                             | Default value |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `address-scheme-character` | <a id="address-scheme-character"></a> This parameter in `custom` section to set the address feature character. This character used while building an address and also passed over a network during a handshake. The latter allow nodes not to connect to the nodes with other blockchains.                                                                                                    |               |
| `functionality`            | This section allows to set the timestamps of activation of different blockchain validations. It is better to set all functionality settings to 0 to have a blockchain with all validations active.                                                                                                                                                      |               |
| `genesis`                  | Section describes the first \(genesis\) block of your custom blockchain.                                                                                                                                                                                                                                                                                |               |
| `block-timestamp`          | Sets the date of creation of genesis block.                                                                                                                                                                                                                                                                                                             |               |
| `timestamp`                | Sets time of creation for genesis transactions.                                                                                                                                                                                                                                                                                                         |               |
| `signature`                | Sets the signature of genesis block.                                                                                                                                                                                                                                                                                                                    |               |
| `initial-balance`          | This parameter allows to set the total amount of coins. This value should be given in the smallest units of cryptocurrency.                                                                                                                                                                                                                                          |               |
| `average-block-delay`      | Sets the speed of block generation in your blockchain. This is a target period of time between blocks. In reality the delays between blocks may vary.                                                                                                                                                                                                   |               |
| `transactions`             | This parameter allows to provide the list of first transactions. Each transaction is described by recipient’s address \(as BASE58 string\) and amount. You have to distribute all initial balance to one or more addresses in genesis block. If you failed to do so, the genesis block will be considered as incorrect and the application won’t start. |               |

### Miner Settings

In `miner` section it is possible to configure parameters of the new blocks generator.

| Name                                                 | Description                                                                                   | Default value                                                                                                                                                                                                                                                                                                                     |
|------------------------------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enable`                                               | This parameter enables or disables block generation on the node.                              | By default, it’s enabled, but if you disable it your node won’t try to generate new blocks (won’t mine).                                                                                                                                                                                                                      |
| `quorum`                                               | Sets the minimum required number of connected peers to enable and start mining of new blocks. | By default it is set to 1, so your node will start mining as soon as it connects to the first peer in the P2P network. Setting this parameter to 0 will enable off-line generation.                                                                                                                                               |
| `interval-after-last-block-then-generation-is-allowed` | This parameter allows to tune your node’s blocks download and generation behavior.            | By default, it set to 1 day, which means that your node won’t start block generation until it has the last block in the local blockchain not older than 1 day. So, using this parameter you tell your node to actualize the blockchain before starting to generate new blocks. Actually, it works only after long node shutdowns. |
| `no-quorum-mining-delay` | Sets mining attempts delay, if no quorum is available | `5s` |
| `micro-block-interval` | Sets the interval between microblocks | `5s` |
| `max-transactions-in-micro-block` | Sets max amount of transactions in micro block | `255` |
| `min-micro-block-age` | Miner references the best microblock which is at least this age | `2s` |
| `minimal-block-generation-offset` | Sets minimal block generation offset | `0` |

### REST API Settings

The `rest-api` section in the node configuration file contains settings of [Node REST API](/en/waves-node/node-api/).

| Name | Description | Default value |
| :--- | :--- | :--- |
| `enable` | Activates REST API.<br>If you want to deactivate REST API, change the default value to `no` | yes |
| `bind-address` | Network address where the REST API accepts incoming connections.<br>**Note.** It's not recommended to change the default value. Use [Nginx’s proxy pass module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html) or [SSH port forwarding](https://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html) for external access | `"127.0.0.1"` |
| `port` | Port number where the REST API accepts incoming connections | 6869 |
| `api-key-hash` | <a id="api-key-hash"></a>Hash of the API key to access private endpoints. For details see the [API Key](/en/waves-node/node-api/api-key) article | "" |
| `cors` | Enable/disable cross-domain API requests ([CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)) from JavaScript | yes |
| `api-key-different-host` | API key support in requests from other hosts | `no` |
| `transactions-by-address-limit` | • Maximum `limit` value in request to&nbsp;`/transactions/address/{address}/limit/{limit}`<br>• Maximum number of transactions in request to&nbsp;`/transactions/status` | 1000 |
| `distribution-address-limit` | Maximum `limit` value in request to&nbsp;`/assets/{assetId}/distribution/{height}/limit/{limit}` | 1000 |
| `limited-pool-threads` | Maximum number of threads that process requests to&nbsp;`/utils/script/compile*`, `/utils/script/decompile`, `/utils/script/estimate` (the processing time for each request is limited) | 2 |

### Synchronization Settings

In `synchronization` section it is possible to tune different aspects of node synchronization process.

| Name                     | Description                                                                                                                                                                                                                                                                                                                                                              | Default value |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-rollback`             | This parameter allows to change the length of blockchain that can be discarded in case of fork detection. If your node is on a fork with a lower score, it will try to switch to another fork, to do so the node will rollback few blocks. If the detected fork is longer than the given number, node prefers not to switch to another fork even if its score is bigger. |  `100`             |
| `synchronization-timeout`  | Sets the timeout on block download operation.                                                                                                                                                                                                                                                                                                                             |   `60s`            |
| `score-ttl`                | Sets the time-to-live interval of broadcasted score packets.                                                                                                                                                                                                                                                                                                             |     `90s`          |
| `history-replier`          | In this subsection you can configure the number of last blocks and micro-blocks cached in memory.                                                                                                                                                                                                                                                                        |               |
| `micro-block-synchronizer` | In this subsection you could tune various parameters of Waves-NG protocol.                                                                                                                                                                                                                                                                                               |    `2s`           |

### UTX Pool Settings

The `utx` section allows to set unconfirmed transactions pool parameters.

| Name                | Description                                                                                                                                                                                                                                                        | Default value |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-size`            | Sets the size of unconfirmed transactions pool (both scripted and non-scripted).                                                                                                                                                                                   |  `100000`             |
| `max-scripted-size`   | Sets the size of unconfirmed transactions pool for scripted transactions. Prior to node version 1.1.6, the invoke script transactions were not counted (the counted were the transactions for the validation of which it is required to execute a smart contract). |     `5000`          |
| `max-transaction-age` | Sets the maximum age of transactions allowed to UTX.                                                                                                                                                                                                               |               |

### Features Settings

The `features` section allows to set [features](/en/waves-node/features/) parameters

| Name                                 | Description                                                                                                                       | Default Value                  |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| `auto-shutdown-on-unsupported-feature` | If this parameter is turned on, the node will be shut down on activation of a feature that is not implemented by node’s codebase. | yes                            |
| `supported`                            | This parameter contains the list of features IDs, supported by the node owner.                                                    | By default, the list is empty. |

Example:

```bash
 features {
   auto-shutdown-on-unsupported-feature = yes
   supported = []
 }
```

<a id="rewards"></a>

### Rewards Settings

In this section, you can set the desired reward size using `desired` parameter. The setting value is specified in WAVELETs.

If the value is greater than the current reward size, then miner votes for the current reward size increase; if the value is smaller — for the decrease.

Example of the setting that has the desired value of 7 WAVES:

```js
waves {
  rewards {
    desired = 700000000
  }
}  
```

The value can be any integer in the range from 0 to 9,223,372,036,854,775,807 inclusive. Negative value will be ignored.

See [Mining reward](/en/blockchain/mining/mining-reward) for more information.
