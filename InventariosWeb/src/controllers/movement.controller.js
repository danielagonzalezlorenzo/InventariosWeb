const Movement = require('../models/movement.model');
const Dashboard = require('../models/dashboard.model'); // para categorías

// Mostrar formulario Agregar
exports.showAddForm = async (req, res) => {
  try {
    const categories = await Dashboard.getCategories();

    res.render('movements/add', {
      showHeader: true,
      user: req.user,
      categories
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
};

//Agregar movimiento
exports.addMovement = async (req, res) => {
  try {
    //console.log(req.body);
    const { sku, tipo, cantidad, motivo } = req.body;

    if (!sku || !tipo || !cantidad || !motivo) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    await Movement.insertMovement(sku, tipo, cantidad, motivo);

    res.status(201).json({
      success: true,
      message: 'Movimiento registrado correctamente'
    });

  } catch (error) {
    console.error(error.message);

    const msg = error.sqlMessage?.includes('No existe el producto') ? 'No existe el producto' : 'No se pudo registrar el movimiento';

    res.status(500).json({
      success: false,
      message: msg
    });
  }
};