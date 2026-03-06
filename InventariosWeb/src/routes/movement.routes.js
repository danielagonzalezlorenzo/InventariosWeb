const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movement.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Mostrar formulario
router.get('/add', authMiddleware.verifyToken, movementController.showAddForm);
router.post('/add', authMiddleware.verifyToken, movementController.addMovement);

module.exports = router;
