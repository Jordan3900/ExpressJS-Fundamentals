const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/database.json');

let products = [];
let count = 1;

function getProducts () {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '[]');

        return [];
    }

    let json = fs.readFileSync(dbPath).toString() || '[]';
    let products = JSON.parse(json);

    return products;
}

function saveProducts (products) {
    let json = JSON.stringify(products);
    fs.writeFileSync(dbPath, json);
}

module.exports = {};

module.exports.getAll = getProducts;

module.exports.add = (product) => {
    product.id = count++;
    products.push(product);

    saveProducts(products);
} 

module.exports.findbyName = (name) => {
    let product = null;

    for (let p of products) {
        if (name === p.name) {
            return p;
        }
    }

    return product;
}