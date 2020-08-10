const mongoose = require('mongoose');
const canvasSchema = mongoose.Schema({
	userId : String,
	batchId :String,
    patternId : String,
    canvasName : String,
    allowanceUser : Array,
    model:[
        {
        index : Number,
        name : String,
        note:[
            {
                title : String,
                color : {},
                createDate : Date,
                updateDate : Date
            }
        ]
        }
    ],
    createDate: Date,
    updateDate: Date
},{
	timestamps: true
});
module.exports = mongoose.model('canvas',canvasSchema,'canvas');