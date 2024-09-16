# Documentación

## Manejo de bases de datos

##### `src/database`

### `createDBConnection()`

Crea una nueva instancia de conexión con una base de datos Sqlite3.
El directorio de dicha base de datos es, por defecto,  `src/database/links.db`

Esta función es asíncrona

##### Posibles valores de retorno
`DB`: Instancia de conexión a una base de datos Sqlite3

### `createLinksTable(db)`
Crea una tabla `links` en la base de datos `db` con la siguiente estructura:

| Campo  | Atributos|
| ------------- |:-------------:|
| `originalURL`      | `TEXT`, `NOT NULL`, `UNIQUE`, `PRIMARY KEY`     |
| `shortenedURL`      | `TEXT`, `NOT NULL`, `UNIQUE`    |

Esta función es asíncrona

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `DB`      | Instancia de conexión a una base de datos Sqlite3     |

## Validación de URLs

##### `src/utils`

### `isValidUrl(str)`
Comprueba si el parámetro `str` es una URL válida

##### Posibles valores de retorno
`true`, `false`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `str`      | `string`     |

## Búsqueda de URLs

##### `src/database`

### `lookupShortenedUrl(db, originalURL)`
Busca un campo `shortenedURL` en la tabla `links` de la base de datos cuya `originalURL` coincida con el parámetro `originalURL`

Esta función es asíncrona

##### Posibles valores de retorno
`string`, `null`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `DB`      | Instancia de conexión a una base de datos Sqlite3     |
| `originalURL`      | `string`     |

### `getOriginalUrl(db, shortenedURL)`
Busca un campo `originalURL` en la tabla `links` de la base de datos cuya `shortenedURL` coincida con el parámetro `shortenedURL`.

Esta función es asíncrona

##### Posibles valores de retorno
`string`, `null`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `DB`      | Instancia de conexión a una base de datos Sqlite3     |
| `shortenedURL`      | `string`     |

### `shortenedUrlExists(db, shortenedURL)`
Comprueba si el parámetro `shortenedURL` coincide con algún campo `shortenedURL` de la tabla `links` de la base de datos

Esta función es asíncrona

##### Posibles valores de retorno
`string`, `null`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `DB`      | Instancia de conexión a una base de datos Sqlite3     |
| `shortenedURL`      | `string`     |


## Inserción de URLs

##### `src/database`

### `insertUrlRow(db, originalURL, shortenedURL)`
Inserta una nueva fila en la tabla `links` de la base de datos con `originalURL` y `shortenedURL`

Esta función es asíncrona

##### Posibles valores de retorno
`null`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `DB`      | Instancia de conexión a una base de datos Sqlite3     |
| `originalURL`      | `string`     |
| `shortenedURL`      | `string`     |

## Creación de URLs acortadas

##### `src/utils`

### `shortenedWithDomain(shortenedURL)`

`const SERVER_ADDRESS = process.env.HOST + ":" + process.env.PORT;`

`const SUBDIRECTORIES = '/api/';`

Crea una URL acortada utilizando `SERVER_ADDRESS` como la URL raíz del sitio.

Si `SUBDIRECTORIES` fue especificado, lo utiliza como subdirectorio dentro del cual reside `shortenedURL`

##### Posibles valores de retorno
`string`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `shortenedURL`      | `string`     |

## Generación de hash

##### `src/utils`

### `idGenerator(db)`

Genera un nuevo hash de 8 dígitos. Utiliza `db` para comprobar que no existan colisiones con campos existentes.

Esta función es asíncrona


##### Posibles valores de retorno
`string`

##### Parámetros

| Parámetro  | Descripción |
| ------------- |:-------------:|
| `DB`      | Instancia de conexión a una base de datos Sqlite3     |