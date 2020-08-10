var ObjectId = require('mongoose').Types.ObjectId;
var patternModel = require('../../model/pattern.model');
exports.editPattern = editPattern;
async function editPattern(data){
    try{
        var dateNow = await Date.now();
        var editPattern = await patternModel.updateOne({'_id':ObjectId(data.patternId)},
        {$set:{
            partentName : data.partentName,
            imagePattern : data.imagePattern,
            model : data.model,
            updateDate : dateNow
        }});
        if(editPattern.n === 1){
            return {success:true,message:'edit seccess',obj:data};
        }else{
            return {success:false,message:'edit false',obj:''};
        }
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:'internal server',obj:''};
    }
}