const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {type: String, unique:true, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;