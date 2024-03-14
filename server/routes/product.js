const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.view);
router.get("/addProduct", productController.addproduct)
router.post("/addProduct", productController.saveRecord);


module.exports = router;