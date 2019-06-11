let products = [];
let count = 1;

module.exports = {};

module.exports.getAll = () => {
    return products;
}

module.exports.add = (product) => {
    product.id = count++;
    products.push(product);
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