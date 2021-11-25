# Ордер

**Ордер** — биржевая заявка, инструкция матчеру на покупку или продажу [токена](/ru/blockchain/token/). Матчер — сервис, который исполняет ордера и формирует транзакции обмена. Ордер содержит публичный ключ матчера и не может быть выполнен другим матчером.

Ордер появляется на блокчейне только в составе транзакции обмена. Пока ордер не выполнен полностью или частично, на блокчейне нет никакой информации о нем. Подробнее о выполнении ордеров см. в разделе [Транзакция обмена](/ru/blockchain/transaction-type/exchange-transaction).

О способах создания ордера читайте в разделе [Как купить или продать токены](/ru/building-apps/how-to/basic/trading).

> Каждый матчер самостоятельно устанавливает минимальный размер комиссии матчера и токены, в которых отправитель ордера может указывать комиссию. См. раздел [Комиссия матчера](/ru/blockchain/transaction-type/exchange-transaction#комиссия-матчера). Матчер также может устанавливать собственные ограничения на прием ордеров, в дополнение к правилам валидации ордеров на блокчейне, например: черный список отправителей и ассетов, порядок ассетов в паре, минимальное количество ассета к покупке/продаже и т. п.

## JSON-представление ордера

JSON-представление ордера в [REST API](/ru/waves-node/node-api/) ноды Waves:

```json
{
   "version": 3,
   "id": "72iHDmfr7VWH1cbuP4FjscUU1kcW8CJ629ctVKMyDLBm",
   "sender": "3PB4PKHZ69qtxtQi4zTjcpisyUbEYgs6CD1",
   "senderPublicKey": "3g4rdPwkZmjSe18MGuZtVLtiN1uQ1fP4eqnHYjApoSU5",
   "matcherPublicKey": "9cpfKN9suPNvfeUNphzxXMjcnn974eme8ZhWUjaktzU5",
   "assetPair": {
      "amountAsset": "6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g",
      "priceAsset": null
   },
   "orderType": "buy",
   "amount": 15637504,
   "price": 12114051100,
   "timestamp": 1637671821599,
   "expiration": 1637844621599,
   "matcherFee": 300000,
   "signature": "2YjtusNiBzevq23v7wV8tkt5Ri1vtmDAoW5qhRThcpUqqZcyP6joqe7StMXyLaXjM6rYCe1tPMB973Sq9TPRfcsU",
   "proofs": [
      "2YjtusNiBzevq23v7wV8tkt5Ri1vtmDAoW5qhRThcpUqqZcyP6joqe7StMXyLaXjM6rYCe1tPMB973Sq9TPRfcsU"
   ],
   "matcherFeeAssetId": null
}
```

| Поле | Описание |
| :--- | :--- |
| version | Версия ордера.<br>Список версий см. в описании [бинарного формата ордера](/ru/blockchain/binary-format/order-binary-format) |
| *id* | Идентификатор ордера: байты в кодировке base58. Идентификатор ордера вычисляется аналогично идентификатору транзакции, см. раздел [Cryptographic practical details](/en/blockchain/waves-protocol/cryptographic-practical-details#calculating-transaction-id) |
| *sender* | [Адрес](/ru/blockchain/account/address) отправителя ордера: байты в кодировке base58 |
| senderPublicKey | [Открытый ключ](/ru/blockchain/account/#открытый-и-закрытый-кnючи-аккаунта) отправителя ордера: байты в кодировке base58 |
| matcher_public_key | Открытый ключ матчера, на который отправлен ордер: байты в кодировке base58 |
| assetPair.amountAsset | ID amount-ассета (базовой валюты): байты в кодировке base58.<br>`null` означает WAVES |
| assetPair.priceAsset | ID price-ассета (валюты котировки): байты в кодировке base58.<br>`null` означает WAVES |
| orderType | Тип ордера:<br>• buy — отправитель покупает amount-ассет,<br>• sell — отправитель продает amount-ассет |
| amount | Количество amount-ассета. Целое число, выраженное в [атомарных единицах](/ru/blockchain/token/#атомарная-единица) ассета |
| price | Стоимость 1 amount-ассета, выраженная в price-ассете, умноженная на коэффициент:<br>• 10<sup>8</sup> для ордера версии 4;<br>• 10<sup>`8 + priceAssetDecimals – amountAssetDecimals`</sup> для ордера версии 3, 2 или 1, где `amountAssetDecimals`, `priceAssetDecimals` — количество знаков после запятой ([параметр токена](/ru/blockchain/token/)).<br>Целое число. См. [пояснение](#explanation) ниже |
| timestamp | Временная метка ордера, указанная отправителем: Unix-время в миллисекундах |
| expiration | Окончание срока действия ордера: Unix-время в миллисекундах |
| matcherFee | [Комиссия матчера](/ru/blockchain/transaction-type/exchange-transaction#комиссия-матчера). Целое число, выраженное в атомарных единицах токена комиссии |
| *signature* | • Подпись отправителя в ордере версии 1.<br>• В последующих версиях ордера в поле возвращается первый элемент массива `proofs` |
| proofs | Подтверждения ордера, используемые для его верификации, аналогично [подтверждениям транзакции](/ru/blockchain/transaction/transaction-proof). До 8 подтверждений, каждое подтверждение до 64 байт, байты в кодировке base58 |
| eip712Signature | Для ордера, подписанного пользователем MetaMask: подпись ECDSA в кодировке HEX. Поддержка MetaMask добавлена в версии ноды 1.4.0 и включается с активацией фичи №&nbsp;17 “Ride V6, MetaMask support, Invoke Expression”. Версии 1.4.x в настоящее время доступны только для [Stagenet](/ru/blockchain/blockchain-network/). Подробнее в разделе [Подписание транзакций и ордеров в MetaMask](/ru/keep-in-touch/metamask) |
| matcherFeeAssetId | ID токена, в котором указана комиссия матчера: байты в кодировке base58.<br>`null` означает, что комиссия указана в WAVES |

**Пояснение:<a id="explanation"></a>**

Приведенный выше ордер — это заявка на покупку 15,637504 NSBT по цене не выше 1,21140511 WAVES за 1 NSBT. 

Amount-ассетом является [NSBT](https://wavesexplorer.com/tx/6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g), `amountAssetDecimals` равно 6.

Price-ассетом является WAVES, `priceAssetDecimals` равно 8.

Значение `amount` в ордере равно 15,637504 × 10<sup>`amountAssetDecimals`</sup> = 15637504.

Значение `price` в ордере равно 1,21140511 × <sup>`8 + priceAssetDecimals – amountAssetDecimals`</sup> = 12114051100 (поскольку это ордер версии 3).

Представление `amount` и `price` в виде целых чисел позволяет избежать проблемы точности вычислений.

<br>
<details><summary>▶ Расчет количества price-ассета</summary>

Количество price-ассета в атомарных единицах, которое отправитель ордера отдает (в случае ордера на покупку) или получает (в случае ордера на продажу) в обмен на amount-ассет, вычисляется по формуле:

* в ордере версии 4: `amount` × `price` × 10<sup>`(priceAssetDecimals - amountAssetDecimals - 8)`</sup>,
* в ордере версий 1, 2, 3: `amount` × `price` × 10<sup>-8</sup>.

Если в результате вычисления получено значение с дробной частью, то она отбрасывается.

Например, в ордере версии 3, приведенном выше, количество price-ассета рассчитывается как:

15637504 × 12114051100 × 10<sup>-8</sup> = 1894335225,324544,

после отбрасывания дробной части — 1894335225 в атомарных единицах, что соответствует 18,94335225 WAVES.
</details>

## Бинарный формат ордера

См. раздел [Бинарный формат ордера](/ru/blockchain/binary-format/order-binary-format).

## Структура Ride

Для операций с ордером в смарт-контрактах используется структура [Order](/ru/ride/structures/common-structures/order).
