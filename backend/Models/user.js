const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const UserSchema =  new Schema({
    name: {
        type : String,
        required:  true,
    },
    email: {
        type : String,
        required:  true,
        unique :  true
    },
    password: {
        type : String,
        required: true
    }
});

const UserModel = mongoose.model('users', UserSchema); //collection_name and schema_name
module.exports = UserModel;

