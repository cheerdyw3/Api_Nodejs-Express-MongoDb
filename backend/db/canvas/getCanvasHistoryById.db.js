var ObjectId = require('mongoose').Types.ObjectId;
var historyModel = require('../../model/history.model');
exports.getCanvasHistoryById = getCanvasHistoryById;
async function getCanvasHistoryById(data){
    try{
        var getCanvHistory = await historyModel.find({canvasId:data.canvasId});
        if(getCanvHistory.length>0){
            return {success:true,message:'get success',obj:getCanvHistory};
        }else{
            return {success:false,message:'get false',obj:''};
        }
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}