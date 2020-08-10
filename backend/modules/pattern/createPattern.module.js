var createPatternDb = require('../../db/pattern/createPattern.db');

exports.initialize = (app) => {
    app.post('/create/pattern',createPattern);
}
async function createPattern(req,res){
    try{
        // if(req.app.locals.authorize == false){
        //     res.status(200).json({success:false,message:"invalid authorization",obj:null});
        //     return;
        // }

        var result = await createPatternDb.createPattern(req.body)
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