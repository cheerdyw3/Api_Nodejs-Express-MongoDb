var getUserDetailDb = require('../../db/users/getUserDetail.db');

exports.initialize = (app) => {
    app.post('/get/user/detail',getUserDetail);
}

async function getUserDetail(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }

        var result = await getUserDetailDb.getUserDetail(req.app.locals.userId)
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