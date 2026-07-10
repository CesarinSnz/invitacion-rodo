const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    '⚠️  Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en tu archivo .env'
  );
}

// Usamos la Service Role Key porque este cliente vive SOLO en el backend
// (nunca se envía al navegador). Por eso puede saltarse RLS con seguridad.
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

module.exports = supabase;
