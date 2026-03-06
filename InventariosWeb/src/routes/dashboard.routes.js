const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Carga inicial del dashboard
router.get('/',authMiddleware.verifyToken, dashboardController.showDashboard);

// Filtrar por categoría (AJAX)
router.get('/:id',authMiddleware.verifyToken, dashboardController.getByCategory);

router.get('/search/:search',authMiddleware.verifyToken, dashboardController.getBySearch);

module.exports = router;