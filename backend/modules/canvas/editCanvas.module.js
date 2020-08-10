var editCanvasDb = require('../../db/canvas/editCanvas.db');

exports.initialize = (app) => {
    app.post('/edit/canvas',editCanvas);
}
async function editCanvas(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }
        
        var result = await editCanvasDb.editCanvas(req.body,req.app.locals.userId)
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