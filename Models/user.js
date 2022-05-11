const mongoose = require('mongoose');
// avoid two user to have the same email address
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// add uniqueValidatore as plug-in into Schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);