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
se envían a Crowdin; se excluyen tres copias antiguas cuyo original vigente ya
está en `translation/en/compendium/`.

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
las variables deben conservar su sintaxis. Los campos nuevos aún pendientes
se omiten para que Foundry conserve el original.

La actualización a 8.6.0 incluye traducciones y correcciones de conjuros, dotes,
acciones, equipo, NPC Core, Monster Core 2 y los compendios que faltaban.
También incorpora una base automática con revisión editorial pendiente. Cada
campo de esa base está identificado en el
[registro de revisión](docs/translation-review.json), con su archivo, JSON Pointer
y huellas del original y del texto español. Los textos revisados completos se
distinguen de la base automática y del español heredado.

El [informe de revisión](docs/translation-status.md) cubre los 98 compendios y los
9 archivos de interfaz registrados, y detalla los campos pendientes y las
incidencias de los originales. Los borradores con errores detectados no se
incorporan. La revisión editorial completa y la prueba de carga en Foundry siguen
pendientes.

## Nota

Queremos hacer mencion y agradecimiento al [Proyecto de traduccion al Aleman](https://github.com/Foundry-VTT-PF2-German/lang-de-pf2e) ya que nos hemos basado en su repositorio para poder generar los json de traduccion .
