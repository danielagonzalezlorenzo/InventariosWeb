const pool = require('../../config/db'); // tu conexión a MySQL

const bcrypt = require('bcryptjs');

const findByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; // retorna usuario o undefined
};

module.exports = { findByUsername };