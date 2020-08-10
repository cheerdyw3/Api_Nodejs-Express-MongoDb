var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
var patternModel = require('../../model/pattern.model');
var typeHistoryModel = require('../../model/typeHistory.model');
var historyModel = require('../../model/history.model');
var usersModel = require('../../model/users.model');
exports.createCanvas = createCanvas;
async function createCanvas(data,userId){
    try{
        var dateNow = await Date.now();
        var modelObj = [];
        // get pattern Name && Index
        var getPattern = await patternModel.find({'_id':ObjectId(data.patternId)});
        if(getPattern.length>0){        
            for(var i=0;i<getPattern[0].model.length;i++){
                var patternObj = {
                    index:getPattern[0].model[i].index,
                    name:getPattern[0].model[i].name
                }
                modelObj.push(patternObj);
            }
            // create canvas
            var objCanvas = await new canvasModel({
                userId : userId,
                batchId : data.batch.id,
                patternId : data.patternId,
                canvasName : data.canvasName,
                model : modelObj,
                createDate : dateNow
            }).save();
            if(objCanvas._id != undefined && objCanvas._id != ''){
                // add history
                var typeHis = await typeHistoryModel.find({code:1});
                    if(typeHis.length>0){
                        var getUser = await usersModel.find({'_id':ObjectId(userId)});
                        if(getUser[0].name === "" || getUser[0].surname === "" ){
                            var subject = typeHis[0].subject+" "+getUser[0].email;
                        }else{
                            var subject = typeHis[0].subject+" "+getUser[0].name+" "+getUser[0].surname;
                        }
                        var history = await new historyModel({
                            canvasId : objCanvas._id,
                            text : typeHis[0].title,
                            actionBy : userId,
                            createDate : dateNow,
                            subject : subject,
                            verb : typeHis[0].verb,
                            directObject : typeHis[0].directObject,
                            directObjectName : data.canvasName,
                            introduce : typeHis[0].introduce,
                            indirect : typeHis[0].indirect,
                            indirectName : typeHis[0].indirectName,
                            verb2 : typeHis[0].verb2,
                            subIndirect : typeHis[0].subIndirect,
                            subIndirectName : typeHis[0].subIndirectName,
                            directObjectCount : typeHis[0].directObjectCount,
                            directObjectCountUnit : typeHis[0].directObjectCountUnit,
                            typeHistoryNo : typeHis[0].typeHistoryNo
                        }).save();
                    }else{
                        return {success:false,message:"not found typeHis.",obj:''};
                    }
                    return {success:true,message:'add Canvas success',obj:objCanvas};
            }else{
                return {success:false,message:'add Canvas false',obj:''};
            }
        }else{
            return {success:false,message:'not found patternId',obj:''};
        }
    }catch(e){
        console.log('\n ***',e);
        var err = await e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}