var ObjectId = require('mongoose').Types.ObjectId;
var patternModel = require('../../model/pattern.model');
exports.deletePattern = deletePattern;
async function deletePattern(model){
    try{    
        var deletePat = await patternModel.deleteOne({'_id':ObjectId(model.patternId)});
        console.log(deletePat)
        if(deletePat.n != 1){
            return {success:false,message:'Delete False. Maybe can not found id',obj:''};
        }else{
            return {success:true,message:'delete id '+model.patternId+' success.',obj:''};
        }
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:'internal server',obj:''};
    }
}