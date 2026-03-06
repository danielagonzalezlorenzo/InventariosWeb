const db = require('../../config/db');

//Agrega movimientos en la base de datos
exports.insertMovement = async (sku, tipo, cantidad, motivo) => {
  try {
    //console.log(sku, tipo, cantidad, motivo);
    const [rows] = await db.query(
      'CALL sp_addMovement(?, ?, ?, ?)',
      [sku, tipo, cantidad, motivo]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};