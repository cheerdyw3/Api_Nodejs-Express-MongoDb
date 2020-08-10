var getAllPatternDb = require('../../db/pattern/getAllPattern.db');

exports.initialize = (app) => {
    app.post('/get/all/pattern',getAllPattern);
}
async function getAllPattern(req,res){
    try{
        // if(req.app.locals.authorize == false){
        //     res.status(200).json({success:false,message:"invalid authorization",obj:null});
        //     return;
        // }

        var result = await getAllPatternDb.getAllPattern()
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