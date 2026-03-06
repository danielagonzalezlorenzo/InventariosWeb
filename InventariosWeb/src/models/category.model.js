const db = require('../../config/db');

//Agrega categorias en la base de datos
exports.insertCategory = async (sku, name) => {
  //console.log(sku, name);
  try {
    const [rows] = await db.query(
      'CALL sp_addCategory(?, ?)', // SP correcto
      [sku, name]                       // Parámetros correctos
    );
    return rows;
    //console.log('Se guardo bien');
  } catch (error) {
    //console.log(error);
    throw error; // El controller lo capturará
  }
};

//Edita categorias en la base de datos
exports.editCategory = async (sku, name) => {
  //console.log(sku, name);
  try {
    const [rows] = await db.query(
      'CALL sp_editCategory(?, ?)', 
      [sku, name]                       
    );
    return rows;
    
  } catch (error) {
    //console.log(error);
    throw error; // El controller lo capturará
  }
};

//Elimina categorias en la base de datos
exports.deleteCategory = async (sku) => {
  //console.log(sku);
  try {
    const [rows] = await db.query(
      'CALL sp_deleteCategory(?)', 
      [sku]                       
    );
    return rows;
    
  } catch (error) {
    //console.log(error);
    throw error; // El controller lo capturará
  }
};