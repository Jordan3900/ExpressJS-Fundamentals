const homeHandler = require('./home');
const productHandler = require('./product');
const categoryHadler = require('./category');

module.exports = {
    home: homeHandler,
    product: productHandler,
    category: categoryHadler
}