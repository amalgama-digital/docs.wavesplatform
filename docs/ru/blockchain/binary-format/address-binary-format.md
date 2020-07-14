# Бинарный формат адреса

> Узнать больше об [адресе](/ru/blockchain/account/address)

|Порядковый номер поля | Поле | Тип поля | Размер поля в байтах | Комментарии |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Тип сущности | Байт | 1 | Значение должно равняться 1 |
| 2 | [Байт сети](/ru/blockchain/blockchain-network/#байт-сети) | Байт | 1 | 87 — для Mainnet<br>84 — для Testnet<br>83 — для Stagenet |
| 3 | Хеш открытого ключа аккаунта | Массив байтов | 20 | Первые 20 байтов результата хеш-функции [Keccak256](https://en.wikipedia.org/wiki/SHA-3)([Blake2b256](https://en.wikipedia.org/wiki/BLAKE_%28hash_function%29)(`publicKey`)).<br>Здесь `publicKey` — массив байтов открытого ключа аккаунта |
| 4 | Контрольная сумма | Массив байтов | 4  | Первые 4 байта результата хеш-функции [Keccak256](https://ru.wikipedia.org/wiki/SHA-3)([Blake2b256](https://ru.wikipedia.org/wiki/BLAKE_%28хеш-функция%29)(`data`)).<br>Здесь `data` — массива байтов из трех полей взятых вместе:<br> 1.&nbsp;Тип сущности <br> 2.&nbsp;[Байт сети](/ru/blockchain/blockchain-network/#байт-сети)<br> 3.&nbsp;Хеш открытого ключа аккаунта |
