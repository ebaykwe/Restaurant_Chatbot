const menu = require('../data/menuData');

const getMenu = (req, res) => {
    res.json({ items: menu });
};

module.exports = {
    getMenu,
};
