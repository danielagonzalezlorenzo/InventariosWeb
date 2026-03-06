const db = require('../../config/db');

//Recibe el stock completo
exports.getStock = async () => {
    const [rows] = await db.query("CALL sp_stockComplet()");
    //console.log([rows]);
    return rows[0]; // MySQL devuelve array dentro de array
};

//Recibe las categorias de la base de datos
exports.getCategories = async () => {
    const [rows] = await db.query("CALL sp_getCategories()");
    //console.log(rows[0]);
    return rows[0]; // MySQL devuelve array dentro de array
};

//Recibe el stock filtrado por categoria
exports.getProductsByCategory = async (cat) => {
  const [rows] = await db.query("CALL sp_stockByCat(?)", [cat]);
  return rows[0]; // mysql devuelve un array extra
};

//Recibe el stock filtrado por busqueda
exports.searchStock = async (search) => {
    console.log(search);
  const [rows] = await db.query("CALL sp_stockBySearch(?)", [search]);
  return rows[0]; // mysql devuelve un array extra
};