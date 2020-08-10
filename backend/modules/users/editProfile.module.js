var editProfileDb = require('../../db/users/editProfile.db');

exports.initialize = (app) => {
    app.post('/edit/profile',editProfile);
}

async function editProfile(req,res){
    try{
        if(req.app.locals.authorize == false){
            res.status(200).json({success:false,message:"invalid authorization",obj:null});
            return;
        }

        var result = await editProfileDb.editProfile(req.body,req.app.locals.userId)
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