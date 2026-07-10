// Datos generales del evento. Edita estos valores con la información real.
// No van en la base de datos porque son los mismos para TODOS los invitados.

module.exports = {
  nombreFestejado: 'Rodo',
  tituloEvento: 'Mis 60 años',
  // Formato ISO: 'YYYY-MM-DDTHH:MM:SS'
  fechaEvento: '2026-08-08T15:00:00',
  lugarNombre: 'Salón / Jardin "Los Cafetales"',
  direccion: '52083 Santa María Tetitla, Otzolotepec, Estado de Méx.',
  linkMapa: 'https://maps.app.goo.gl/rbamtAQN2ra3kfJu5',

  codigoVestimenta: 'Retro / Disco',
  mensajeBienvenida:
    'Prepárate para viajar a otra dimensión: nos ponemos retro para celebrar 60 años de pura energía disco.',

  // Foto de fondo en la portada (opcional). Pon tu foto en public/images/
  // y escribe aquí el nombre del archivo. Déjalo como null si no quieres foto de portada.
  fotoPortada: '/images/foto16.jpeg',

  // Galería de fotos. Agrega tus fotos dentro de public/images/
  // y escribe aquí los nombres de archivo, en el orden que quieras mostrarlas.
  // Si dejas el arreglo vacío [], la sección de galería no se muestra.
  galeria: [
    '/images/foto1.jpeg',
    '/images/foto2.jpeg',
    '/images/foto3.jpeg',
    '/images/foto4.jpeg',
    '/images/foto5.jpeg',
    '/images/foto6.jpeg',
    '/images/foto7.jpeg',
    '/images/foto8.jpeg',
    '/images/foto9.jpeg',
    '/images/foto10.jpeg',
    '/images/foto11.jpeg',
    '/images/foto12.jpeg',
    '/images/foto13.jpeg',
    '/images/foto14.jpeg',
    '/images/foto15.jpeg',
    '/images/foto16.jpeg',
  ],
};