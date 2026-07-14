require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.SESSION_SECRET || 'cambia-esto-en-produccion'));

app.use('/admin', adminRoutes);
app.use('/', publicRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`   Panel admin:  http://localhost:${PORT}/admin`);
  });
}

module.exports = app;