'use strict';

const { generateCertificate }           = require('../generate');
const { findCourse, findParticipant }   = require('../config/sheet');

const safeFileName = nombre => nombre
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-zA-Z0-9 ]/g, '')
  .trim()
  .replace(/\s+/g, '_');

// The certificate carries a Hermes security code, so it is built only from the stored rows:
// whatever else the browser sends is ignored.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { cursoKey, documento } = req.body || {};
    if (!cursoKey || !documento) {
      return res.status(400).json({ error: 'Faltan el curso o el documento' });
    }

    const course = await findCourse(cursoKey);
    if (!course) {
      return res.status(400).json({ error: `Curso desconocido: ${cursoKey}` });
    }
    const participant = await findParticipant(cursoKey, documento);
    if (!participant) {
      return res.status(404).json({ error: 'No se encontró registro con ese documento' });
    }
    if (!participant.activo || course.activo.toUpperCase() === 'NO') {
      return res.status(403).json({ error: 'Certificado no habilitado', inactivo: true });
    }

    const buffer = await generateCertificate({ ...course, ...participant });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition',
      `attachment; filename="certificado_${safeFileName(participant.nombre)}.pdf"`);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'no-store');
    res.send(buffer);
  } catch (err) {
    console.error('[certificado]', err);
    res.status(500).json({ error: 'Error al generar el certificado' });
  }
};
