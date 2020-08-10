var ObjectId = require('mongoose').Types.ObjectId;
var patternModel = require('../../model/pattern.model');
exports.createPattern = createPattern;

async function createPattern(model){
    try{
        var dateNow = await Date.now();
        var objPattern = await new patternModel({
            partentName : model.partentName,
            imagePattern : model.imagePattern,
            model : model.model,
            createDate : dateNow
        }).save();
        if(objPattern._id != undefined && objPattern._id != ''){
            return {success:true,message:'create pattern success',obj:objPattern};
        }else{
            return {success:false,message:'create pattern false',obj:''};
        }
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:'internal server',obj:''};
    }
}