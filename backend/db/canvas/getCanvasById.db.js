var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
exports.getCanvasById = getCanvasById;
async function getCanvasById(data,userId){
    try{
        var getById = await canvasModel.find({'_id':ObjectId(data.canvasId)});
        if(getById.length>0){
            return {success:true,message:'get success',obj:getById[0]};
        }else{
            return {success:true,message:'can not found id',obj:''}
        }
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}