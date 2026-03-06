const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Mostrar formulario
router.get('/add', authMiddleware.verifyToken, categoryController.showAddForm);

// Enviar formulario Agregar
router.post('/add', authMiddleware.verifyToken, categoryController.addCategory);
//Editar producto
router.get('/edit', authMiddleware.verifyToken, categoryController.showEditForm);
router.put('/edit', authMiddleware.verifyToken, categoryController.editCategory);
//Eliminar producto
router.get('/delete', authMiddleware.verifyToken, categoryController.showDeleteForm);
router.delete('/delete', authMiddleware.verifyToken, categoryController.deleteCategory);
module.exports = router;