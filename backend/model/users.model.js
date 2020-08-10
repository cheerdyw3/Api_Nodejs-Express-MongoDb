const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    titleName: String,
    name: String,
    surname : String,
    email : String,
    password: String,
    salt: String,
    userLevel : Number,
    telephoneNumber : String,
    position : String,
    verifyEmail : Boolean,
    createDate: Date,
    updateDate: Date,
    lastLogin: Date,
    fromType : String
},{
	timestamps: true
});

module.exports = mongoose.model('users',userSchema,'users');