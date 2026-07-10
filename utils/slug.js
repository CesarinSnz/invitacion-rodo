const { customAlphabet } = require('nanoid');

// Solo minúsculas y números, para que el link se vea limpio: /i/xk29ab7c
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);

function generarSlug() {
  return nanoid();
}

module.exports = { generarSlug };
