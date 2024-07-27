const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/checkout', orderController.placeOrder);
router.get('/order-history', orderController.getOrderHistory);
router.get('/current-order', orderController.getCurrentOrder);
router.post('/cancel-order', orderController.cancelOrder);
router.post('/add-item', orderController.addItemToOrder); 

module.exports = router;
