var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
var typeHistoryModel = require('../../model/typeHistory.model');
var historyModel = require('../../model/history.model');
var usersModel = require('../../model/users.model');
exports.editCanvas = editCanvas;
async function editCanvas(data,userId){
    try{
        var dateNow = Date.now();
        // get canvasName && batchId
        var getUser = await usersModel.find({'_id':ObjectId(userId)});
        var getCanvasName = await canvasModel.find({'_id':ObjectId(data.canvasId)});
            if(getCanvasName.length>0){
                // edit Canvas
                var editCanvas = await canvasModel.updateOne(
                    {'_id':ObjectId(data.canvasId)},
                        {$set:{
                            canvasName:data.canvasName,
                            updateDate:dateNow
                        }
                    }
                );
                if(editCanvas.nModified === 0){
                    return {success:false,message:"edit false.",obj:''};
                }else{
                    // add history
                    var typeHis = await typeHistoryModel.find({code:2});
                    if(typeHis.length>0){
                        if(getUser[0].name === "" || getUser[0].surname === "" ){
                            var subject = typeHis[0].subject+" "+getUser[0].email;
                        }else{
                            var subject = typeHis[0].subject+" "+getUser[0].name+" "+getUser[0].surname;
                        }
                        var history = await new historyModel({
                            canvasId : data.canvasId,
                            text : typeHis[0].title,
                            actionBy : userId,
                            createDate : dateNow,
                            subject : subject,
                            verb : typeHis[0].verb,
                            directObject : typeHis[0].directObject,
                            directObjectName : getCanvasName[0].canvasName,
                            introduce : typeHis[0].introduce,
                            indirect : typeHis[0].indirect,
                            indirectName : typeHis[0].indirectName,
                            verb2 : typeHis[0].verb2,
                            subIndirect : typeHis[0].subIndirect,
                            subIndirectName : data.canvasName,
                            directObjectCount : typeHis[0].directObjectCount,
                            directObjectCountUnit : typeHis[0].directObjectCountUnit,
                            typeHistoryNo : typeHis[0].typeHistoryNo
                        }).save();
                        return {success:true,message:"edit success.",obj:data};
                    }else{
                        return {success:false,message:"not found typeHis.",obj:''};
                    }
                }
            }else{
                return {success:false,message:"not found canvasId.",obj:''};
            }
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}