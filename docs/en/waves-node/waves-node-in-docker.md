# Deploy Node in Docker

The easiest way to run Waves Node is by means of **Waves Docker container**. It takes just **one command** to enable everything or to change the settings of your node.

## Prerequisites

You need to install the latest version of Docker.

Please, follow the installation steps described on the [Docker website](https://docs.docker.com/engine/installation/).

## About the Image

* The Docker image contains scripts and configs to run Waves Node from **Version 0.13.0** for Testnet, Mainnet or custom networks.
* The image is focused on fast and convenient deployment of Waves Node.
* The container downloads and runs `.jar` file along with configuration files from the [releases section](https://github.com/wavesplatform/Waves/releases).

## Running the Image

It is highly recommended to learn about Waves node configuration in [Node Configuration](/en/waves-node/node-configuration) article before running the container.

To start the container, execute the following command:

```bash
docker run -it wavesplatform/node
```

:warning: We recommend to start the container with the following command for **Mainnet**:

```bash
docker run -p 6869:6869 -p 6868:6868 -e WAVES_NETWORK=MAINNET -e WAVES_LOG_LEVEL=DEBUG -e WAVES_HEAP_SIZE=2g -v YOUR_LOCAL_PATH_HERE:/waves wavesplatform/node
```

For **Testnet**:

```bash
docker run -p 6869:6869 -p 6863:6863 -e WAVES_NETWORK=TESTNET -e WAVES_LOG_LEVEL=DEBUG -e WAVES_HEAP_SIZE=2g -v YOUR_LOCAL_PATH_HERE:/waves wavesplatform/node
```

**You can use the following optional predefined environment variables when running the container:**

|Env variable                 |Description   |
|-----------------------------|--------------|
|`WAVES_WALLET_SEED`               |Plain text seed for [node wallet](/en/waves-node/how-to-work-with-node-wallet). Container converts it to base58.   |
|`WAVES_WALLET_SEED_BASE58`        |Base58 encoded seed.   |
|`WAVES_WALLET_PASSWORD`           |Password for wallet file.    |
|`WAVES_VERSION`                   |Node version. Default value is `latest`. You can find the list of available versions [here](https://github.com/wavesplatform/Waves/releases).|
|`WAVES_NETWORK`                   |Available values are `MAINNET` and `TESTNET`.   |
|`WAVES_LOG_LEVEL`                 |Node logging level, available values: `OFF`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`. More details about logging are available [here](/en/waves-node/logging-configuration).   |
|`WAVES_HEAP_SIZE`                 |Java Heap Size limit in -X Command-line Options notation (`-Xms=[your value]`). More details [here](https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/jrdocs/refman/optionX.html)   |
|`WAVES_CONFIG_FILE`               |Path to your Waves Configuration file.   |
|`WAVES_DECLARED_ADDRESS`          |String with IP address and port to send as external address during handshake. Could be set automatically if UPnP is enabled. If `declared-address` is set, which is the common scenario for nodes running in the cloud, the node will just listen to incoming connections on `bind-address:port` and broadcast its `declared-address` to its peers.|
|`WAVES_AUTODETECT_ADDRESS`        |Set `yes` if you want to get your public address and set value `declared-address` with it.|
|`WAVES_AUTODETECT_ADDRESS_PORT`   |`WAVES_AUTODETECT_ADDRESS` can get only an IP address of the node, but not port number, so define your real port number with this variable.|

**Note**: If your node crashes immediately after running, your Docker desktop app might be out of memory. You can [change Docker preferences](/en/waves-node/node-troubleshooting#node-deployed-in-docker-crashed-after-running), so that it can use more memory.

## Configuration

Depending on the env values the image generates `local.conf` file and stores it in `/waves/configs` directory. Follow the rules to set a value in the configuration file:

* Determine the path to variable in configuration file. See [example](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/application.conf).
* Join all section names with two underscores (`__`).
* Replace all dashes with one underscore (`_`).
* Capitalize the final string.

For instance, if you want to set the value of `waves.rest-api.enable`, pass an environment variable `WAVES__REST_API__ENABLE=no`;
