const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const evento = require('../config/evento');

router.get('/', (req, res) => {
  res.redirect('/admin');
});

// Página de invitación de un invitado específico: /i/xk29ab7c
router.get('/i/:slug', async (req, res) => {
  const { data: invitado, error } = await supabase
    .from('invitados')
    .select('*')
    .eq('slug', req.params.slug)
    .single();

  if (error || !invitado) {
    return res.status(404).render('404');
  }

  res.render('invitacion', { invitado, evento });
});

// El invitado confirma o cancela su asistencia
router.post('/i/:slug/confirmar', async (req, res) => {
  const { estado, pases_confirmados } = req.body;

  const { data: invitado, error: fetchError } = await supabase
    .from('invitados')
    .select('*')
    .eq('slug', req.params.slug)
    .single();

  if (fetchError || !invitado) {
    return res.status(404).json({ error: 'Invitación no encontrada' });
  }

  let pases = parseInt(pases_confirmados, 10) || 0;
  if (pases > invitado.cantidad_invitados) pases = invitado.cantidad_invitados;
  if (pases < 0) pases = 0;

  const nuevoEstado = estado === 'cancelado' ? 'cancelado' : 'confirmado';

  const { error } = await supabase
    .from('invitados')
    .update({
      estado: nuevoEstado,
      pases_confirmados: nuevoEstado === 'cancelado' ? 0 : pases,
    })
    .eq('slug', req.params.slug);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al confirmar' });
  }

  res.json({ ok: true, estado: nuevoEstado, pases_confirmados: pases });
});

module.exports = router;
