const homeHandler = require('./home');
const staticFiles = require('./static-files')
const movieHandler = require('./movie');

module.exports = [homeHandler, staticFiles, movieHandler];