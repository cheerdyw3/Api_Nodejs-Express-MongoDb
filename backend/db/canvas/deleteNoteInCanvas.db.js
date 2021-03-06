var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
var typeHistoryModel = require('../../model/typeHistory.model');
var historyModel = require('../../model/history.model');
var usersModel = require('../../model/users.model');
exports.deleteNoteInCanvas = deleteNoteInCanvas;
async function deleteNoteInCanvas(data,userId){
    try{
        var dateNow = Date.now();
        //get modelName & title
        var findNote = await canvasModel.find({'_id':ObjectId(data.canvasId)});
        if(findNote){
            for(var i=0;i<findNote[0].model.length;i++){
                for(var j=0;j<findNote[0].model[i].note.length;j++){
                    if(data.noteId == findNote[0].model[i].note[j]._id){
                        var modelName = findNote[0].model[i].name;
                        var title = findNote[0].model[i].note[j].title;
                    }
                }
            }
            //delete note
            var deleteNote = await canvasModel.updateOne({
                '_id':ObjectId(data.canvasId),'model.note._id':ObjectId(data.noteId)
            },{
                $pull:{'model.$.note':{'_id':ObjectId(data.noteId)}}
            });
            if(deleteNote.nModified === 0){
                return {success:false,message:'delete note false!!!!.',obj:''};
            }else{
                 //add history
                var typeHis = await typeHistoryModel.find({code:6});
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
                    directObjectName : title,
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
                return {success:true,message:'delete note Success.',obj:''};
            }
        }
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}