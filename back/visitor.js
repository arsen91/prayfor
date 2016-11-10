var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Visitor', new Schema({ 
    name: { type: String, required: true },
    email: { type: String},
    church: { type: String, required: true }
}));