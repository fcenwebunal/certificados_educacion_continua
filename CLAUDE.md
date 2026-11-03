# Certificados de Educación Continua

App para que quienes hicieron un curso o diplomado de Educación Continua descarguen su certificado PDF. Es aparte de la de eventos (`../certificados/`): otra Sheet, otro repositorio y otro despliegue. Los certificados son una copia exacta, a partir de datos, de los que emitió Hermes en 2026 (logo SGR, párrafo de regalías del proyecto «FUTURAMENTE» y firma del decano).

- **Repositorio propio**: `github.com/fcenwebunal/certificados_educacion_continua` (rama `main`), ignorado por FCEN DEV. Commit y push sin preguntar en cambios de impacto bajo o moderado.
- **Despliegue**: Vercel, lo conecta el usuario (pendiente desde el 2026-11-03). Sin variables de entorno.
- **En el sitio** (pendiente, se hace cuando haya dominio de Vercel): página nueva bajo Educación continua, https://fcen.unal.edu.co/menu/educacion-continua/certificados-educacion-continua/, oculta en el menú, con el banner FCEN y el iframe (como c4451 de `/certificado-eventos/`), y un botón «Descargar certificados» en el banner del catálogo (https://fcen.unal.edu.co/menu/educacion-continua/catalogo-educacion-continua/, c4549). El usuario eligió esa URL y el botón en el banner el 2026-11-03.
- **Datos**: Sheet `certificados_educacion_continua` (`1le9Le01yMG3Ew2Rd931j643SRV2mJeWndQQZxNtOQNI`), publicada completa (`2PACX-1vQkS6z…`); pestañas `cursos` (gid 779198221) y `datos` (gid 121962555). La Sheet nació como copia de `certificados`; el 2026-11-03, a pedido del usuario, se borraron todas sus pestañas copiadas y se crearon estas dos. Se edita en fcenedit, sección «Certificados Educación Continua».
- **Privacidad**: `datos` publicada deja descargar cédulas y códigos de seguridad a quien tenga la URL. El usuario eligió el 2026-11-03 hacerlo igual que en eventos. La interfaz no descarga `datos`: solo la API la lee.
- **Formato y medidas**: `FORMATO.md`. El motor `generate.js` y su copia en fcenedit, `src/lib/certificados-ec/engine.ts`, deben quedar iguales. Una firma nueva va en `assets/firmas/` (y en `certificados-assets/educacion-continua/firmas/` de fcenedit) y en el mapa `SIGNATURES` de los dos motores.
- **Correo de contacto** de la interfaz: `educacioncontinua_fcen@unal.edu.co` (el que usan las páginas de Educación Continua).

## Verificación

Se generaron los 1.144 certificados desde los datos extraídos y se compararon con los PDF de Hermes (`C:\Users\Juan Manuel\Downloads\Certificados*.pdf`): resultado en la sección siguiente.

## Agregar un curso o diplomado

1. Comparar su PDF de Hermes con `FORMATO.md`; si cambia algo, ajustar las constantes de los dos motores.
2. En fcenedit: «Nuevo curso» (copia los textos del curso abierto), ajustar sus textos y agregar sus certificados. Para muchos, extraerlos del PDF con PyMuPDF y cargarlos con `fcenedit/scripts/setup-certificados-educacion-continua.mjs --data` (agrega solo los que faltan).
3. Generar y comparar con el PDF antes de anunciarlo.

**Datos personales**: los JSON o CSV con cédulas no se suben a ningún repositorio ni se muestran en respuestas.
