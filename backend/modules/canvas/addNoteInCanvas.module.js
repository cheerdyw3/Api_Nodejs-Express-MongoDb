var addNoteInCanvasDb = require('../../db/canvas/addNoteInCanvas');

exports.initialize = (app) => {
    app.post('/add/note/in/canvas',addNoteInCanvas);
}
async function addNoteInCanvas(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }

        var result = await addNoteInCanvasDb.addNoteInCanvas(req.body,req.app.locals.userId)
        .then(function(respond){
            res.status(200).json(respond);
            return;
        });
    }catch(e){
        console.log('\n\nerr==',e);
        res.status(500).json({success:false,message:'internal server',obj:''});
        return;
    }
}