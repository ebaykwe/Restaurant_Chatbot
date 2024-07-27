let currentOrder = [];
let orderHistory = [];

const addOrder = (order) => {
    currentOrder.push(order.name);
};

const placeOrder = () => {
    if (currentOrder.length > 0) {
        orderHistory.push({ id: orderHistory.length + 1, items: [...currentOrder] });
        currentOrder = [];
        return 'Order placed successfully!';
    } else {
        return 'No order to place.';
    }
};

const getOrderHistory = () => {
    return orderHistory;
};

const getCurrentOrder = () => {
    return currentOrder;
};

const cancelOrder = () => {
    if (currentOrder.length > 0) {
        currentOrder = [];
        return 'Order cancelled successfully!';
    } else {
        return 'No order to cancel.';
    }
};

module.exports = {
    addOrder,
    placeOrder,
    getOrderHistory,
    getCurrentOrder,
    cancelOrder,
};
