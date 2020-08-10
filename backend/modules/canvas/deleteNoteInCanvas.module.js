var deleteNoteInCanvasDb = require('../../db/canvas/deleteNoteInCanvas.db');

exports.initialize = (app) => {
    app.post('/delete/note/in/canvas',deleteNoteInCanvas);
}
async function deleteNoteInCanvas(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }
        
        var result = await deleteNoteInCanvasDb.deleteNoteInCanvas(req.body,req.app.locals.userId)
        .then(function(respond){
            res.status(200).json(respond);
            return;
        });
    }catch(e){
        console.log('\n\nerr ==',e);
        res.status(500).json({success:false,message:'internal server',obj:''});
        return;
    }
}