# Estado de la traducción de PF2e 8.6.0

Lote del 10 de octubre de 2026. El informe cubre los **98 compendios** del manifiesto oficial y los **9 archivos de interfaz** registrados por el módulo. Son 159.683 campos visibles extraídos; los recuentos no representan palabras ni un porcentaje de calidad editorial.

La base automática se incorpora con revisión pendiente, según la opción acordada. Hay **47.698 campos de base automática**, **35.835 campos reutilizados o modificados sin revisión completa registrada** y **19.262 campos comparados y revisados completos frente a la fuente actual**. Los dos primeros grupos quedan pendientes de revisión editorial. Las traducciones españolas heredadas se conservan y no se presentan como revisadas en este lote.

Conjuros, dotes, acciones, equipo, NPC Core y Monster Core 2 combinan traducción manual, reutilización de traducciones existentes y base automática. Se corrigen reglas obsoletas, nombres, requisitos, enlaces visibles, listas, índices y mappings. Los nombres de las 446 entradas de Monster Core 2 y las 271 de NPC Core se revisaron conservando los nombres propios pertinentes. Los borradores que no superan los controles de formato o que muestran omisiones detectables quedan fuera del módulo.

## Cómo consultar la revisión pendiente

[translation-review.json](translation-review.json) contiene el registro por archivo y JSON Pointer, con las huellas SHA-256 del original y de la traducción. La marca se conserva en este registro; no se añade texto técnico ni avisos dentro de las descripciones que muestra Foundry. Si cambia cualquiera de los textos, debe revisarse su huella y actualizarse su estado.

- `editorially-reviewed`: texto completo comparado con la fuente vigente, incluidos sus detalles de reglas.
- `pending-editorial-review`: traducción incorporada pendiente de comparación completa de redacción, terminología y reglas. El campo `method` distingue la base automática validada de las traducciones reutilizadas o modificadas sin revisión completa registrada.
- `intentional-unchanged`: nombre propio o palabra compartida con el español conservados deliberadamente.
- `requires-translation`: falta texto español o permanece texto inglés. Hay 5252 campos en este estado, de los que 3120 están ausentes del archivo español.
- `requires-language-review`: texto corto igual al inglés que todavía debe clasificarse como nombre propio, palabra compartida o traducción pendiente. Son 4257 campos; no todos requieren traducción.
- `requires-source-review`: español heredado cuya fuente cambió desde la extracción anterior, sin revisión completa registrada (473 campos).
- `requires-format-review`: diferencias heredadas de comandos, HTML o cifras que deben contrastarse para distinguir adaptación válida de reglas antiguas (5456 campos).

Los dos últimos recuentos forman parte del español heredado y no se suman como nuevos campos sin traducción. Los marcadores técnicos que el traductor sustituye con datos de otros compendios, IDs y variables no se cuentan como texto pendiente.

Los archivos nuevos omiten los campos rechazados para que Foundry conserve el original. Los archivos antiguos conservan sus valores pendientes existentes. La presencia de un valor español y la validez de su JSON no acreditan por sí solas una revisión semántica completa.

## Recuentos por archivo

«Revisión heredada» suma las comparaciones de fuente y formato pendientes; «Clasificar» recoge los textos cortos posiblemente propios o compartidos. Los campos heredados sin incidencias detectadas no se incluyen en las columnas de revisión completa ni pendiente editorial.

