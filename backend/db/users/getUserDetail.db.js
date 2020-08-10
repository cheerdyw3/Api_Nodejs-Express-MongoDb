var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var usersModel = require('../../model/users.model');

exports.getUserDetail=getUserDetail;

async function getUserDetail(userId){
    try{
        var dateNow = Date.now();
        var getUser = await usersModel.find({'_id':ObjectId(userId)});
        if(getUser.length>0){
            var objUserDetail = {
                "userId":getUser[0]._id,
                "titleName":getUser[0].titleName,
                "name": getUser[0].name,
                "surname": getUser[0].surname,
                "email": getUser[0].email,
                "userLevel": getUser[0].userLevel,
                "verifyEmail": getUser[0].verifyEmail,
                "fromType": getUser[0].fromType,
                "createDate": getUser[0].createDate,
                "telephoneNumber": getUser[0].telephoneNumber,
                "updateDate": getUser[0].updateDate
            }
            return {success:true,message:"user detail",obj:objUserDetail}
        }else{
            return {success:false,message:"get user detail false not found user id",obj:''}
        }
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:e,obj:null};
    }
}