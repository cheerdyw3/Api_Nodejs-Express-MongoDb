const mongoose = require('mongoose');
const patternSchema = mongoose.Schema({
    partentName : String,
    imagePattern : String,
    model:[{
        index:Number,
        name:String,
    }],
    createDate : Date,
    updateDate : Date
},{
	timestamps: true
});

module.exports = mongoose.model('pattern',patternSchema,'pattern');