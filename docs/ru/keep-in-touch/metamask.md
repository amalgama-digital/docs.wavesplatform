# Подписание транзакций и ордеров в MetaMask (Stagenet)

[Metamask](https://metamask.io/) — расширение для браузера, популярное у пользователей Ethereum. MetaMask выполняет функции криптовалютного кошелька и обеспечивает взаимодействие с децентрализованными приложениями.

Чтобы предоставить пользователям MetaMask возможность выполнять действия на блокчейне Waves, в протокол Waves добавлены:
* поддержка транзакций в формате Ethereum,
* поддержка ордеров с подписью ECDSA в [транзакции обмена](/ru/blockchain/transaction-type/exchange-transaction).

В результате пользователям MetaMask стали доступны:
* перевод токенов — как системного токена WAVES, так и пользовательских;
* вызов dApp-скрипта;
* подписание биржевого ордера.

Разработчики приложений могут использовать библиотеку [Signer](/ru/building-apps/waves-api-and-sdk/client-libraries/signer) совместно с [ProviderMetamask](https://github.com/wavesplatform/provider-metamask) для подписания и отправки транзакций от имени пользователя MetaMask.

Поддержка MetaMask добавлена в версии ноды 1.4.0 и включается с активацией фичи №&nbsp;17 “Ride V6, MetaMask support, Invoke Expression”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/).

## Адрес пользователя

Адрес пользователя MetaMask состоит из 20 байт. Адрес в формате Waves также содержит 20 значимых байт, к которым добавляется префикс, общий для всех адресов сети, и контрольная сумма (см. также раздел [Бинарный формат адреса](/ru/blockchain/binary-format/address-binary-format)). Таким образом, каждому адресу в MetaMask соответствует единственный адрес Waves и наоборот: одни и те же 20 байт используются как адрес в Ethereum-представлении и как основа адреса в формате Waves.

:warning: Если из seed-фразы MetaMask сгенерировать закрытый ключ, открытый ключ и адрес по правилам Waves (см. раздел [Cryptographic practical details](/en/blockchain/waves-protocol/cryptographic-practical-details)), получится **другой** аккаунт, адрес которого не совпадает с адресом пользователя MetaMask, преобразованным в формат Waves. Из seed-фразы MetaMask **невозможно** получить seed-фразу Waves, соответствующую тому же адресу.

В интерфейсах адрес пользователя MetaMask представлен в кодировке HEX, а адрес Waves — в base58. Для преобразования адреса из одного формата в другой можно использовать:
* [Waves Explorer](https://stagenet.wavesexplorer.com/converters),
* функции `wavesAddress2eth`, `ethAddress2waves` библиотеки [node-api-js](https://github.com/wavesplatform/node-api-js).

## Подключение к сети Waves

Нода Waves предоставляет RPC API с поддержкой функций, необходимых для работы MetaMask.

Подключение MetaMask к сети Waves может быть выполнено пользователем самостоятельно или программно.

В случае самостоятельного подключения пользователь выбирает в списке сетей «Пользовательский RPC» и указывает параметры подключения:
* Имя сети — например, Waves Stagenet.
* URL RPC — адрес ноды Waves с открытым RPC API, например адрес пула публичных нод `https://nodes-stagenet.wavesnodes.com/eth`
* Идентификатор цепочки (сети блокчейна) — 83 для Stagenet.
* Символ валюты — WAVES.

Для программного подключения веб-приложение может использовать библиотеку [Signer](/ru/building-apps/waves-api-and-sdk/client-libraries/signer) совместно с [ProviderMetamask](https://github.com/wavesplatform/provider-metamask): 

1. Приложение вызывает функцию `login()`.
2. Signer вызывает соответствующую функцию ProviderMetamask, а ProviderMetamask вызывает API MetaMask.
3. MetaMask открывает окно, в котором пользователь подтверждает подключение к сети.
4. Получив подтверждение, MetaMask добавляет подключение к сети, а также возвращает адрес пользователя.

В результате MetaMask отображает сеть Waves в качестве доступной, а функция `login()` возвращает адрес пользователя в формате Waves.

Пример программного подключения см. в подразделе [Примеры использования MetaMask](#examples) ниже.

## Перевод токена

Чтобы выполнить перевод токена из кошелька MetaMask, пользователю необходимо:

1. Подключить сеть Waves (см. выше).
2. Баланс системного токена WAVES отображается автоматически. Чтобы добавить отображение баланса по другому токену, нужно в качестве адреса контракта токена указать ID токена в Ethereum-представлении, а именно первые 20 байт идентификатора в кодировке HEX.
3. Перевести токен на другой адрес. Адрес необходимо указать в Ethereum-представлении.

MetaMask формирует транзакцию в формате Ethereum, подписывает ее закрытым ключом пользователя и передает на ноду Waves.

> Пользователи кошельков Waves, таких как Waves.Exchange, WavesFX и других (приложения разработаны сторонними командами из сообщества), могут перевести токены пользователю MetaMask. В некоторых кошельках поддерживаются только адреса в формате Waves, поэтому необходимо предварительно преобразовать адрес получателя из Ethereum-представления в Waves. В результате создается обычная [транзакция перевода](/ru/blockchain/transaction-type/transfer-transaction), а пользователь увидит полученные токены в MetaMask (для токена, отличного от WAVES, необходимо добавить отображение баланса).

Для преобразования ID токена из одного формата в другой можно использовать [Waves Explorer](https://stagenet.wavesexplorer.com/converters).

## Вызов скрипта

Веб-приложение может выполнить вызов dApp-скрипта от имени пользователя MetaMask, используя библиотеку [Signer](/ru/building-apps/waves-api-and-sdk/client-libraries/signer) совместно с [ProviderMetamask](https://github.com/wavesplatform/provider-metamask):

1. Приложение формирует и отправляет транзакцию вызова скрипта c помощью вызова `invoke({...}).broadcast()`.
2. Signer вызывает соответствующую функцию ProviderMetamask, а ProviderMetamask вызывает API MetaMask.
3. MetaMask открывает окно, в котором пользователь может посмотреть детали транзакции, подтвердить или отклонить ее.
4. Получив подтверждение от пользователя, MetaMask генерирует транзакцию в формате Ethereum c подписью ECDSA и отправляет ее на ноду Waves через RPC API.
5. MetaMask отображает статус транзакции.

Примечания:
- MetaMask не поддерживает подписание транзакции без отправки ее на блокчейн, поэтому функцию `sign()` использовать не следует.
- Нода Waves не поддерживает ускорение или отмену транзакции и обрабатывает только первоначальную транзакцию.

Пример вызова скрипта см. в подразделе [Примеры использования MetaMask](#examples) ниже.

## Особенности транзакции в формате Ethereum

* Транзакция не может быть отправлена со смарт-аккаунта или dApp, поскольку пользователю MetaMask доступны только перевод токена и вызов скрипта, а установка скрипта недоступна.
* [Cпонсирование](/ru/blockchain/waves-protocol/sponsored-fee) комиссии недоступно: комиссия может быть указана только в WAVES.

См. также раздел [Бинарный формат транзакции в формате Ethereum](/ru/blockchain/binary-format/transaction-binary-format/ethereum-transaction-binary-format).

## Биржевой ордер

В [транзакции обмена](/ru/blockchain/transaction-type/exchange-transaction) один из ордеров (или оба) может быть с подписью ECDSA. Подпись ECDSA поддерживается только для ордеров версии 4.

1. Приложение вызывает функцию `signOrder()` ProviderMetamask, передавая параметры ордера.

   • ID ассетов следует указывать в формате Waves: 32 байта в base58. Для WAVES следует указывать строку `WAVES`.

   • `senderPublicKey` должен отсутствовать.

2. ProviderMetamask передает ордер в MetaMask как структуру данных, в соответствии с [EIP-712](https://eips.ethereum.org/EIPS/eip-712).
3. MetaMask открывает окно, в котором пользователь может посмотреть детали ордера, подписать его или отклонить.
4. MetaMask возвращает подпись ECDSA для этой структуры данных.
5. Приложение передает подписанный ордер в матчер.
6. Матчер исполняет ордера и формирует транзакции обмена.

Пример подписания ордера см. в подразделе [Примеры использования MetaMask](#examples) ниже.

## Поддержка в Ride<a id="support-in-ride">

В случае вызова скрипта с помощью Ethereum-транзакции структура [Invocation](/ru/ride/structures/common-structures/invocation), доступная вызываемой функции, содержит:
- в полях `caller`, `originCaller` — адрес отправителя в формате Waves (26 байт),
- в полях `callerPublicKey`, `originCallerPublicKey` — открытый ключ пользователя MetaMask (64 байта).

В случае верификации скриптом ассета транзакция в формате Ethereum интерпретируется как структура [TransferTransaction](/ru/ride/structures/transaction-structures/transfer-transaction) или [InvokeScriptTransaction](/ru/ride/structures/transaction-structures/invoke-script-transaction), которая содержит:
- в поле `sender` — адрес отправителя в формате Waves (26 байт),
- в поле `senderPublicKey` — открытый ключ пользователя MetaMask (64 байта).
- в поле `bodyBytes` — пустой массив байтов,
- в поле `version` — 0.

> Подпись транзакции недоступна в скрипте ассета.

Транзакция в формате Ethereum никогда не проверяется смарт-аккаунтом или функцией-верификатором dApp-скрипта, потому что транзакция в формате Ethereum не может быть отправлена со смарт-аккаунта или dApp.

Функция [addressFromPublicKey](/ru/ride/v6/functions/built-in-functions/converting-functions#addressfrompublickey-bytevector-address) принимает на вход как публичный ключ аккаунта Waves (32 байта), так и публичный ключ аккаунта MetaMask (64 байта) и возвращает адрес в формате Waves (26 байт).

Функция [transferTransactionById](/ru/ride/functions/built-in-functions/blockchain-functions#transfertransactionbyid) возвращает Ethereum-транзакцию по ее идентификатору, если эта транзакция была интерпретирована как транзакция перевода. Массив `proofs` при этом содержит 8 пустых значений.

## Примеры <a id="examples">использования MetaMask

### Вызов скрипта

Пример подключения к сети Waves и подписания транзакции вызова скрипта можно посмотреть в приложении Waves Dapp Ui. 

Вставьте адрес любого dApp на Stagenet, например [3MRuzZVauiiX2DGwNyP8Tv7idDGUy1VG5bJ](https://waves-dapp.com/3MRuzZVauiiX2DGwNyP8Tv7idDGUy1VG5bJ).

Нажмите **Sign In** и выберите **Sign in with Metamask**. Подтвердите в MetaMask подключение к сети. Waves Dapp Ui по умолчанию отображает адрес пользователя в формате Waves, но с помощью кнопок ![](./_assets/waves-addr-button.png) и ![](./_assets/eth-addr-button.png) доступно переключение между форматами адресов.

> Чтобы получить WAVES для уплаты комиссий за транзакции, скопируйте адрес в формате Waves и воспользуйтесь [Stagenet Faucet](https://stagenet.wavesexplorer.com/faucet).

Укажите аргументы вызываемой функции и (если требуется) платежи. Подтвердите транзакцию в MetaMask. Статус транзакции отображается в MetaMask на вкладке **Активность** с небольшой задержкой.

По ссылке на транзакцию из MetaMask открывается страница транзакции в Waves Explorer.

Пример кода приведен в [документации ProviderMetamask](https://github.com/wavesplatform/provider-metamask/blob/master/README.md). Для работы приложения необходимо установить библиотеку ProviderMetamask и последнюю версию Signer.

### Подписание ордера

Пример подписания ордера можно посмотреть на странице [Dapp test](https://metamask.wvservices.com/metamask/).

В поле **Order** заполните параметры ордера и нажмите **Sign order**. В MetaMask разрешите доступ к открытому ключу, затем подтвердите подписание данных. Подпись ордера появится на странице Dapp test в поле **result**.

Пример кода приведен в [документации ProviderMetamask](https://github.com/wavesplatform/provider-metamask/blob/master/README.md).
