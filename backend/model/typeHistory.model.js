const mongoose = require('mongoose');
const typeHistorySchema = mongoose.Schema({
    code : Number, 
    title : String, 
    subject : String, 
    sendEmail : Boolean, 
    verb : String, 
    directObject : String, 
    directObjectName : String, 
    introduce : String, 
    indirect : String, 
    indirectName : String, 
    verb2 : String, 
    subIndirect : String,
    subIndirectName : String,
    directObjectCount : String,
    directObjectCountUnit : String,
    partOf : String, 
    times : String
},{
	timestamps: true
});

module.exports = mongoose.model('typeHistory',typeHistorySchema,'typeHistory');