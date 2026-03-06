const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Mostrar formulario
router.get('/add', authMiddleware.verifyToken, productController.showAddForm);
// Enviar formulario Agregar
router.post('/add', authMiddleware.verifyToken, productController.addProduct);
//Editar producto
router.get('/edit', authMiddleware.verifyToken, productController.showEditForm);
router.put('/edit', authMiddleware.verifyToken, productController.editProduct);
//Eliminar producto
router.get('/delete', authMiddleware.verifyToken, productController.showDeleteForm);
router.delete('/delete', authMiddleware.verifyToken, productController.deleteProduct);
module.exports = router;



