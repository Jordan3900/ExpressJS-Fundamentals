const homeHandler = require('./home');
const staticFiles = require('./static-files')
const product = require('./product')

module.exports = [homeHandler, staticFiles, product];