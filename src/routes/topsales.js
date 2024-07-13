const express = require('express');
const router = express.Router();
const topSalesController = require('../controllers/TopSalesController');

router.get('/:productCategoryID', topSalesController.getTopSalesByCategory);
router.get('/', topSalesController.getTopSales);

module.exports = router;
