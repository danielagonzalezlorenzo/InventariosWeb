const db = require('../../config/db');

//Agrega productos en la base de datos
exports.insertProduct = async (sku, name, cat, precio, medida, stock) => {
  try {
   const [rows] = await db.query(
      'CALL sp_addProduct(?, ?, ?, ?, ?, ?)', // SP correcto
      [sku, name, cat, precio, medida, stock]                       
    );
    return rows;
    //console.log('Se guardo bien');
  } catch (error) {
    //console.log(error);
    throw error; // El controller lo capturará
  }
};

//Edita productos en la base de datos
exports.editProduct = async (sku, name, cat, precio, medida, stock) => {
  console.log(sku, name, cat, precio, medida, stock);
  try {
    const [rows] = await db.query(
      'CALL sp_editProduct(?, ?, ?, ?, ?, ?)', 
      [sku, name, cat, precio, medida, stock]                       
    );
    return rows;
    
  } catch (error) {
    //console.log(error);
    throw error; // El controller lo capturará
  }
};

//Elimina productos en la base de datos
exports.deleteProduct = async (sku) => {
  //console.log(sku);
  try {
    const [rows] = await db.query(
      'CALL sp_deleteProduct(?)', 
      [sku]                       
    );
    return rows;
    
  } catch (error) {
    //console.log(error);
    throw error; // El controller lo capturará
  }
};