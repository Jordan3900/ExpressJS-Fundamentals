const controllers = require('../controllers');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/about', controllers.home.about)

    app.get('/cube/create', controllers.cube.createGet);
    app.post('/cube/create', controllers.cube.createPost);
    app.get('/cube/details/:id', controllers.cube.detailsGet);


};