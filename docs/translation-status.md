# Estado de traducción de PF2e 8.6.1

Actualizado el 2026-10-17. Revisión de calidad desde main 3c271576bda9092e5ecf1f49bdeed00974ba98be.

Se comprueban los **127 pares de archivos** de Crowdin: **98 compendios de PF2e**, los **9 archivos de interfaz** registrados y **20 archivos adicionales de módulos o soporte**. El mapeo utiliza el identificador `name` del manifiesto oficial, no el nombre físico del directorio del pack.

Hay 166210 campos de texto y 17309 campos técnicos o no lingüísticos excluidos del recuento de traducción. Faltan 0 traducciones detectadas y quedan 0 textos iguales al inglés sin clasificar. Se conservan deliberadamente 2896 nombres propios o términos compartidos, identificados por campo y huellas en [translation-review.json](translation-review.json).

Se completó primero el alineado y después la traducción. La base automática incorporada queda **pendiente de revisión editorial**: tener texto español y pasar los controles de formato no acredita fidelidad completa de reglas o redacción. El registro actual contiene 51486 campos con revisión completa, válida únicamente cuando coinciden ambas huellas; 590 revisiones de fuente y 3864 revisiones de formato heredadas siguen registradas. La carga real en Foundry no se ha probado en este lote.

El lote de revisión de calidad está completado dentro del alcance registrado. Incluye 33819 campos contrastados completos con su fuente y 2689 campos con correcciones locales que no acreditan el resto del texto. El detalle está en [translation-quality-review.json](translation-quality-review.json).

El registro conserva por archivo y JSON Pointer los hashes SHA-256 de la fuente y del español. `pending-editorial-review` y `reused-existing-translation` contienen traducción; no representan huecos. `intentional-unchanged` exige una clasificación explícita. `requires-translation` y `requires-language-review` impiden dar por cerrada la cobertura. Los IDs, mappings, comandos, fórmulas y variables conservan su función técnica.

