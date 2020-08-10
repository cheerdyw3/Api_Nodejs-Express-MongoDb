var checkInviteDb = require('../../db/canvas/checkInvite.db');
var initconf = require('../../init.' + process.env.NODE_ENV + '.json');
exports.initialize = (app) => {
    app.get('/get/canvas/:token',checkInvite);
}
async function checkInvite(req,res){
    try{
        console.log("/get/canvas/:token")
        var result = await checkInviteDb.checkInvite(req.params.token)
        .then(function(respond){
            //console.log('module : ',respond);
            res.writeHead(302, {"Content-Type": "application/json","Location":initconf.baseUrlFrontend+"auth/invite/"+respond.tokenAuth});
            res.end();
            return;
        });

    }catch(e){
        console.log('\n\nerr ==',e);
        res.status(500).json({success:false,message:'internal server',obj:''});
        return;
    }
}