| Compendio o interfaz | Campos visibles | Revisión completa | Pendiente editorial | Falta traducción | Clasificar | Revisión heredada |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `abomination-vaults-bestiary` | 1529 | 0 | 64 | 0 | 43 | 213 |
| `age-of-ashes-bestiary` | 1685 | 34 | 1441 | 78 | 109 | 2 |
| `agents-of-edgewatch-bestiary` | 2262 | 40 | 1926 | 119 | 157 | 12 |
| `battlecry-bestiary` | 868 | 59 | 626 | 183 | 0 | 0 |
| `book-of-the-dead-bestiary` | 1395 | 2 | 184 | 12 | 18 | 180 |
| `blood-lords-bestiary` | 254 | 22 | 185 | 33 | 13 | 0 |
| `blog-bestiary` | 380 | 10 | 309 | 38 | 0 | 0 |
| `claws-of-the-tyrant-bestiary` | 477 | 11 | 401 | 28 | 35 | 0 |
| `curtain-call-bestiary` | 1080 | 20 | 956 | 100 | 1 | 0 |
| `dawn-of-the-frogs` | 177 | 0 | 175 | 0 | 2 | 0 |
| `extinction-curse-bestiary` | 671 | 14 | 573 | 30 | 50 | 2 |
| `fall-of-plaguestone-bestiary` | 186 | 10 | 153 | 14 | 8 | 0 |
| `fists-of-the-ruby-phoenix-bestiary` | 265 | 1 | 84 | 6 | 23 | 16 |
| `hazards` | 412 | 0 | 3 | 0 | 1 | 104 |
| `howl-of-the-wild-bestiary` | 1007 | 44 | 782 | 86 | 91 | 0 |
| `gatewalkers-bestiary` | 941 | 19 | 809 | 45 | 63 | 2 |
| `hellbreakers-bestiary` | 1048 | 13 | 951 | 82 | 0 | 0 |
| `hells-destiny-bestiary` | 1740 | 30 | 1554 | 156 | 0 | 0 |
| `bastion-of-blasphemies-bestiary` | 1123 | 19 | 1002 | 102 | 0 | 0 |
| `lost-omens-bestiary` | 8154 | 119 | 7361 | 240 | 398 | 23 |
| `malevolence-bestiary` | 218 | 3 | 181 | 16 | 17 | 0 |
| `menace-under-otari-bestiary` | 783 | 3 | 358 | 10 | 9 | 69 |
| `npc-gallery` | 63 | 0 | 15 | 0 | 2 | 2 |
| `one-shot-bestiary` | 487 | 2 | 448 | 14 | 22 | 1 |
| `outlaws-of-alkenstar-bestiary` | 1173 | 0 | 85 | 1 | 23 | 133 |
| `kingmaker-bestiary` | 3180 | 7 | 2768 | 170 | 232 | 0 |
| `pathfinder-bestiary` | 2508 | 29 | 2049 | 66 | 67 | 60 |
| `pathfinder-bestiary-2` | 2068 | 16 | 1397 | 180 | 154 | 55 |
| `pathfinder-bestiary-3` | 2052 | 16 | 1682 | 156 | 195 | 3 |
| `pathfinder-monster-core` | 6015 | 2 | 135 | 4 | 105 | 684 |
| `pathfinder-monster-core-2` | 6707 | 1242 | 5310 | 0 | 0 | 0 |
| `pathfinder-npc-core` | 3667 | 1428 | 2223 | 0 | 0 | 0 |
| `pathfinder-dark-archive` | 283 | 1 | 249 | 6 | 14 | 4 |
| `pfs-introductions-bestiary` | 114 | 12 | 95 | 6 | 0 | 0 |
| `pfs-season-1-bestiary` | 2956 | 29 | 2740 | 185 | 1 | 0 |
| `pfs-season-2-bestiary` | 2546 | 23 | 2354 | 168 | 1 | 0 |
| `pfs-season-3-bestiary` | 2685 | 33 | 2483 | 167 | 2 | 0 |
| `pfs-season-4-bestiary` | 2383 | 41 | 2169 | 173 | 0 | 0 |
| `pfs-season-5-bestiary` | 2242 | 34 | 2037 | 170 | 0 | 0 |
| `pfs-season-6-bestiary` | 3509 | 65 | 3105 | 337 | 1 | 0 |
| `pfs-season-7-bestiary` | 980 | 17 | 886 | 77 | 0 | 0 |
| `prey-for-death-bestiary` | 650 | 13 | 555 | 82 | 0 | 0 |
| `quest-for-the-frozen-flame-bestiary` | 1014 | 0 | 882 | 50 | 79 | 3 |
| `revenge-of-the-runelords-bestiary` | 1451 | 20 | 1289 | 139 | 0 | 0 |
| `rusthenge-bestiary` | 245 | 0 | 14 | 1 | 7 | 35 |
| `season-of-ghosts-bestiary` | 341 | 1 | 265 | 29 | 44 | 0 |
| `seven-dooms-for-sandpoint-bestiary` | 777 | 3 | 667 | 46 | 61 | 0 |
| `shadows-at-sundown-bestiary` | 203 | 0 | 177 | 14 | 12 | 0 |
| `sky-kings-tomb-bestiary` | 1258 | 2 | 1107 | 52 | 93 | 2 |
| `spore-war-bestiary` | 1137 | 21 | 978 | 136 | 0 | 0 |
| `strength-of-thousands-bestiary` | 114 | 0 | 88 | 12 | 14 | 0 |
| `the-dead-gods-hand-bestiary` | 468 | 3 | 406 | 58 | 1 | 0 |
| `the-enmity-cycle-bestiary` | 161 | 1 | 141 | 8 | 10 | 1 |
| `the-slithering-bestiary` | 174 | 0 | 160 | 7 | 5 | 1 |
| `triumph-of-the-tusk-bestiary` | 1019 | 3 | 879 | 65 | 70 | 1 |
| `troubles-in-otari-bestiary` | 153 | 0 | 133 | 11 | 9 | 0 |
| `troubles-in-grayce-bestiary` | 470 | 5 | 422 | 41 | 0 | 0 |
| `myth-speaker-bestiary` | 928 | 22 | 796 | 105 | 0 | 0 |
| `night-of-the-gray-death-bestiary` | 281 | 0 | 236 | 19 | 22 | 0 |
| `crown-of-the-kobold-king-bestiary` | 383 | 0 | 332 | 20 | 31 | 0 |
| `shades-of-blood-bestiary` | 1203 | 15 | 1080 | 106 | 1 | 0 |
| `stolen-fate-bestiary` | 1386 | 22 | 1243 | 117 | 0 | 0 |
| `rage-of-elements-bestiary` | 1109 | 8 | 890 | 115 | 91 | 0 |
| `wardens-of-wildwood-bestiary` | 1089 | 6 | 909 | 80 | 94 | 0 |
| `war-of-immortals-bestiary` | 233 | 0 | 194 | 21 | 18 | 0 |
| `vehicles` | 843 | 0 | 368 | 7 | 20 | 24 |
| `actionspf2e` | 1380 | 653 | 155 | 0 | 0 | 56 |
| `ancestries` | 102 | 0 | 9 | 2 | 24 | 11 |
| `ancestryfeatures` | 149 | 0 | 27 | 8 | 10 | 14 |
| `backgrounds` | 1541 | 2 | 634 | 20 | 43 | 33 |
| `classes` | 58 | 0 | 3 | 1 | 2 | 3 |
| `classfeatures` | 1837 | 4 | 560 | 35 | 29 | 189 |
| `familiar-abilities` | 237 | 0 | 65 | 0 | 7 | 8 |
| `feats-srd` | 18.176 | 6992 | 1900 | 0 | 0 | 640 |
| `heritages` | 732 | 0 | 195 | 10 | 74 | 48 |
| `spells-srd` | 5798 | 2686 | 341 | 0 | 0 | 146 |
| `bestiary-effects` | 1417 | 47 | 748 | 1 | 7 | 41 |
| `boons-and-curses` | 494 | 0 | 30 | 0 | 1 | 236 |
| `conditionitems` | 85 | 0 | 2 | 0 | 1 | 10 |
| `campaign-effects` | 178 | 0 | 104 | 1 | 1 | 7 |
| `equipment-effects` | 1497 | 572 | 430 | 1 | 1 | 271 |
| `other-effects` | 107 | 0 | 37 | 0 | 0 | 1 |
| `feat-effects` | 1827 | 631 | 651 | 5 | 2 | 197 |
| `pathfinder-society-boons` | 363 | 169 | 193 | 0 | 0 | 0 |
| `spell-effects` | 1161 | 535 | 244 | 2 | 22 | 162 |
| `equipment-srd` | 12.148 | 3275 | 2683 | 0 | 0 | 882 |
| `deities` | 1001 | 0 | 297 | 37 | 322 | 224 |
| `iconics` | 1456 | 15 | 1109 | 23 | 95 | 2 |
| `paizo-pregens` | 1009 | 7 | 624 | 25 | 35 | 1 |
| `rollable-tables` | 1597 | 0 | 1301 | 115 | 26 | 72 |
| `criticaldeck` | 318 | 0 | 0 | 0 | 0 | 49 |
| `journals` | 1069 | 0 | 340 | 57 | 38 | 276 |
| `action-macros` | 71 | 0 | 0 | 0 | 0 | 0 |
| `pf2e-macros` | 10 | 0 | 0 | 0 | 0 | 0 |
| `bestiary-ability-glossary-srd` | 63 | 0 | 0 | 1 | 1 | 3 |
| `bestiary-family-ability-glossary` | 1055 | 0 | 388 | 39 | 19 | 150 |
| `adventure-specific-actions` | 425 | 0 | 97 | 48 | 3 | 84 |
| `kingmaker-features` | 293 | 0 | 2 | 0 | 0 | 13 |
| `es` | 5742 | 0 | 369 | 118 | 805 | 105 |
| `foundry-es` | 4 | 0 | 0 | 0 | 0 | 0 |
| `action-es` | 685 | 1 | 95 | 0 | 1 | 96 |
| `re-es` | 5270 | 58 | 2832 | 104 | 139 | 267 |
| `kingmaker-es` | 287 | 0 | 0 | 0 | 3 | 0 |
| `pf2e-dailies-es` | 161 | 0 | 42 | 0 | 3 | 0 |
| `pf2e-flatcheck-helper-es` | 152 | 0 | 152 | 0 | 0 | 0 |
| `pf2e-hud-es` | 283 | 0 | 276 | 0 | 4 | 0 |
| `pf2e-animal-companions-es` | 82 | 0 | 79 | 0 | 0 | 0 |

