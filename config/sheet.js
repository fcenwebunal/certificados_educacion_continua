'use strict';

const { parseCSV } = require('./csv');

// Sheet `certificados_educacion_continua`, edited in fcenedit and published to the web.
const BASE = 'https://docs.google.com/spreadsheets/d/e/' +
  '2PACX-1vQkS6z1vg0mkI-fGp1OtoI_MbrmTtw91bZvyxhfOMHA5_B2A8AzGMVNPUGtGjdXsg0YV8D6z2sReYzb' +
  '/pub?single=true&output=csv&gid=';
const GIDS = { cursos: 779198221, datos: 121962555 };

const TTL_MS = 5 * 60 * 1000;
const cache = {};

const normKey = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();

// Same rule as the interface: no leading "CC", spaces or dots.
const normDoc = d => (d || '').replace(/^CC\s*/i, '').replace(/[\s.]/g, '').toLowerCase();

async function getTab(name) {
  const now = Date.now();
  const hit = cache[name];
  if (hit && (now - hit.time) < TTL_MS) return hit.rows;
  const resp = await fetch(BASE + GIDS[name]);
  if (!resp.ok) throw new Error(`Error al cargar ${name}: HTTP ${resp.status}`);
  const rows = parseCSV(await resp.text());
  cache[name] = { rows, time: Date.now() };
  return rows;
}

// The course row with its cells trimmed, or null.
async function findCourse(cursoKey) {
  const key = normKey(cursoKey);
  const row = (await getTab('cursos')).find(r => normKey(r.cursoKey) === key);
  if (!row) return null;
  return Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v.trim()]));
}

// The row of that document in that course, or null. `activo` comes back as a boolean and an
// empty `participacion` is left out so the course's own applies.
async function findParticipant(cursoKey, documento) {
  const key = normKey(cursoKey);
  const doc = normDoc(documento);
  if (!doc) return null;
  const row = (await getTab('datos'))
    .find(r => normKey(r.curso) === key && normDoc(r.documento) === doc);
  if (!row) return null;
  const participant = {
    nombre:           row.nombre,
    tipo_documento:   row.tipo_documento.trim(),
    documento:        row.documento.trim(),
    codigo_seguridad: row.codigo_seguridad.trim(),
    activo:           normKey(row.activo) === 'si',
  };
  if ((row.participacion || '').trim()) participant.participacion = row.participacion.trim();
  return participant;
}

module.exports = { findCourse, findParticipant, GIDS };
