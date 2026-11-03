# Formato de los certificados de Educación Continua

Análisis del 2026-11-03 sobre los PDF que emitió Hermes (JasperReports 6.20.5 con OpenPDF 1.3.30) para siete programas de 2026, 1.144 certificados en total. Es la misma plantilla de Hermes del CIM 2026 (`herramientas/certificados/formato-hermes.md` en FCEN DEV), con cuatro diferencias: el logo del Sistema General de Regalías, la firma del decano, un párrafo de regalías y el bloque inferior 15 pt más arriba.

| Programa (`cursoKey`) | Certificados | Participación |
|---|---|---|
| Diplomado Maestro de Maestros 2026 | 429 | CURSÓ Y APROBÓ EL DIPLOMADO (1 con CURSÓ EL DIPLOMADO) |
| Diplomado en Tecnología Educativa 2026 | 366 | CURSÓ EL DIPLOMADO (43 con CURSÓ Y APROBÓ EL DIPLOMADO) |
| Biología Divertida 2026 | 60 | CURSÓ EL CURSO DE ACTUALIZACIÓN O DE PROFUNDIZACIÓN |
| Ecología y Medio Ambiente 2026 | 38 | igual |
| Física Divertida 2026 | 64 | igual |
| Matemáticas Financiera 2026 | 93 | igual |
| Química Divertida 2026 | 94 | igual |

Dentro de cada programa todos los renglones fijos son idénticos, salvo la participación de los diplomados: por eso `datos` tiene su propia columna `participacion`, vacía cuando es la del curso.

## Recursos sacados de los PDF

Los PDF no traen archivos adjuntos; las imágenes incrustadas se extrajeron con PyMuPDF:

- `assets/logo-unal.png`: 784 × 344 px con su máscara de transparencia. Idéntico píxel a píxel al del CIM.
- `assets/logo-sgr.png`: 4151 × 2302 px con transparencia. Es el que estampó después `herramientas/sello-regalias/sellar_pdf.py` (FCEN DEV) en la caja x 183,813, y 32,894, 164,082 × 90,994 pt.
- `assets/firmas/hector_jairo_osorio_zuluaga.jpg`: JPEG de 199 × 108 px, estirado a la caja de la firma como hace Hermes.
- Fuente: la misma Ancizar Serif Regular ajustada del CIM.

## Elementos

Carta, 612 × 792 pt. Coordenadas en puntos desde la esquina superior izquierda; cada `y` de texto es la línea base. Ancho de texto 440 pt.

| Elemento | Posición | Tamaño |
|---|---|---|
| Logo UNAL | x 374, y 31 | 205 × 89,95 pt |
| Logo SGR (`logo_sgr = SI`) | x 183,813, y 32,894 | 164,082 × 90,994 pt |
| Encabezado | x 85, bases 165,54 · 182,18 · 198,81 | 11 pt |
| CERTIFICAN QUE | x 85, base 248,72 | 11 pt |
| Nombre | x 85, base 297,5 (una línea) | 30 pt, inclinado 12° |
| CON IDENTIFICACIÓN | x 85, base 343,53 | 11 pt |
| Participación | x 85, base 375,42 | 11 pt |
| Programa (`programa`) | x 85, base 401,5 (una línea) | 14 pt |
| Realización | x 85, base 433,86, interlínea 16,295 | 11 pt, justificado |
| DADO EN… | x 85, base 482,74 | 11 pt |
| Regalías | x **86**, base 515,74, interlínea 16,295, tres líneas | 11 pt, justificado (también la última línea) |
| Firma | x 85, y 567 | 180 × 50 pt |
| Firmante | x 85, bases 624,7 · 636,3 · 647,9 | 8 pt |
| Pie | centrado en x 305, base 761 | 10 pt o 9,5 pt |

Reglas que dependen de los datos (iguales al CIM): un nombre de dos líneas sube la primera a 285,5 y baja todo lo de abajo 12 pt, salvo el pie (38 de los 1.144); un renglón de más en el programa, la realización o las regalías baja lo de abajo una interlínea (no pasa en estos datos; la interlínea del programa, 16,8, es la del CIM); el pie baja de 0,5 en 0,5 hasta caber en 440 pt.

## Datos

Sheet `certificados_educacion_continua` (`1le9Le01yMG3Ew2Rd931j643SRV2mJeWndQQZxNtOQNI`), publicada completa como `2PACX-1vQkS6z…`:

- **`cursos`** (gid 779198221): `cursoKey`, `nombre` (lo que muestra el selector), `tipo` (Curso o Diplomado), `activo`, `logo_sgr`, los renglones fijos (`dependencia`, `encabezado_2`, `encabezado_3`, `certifican`, `identificacion`, `participacion`, `programa`, `realizado`, `dado`, `regalias`, `firmante`, `cargo_firmante`, `entidad_firmante`, `pie_antes`, `pie_url`, `pie_despues`) y `firma`. Los párrafos se guardan con espacios simples: la justificación la hace el motor.
- **`datos`** (gid 121962555): `curso` (igual al `cursoKey`), `nombre` (tal como lo trae Hermes, con sus dobles espacios), `tipo_documento`, `documento` y `codigo_seguridad` (texto), `participacion`, `activo`, `observacion`.

La estructura y la carga inicial: `fcenedit/scripts/setup-certificados-educacion-continua.mjs`. El JSON con los datos extraídos tiene cédulas: nunca va a un repositorio.

## Resultado de la comparación

Ver la sección «Verificación» de `CLAUDE.md` de esta carpeta.
