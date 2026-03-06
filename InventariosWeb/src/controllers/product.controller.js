const Product = require('../models/product.model');
const Dashboard = require('../models/dashboard.model'); // para categorías

// Mostrar formulario Agregar
exports.showAddForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('products/add', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

//Agregar producto
exports.addProduct = async (req, res) => {
  //console.log(req.body);
  try {
    //console.log(req.body);
    const { sku, name, cat, precio, medida, stock } = req.body;

    if (!sku || !name || !cat || !precio || !medida || !stock) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    await Product.insertProduct(sku, name, cat, precio, medida, stock);

    res.status(201).json({
      success: true,
      message: 'Producto agregado correctamente'
    });

  } catch (error) {
    console.error(error.message);

    // Si el SP lanzó un error de duplicado
    const msg = error.sqlMessage?.includes('SKU ya existe') ? 'SKU ya existe' : 'No se pudo agregar el producto';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};

//Mostrar formulario de editar producto
exports.showEditForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('products/edit', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

//Editar producto
exports.editProduct = async (req, res) => {
  try {
    //console.log(req.body);
    const { sku, name, cat, precio, medida, stock } = req.body;

    if (!sku || !name|| !cat || !precio || !medida || !stock) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    await Product.editProduct(sku, name, cat, precio, medida, stock);
   
    res.status(200).json({
      success: true,
      message: 'Producto editado correctamente'
    });

  } catch (error) {
    console.error(error.message);

    const msg = error.sqlMessage?.includes('Producto no encontrado') ? 'Producto no encontrado' : 'No se pudo editar el producto';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};


//Mostrar formulario de editar producto
exports.showDeleteForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('products/delete', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

//Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const { sku } = req.body;
    //console.log(sku);
    if (!sku) {
      return res.status(400).json({
        success: false,
        message: 'El campo SKU está vacío'
      });
    }

    await Product.deleteProduct(sku);
   
    res.status(200).json({
      success: true,
      message: 'Se eliminó el producto'
    });

  } catch (error) {
    console.error(error.message);

    // Si el SP lanzó un error de duplicado
    const msg = error.sqlMessage?.includes('Producto no encontrado') ? 'Producto no encontrado' : 'No se pudo eliminar el producto';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};