const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/add/save', productController.add);
router.get('/add', productController.addProduct);
router.get('/edit/:productID', productController.edit);
router.get('/edit', productController.editProduct);
router.post('/update', productController.update);
router.get('/delete/:productID', productController.delete);
router.get('/delete', productController.deleteProduct);
router.get('/:productCategoryID/edit', productController.editByCategory);
router.get('/:productCategoryID/delete', productController.deleteByCategory);
router.get('/:productCategoryID', productController.listByCategory);
router.get('/', productController.listProducts);

module.exports = router;
