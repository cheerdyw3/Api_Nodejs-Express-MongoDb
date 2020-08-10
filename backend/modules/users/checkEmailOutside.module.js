var checkEmailOutsideDb = require('../../db/users/checkEmailOutside');

exports.initialize = (app) => {
    app.post('/check/email/outside',checkEmailOutside);
}

async function checkEmailOutside(req,res){
    try{
        // if(req.app.locals.authorize == false){
        //     res.status(200).json({success:false,message:"invalid authorization",obj:null});
        //     return;
        // }
        
        var result = await checkEmailOutsideDb.checkEmailOutside(req.body)
        .then(function(respond){
            res.status(200).json(respond);
            return;
        });
    }catch(e){
        console.log('\n ***',e);
        res.status(500).json({success:false,message:"",obj:null});
        return;
    }
}