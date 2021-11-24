# Ордер

**Ордер** — биржевая заявка, инструкция матчеру на покупку или продажу [токена](/ru/blockchain/token/). Матчер — сервис, который исполняет ордера и формирует транзакции обмена. Ордер содержит публичный ключ матчера и не может быть выполнен другим матчером.

Ордер появляется на блокчейне только в составе транзакции обмена. Пока ордер не выполнен полностью или частично, на блокчейне нет никакой информации о нем. Подробнее о выполнении ордеров см. в разделе [Транзакция обмена](/ru/blockchain/transaction-type/exchange-transaction).

О способах создания ордера читайте в разделе [Как купить или продать токены](/ru/building-apps/how-to/basic/trading).

> Каждый матчер самостоятельно устанавливает минимальный размер комиссии матчера и токены, в которых отправитель ордера может указывать комиссию. См. раздел [Комиссия матчера](/ru/blockchain/transaction-type/exchange-transaction#комиссия-матчера). Матчер также может устанавливать собственные ограничения на прием ордеров, в дополнение к правилам валидации ордеров на блокчейне, например: черный список отправителей и ассетов, порядок ассетов в паре, минимальное количество ассета и т. п.

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
| assetPair.amountAsset | ID amount-ассета: байты в кодировке base58.<br>`null` соответствует WAVES |
| assetPair.priceAsset | ID price-ассета: байты в кодировке base58.<br>`null` соответствует WAVES |
| orderType | Тип ордера:<br>• buy — отправитель покупает amount-ассет,<br>• sell — отправитель продает amount-ассет |
| amount | Количество amount-ассета. Всегда целое число, выраженное в [атомарных единицах](/ru/blockchain/token/#атомарная-единица) ассета |
| price | 8 байт | Стоимость 1 amount-ассета, выраженная в price-ассете, умноженная на коэффициент:<br>• 10<sup>8</sup> для ордера версии 4;<br>• 10<sup>`8 + priceAssetDecimals – amountAssetDecimals`</sup> для ордера версии 3, 2 или 1, где `amountAssetDecimals`, `priceAssetDecimals` — количество знаков после запятой (параметр токена).<br>Всегда целое число |
| timestamp | Временная метка ордера, указанная отправителем: Unix-время в миллисекундах |
| expiration | Окончание срока действия ордера: Unix-время в миллисекундах |
| matcherFee | [Комиссия матчера](/ru/blockchain/transaction-type/exchange-transaction#комиссия-матчера) |
| *signature* | Подпись отправителя в ордере версии 1. В последующих версиях в поле возвращается первый элемент массива `proofs` |
| proofs | Подтверждения ордера, используемые для его верификации, аналогично [подтверждениям транзакции](/ru/blockchain/transaction/transaction-proof). До 8 подтверждений, каждое подтверждение до 64 байт, байты в кодировке base58 |
| matcherFeeAssetId | ID токена, в котором указана комиссия матчера: байты в кодировке base58.<br>`null` означает, что комиссия указана в WAVES |

Приведенный выше ордер — это заявка на покупку 15,637504 NSBT по цене не выше 1,21140511 WAVES за 1 NSBT. 

Amount-ассетом является [NSBT](https://wavesexplorer.com/tx/6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g), `amountAssetDecimals` равно 6.

Price-ассетом является WAVES, `priceAssetDecimals` равно 8.

Значение `amount` равно 15,637504 × 10<sup>`amountAssetDecimals`</sup> = 15637504.

Значение `price` равно 1,21140511 × <sup>`8 + priceAssetDecimals – amountAssetDecimals`</sup> = 12114051100 (поскольку это ордер версии 3).

<br>
<details><summary>Расчет количества price-ассета</summary>

Количество price-ассета в атомарных единицах, которое отправитель ордера
* отдаст в случае BUY-ордера,
* получит в случае SELL-ордера, —

вычисляется по формуле:

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
