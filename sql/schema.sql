-- ============================================
-- ESQUEMA: Invitación 60 años de Rodo
-- Ejecuta esto completo en Supabase > SQL Editor > New query > Run
-- ============================================

create extension if not exists pgcrypto;

create table if not exists invitados (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,                 -- código único para el link (ej: xk29ab7c)
  nombre text not null,                       -- "Familia Hernández" o "Víctor Ramos"
  es_familiar boolean not null default false, -- true = invitación familiar
  cantidad_invitados int not null default 1,  -- cuántos pases tiene esta invitación
  telefono_whatsapp text,                     -- para el botón de WhatsApp del admin
  mensaje_personalizado text,                 -- mensaje que se le manda por WhatsApp
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'confirmado', 'cancelado')),
  pases_confirmados int not null default 0,   -- cuántos de sus pases confirmó
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_invitados_slug on invitados(slug);

-- Actualiza updated_at automáticamente en cada cambio
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_invitados_updated_at on invitados;
create trigger trg_invitados_updated_at
before update on invitados
for each row execute function set_updated_at();

-- Seguridad: bloqueamos acceso público directo a la tabla.
-- Nuestro backend (Node) usa la Service Role Key, que SIEMPRE se salta RLS,
-- así que esto solo protege contra accesos anónimos desde el navegador.
alter table invitados enable row level security;
