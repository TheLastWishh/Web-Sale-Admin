const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/unconfimred', orderController.listOrdersUnconfirmed);
router.get('/confirm/:purchaseOrderID', orderController.confirm);
router.get('/delivery', orderController.listOrdersDelivery);
router.get('/deliver/:purchaseOrderID', orderController.deliver);
router.get('/delivered', orderController.listOrdersDelivered);
router.get('/detail/:purchaseOrderID', orderController.detail);
router.get('/', orderController.listOrders);

module.exports = router;
