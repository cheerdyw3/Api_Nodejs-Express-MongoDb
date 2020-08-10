var inviteDb = require('../../db/users/invite.db');

exports.initialize = (app) => {
    app.post('/invite',invitePublic);
}
async function invitePublic(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }
        console.log('invite public');
        var result = await inviteDb.invite(req.body)
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