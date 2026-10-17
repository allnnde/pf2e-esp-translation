# Revisión de calidad de la traducción

La cobertura completa de campos no acredita que su contenido esté completo o bien traducido. El lote de calidad del 17 de octubre de 2026 ha contrastado con el inglés vigente los 11.386 campos incorporados en el lote de traducción anterior y ha ampliado la revisión a errores detectados en el contenido heredado. Esto no equivale a una aprobación editorial de todo el histórico.

Los tres errores inicialmente documentados de `kctg-2e.kctg-2e.json` ya están corregidos:

| Entrada y campo | Corrección |
| --- | --- |
| `Adamantine.description` | «Tirada de ataque» sustituye a «rollo de ataque»; se ha revisado la descripción completa. |
| `Acorns.description` | Se explica remojar las bellotas para quitarles el amargor; se ha revisado la descripción completa. |
| `Beet.description` | Se ha restituido la oración inicial omitida sobre su otro nombre y revisado el resto de la entrada. |

La revisión también corrige omisiones, nombres propios alterados, falsos amigos y reglas antiguas que ya no corresponden al inglés. El registro [translation-quality-review.json](translation-quality-review.json) distingue la comparación completa de un campo de las correcciones locales de redacción. Cada registro depende de las huellas de ambas versiones: cambiar el inglés o el español invalida esa revisión.

Se han restaurado 6.100 campos técnicos de herencia respecto a `main`; los 14.011 campos de este tipo conservan ahora su valor técnico exacto. El prefijo literal `<Compendium> tag will get replaced` hace que el traductor de ejecución descarte ese campo y herede el nombre o descripción del compendio correspondiente. Su inglés es deliberado; traducirlo impide reconocerlo. El alineado conserva ahora esa marca y también los textos existentes que coinciden legítimamente con el inglés, sin sustituirlos por traducciones de otros contextos.

El cotejo de comandos conserva cuatro referencias adicionales preexistentes que no modifican las reglas del original: enlaces a los efectos de gafas de obsidiana, referencias del ojo de saga oracular y un enlace de Azote a sí mismo. Están identificadas por campo y ambas huellas en `referenceExceptions` del registro de calidad.

Los campos todavía pendientes se conservan identificados en [translation-review.json](translation-review.json) y el recuento se publica en [translation-status.md](translation-status.md). Los controles automáticos no sustituyen la comparación semántica. La carga real en Foundry sigue sin probarse.

Las contradicciones y erratas detectadas en la fuente inglesa tienen un registro separado en [translation-source-issues.json](translation-source-issues.json), con la huella de la fuente y la decisión tomada. Incluye, por ejemplo, CD distintas entre un comando y su etiqueta o condiciones de una maldición incompatibles entre dos párrafos. La traducción no pretende confirmar una regla que el propio original deja contradictoria.
