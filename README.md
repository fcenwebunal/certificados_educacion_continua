# Certificados de Educación Continua FCEN

Descarga de los certificados PDF de los cursos y diplomados de Educación Continua de la Facultad de Ciencias Exactas y Naturales, Universidad Nacional de Colombia, Sede Manizales.

Los certificados son una copia exacta, generada a partir de datos, de los que emitió Hermes (con su código de seguridad, el logo del Sistema General de Regalías y el párrafo del proyecto «FUTURAMENTE»).

## Cómo funciona

- `public/index.html`: formulario (curso o diplomado y número de documento). Lee la pestaña `cursos` de la Sheet publicada.
- `api/certificado.js`: recibe `{ cursoKey, documento }`, busca la fila en la pestaña `datos` y arma el PDF solo con lo guardado. Responde 404 si el documento no está en ese curso y 403 si el certificado o el curso están inactivos.
- `generate.js`: el motor (pdfkit). Medidas y reglas en `FORMATO.md`.
- `config/sheet.js`: lee `cursos` y `datos` de la Sheet `certificados_educacion_continua` publicada como CSV (caché de 5 minutos).
- `assets/`: Ancizar Serif ajustada a la de Hermes, logo UNAL, logo SGR y firmas.

Los datos se editan en fcenedit, sección «Certificados Educación Continua» (https://fcenedit.web.app). fcenedit tiene una copia del motor (`src/lib/certificados-ec/engine.ts`) que debe quedar igual a `generate.js`.

## Despliegue

Vercel, sin variables de entorno ni paso de build (`vercel.json`). Cada push a `main` publica.

En local: `npm install` y `npx vercel dev`.
