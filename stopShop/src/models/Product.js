const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {type: schema.Types.String, required: true},
    description: {type: Schema.Types.String},
    price: {
        type: Schema.Types.Number,
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: {type: Schema.Types.String},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    isBought: {type: Schema.Types.Boolean, default: false}
});

const Product = mongoose.model('Product', productSchema);