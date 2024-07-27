const orderModel = require('../models/orderModel');
const menu = require('../data/menuData'); 

const placeOrder = (req, res) => {
    const message = orderModel.placeOrder();
    res.json({ message });
};

const getOrderHistory = (req, res) => {
    const history = orderModel.getOrderHistory();
    res.json({ history });
};

const getCurrentOrder = (req, res) => {
    const currentOrder = orderModel.getCurrentOrder();
    res.json({ items: currentOrder });
};

const cancelOrder = (req, res) => {
    const message = orderModel.cancelOrder();
    res.json({ message });
};

const addItemToOrder = (req, res) => {
    const { itemId } = req.body;
    const menuItem = menu.find(item => item.id === itemId);
    if (menuItem) {
        orderModel.addOrder(menuItem);
        res.json({ message: `${menuItem.name} added to your order.` });
    } else {
        res.status(400).json({ message: 'Invalid item ID.' });
    }
};

module.exports = {
    placeOrder,
    getOrderHistory,
    getCurrentOrder,
    cancelOrder,
    addItemToOrder, 
};
