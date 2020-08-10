var getCanvasHistoryByIdDb = require('../../db/canvas/getCanvasHistoryById.db');

exports.initialize = (app) => {
    app.post('/get/canvas/history/ById',getCanvasHistoryById);
}
async function getCanvasHistoryById(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }

        var result = await getCanvasHistoryByIdDb.getCanvasHistoryById(req.body)
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