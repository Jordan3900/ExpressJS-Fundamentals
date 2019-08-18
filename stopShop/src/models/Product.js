const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: {
        type: Number,
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: {type: String},
    isBought: {type: Boolean, default: false},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;