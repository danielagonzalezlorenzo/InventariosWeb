const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByUsername } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET;

exports.showLogin = (req, res) => {
    //res.render('auth/login');
    res.render('auth/login', { showHeader: false });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try{
    const user = await findByUsername(username);

    if(!user) {
      return res.render('auth/login', {error: 'Usuario no encontrado', showHeader: false});
    }

    const pass = await bcrypt.compare(password, user.password);
    if(!pass) {
      return res.render('auth/login', { error: 'Contraseña incorrecta', showHeader: false});
    }

    const token = jwt.sign(
      {id:user.id, username: user.username},
      JWT_SECRET,
      {expiresIn: '1h'}
    );

    //Guardar en cookie httpOnly
    res.cookie('token', token, {httpOnly: true});

    res.redirect('/dashboard');
  } catch (err){
    console.error(err);
    res.render('auth/login', {error: 'Error al iniciar sesion', showHeader: false});
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('auth/login');
}