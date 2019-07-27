const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 15
    },
    description: {
        type: String,
        min: 6,
        max: 15
    },
    image: {
        type: String,
        isAsync: true,
        validator: function (v, cb) {
            setTimeout(function () {
                var imageRegex = /^[https:\/\/]+[a-zA-Z]+/;
                var msg = v + ' is not a valid phone number!';
                cb(imageRegex.test(v), msg);
            }, 5);
        },
        validate: {
            validator: function (v) {
                return /^[https:\/\/]+[a-zA-Z]+/.test(v);
            },
            message: props => `${props.value} is not a valid url!`
        }
    },
    difficulty: { type: Number, min: 0, max: 6 },
});

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;