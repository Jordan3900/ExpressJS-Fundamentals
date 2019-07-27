const Cube = require('../models/Cube');

module.exports.createGet = (req, res) => {
   res.render('cube/create');
}

module.exports.createPost = async (req, res) => {
   let cubeObj = req.body;

   let cube = await Cube.create(cubeObj);

   res.redirect('/');
}

module.exports.detailsGet = async (req, res) => {
   let cubeId= req.params.id;

   let cube = await Cube.findById(cubeId);

   res.render('cube/details', cube)
}