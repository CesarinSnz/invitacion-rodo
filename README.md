# 🪩 Invitación digital — 60 años de Rodo

Proyecto completo: panel de administrador + invitación interactiva por invitado,
con Node.js + Express + Supabase.

---

## 📁 Qué contiene este proyecto

```
invitacion-rodo60/
├── server.js              → arranca todo el servidor
├── config/
│   ├── supabaseClient.js  → conexión a la base de datos
│   └── evento.js          → datos del evento (fecha, lugar, etc.) EDITA ESTE ARCHIVO
├── routes/
│   ├── admin.js           → rutas del panel (crear, editar, eliminar)
│   └── public.js          → ruta pública /i/:slug que ve cada invitado
├── middleware/auth.js      → protege el panel admin
├── utils/
│   ├── slug.js             → genera el código único de cada link
│   └── generarHash.js      → te ayuda a crear tu contraseña de admin
├── views/                  → las páginas HTML (EJS)
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── invitacion.ejs       → la invitación retro/disco que ve el invitado
│   └── 404.ejs
├── public/css y public/js  → estilos y scripts
├── sql/schema.sql          → SQL para crear la tabla en Supabase
└── .env.example             → plantilla de variables de entorno
```

---

## PASO 1 — Abrir el proyecto en VS Code

1. Descarga/copia esta carpeta `invitacion-rodo60` dentro de tu carpeta "Invitacion Rodo" en VS Code (o reemplázala).
2. Abre VS Code → `Archivo > Abrir carpeta` → selecciona `invitacion-rodo60`.
3. Abre una terminal integrada: `Terminal > Nueva Terminal`.

## PASO 2 — Instalar Node.js (si no lo tienes)

Verifica en la terminal:
```bash
node -v
npm -v
```
Si no aparece nada, instala Node.js LTS desde https://nodejs.org y reinicia VS Code.

## PASO 3 — Instalar las dependencias del proyecto

En la terminal, dentro de la carpeta del proyecto:
```bash
npm install
```
Esto va a crear una carpeta `node_modules` (no la subas nunca a GitHub, ya está en `.gitignore`).

## PASO 4 — Crear la tabla en Supabase

1. Entra a tu proyecto **InvitacionRodo60** en https://supabase.com/dashboard
2. Ve al ícono de **SQL Editor** (barra lateral izquierda) → **New query**.
3. Abre el archivo `sql/schema.sql` de este proyecto, copia TODO su contenido y pégalo ahí.
4. Dale **Run**. Deberías ver "Success. No rows returned".
5. Ve a **Table Editor** → deberías ver la nueva tabla `invitados` con sus columnas.

> 💡 Si ya tenías una tabla vieja llamada "Invitados" con otras columnas, puedes eliminarla desde
> Table Editor (los tres puntos → Delete table) antes de correr el script, para evitar confusiones.

## PASO 5 — Obtener tus llaves de Supabase

1. En Supabase: ícono de engranaje ⚙️ **Project Settings** → **API**.
2. Copia:
   - **Project URL** (algo como `https://sjcebvhirufsvjroobuy.supabase.co`)
   - **service_role key** (⚠️ es secreta, NUNCA la pongas en código de frontend ni la subas a GitHub)

## PASO 6 — Configurar tu archivo `.env`

1. Duplica el archivo `.env.example` y renómbralo a `.env`.
2. Rellénalo así:
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
PORT=3000
SESSION_SECRET=escribe-cualquier-texto-largo-y-random
ADMIN_PASSWORD_HASH=
```

## PASO 7 — Crear tu contraseña de administrador

En la terminal:
```bash
npm run hash-password
```
Te va a preguntar la contraseña que quieras usar para entrar al panel. Copia la línea que te da
(`ADMIN_PASSWORD_HASH=...`) y pégala en tu archivo `.env`, reemplazando la línea vacía.

## PASO 8 — Personalizar los datos del evento

Abre `config/evento.js` y edita:
- `fechaEvento`: la fecha y hora real (formato `'2026-12-12T20:00:00'`)
- `lugarNombre`, `direccion`, `linkMapa`: el salón real
- `codigoVestimenta`, `mensajeBienvenida`: como quieras

## PASO 9 — Correr el proyecto

```bash
npm start
```
Verás:
```
✅ Servidor corriendo en http://localhost:3000
   Panel admin:  http://localhost:3000/admin
```
Abre esa URL en tu navegador, entra con tu contraseña, y ¡ya puedes crear invitaciones!

Cada invitado que crees genera automáticamente un link como:
`http://localhost:3000/i/xk29ab7c`
que puedes copiar o enviar directo por WhatsApp con el botón 💬 de la tarjeta.

## PASO 10 — Publicarlo en internet (para que los invitados lo abran desde su celular)

Cuando quieras que el link funcione fuera de tu computadora, lo más fácil es subirlo a **Railway** o
**Render** (ambos tienen plan gratuito):

1. Sube este proyecto a un repositorio de GitHub (recuerda: `.env` NO se sube, ya está en `.gitignore`).
2. En Railway/Render, conecta el repositorio.
3. En la sección de "Environment Variables" del hosting, agrega las mismas variables de tu `.env`
   (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SESSION_SECRET`, `ADMIN_PASSWORD_HASH`, `PORT`).
4. El hosting te dará una URL pública (ej. `https://invitacion-rodo60.up.railway.app`), y los links
   de tus invitados serán `https://invitacion-rodo60.up.railway.app/i/xk29ab7c`.

Si quieres, en el siguiente paso te puedo guiar específicamente para desplegarlo en Railway o Render.

---

## ¿Cómo funciona por dentro? (resumen rápido)

- **Tú (admin)** entras a `/admin`, creas una invitación con nombre + cantidad de pases → se genera
  un `slug` único → se guarda en Supabase.
- Cada invitado abre su link `/i/su-slug` → el servidor busca ese registro en Supabase y le muestra
  SU invitación personalizada con SU nombre y SU cantidad de pases.
- Cuando el invitado confirma o cancela, se actualiza directo en Supabase, y tú lo ves reflejado al
  instante en tu panel `/admin` (contador de pendientes/confirmados/cancelados).

---

## Próximas mejoras posibles (cuando quieras)

- Música de fondo con botón on/off (como en tu referencia).
- Sección de galería de fotos.
- Notificación automática a tu WhatsApp cuando alguien confirma.
- Exportar la lista de invitados a Excel.

Solo dime cuál quieres y seguimos construyendo paso a paso 🚀
