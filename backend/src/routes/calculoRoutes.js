const express = require('express');
const router = express.Router();
const calculoController = require('../controllers/calculoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/simular', calculoController.simular);
router.post('/equilibrio', calculoController.equilibrio);

router.use(authMiddleware);

router.post('/', calculoController.create);
router.get('/historico', calculoController.history);

module.exports = router;
