var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var usersModel = require('../../model/users.model');

exports.editProfile=editProfile;

async function editProfile(model,userId){
    try{
        var dateNow = Date.now();
        var updateAcc = await usersModel.updateOne(
            {'_id':ObjectId(userId)},
                {$set:{
                    titleName : model.titleName,
                    name : model.name,
                    surname : model.surname,
                    telephoneNumber : model.telephoneNumber,
                    updateDate : dateNow
                }}
        );
                if(updateAcc.nModified===0){
                    return {success:false,message:"update false",obj:null}
                }else{
                    return {success:true,message:"update success",obj:null}
                }
    }catch(e){
		console.log('\n ***',e);
        return {success:false,message:e,obj:null};
    }
}