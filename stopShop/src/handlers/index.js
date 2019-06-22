const homeHandler = require('./home');
const staticFiles = require('./static-files');
const product = require('./product');
const category = require('./category');

module.exports = [homeHandler, staticFiles, product, category];