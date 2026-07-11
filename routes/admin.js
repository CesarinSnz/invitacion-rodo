const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const { requireAuth } = require('../middleware/auth');
const { generarSlug } = require('../utils/slug');

// ---------- LOGIN ----------
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { password } = req.body;
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return res.render('login', {
      error:
        'El servidor no tiene configurada una contraseña (falta ADMIN_PASSWORD_HASH en .env).',
    });
  }

  const valido = await bcrypt.compare(password || '', hash);
  if (valido) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('login', { error: 'Contraseña incorrecta.' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

// ---------- DASHBOARD ----------
router.get('/', requireAuth, async (req, res) => {
  const { data: invitados, error } = await supabase
    .from('invitados')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).send('Error al cargar invitados: ' + error.message);
  }

  const resumen = {
    pendiente: invitados.filter((i) => i.estado === 'pendiente').length,
    confirmado: invitados.filter((i) => i.estado === 'confirmado').length,
    cancelado: invitados.filter((i) => i.estado === 'cancelado').length,
    totalInvitaciones: invitados.length,
    totalPases: invitados.reduce((sum, i) => sum + i.cantidad_invitados, 0),
    pasesConfirmados: invitados.reduce((sum, i) => sum + i.pases_confirmados, 0),
  };

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  res.render('dashboard', { invitados, resumen, baseUrl });
});

// ---------- CREAR ----------
router.post('/invitados', requireAuth, async (req, res) => {
  const { nombre, telefono_whatsapp, cantidad_invitados, es_familiar, mensaje_personalizado } =
    req.body;

  const slug = generarSlug();

  const { error } = await supabase.from('invitados').insert({
    nombre,
    telefono_whatsapp: telefono_whatsapp || null,
    cantidad_invitados: parseInt(cantidad_invitados, 10) || 1,
    es_familiar: es_familiar === 'on' || es_familiar === true,
    mensaje_personalizado:
      mensaje_personalizado ||
      'Nos encantaría que nos acompañes en un día muy especial. Abre el enlace para ver tu invitación.',
    slug,
  });

  if (error) {
    console.error(error);
    return res.status(500).send('Error al crear invitado: ' + error.message);
  }

  res.redirect('/admin');
});

// ---------- OBTENER UNO (para el modal de edición) ----------
router.get('/invitados/:id', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('invitados')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'No encontrado' });
  res.json(data);
});

// ---------- EDITAR ----------
router.put('/invitados/:id', requireAuth, async (req, res) => {
  const { nombre, telefono_whatsapp, cantidad_invitados, es_familiar, mensaje_personalizado } =
    req.body;

  const { error } = await supabase
    .from('invitados')
    .update({
      nombre,
      telefono_whatsapp: telefono_whatsapp || null,
      cantidad_invitados: parseInt(cantidad_invitados, 10) || 1,
      es_familiar: es_familiar === 'on' || es_familiar === true,
      mensaje_personalizado,
    })
    .eq('id', req.params.id);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar' });
  }
  res.json({ ok: true });
});

// ---------- ELIMINAR ----------
router.delete('/invitados/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('invitados').delete().eq('id', req.params.id);
  if (error) {
    console.error('Error al eliminar invitado:', error);
    return res.status(500).json({ error: error.message || 'Error al eliminar' });
  }
  res.json({ ok: true });
});