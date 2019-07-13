const url = require('url');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortid = require('shortid');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    let filePath = path.normalize(path.join(__dirname, '../views/product/add.html'));

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        Category.find().then((categories) => {
            let replacement = `<select class="input-field" name="category">`
            for (const category of categories) {
                replacement += `<option value="${category._id}">${category.name}</option>`
            }
            replacement += '</select>'

            let html = data.toString().replace('{categories}', replacement);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });
    });

}

module.exports.addPost = async (req, res) => {
    let productObj = req.body;
    productObj.image = req.file.destination + '\\' + req.file.originalname;

    let product = await Product.create(productObj);
    let category = await Category.findById(product.category);
    category.products.push(product._id);
    category.save();
    res.redirect('/');
}