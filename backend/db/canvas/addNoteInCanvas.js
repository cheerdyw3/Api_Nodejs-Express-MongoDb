var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
var typeHistoryModel = require('../../model/typeHistory.model');
var historyModel = require('../../model/history.model');
var usersModel = require('../../model/users.model');
exports.addNoteInCanvas = addNoteInCanvas;
async function addNoteInCanvas(data,userId){
    try{
        var dateNow = await Date.now();
         //add note
        var addNote = await canvasModel.updateOne({
            model:{$elemMatch:{'_id':ObjectId(data.modelId)}}},
                {$push:{
                    'model.$.note':noteObj = {
                        title:data.note.title,
                        color:data.note.color,
                        createDate:dateNow
                    }
                }
            }
        );
        if(addNote.nModified === 0){
            return {success:false,message:'add note false.',obj:''};
        }else{
            // get modelName
            var findModel = await canvasModel.find({'_id':ObjectId(data.canvasId)});
            if(findModel.length>0){
                for(var i=0;i<findModel[0].model.length;i++){
                    if(data.modelId == findModel[0].model[i]._id){
                        var modelName = findModel[0].model[i].name;
                    }
                }
                // add history
                var typeHis = await typeHistoryModel.find({code:4});
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
                        directObjectName : data.note.title,
                        introduce : typeHis[0].introduce,
                        indirect : typeHis[0].indirect,
                        indirectName : modelName,
                        verb2 : typeHis[0].verb2,
                        subIndirect : typeHis[0].subIndirect,
                        subIndirectName : typeHis[0].subIndirectName,
                        directObjectCount : typeHis[0].directObjectCount,
                        directObjectCountUnit : typeHis[0].directObjectCountUnit,
                        typeHistoryNo : typeHis[0].typeHistoryNo
                    }).save();
                    return {success:true,message:'add note Success.',obj:data.note};
                }else{
                    return {success:false,message:"not found typeHis.",obj:''};
                }
            }else{
                return {success:false,message:'not found canvasId.',obj:''};
            }
        }
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'add note Success.',obj:data.note};
    }
}