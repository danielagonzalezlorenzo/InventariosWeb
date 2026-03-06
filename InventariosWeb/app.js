require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');

const app = express();

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Motor de plantillas
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', require('./src/routes/auth.routes'));
app.use('/dashboard', require('./src/routes/dashboard.routes'));
app.use('/products', require('./src/routes/product.routes'));
app.use('/categories', require('./src/routes/category.routes'));
app.use('/movements', require('./src/routes/movement.routes'));

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

/*const bcrypt = require('bcryptjs');

const password = '1234';
const hashedPassword = bcrypt.hashSync(password, 10);
console.log('contraseña');
console.log(hashedPassword);*/