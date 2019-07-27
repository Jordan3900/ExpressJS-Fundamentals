const Cube = require('../models/Cube');

module.exports.index = (req, res) => {
    let searchParams = req.query;
    if (searchParams.search) {

        let name = searchParams.search;
        let to = Number(searchParams.to);
        let from = Number(searchParams.from);

        Cube.find({ name: name, difficulty: { $gte: from, $lt: to }}).then((cubes) => {
            let data = { cubes };
    
            if (req.query.error) {
                data.error = req.query.error;
            } else if (req.query.success) {
                data.success = req.query.success;
            }
    
            res.render('home/home', {
                cubes: data.cubes,
            });
        });
    } else {
        Cube.find().then((cubes) => {
            let data = { cubes };
    
            if (req.query.error) {
                data.error = req.query.error;
            } else if (req.query.success) {
                data.success = req.query.success;
            }
    
            res.render('home/home', {
                cubes: data.cubes,
            });
        });
    }
};

module.exports.about = (req, res) => {
    res.render('about')
};  