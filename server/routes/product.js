const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.view);
router.get("/addProduct", productController.addproduct)
router.post("/addProduct", productController.saveRecord);
// update records
router.get("/editproduct/:id", productController.editProduct);
router.post("/editproduct/:id", productController.edit);


// delete records
router.get("/deleteproduct/:id", productController.delete);




module.exports = router;