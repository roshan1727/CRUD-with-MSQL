const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.view);
router.get("/addProduct", productController.addproduct)
router.post("/addProduct", productController.saveRecord);
// router.delete("/:id", deleteProduct);

module.exports = router;