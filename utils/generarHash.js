// Este script te ayuda a generar el hash de tu contraseña de administrador.
// Uso: npm run hash-password
// Te va a preguntar la contraseña que quieras usar y te dará un texto
// para pegar en ADMIN_PASSWORD_HASH dentro de tu archivo .env

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Escribe la contraseña que quieres usar para el panel admin: ', (password) => {
  const hash = bcrypt.hashSync(password, 10);
  console.log('\n✅ Copia esta línea completa dentro de tu archivo .env:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  rl.close();
});
