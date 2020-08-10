var loginDb = require('../../db/users/login.db');

exports.initialize = (app) => {
    app.post('/login',login);
}

async function login(req,res){
    try{
        var result = await loginDb.login(req.body)
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