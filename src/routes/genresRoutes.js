const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.list);
router.get('/detail/:id', genresController.detail);
router.get('/add', genresController.add);
router.post('/create', genresController.create);
router.get('/edit/:id', genresController.edit);
router.post('/edit/:id', genresController.update);
router.get('/delete/:id', genresController.delete);
router.post('/delete/:id', genresController.destroy);

module.exports = router;