El detalle de recuentos y correspondencias está en [translation-status.json](translation-status.json). Los informes son una instantánea de este lote.

## Incidencias de la fuente

- `pfs-season-6-bestiary`, `History's Repetition (7-8)`, `disable`: falta el cierre en `@Check[thievery|dc:28`. Se corrige solo en español; el original extraído se mantiene intacto.
- NPC Core, `Peerless Healer`, `Community Healer`: Tratar enfermedad y Tratar heridas comparten el mismo UUID en el original, que además menciona otro sanador. Se conservan las referencias publicadas.
- Monster Core 2, `Deep One Elder`, `Watery Void`: el original enumera dos veces Éxito crítico; el último resultado causa daño doble. Se mantienen los grados publicados.
- Monster Core 2, `Bison`, `publicNotes`: el original contiene `upwards1`. Se elimina el 1 pegado a la palabra, conservando el peso de 2,000 libras y la altura de 6 pies. La validación contempla únicamente esta errata en ese campo.
- Monster Core 2, `Dragonblood Occultist`: se interpreta `belying their heritage` según el contexto posterior de rasgos que revelan su linaje.
- `Reinforce Eidolon`: combina resistencia 1 con resistencia igual a la mitad del rango; se conserva la formulación ambigua de la fuente.
- `Vine Lash`: la fuente indica daño doble con un éxito, sin especificar éxito crítico; se conserva ese resultado.
- `Convocation of Earth and Moon`: el final de Deslumbrado se fija al comienzo del turno sin aclarar «siguiente»; se mantiene el texto publicado.
- `Winter's Breath`: Éxito crítico enumera cuatro conjuros, pero Éxito habla de cinco; se conserva «cinco», sin inventar otro conjuro.
- `Corpse Communion`: Éxito crítico otorga entrenado y +1, mientras Éxito otorga experto; se conservan los rangos publicados.
- River Elasmosaurus, `Long Neck`: la cobertura se describe contra ataques realizados contra criaturas situadas arriba; se conserva la formulación de la fuente, que podría querer decir ataques realizados por ellas.
- Giant Flying Squirrel, `publicNotes`: el original dice escapar de sus presas; se mantiene ese texto y se registra la posible errata.
- Interfaz `Actions.Interact.Retrieve2H.Title`: la clave sugiere dos manos, pero el original dice `Retrieve (1H)`; el texto español sigue el valor publicado.

