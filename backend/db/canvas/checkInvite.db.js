var jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;
var inviteDb = require('../users/invite.db');
var checkAuth = require('../../checkAuth');
exports.checkInvite = checkInvite;
async function checkInvite(token){
    try{
        //var secretEmail = "oioaj8/ca1-*6a2br5hkmi82da_8e";
        var result = await jwt.verify(token,inviteDb.secretEmail);
            var objData = {
                canvasId:result.canvasId,
                userId:result.userId,
                role:result.role
            };
            var tokenAuth = await jwt.sign(objData,checkAuth.secret,{expiresIn:'1d'});
           return{success:true,data:'invite success.',tokenAuth:tokenAuth};
    }catch(e){
        console.log(e);
        return{success:false,data:'internal server.',obj:null};
    }
}
