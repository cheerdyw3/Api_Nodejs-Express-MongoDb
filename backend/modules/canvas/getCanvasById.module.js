var getCanvasByIdDb = require('../../db/canvas/getCanvasById.db');

exports.initialize = (app) => {
    app.post('/get/canvas/byId',getCanvasById);
}
async function getCanvasById(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }

        var result = await getCanvasByIdDb.getCanvasById(req.body,req.app.locals.userId)
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