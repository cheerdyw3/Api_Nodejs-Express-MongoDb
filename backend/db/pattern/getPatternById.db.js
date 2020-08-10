var ObjectId = require('mongoose').Types.ObjectId;
var patternModel = require('../../model/pattern.model');
exports.getPatternById = getPatternById;
async function getPatternById(model){
    try{
        var getById = await patternModel.find({'_id':ObjectId(model.patternId)});
        if(getById.length>0){
            return {success:true,message:'get success',obj:getById};
        }else{
            return {success:true,message:'can not found id',obj:''}
        }
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:'internal server',obj:''};
    }
}