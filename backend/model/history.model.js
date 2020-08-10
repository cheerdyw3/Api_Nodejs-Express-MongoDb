const mongoose = require('mongoose');
const historySchema = mongoose.Schema({
    canvasId : String,
    text : String,
    actionBy : String,
    createDate : Date,
    updateDate : Date,
    subject : String,
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
    typeHistoryNo : String
},{
	timestamps: true
});

module.exports = mongoose.model('history',historySchema,'history');