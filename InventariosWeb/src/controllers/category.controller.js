const Category = require('../models/category.model');
const Dashboard = require('../models/dashboard.model'); // para categorías

// Mostrar formulario Agregar
exports.showAddForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('categories/add', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

// Agregar Categoria
exports.addCategory = async (req, res) => {
  try {
    const { sku, name } = req.body;

    if (!sku || !name) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    await Category.insertCategory(sku, name);

    res.status(201).json({
      success: true,
      message: 'Categoría agregada correctamente'
    });

  } catch (error) {
    console.error(error.message);

    // Si el SP lanzó un error de duplicado
    const msg = error.sqlMessage?.includes('SKU ya existe') ? 'SKU ya existe' : 'No se pudo guardar la categoría';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};

// Mostrar formulario Editar
exports.showEditForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('categories/edit', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

// Editar
exports.editCategory = async (req, res) => {
  try {
    const { sku, name } = req.body;

    if (!sku || !name) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    await Category.editCategory(sku, name);
   
    res.status(200).json({
      success: true,
      message: 'Categoría editada correctamente'
    });

  } catch (error) {
    console.error(error.message);

    const msg = error.sqlMessage?.includes('Categoria no encontrada') ? 'Categoria no encontrada' : 'No se pudo editar la categoría';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};

//Mostrar formulario eliminar categoria
exports.showDeleteForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('categories/delete', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

//Eliminar
exports.deleteCategory = async (req, res) => {
  try {
    const { sku } = req.body;
    //console.log(sku);
    if (!sku) {
      return res.status(400).json({
        success: false,
        message: 'El campo SKU está vacío'
      });
    }

    await Category.deleteCategory(sku);
   
    res.status(200).json({
      success: true,
      message: 'Se eliminó la categoría'
    });

  } catch (error) {
    console.error(error.message);

    const msg = error.sqlMessage?.includes('Categoria no encontrada') ? 'Categoria no encontrada' : 'No se pudo eliminar la categoría';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};