var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
// var usersModel = require('../../model/users.model');
exports.getAllCanvas = getAllCanvas;
async function getAllCanvas(data,userId){
    try{
        var getCanvas = await canvasModel.find({userId:userId,batchId:data.batchId});
        if(getCanvas.length>0){
            return {success:true,message:'get success',obj:getCanvas};
        }else{
            return {success:false,message:'get false',obj:''};
        }
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}