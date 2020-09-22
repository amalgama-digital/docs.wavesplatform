# Logging Configuration

## Levels of Logging <a id="loglevels"></a>

1. `OFF` - logging is disabled. Useful when you want to disable file or STDOUT logs;
2. `ERROR` - severe errors. Please read these messages;
3. `WARN` - warning messages. The Node can work, but it is better to check the problem;
4. `INFO` - important messages. System works normally;
5. `DEBUG` - information for debugging;
6. `TRACE` - information for debugging, when DEBUG doesn't help \(rare cases\).

Lower levels of logging are included in the higher. For example, `DEBUG` includes itself and all the higher levels: `INFO`, `WARN` and `ERROR`.

## About the Framework

Waves nodes use [logback](https://logback.qos.ch/documentation.html) framework for log writing. The node is shipped with embedded [logback configuration](https://logback.qos.ch/manual/configuration.html), you can find the default `logback.xml` file example [here](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/logback.xml).

By [default](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/logback.xml), all the logs are written in human-readable format

* to STDOUT with `INFO` level.
* to `/var/log/waves/waves.log` for Mainnet nodes installed from Deb package (`/var/log/waves-testnet/waves.log` and `/var/log/waves-stagenet/waves.log` for Testnet and Stagenet) or `${waves.directory}/logs/waves.log` for other cases. Prior to node version 1.1.6, the default logging level in relation to writing to file was `TRACE`. After the node 1.1.6 version release, the logging level became `DEBUG` which means that UTX-related traces are not included in waves.log by default to reduce the amount of logs the node produces under heavy load. However, writing the UTX-related traces to separate file [can be enabled](#enable-traces). Also, in addition to daily rotation, waves.log is rotated when size limit is reached (100 mb by default).

The following limitations are set for logging:

* Logs older than 30 days are deleted.
* If total size of logs is more than 1Gb, the oldest logs are deleted to fit this limit.

The following logging parameters can be altered:

* [UTX trace can be activated](#enable-traces).
* [Log file location can be changed](#log-file).
* [STDOUT logging level can be changed](#stdout-log-level).
* [Logging in JSON format can be set up](#json).

Excluding setting up logging in JSON format, altering of this parameters can be done either by

* adding properties to `application.ini` file.
* adding properties in `logback.xml` file. To override the node's `logback.xml` settings, create own `logback.xml` in `/etc/waves/`. Refer to [this](#own-logback) section on how to configure it.
* executing commands in command line.

Logging in JSON format can be set up using `logback.xml` only.

It is not necessary to restart node after logging-related settings changes because they are being re-applied every 30 seconds.

The log levels are listed in [Levels of Logging](#loglevels) section.

## Redefine Logging Settings in Logback.xml <a id="own-logback"></a>

To redefine logging settings set up in node's `logback.xml`

1. Create own `/etc/waves/logback.xml` file.
2. Add to the file the properties wrapped in `included` tag.

The following example code can be used to enable `TRACE` logging:

```xml
<included>
    <property name="logback.file.level" value="TRACE"/>
</included>
```

**Note**: It is not necessary to restart node after logging-related settings changes because they are being re-applied every 30 seconds.

## Activate UTX Trace Logging <a id="enable-traces"></a>

If UTX trace logging is activated, the output will be written to `/var/log/utx-trace.log`.

If you run node from Deb package, consider using [application.ini](#aini-activate-utx) or [logback.xml](#logback-activate-utx).

If you run node from Jar package, use [Java's options](#jar-activate-utx).

### Activate by Application.ini <a id="aini-activate-utx"></a>

In the `application.ini` add the following:

```bash
-J-Dlogback.utx-trace.enabled=true
```

### Activate by Logback.xml <a id="logback-activate-utx"></a>

In the `logback.xml` add the following:

```xml
<included>
    <property name="logback.utx-trace.enabled" value="true" />
</included>
```

### Activate by Command Line <a id="jar-activate-utx"></a>

Use Java's option `java -Dlogback.utx-trace.enabled=true -jar /path/to/waves-all.jar /path/to/config`.

## Change Log File Location <a id="log-file"></a>

The default log file location is `/var/log`.

If you run node from the package, consider using [application.ini](#aini-change-location) or [logback.xml](#logback-change-location).

If you run node from jar, use [Java's options](#jar-change-location).

### Change by application.ini <a id="aini-change-location"></a>

In the `application.ini` add the following:

```bash
-J-Dlogback.file.directory=/path/to/directory/for/logs
```

### Change by logback.xml <a id="logback-change-location"></a>

In the `logback.xml` add the following:

```xml
<included>
    <property name="logback.file.directory=/path/to/directory/for/logs" value="true" />
</included>
```

### Change by command line <a id="jar-change-location"></a>

Use Java's option `java -Dlogback.file.directory=/path/to/directory/for/logs -jar /path/to/waves-all.jar /path/to/config`.

## Setting Logging Level for STDOUT <a id="stdout-log-level"></a>

The default level for STDOUT is `INFO`.

If you run node from the package, consider using [application.ini](#aini-set-loglevel) or [logback.xml](#logback-set-loglevel).

If you run node from jar, use [Java's options](#jar-set-loglevel).

See all the available levels in the [Levels of Logging](#loglevels) section.

### Set by application.ini <a id="aini-set-loglevel"></a>

In the `application.ini` add the following:

```bash
-J-Dlogback.stdout.level={LEVEL_OF_LOGGING}
```

### Set by logback.xml <a id="logback-set-loglevel"></a>

In the `logback.xml` add the following:

```xml
<included>
    <property name="logback.stdout.level={LEVEL_OF_LOGGING}" value="{mainnet|testnet}" />
</included>
```

### Set by command line <a id="jar-set-loglevel"></a>

Use Java's option `java -Dlogback.stdout.level={LEVEL_OF_LOGGING} -jar /path/to/waves-all.jar /path/to/config`.

## Enable logging in JSON format <a id="json"></a>

If you are using tools for parsing the JSON, you need to enable logging output in this format.

In the `logback.xml` add the following:

```xml
<included>
    <property name="logback.file.enabled" value="false"/>
        <appender name="JSON" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>${logback.file.final-directory}/waves-elk.json</file>
            <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- daily rollover -->
                <fileNamePattern>${logback.file.final-directory}/waves-elk.json.%d{yyyy-MM-dd, UTC}.%i.gz</fileNamePattern>
                <maxFileSize>1GB</maxFileSize>
                <maxHistory>3</maxHistory>
                <totalSizeCap>2GB</totalSizeCap>
            </rollingPolicy>
            <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
                <providers>
                    <timestamp>
                        <pattern>yyyy-MM-dd'T'HH:mm:ss.SSS</pattern>
                        <timeZone>UTC</timeZone>
                    </timestamp>
                    <version/>
                    <message/>
                    <loggerName/>
                    <threadName/>
                    <logLevel/>
                    <logLevelValue/>
                    <stackTrace/>
                    <stackHash/>
                </providers>
            </encoder>
        </appender>
    <root>
        <appender-ref ref="JSON"/>
    </root>
</included>
```
