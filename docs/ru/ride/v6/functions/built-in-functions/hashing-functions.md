# [Ride v6] Функции хеширования

:warning: Это документация Стандартной библиотеки версии 6, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/). [Перейти к версии для Mainnet](/ru/ride/functions/built-in-functions/hashing-functions)

| Название | Описание | Сложность |
| :--- | :--- | :--- |
| [blake2b256](#blake2b256) | Семейство функций.<br>Хешируют массив байтов с помощью алгоритма [BLAKE2b-256](https://en.wikipedia.org/wiki/BLAKE_%28hash_function%29) | 13–136 |
| [keccak256](#keccak256) | Семейство функций.<br>Хешируют массив байтов с помощью алгоритма [Keccak-256](https://keccak.team/files/Keccak-submission-3.pdf) | 20–195 |
| [sha256](#sha256) | Семейство функций.<br>Хешируют массив байтов с помощью алгоритма [SHA-256](https://en.wikipedia.org/wiki/SHA-2) | 12–118 |

## blake2b256

Семейство функций. Хешируют массив байтов с помощью алгоритма [blake2b256](https://ru.wikipedia.org/wiki/BLAKE_%28хеш-функция%29).

| Название | Макс. объем данных | Сложность |
|:---| :--- | :--- |
| blake2b256(bytes: ByteVector): ByteVector | 150 Кбайт | 136 |
| blake2b256_16Kb(bytes: ByteVector): ByteVector | 16 Кбайт | 13 |
| blake2b256_32Kb(bytes: ByteVector): ByteVector | 32 Кбайт | 29 |
| blake2b256_64Kb(bytes: ByteVector): ByteVector | 64 Кбайт | 58 |
| blake2b256_128Kb(bytes: ByteVector): ByteVector | 128 Кбайт | 115 |

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `bytes`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов для хеширования.<br>Максимальный размер:<br>• Для функций `blake2b256_<N>Kb` — не более `N` Кбайт.<br>• Для функции `blake2b256` — не более 150 Кбайт. |

### Примеры

```ride
blake2b256("Ride".toBytes())   # Возвращает 6NSWRz5XthhFVm9uVQHuisdaseQJfc4WMGajN435v3f4
blake2b256(125.toBytes())      # Возвращает H9emWhyMuyyjDmNkgx7jAfHRuy9icXK3uYJuVw6R1uuK
blake2b256(base16'52696465')   # Возвращает 6NSWRz5XthhFVm9uVQHuisdaseQJfc4WMGajN435v3f4
blake2b256(base58'37BPKA')     # Возвращает 6NSWRz5XthhFVm9uVQHuisdaseQJfc4WMGajN435v3f4
blake2b256(base64'UmlkZQ==')   # Возвращает 6NSWRz5XthhFVm9uVQHuisdaseQJfc4WMGajN435v3f4
```

## keccak256

Семейство функций. Хешируют массив байтов с помощью алгоритма [Keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).

| Название | Макс. объем данных | Сложность |
|:---| :--- | :--- |
| keccak256(bytes: ByteVector): ByteVector | 150 kB | 195 |
| keccak256_16Kb(bytes: ByteVector): ByteVector | 16 kB | 20 |
| keccak256_32Kb(bytes: ByteVector): ByteVector | 32 kB | 39 |
| keccak256_64Kb(bytes: ByteVector): ByteVector | 64 kB | 74 |
| keccak256_128Kb(bytes: ByteVector): ByteVector | 128 kB | 147 |

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `bytes`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов для хеширования.<br>Максимальный размер:<br>• Для функций `keccak256_<N>Kb` — не более `N` Кбайт.<br>• Для функции `keccak256` — не более 150 Кбайт. |

### Примеры

```ride
keccak256("Ride".toBytes())   # Возвращает 4qa5wNk4961VwJAjCKBzXiEvBQ2gBJoqDcLFRJTiSKpv
keccak256(125.toBytes())      # Возвращает 5UUkcH6Fp2E3mk7NSqSTs3JBP33zL3SB3yg4b2sR5gpF
keccak256(base16'52696465')   # Возвращает 4qa5wNk4961VwJAjCKBzXiEvBQ2gBJoqDcLFRJTiSKpv
keccak256(base58'37BPKA')     # Возвращает 4qa5wNk4961VwJAjCKBzXiEvBQ2gBJoqDcLFRJTiSKpv
keccak256(base64'UmlkZQ==')   # Возвращает 4qa5wNk4961VwJAjCKBzXiEvBQ2gBJoqDcLFRJTiSKpv
```

## sha256

Семейство функций. Хешируют массив байтов с помощью алгоритма [SHA-256](https://ru.wikipedia.org/wiki/SHA-2).

| Название | Макс. объем данных | Сложность |
|:---| :--- | :--- |
| sha256(bytes: ByteVector): ByteVector | 150 Кбайт | 118 |
| sha256_16Kb(bytes: ByteVector): ByteVector | 16 Кбайт | 12 |
| sha256_32Kb(bytes: ByteVector): ByteVector | 32 Кбайт | 23 |
| sha256_64Kb(bytes: ByteVector): ByteVector | 64 Кбайт | 47 |
| sha256_128Kb(bytes: ByteVector): ByteVector | 128 Кбайт | 93 |

``` ride
sha256(bytes: ByteVector): ByteVector
sha256_16Kb(bytes: ByteVector): ByteVector
sha256_32Kb(bytes: ByteVector): ByteVector
sha256_64Kb(bytes: ByteVector): ByteVector
sha256_128Kb(bytes: ByteVector): ByteVector
```

### Параметры

| Параметр | Описание |
| :--- | :--- |
| `bytes`: [ByteVector](/ru/ride/data-types/byte-vector) | Массив байтов для хеширования.<br>Максимальный размер:<br>• Для функций `sha256_<N>Kb` — не более `N` Кбайт.<br>• Для функции `sha256` — не более 150 Кбайт. |

### Примеры

```ride
sha256("Ride".toBytes())   # Возвращает 5YxvrKsjJtq4G325gRVxbXpkox1sWdHUGVJLnRFqTWD3
sha256(125.toBytes())      # Возвращает A56kbJjy7A4B9Pa5tUgRNvtCHSsZ7pZVJuPsLT2vtPSU
sha256(base16'52696465')   # Возвращает 5YxvrKsjJtq4G325gRVxbXpkox1sWdHUGVJLnRFqTWD3
sha256(base58'37BPKA')     # Возвращает 5YxvrKsjJtq4G325gRVxbXpkox1sWdHUGVJLnRFqTWD3
sha256(base64'UmlkZQ==')   # Возвращает 5YxvrKsjJtq4G325gRVxbXpkox1sWdHUGVJLnRFqTWD3
```
