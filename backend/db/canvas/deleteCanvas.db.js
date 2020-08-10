var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
var typeHistoryModel = require('../../model/typeHistory.model');
var historyModel = require('../../model/history.model');
var usersModel = require('../../model/users.model');
exports.deleteCanvas = deleteCanvas;
async function deleteCanvas(data,userId){
    try{    
        var dateNow = await Date.now();
        //get canvas name
        var getCanvasName = await canvasModel.find({'_id':ObjectId(data.canvasId)});
        if(getCanvasName.length>0){
            //get delete canvas
            var deleteCan = await canvasModel.deleteOne({'_id':ObjectId(data.canvasId)});
            if(deleteCan.n != 1){
                return {success:false,message:'Delete False. Maybe can not found id',obj:''};
            }else{
                //get add history
                var typeHis = await typeHistoryModel.find({code:3});
                if(typeHis.length>0){
                    var getUser = await usersModel.find({'_id':ObjectId(userId)});
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
                        indirectName : getCanvasName[0].indirectName,
                        verb2 : typeHis[0].verb2,
                        subIndirect : typeHis[0].subIndirect,
                        subIndirectName : typeHis[0].subIndirectName,
                        directObjectCount : typeHis[0].directObjectCount,
                        directObjectCountUnit : typeHis[0].directObjectCountUnit,
                        typeHistoryNo : typeHis[0].typeHistoryNo
                    }).save();
                    return {success:true,message:'delete id '+data.canvasId+' success.',obj:''};
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