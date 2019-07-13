const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {

    fs.readFile('./views/category/add.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        res.write(data);
        res.end();
    });
}

    
module.exports.addPost = async (req, res) => {
    let category = req.body;
    await Category.create(category);
    res.redirect('/');
}