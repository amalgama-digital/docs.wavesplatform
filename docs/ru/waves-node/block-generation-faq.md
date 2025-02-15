# Генерация блоков FAQ

В данной статье представлены ответы на часто задаваемые вопросы, которые могут возникнуть в процессе генерации блоков.

## `Моя нода работает, но не генерирует блоки. Что мне делать?`

**Ответ**:

* Проверьте [генерирующий баланс](/ru/blockchain/account/account-balance#баланс-в-токене-waves). Чтобы начать генерацию блоков, необходимо иметь на балансе от 1000 WAVES на протяжении 1000 блоков (включая WAVES переданные ноде в лизинг). [Как проверить или пополнить баланс](/ru/blockchain/account/account-balance#пополнение-и-просмотр-баланса-аккаунта).

* Проверьте, что на аккаунте ноды не установлен скрипт.

* Убедитесь, что нода не на форке. [Как выявить и устранить форк](/ru/waves-node/#работа-с-форками).

* Убедитесь, что кошелек ноды настроен правильно. Для этого в файле `waves.log` найдите сообщения о попытках генерации блоков (`Next attempt`) и проверьте, правильный ли там указан адрес (`acc=`) генерирующей ноды. Если в сообщениях адрес не соответствует адресу вашей ноды, проверьте [настройки кошелька](/ru/waves-node/node-configuration#настроики-кошелька) в файле конфигурации ноды.

* Убедитесь, что у ноды достаточно соединений с пирами (другими нодами).
Для этого в файле конфигурации ноды проверьте строку с параметром [`waves.miner.quorum`](/ru/waves-node/node-configuration#настроики-генератора-блоков) (по умолчанию `quorum` = 1). Параметр позволяет задать минимальное количество подключений к пирам, необходимых для генерации блоков. Если нода не может подключиться к заданному количеству пиров (например, из-за проблем с интернет подключением или из-за попадания ноды в черный список), то генерация блоков будет приостановлена. Проверить текущие подключения к пирам можно с помощью API метода [GET /peers/connected](https://nodes.wavesnodes.com/api-docs/index.html#/peers/getConnectedPeers). Получить список нод, которые попали в черный список можно с помощью API метода [GET /peers/blacklisted](https://nodes.wavesnodes.com/api-docs/index.html#/peers/getBannedPeers).

## `Где лежит файл waves.log?`

**Ответ**: Если ваша нода установлена из Deb-пакета, по умолчанию, файл `waves.log` расположен в папке `/var/log/waves/`, в других случаях в `${waves.directory}/logs/`. По умолчанию файлы логов может читать только пользователь, от имени которого запущена нода. [Подробнее про логирование](/ru/waves-node/logging-configuration).

## `Моя нода работает (не на форке), баланс более 1000 WAVES, в файле waves.log отображается правильный адрес (acc=) генерирующей ноды, однако нода не генерирует блоки. Почему так происходит?`

**Ответ**: Генерация блоков происходит с определенной вероятностью, согласно алгоритму [LPoS](/ru/blockchain/glossary#lpos). Шансы на генерацию блока прямо пропорциональны генерирующему балансу WAVES. При минимальном генерирующем балансе (1000 WAVES) нода имеет минимальные шансы сгенерировать блок (1 блок в месяц или реже). [Подробнее про эффективность генерирующих нод](#сколько-блоков-может-генерировать-нода-в-день-месяц). Каждая нода независимо от остальных нод начинает генерировать блок в разрешенное ей алгоритмом время. Всегда есть шанс, что другая нода начнет генерацию блока раньше вашей. Вы можете установить причину, по которой ваша нода не сгенерировала блок, изучив записи (`Next attempt`) о попытках генерации блоков в файле `waves.log`. Также эти записи помогут установить, какая нода успешно сгенерировала блок.

## `Как убедиться, что нода делает попытки генерировать блоки?`

**Ответ**: Проверить, есть ли в файле `waves.log` записи (Next attempt) с попытками генерации блоков.

Для поиска записей выполните следующую grep команду:

```bash
sudo grep "Next attempt\|Forging\| Block(" /var/log/waves/waves.log
```

**Пример записи с попыткой генерации**:

```bash
2020-09-07 10:27:55,076 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 508.710 seconds
2020-09-07 10:27:55,147 DEBUG [ecution-context-global-48] c.w.s.a.BlockAppender$ - [2ecdf572 134.209.30.86:56992] Appended Block(DeB2bwPeJkpDMpLEvHm8MRg3axpYtwupMZi5uRigrLZo,CPX3P6rvYttUhUFtM2MTHdJ4AALFyfdfDey5oH9CGJXP,3PJEPHsDNtfDRxxaja8wEp3mCXp5kpLYsLS,1599474474614,[])
2020-09-07 10:29:50,072 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 457.722 seconds
2020-09-07 10:29:50,161 DEBUG [ecution-context-global-48] c.w.s.a.BlockAppender$ - [7895562c 173.249.1.184:60940] Appended Block(2fXUoLdh4XmDkuTfdZ7bPyvubBfEdhQ989X5P27nbHby,8hs8fTy52sJyzJwxMb75A38JAxsEPjycMTyfCbbrW9XB,3PEFQiFMLm1gTVjPdfCErG8mTHRcH2ATaWa,1599474589929,[],600000000)
```

В данном примере нода `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` получила блок `DeB2bwPeJkpDMpLEvHm8MRg3axpYtwupMZi5uRigrLZo` и в `2020-09-07 10:27:55,076` запланировала попытку сгенерировать следующий блок через `508.710` секунд (~ в 10:34:23). Также пример говорит о том, что обработка блока `DeB2bwPeJkpDMpLEvHm8MRg3axpYtwupMZi5uRigrLZo` завершена и после этого нода получила следующий проверенный блок `2fXUoLdh4XmDkuTfdZ7bPyvubBfEdhQ989X5P27nbHby` сгенерированный нодой `3PEFQiFMLm1gTVjPdfCErG8mTHRcH2ATaWa` в `2020-09-07 10:29:50,072` (раньше чем нода `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` планировала сгенерировать следующий блок). В данном случае нода `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` не сгенерировала блок в 10:34:23 потому, что блок был сгенерирован ранее другой нодой `3PEFQiFMLm1gTVjPdfCErG8mTHRcH2ATaWa`.

## `Как понять, что нода сгенерировала блок?`

**Ответ**: Найдите в файле `waves.log` записи `Forged and applied...`

**Пример записи с удачной попыткой генерации**:

```bash
2020-09-06 04:06:13,517 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 41.305 seconds
2020-09-06 04:06:13,556 DEBUG [ecution-context-global-48] c.w.s.a.BlockAppender$ - [560c392d 5.189.182.6:52504] Appended Block(3bQwytTjwQCkQs2DWuoR5oqNKFtjAyDSftHQXrW2ALLQ29MpVBuX96231JW9joTGsYbbuyHaEuhrfUVvgFxdnJBs,2rTRaJqMrp2L3HvUfJ4FRQQGZGPM23kHVdhy1pAQucHLAvyG7QEHy6mMw9MfV7cjf7r2BDWYeyv7Eih3Uz83yVog,3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb,1599365173456,[],600000000)
2020-09-06 04:06:54,829 DEBUG [block-miner-35] c.w.mining.MinerImpl - Forging with <3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N>, Time 41369 > Estimated Time 41361, balance 3485157657499, prev block 2qNW6zpp419atqZbstbwnAijUAmk55ggWiSvFLu6eDDSMuMciMta9f8aNXWh1HybQe2i2R2KwMcRrhHwd8by2Ya7 at 2228616 with target 61
2020-09-06 04:06:54,842 DEBUG [appender-52] c.w.mining.MinerImpl - Next attempt for acc=3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N in 412.766 seconds
2020-09-06 04:06:54,887 DEBUG [block-miner-35] c.w.mining.MinerImpl - Forged and applied Block(5sWqTZbHP2p5T1ss31FnGx4s48an8Uf1czTbcHrkBwomRnN9j4HU9zw4Y7YvB1yWeHx3a17up3rF8397Upmbdntm,2qNW6zpp419atqZbstbwnAijUAmk55ggWiSvFLu6eDDSMuMciMta9f8aNXWh1HybQe2i2R2KwMcRrhHwd8by2Ya7,<3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N>,1599365214825,[],2000000000) with cumulative score 525712542186004822512224
```

В данном примере в `2020-09-06 04:06:13,517` нода `3PMj3yGPBEa1Sx9X4TBAFeJCMMaE3wvKR4N` запланировала сгенерировать блок через `41.305` секунд и через `41.305` секунд начала генерировать блок и успешно его сгенерировала (`Forged and applied Block 5sWqTZbHP2p5T1ss31FnGx4s48an8Uf1czTbcHrkBwomRnN9j4HU9zw4Y7YvB1yWeHx3a17up3rF8397Upmbdntm`).

## `Судя по логам, моя нода генерирует блоки, но они не попадают в блокчейн. Почему так происходит?`

**Ответ**: В некоторых случаях, блок может быть успешно сгенерирован вашей нодой и это видно в логах, однако это не гарантирует что блок будет принят в блокчейн. В итоге будет принят тот блок, который раньше всех попадет в сеть. Есть вероятность, что другая нода сгенерировала блок одновременно с вашей и отправила его в сеть быстрее. Когда новый блок попадет в блокчейн, каждая нода принимает и применяет его, но только после успешной проверки того, мог ли блок быть сгенерирован в это время таким адресом. Используйте сайт [wavesexplorer.com](https://wavesexplorer.com/) для проверки временных отметок и ID нод, которые успешно сгенерировали блоки принятые в блокчейн.

## `Сколько блоков может генерировать нода в день/месяц?`

**Ответ**: Используйте сайт [dev.pywaves.org](https://dev.pywaves.org/) для обзора эффективности генерирующих нод (коэффициент эффективности = количество сгенерированных блоков / оценочное количество сгенерированных блоков). Для просмотра расчетного количество блоков переключитесь на `Generators >> 30 days generators`. Выбор генератора происходит согласно вероятностному, а не детерминированному алгоритму, поэтому **фактическое количество может отличаться от расчетного**. Чем короче промежуток времени при расчете, тем больше расхождение фактического и расчетного количества блоков. Пожалуйста, имейте ввиду, что краткосрочные (ежедневные) расчеты предоставлены для ознакомления.

## `Как генерировать больше блоков?`

**Ответ**: Чтобы генерировать больше блоков увеличьте генерирующий баланс ноды. Используйте быстрое интернет-соединение и современное оборудование, в соответствии с [системными требованиями ноды](/ru/waves-node/how-to-install-a-node/how-to-install-a-node#системные-требования).

## Другие вопросы

Если вы хотите задать другие вопросы, связанные с нодой, в сообществе Waves, см. главу [Будьте в курсе](/ru/keep-in-touch/).