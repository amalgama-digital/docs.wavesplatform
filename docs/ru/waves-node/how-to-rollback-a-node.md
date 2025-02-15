# Откатить ноду Waves

Откат блоков после заданной высоты позволяет быстро восстановить работу ноды в случае обнаружения форка, не загружая базу данных блокчейна целиком.

В случае настроек по умолчанию можно откатить **не более 2000 блоков**. Используйте метод Node REST API `POST /debug/rollback` с **API-ключом**  (см. [Waves Full Node API Swagger UI](https://nodes.wavesnodes.com/api-docs/index.html#/debug/rollbackToHeight)). Например:

```js
{
  "rollbackTo": 1057490,
  "returnTransactionsToUtx": false
}
```

Если вам необходимо откатить более 2000 блоков, следуйте инструкциям, приведенным в статье [Синхронизировать блокчейн Waves](/ru/waves-node/options-for-getting-actual-blockchain/) для загрузки актуального блокчейна.

Используйте утилиту [Chaincmp](https://github.com/wavesplatform/gowaves/releases/tag/v0.1.2) для сравнения блокчейна вашей ноды и других нод.

## Основные проблемы при откате ноды

Если вы запросили откат через `curl` или Swagger UI и получили ошибку 503, это не значит, что запрос не обрабатывается (это тайм-аут процесса). Чтобы убедиться, что нода обрабатывает запрос, проверьте, что состояние ноды не меняется и высота блокчейна не растет после того, как начат откат. Потребуется некоторое время, чтобы снова начать синхронизацию с желаемой высоты.

Нода может обработать откат до 2000 блоков без перезапуска, поэтому, если ваша нода по какой-то причине оказалась на форке, нужно ее обязательно как можно скорее откатить, чтобы не пришлось восстанавливать состояние более долгими методами.

**Примечание.** Ограничение высоты отката в 2000 блоков можно изменить с помощью параметра `max-rollback-depth` в файле конфигурации ноды. Подробнее см. в статье [Конфигурация ноды](/ru/waves-node/node-configuration).