| Archivo | Campos de texto | Pendiente editorial | Nombres conservados | Huecos o sin clasificar |
| --- | ---: | ---: | ---: | ---: |
| `action-es` | 685 | 0 | 1 | 0 |
| `pf2e.blog-bestiary` | 381 | 284 | 26 | 0 |
| `pf2e.pathfinder-bestiary-2` | 2069 | 1266 | 37 | 0 |
| `pf2e.pathfinder-bestiary-3` | 2029 | 1536 | 37 | 0 |
| `pf2e.pathfinder-bestiary` | 2494 | 1777 | 21 | 0 |
| `pf2e.pathfinder-monster-core` | 6016 | 143 | 99 | 0 |
| `pf2e.pathfinder-npc-core` | 3668 | 2159 | 11 | 0 |
| `pf2e._packs-folders` | 11 | 0 | 1 | 0 |
| `pf2e.abomination-vaults-bestiary` | 1530 | 54 | 36 | 0 |
| `pf2e.action-macros` | 72 | 0 | 0 | 0 |
| `pf2e.actionspf2e` | 1385 | 142 | 12 | 0 |
| `pf2e.adventure-specific-actions` | 426 | 88 | 1 | 0 |
| `pf2e.age-of-ashes-bestiary` | 1730 | 1156 | 36 | 0 |
| `pf2e.agents-of-edgewatch-bestiary` | 2263 | 1778 | 67 | 0 |
| `pf2e.ancestries` | 103 | 9 | 9 | 0 |
| `pf2e.ancestryfeatures` | 150 | 26 | 7 | 0 |
| `pf2e.backgrounds` | 1560 | 607 | 7 | 0 |
| `pf2e.bastion-of-blasphemies-bestiary` | 1124 | 929 | 43 | 0 |
| `pf2e.battlecry-bestiary` | 869 | 597 | 0 | 0 |
| `pf2e.bestiary-ability-glossary-srd` | 64 | 1 | 1 | 0 |
| `pf2e.bestiary-effects` | 1417 | 695 | 2 | 0 |
| `pf2e.bestiary-family-ability-glossary` | 1054 | 358 | 6 | 0 |
| `pf2e.blood-lords-bestiary` | 255 | 162 | 1 | 0 |
| `pf2e.book-of-the-dead-bestiary` | 1256 | 20 | 8 | 0 |
| `pf2e.boons-and-curses` | 495 | 31 | 0 | 0 |
| `pf2e.campaign-effects` | 179 | 96 | 1 | 0 |
| `pf2e.classes` | 59 | 3 | 2 | 0 |
| `pf2e.classfeatures` | 1838 | 496 | 7 | 0 |
| `pf2e.claws-of-the-tyrant-bestiary` | 478 | 372 | 9 | 0 |
| `pf2e.conditionitems` | 86 | 2 | 1 | 0 |
| `pf2e.criticaldeck` | 319 | 0 | 0 | 0 |
| `pf2e.crown-of-the-kobold-king-bestiary` | 384 | 310 | 15 | 0 |
| `pf2e.curtain-call-bestiary` | 1081 | 897 | 24 | 0 |
| `pf2e.dawn-of-the-frogs` | 178 | 166 | 2 | 0 |
| `pf2e.deities` | 1002 | 259 | 317 | 0 |
| `pf2e.equipment-effects` | 1500 | 350 | 0 | 0 |
| `pf2e.equipment-srd` | 12149 | 2276 | 58 | 0 |
| `pf2e.extinction-curse-bestiary` | 672 | 510 | 17 | 0 |
| `pf2e.fall-of-plaguestone-bestiary` | 187 | 139 | 3 | 0 |
| `pf2e.familiar-abilities` | 238 | 58 | 1 | 0 |
| `pf2e.feat-effects` | 1836 | 486 | 1 | 0 |
| `pf2e.feats-srd` | 18177 | 1617 | 37 | 0 |
| `pf2e.fists-of-the-ruby-phoenix-bestiary` | 266 | 75 | 16 | 0 |
| `pf2e.gatewalkers-bestiary` | 942 | 748 | 27 | 0 |
| `pf2e.hazards` | 413 | 4 | 1 | 0 |
| `pf2e.hellbreakers-bestiary` | 1049 | 895 | 24 | 0 |
| `pf2e.hells-destiny-bestiary` | 1741 | 1468 | 35 | 0 |
| `pf2e.heritages` | 733 | 164 | 22 | 0 |
| `pf2e.highhelm-bestiary` | 75 | 6 | 3 | 0 |
| `pf2e.howl-of-the-wild-bestiary` | 1008 | 709 | 19 | 0 |
| `pf2e.iconics` | 1457 | 1041 | 75 | 0 |
| `pf2e.impossible-lands-bestiary` | 219 | 4 | 1 | 0 |
| `pf2e.journals` | 1076 | 286 | 14 | 0 |
| `pf2e.kingmaker-bestiary` | 3181 | 2568 | 85 | 0 |
| `pf2e.kingmaker-features` | 294 | 2 | 0 | 0 |
| `pf2e.lost-omens-bestiary` | 8155 | 6646 | 76 | 0 |
| `pf2e.pf2e-macros` | 11 | 0 | 1 | 0 |
| `pf2e.malevolence-bestiary` | 219 | 162 | 7 | 0 |
| `pf2e.menace-under-otari-bestiary` | 784 | 326 | 4 | 0 |
| `pf2e.monsters-of-myth-bestiary` | 766 | 25 | 20 | 0 |
| `pf2e.mwangi-expanse-bestiary` | 259 | 8 | 11 | 0 |
| `pf2e.myth-speaker-bestiary` | 929 | 730 | 25 | 0 |
| `pf2e.night-of-the-gray-death-bestiary` | 282 | 220 | 6 | 0 |
| `pf2e.npc-gallery` | 64 | 13 | 1 | 0 |
| `pf2e.one-shot-bestiary` | 488 | 422 | 8 | 0 |
| `pf2e.other-effects` | 108 | 33 | 0 | 0 |
| `pf2e.outlaws-of-alkenstar-bestiary` | 1174 | 88 | 16 | 0 |
| `pf2e.paizo-pregens` | 1010 | 588 | 34 | 0 |
| `pf2e.pathfinder-dark-archive` | 284 | 237 | 2 | 0 |
| `pf2e.pathfinder-monster-core-2` | 6706 | 4942 | 140 | 0 |
| `pf2e.pathfinder-society-boons` | 364 | 170 | 0 | 0 |
| `pf2e.pfs-introductions-bestiary` | 115 | 85 | 0 | 0 |
| `pf2e.pfs-season-1-bestiary` | 2957 | 2519 | 47 | 0 |
| `pf2e.pfs-season-2-bestiary` | 2546 | 2161 | 42 | 0 |
| `pf2e.pfs-season-3-bestiary` | 2686 | 2324 | 44 | 0 |
| `pf2e.pfs-season-4-bestiary` | 2384 | 1981 | 48 | 0 |
| `pf2e.pfs-season-5-bestiary` | 2243 | 1919 | 28 | 0 |
| `pf2e.pfs-season-6-bestiary` | 3510 | 2887 | 48 | 0 |
| `pf2e.pfs-season-7-bestiary` | 981 | 831 | 12 | 0 |
| `pf2e.prey-for-death-bestiary` | 651 | 519 | 12 | 0 |
| `pf2e.quest-for-the-frozen-flame-bestiary` | 1015 | 818 | 27 | 0 |
| `pf2e.rage-of-elements-bestiary` | 1110 | 855 | 28 | 0 |
| `pf2e.revenge-of-the-runelords-bestiary` | 1452 | 1215 | 19 | 0 |
| `pf2e.rollable-tables` | 1598 | 1161 | 26 | 0 |
| `pf2e.rusthenge-bestiary` | 246 | 12 | 7 | 0 |
| `pf2e.season-of-ghosts-bestiary` | 342 | 249 | 15 | 0 |
| `pf2e.seven-dooms-for-sandpoint-bestiary` | 778 | 629 | 37 | 0 |
| `pf2e.shades-of-blood-bestiary` | 1204 | 999 | 41 | 0 |
| `pf2e.shadows-at-sundown-bestiary` | 204 | 159 | 6 | 0 |
| `pf2e.sky-kings-tomb-bestiary` | 1259 | 1047 | 27 | 0 |
| `pf2e.spell-effects` | 1168 | 187 | 0 | 0 |
| `pf2e.spells-srd` | 5799 | 329 | 9 | 0 |
| `pf2e.spore-war-bestiary` | 1138 | 920 | 24 | 0 |
| `pf2e.stolen-fate-bestiary` | 1387 | 1154 | 30 | 0 |
| `pf2e.strength-of-thousands-bestiary` | 115 | 83 | 1 | 0 |
| `pf2e.the-dead-gods-hand-bestiary` | 469 | 386 | 18 | 0 |
| `pf2e.the-enmity-cycle-bestiary` | 162 | 130 | 7 | 0 |
| `pf2e.the-slithering-bestiary` | 175 | 147 | 3 | 0 |
| `pf2e.travel-guide-bestiary` | 43 | 1 | 0 | 0 |
| `pf2e.triumph-of-the-tusk-bestiary` | 1020 | 811 | 13 | 0 |
| `pf2e.troubles-in-grayce-bestiary` | 471 | 388 | 14 | 0 |
| `pf2e.troubles-in-otari-bestiary` | 153 | 128 | 5 | 0 |
| `pf2e.vehicles` | 844 | 365 | 6 | 0 |
| `pf2e.war-of-immortals-bestiary` | 234 | 180 | 3 | 0 |
| `pf2e.wardens-of-wildwood-bestiary` | 1090 | 865 | 28 | 0 |
| `dictionary` | 573 | 0 | 0 | 0 |
| `es` | 5745 | 0 | 274 | 0 |
| `foundry-es` | 4 | 0 | 0 | 0 |
| `kingmaker-es` | 287 | 0 | 2 | 0 |
| `kctg-2e.kctg-2e` | 3084 | 0 | 64 | 0 |
| `pf2e-animal-companions.AC-Advanced-Maneuvers` | 207 | 0 | 4 | 0 |
| `pf2e-animal-companions.AC-Ancestries-and-Class` | 239 | 0 | 24 | 0 |
| `pf2e-animal-companions.AC-Construct-Breakthroughs` | 37 | 0 | 1 | 0 |
| `pf2e-animal-companions.AC-Construct-Companions` | 16 | 0 | 1 | 0 |
| `pf2e-animal-companions.AC-effects` | 273 | 0 | 59 | 0 |
| `pf2e-animal-companions.AC-Eidolons` | 31 | 0 | 1 | 0 |
| `pf2e-animal-companions.AC-Evolution-Feats` | 77 | 0 | 1 | 0 |
| `pf2e-animal-companions.AC-Feats` | 74 | 0 | 5 | 0 |
| `pf2e-animal-companions.AC-Features` | 253 | 0 | 9 | 0 |
| `pf2e-animal-companions.AC-Followers` | 59 | 0 | 34 | 0 |
| `pf2e-animal-companions.AC-Support` | 199 | 0 | 1 | 0 |
| `pf2e-flatcheck-helper.Effects` | 4 | 0 | 1 | 0 |
| `pf2e-animal-companions-es` | 82 | 0 | 0 | 0 |
| `pf2e-dailies-es` | 163 | 0 | 1 | 0 |
| `pf2e-flatcheck-helper-es` | 152 | 0 | 0 | 0 |
| `pf2e-hud-es` | 284 | 0 | 3 | 0 |
| `re-es` | 5292 | 0 | 99 | 0 |
