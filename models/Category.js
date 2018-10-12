const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CategorySchema = new Schema({

    name:{

        type: String,
        required: true,
        default: 'NODE'

    },

});

module.exports = mongoose.model('categories', CategorySchema);
