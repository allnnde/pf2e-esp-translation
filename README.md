<div align="center">
<h3 align="center">PF2E-es translation</h3>

</div>

<!-- ABOUT THE PROJECT -->

## Colaboraciones

Para poder lograr que el flujo automatico funcione, los comits y las pr deberian seguir la se usa [Convencional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
para las traducciones esta [El proyecto Pathfinder 2E Español en Crowdin](https://crowdin.com/project/pathfinder-2e-espanol)

## About The Project

Traduccion no oficial al español del sistema de Pathfinder Segunda edicion para Foundy VTT.

Se ha usado https://github.com/thedaviddelta/lingva-translate para poder hacer la traduccion base del sistema y se continuo con correcciones del mismo

Y estamos mejorando y apliando la traducciones en [El proyecto Pathfinder 2E Español en Crowdin](https://crowdin.com/project/pathfinder-2e-espanol)

Para estar en contacto tenemos nuestro [Discord!](https://discord.gg/KdFugdsctp)

## Estructura del proyecto

- `translation/en/`: archivos base extraídos del sistema y de los módulos compatibles.
- `translation/es/`: traducciones españolas de interfaz y compendios.
- `src/pack-extractor/`: selección de la publicación de PF2e y generación de los archivos base.
- `src/helper/`: extracción de documentos, lectura de ZIP y compendios LevelDB.
- `src/translator/` y `src/babele-register.js`: aplicación de las traducciones en Foundry mediante Babele.
- `crowdin.yml`: correspondencia entre archivos base y traducciones.
- `.github/workflows/`: actualización de los originales, integración y publicación del módulo.

## Actualización de los archivos base

Los archivos del sistema se obtienen de las publicaciones de
[Foundry VTT PF2e](https://github.com/foundryvtt/pf2e/releases). Ese repositorio
también publica Starfinder y Anachronism, por lo que su enlace `releases/latest`
no identifica necesariamente la versión más reciente de Pathfinder.

El extractor consulta la API de GitHub, selecciona la versión estable más alta
con etiqueta `pf2e-X.Y.Z` y exige que contenga `json-assets.zip` y `system.json`.
No utiliza versiones preliminares ni retrocede silenciosamente a una versión
anterior si faltan archivos. Puede usar `GITHUB_TOKEN` para las consultas a la API.

Con Node.js 22, desde la raíz del repositorio:

```sh
npm install
npm test
npm run pack-extractor
```

Para reproducir una versión concreta o actualizar únicamente los originales
del sistema, sin descargar módulos adicionales:

```sh
npm run pack-extractor -- --version 8.6.0
npm run pack-extractor -- --version 8.6.0 --system-only
```

El manifiesto de esa misma publicación determina las rutas reales de los
compendios y permite descubrir nuevos contenidos. Se conservan los nombres de
archivo ya utilizados por Crowdin; los compendios nuevos utilizan su identificador
de Foundry. Los archivos y campos españoles se conservan para su revisión posterior.
La extracción respeta las selecciones parciales de entradas configuradas en
`pack-extractor-config.json`.

Las descargas y la extracción se completan antes de escribir los originales.
`src/pack-extractor/pf2e-source.json` registra la versión, los enlaces de origen y
la compatibilidad con Foundry declarada por PF2e. Esta compatibilidad describe el
sistema original y no acredita que el módulo de traducción se haya probado en
esa versión de Foundry.

El workflow `crowdin.yml` actualiza diariamente los originales en `main` y ejecuta
las pruebas antes de extraer. Los bestiarios de `translation/en/actors/` también
se envían a Crowdin. Los archivos ingleses y españoles deben reconciliarse después
de cambiar los originales y antes de sincronizar las traducciones.

### Alineación y nombres de archivo

La colección de Foundry se identifica mediante `pf2e.<name>`, donde `name` es
el ID de `packs` en el manifiesto oficial; no tiene por qué coincidir con su
`path` físico. Babele busca `pf2e.<name>.json`. Por ejemplo, `packs/actions`
corresponde a `pf2e.actionspf2e.json`, `packs/spells` a
`pf2e.spells-srd.json` y `packs/standalone-adventures` a
`pf2e.dawn-of-the-frogs.json`. Los nombres históricos de los originales de
Crowdin se conservan mediante las reglas de `crowdin.yml`.

[translation-map.json](docs/translation-map.json) registra el ID, la ruta física
y la pareja inglés/español de cada compendio, además de las interfaces y módulos.
Se contrasta con el manifiesto de la misma versión que `pf2e-source.json`.

```sh
npm run translations:align
npm run translations:check
npm run translations:audit
```

El alineado conserva el texto español disponible, recupera coincidencias de
original exacto cuando no son ambiguas y replica las claves, tipos, arrays,
IDs y mappings del original. Retira archivos sin correspondencia activa; el
commit de partida queda registrado para recuperarlos desde Git. **No traduce**:
los campos nuevos se completan inicialmente con el original inglés y deben
traducirse en una segunda fase. La comprobación exige que repetir el alineado
no produzca cambios. [translation-alignment.json](docs/translation-alignment.json)
documenta la fase de alineación del lote actual.

## Archivos españoles y estado de revisión

Babele busca los compendios del sistema en `translation/es/compendium/` con el
nombre `pf2e.<identificador-del-compendio>.json`, usando el campo `name` del
manifiesto de PF2e. Por ejemplo, los originales `spells.json`, `feats.json`,
`equipment.json` y `actions.json` corresponden a `pf2e.spells-srd.json`,
`pf2e.feats-srd.json`, `pf2e.equipment-srd.json` y `pf2e.actionspf2e.json`.
Monster Core 2 y NPC Core usan `pf2e.pathfinder-monster-core-2.json` y
`pf2e.pathfinder-npc-core.json`.

Se conservan las claves originales de `entries`, los IDs y las rutas de
`mapping`; se traducen los valores visibles. Los objetos y arrays deben mantener
sus tipos e índices. Los comandos `@UUID`, `@Check`, `@Damage`, las fórmulas y
las variables deben conservar su sintaxis. El lote actual mantiene todas las
claves del original, incluidas las que antes faltaban en español.

La reconciliación de 8.6.1 parte de `main` e incluye los 127 pares de archivos
activos de Crowdin: sistema, interfaz, compendios de módulos y archivos de soporte.
Primero se alinearon las estructuras y se recuperaron traducciones de original
exacto; después se completaron las traducciones pendientes. Incorpora una base
automática con revisión editorial pendiente. Cada
campo de esa base está identificado en el
[registro de revisión](docs/translation-review.json), con su archivo, JSON Pointer
y huellas del original y del texto español. Los textos revisados completos se
distinguen de la base automática y del español heredado.

El [informe de revisión](docs/translation-status.md) cubre los 98 compendios del
sistema, los 9 archivos de interfaz registrados y los otros 20 archivos mapeados.
Los nombres propios y términos compartidos conservados se clasifican expresamente;
no se cuentan como traducciones ausentes. `translations:audit` comprueba la
cobertura, la vigencia de las huellas y la preservación técnica de los campos
traducidos en este lote. La revisión editorial completa y la prueba de carga en
Foundry siguen pendientes.

Una muestra posterior confirmó [errores de traducción y una omisión](docs/translation-known-issues.md)
que siguen pendientes de corrección. La cobertura de campos no garantiza la
integridad ni la calidad semántica de las traducciones.

## Nota

Queremos hacer mencion y agradecimiento al [Proyecto de traduccion al Aleman](https://github.com/Foundry-VTT-PF2-German/lang-de-pf2e) ya que nos hemos basado en su repositorio para poder generar los json de traduccion .
