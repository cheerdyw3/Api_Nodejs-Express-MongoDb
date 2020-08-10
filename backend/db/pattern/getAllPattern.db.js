var ObjectId = require('mongoose').Types.ObjectId;
var patternModel = require('../../model/pattern.model');
exports.getAllPattern = getAllPattern;
async function getAllPattern(model){
    try{
        return {success:true,message:'success',obj:await patternModel.find()};
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:'internal server',obj:''};
    }
}