## Validación y límites

Se comprueban los 98 nombres de archivo `pf2e.<name del manifiesto>.json`, las rutas de los 9 idiomas registrados, JSON, mappings, tipos, índices e IDs. En los campos modificados se contrastan comandos Foundry, macros, HTML, variables, cifras y glifos de acción frente a la fuente vigente. En 470 campos de equipo con diferencias heredadas, el cambio se limita a etiquetas visibles de UUID y, donde se registra una lista cerrada de correspondencias, a referencias al nombre del objeto: se verifica que todo lo demás coincide exactamente con la traducción anterior y con el snapshot inicial y se mantiene la revisión de formato pendiente señalada; los requisitos corregidos se ejecutan con el convertidor real del proyecto. Las 9 pruebas del extractor pasan y los hashes y recuentos del registro se contrastan con los JSON actuales. Las diferencias heredadas se registran para revisión y no se atribuyen a cambios de este lote.

La base automática pasa controles adicionales de signos, dados, negaciones, restricciones y conceptos mecánicos. Esos controles detectan ciertos errores, pero no sustituyen la revisión editorial: pueden permanecer términos, frases o interpretaciones incorrectos. El modelo y sus archivos de trabajo no forman parte del módulo.

La carga en una instalación de Foundry con PF2e 8.6.0 queda pendiente. La compatibilidad declarada en el manifiesto del sistema original no equivale a una prueba del módulo de traducción.
