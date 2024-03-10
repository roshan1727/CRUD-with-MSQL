const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.view);

router.get('', (req, res) => {
    res.render("home");
});

module.exports = router;