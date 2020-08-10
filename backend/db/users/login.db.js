var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var jwt = require('jsonwebtoken');
const { base64encode, base64decode } = require('nodejs-base64');
var md5 = require('md5');
var usersModel = require('../../model/users.model');

exports.login = login;

async function HashPassword(password, salt){
	try{
		let text1 = password + '-' + salt;
		let text1Md5 = await md5(text1);
		let text2 = salt + '-' + base64encode(password);
		let text2Md5 = await md5(text2);
		let finalText = await base64encode(md5(text1Md5 + salt + text2Md5));
		return finalText;
	}catch(e){
		console.log(e);
	}
}
async function VerifyHash(password, salt, validHash){
	try{
		let testHash = await HashPassword(password, salt);
		if(testHash == validHash){
			return true;
		}else{
			return false;
		}
	}catch(e){
		console.log(e);
	}
}
async function login(emailAndPass){
	try{
		var dateNow = Date.now();
		var detail = {
			userId:"",
			name:"",
			surname:"",
			email:"",
			userLevel:"",
			profilePic:"",
			detailUser:[],
			token:"",
			createdAt:"",
			updatedAt:"",
			createDate:"",
			updateDate:"",
			lastLogin:""
		}
        if(emailAndPass.email === null || emailAndPass.password === null){
            return {success:false,massage:"success",obj:null};
        }else{
            var getEmail = await usersModel.find({email:emailAndPass.email});
            if(getEmail.length === 0){
                return {success:false,message:"not found email.",obj:null};
            }else{
			var getEmail = await usersModel.find({email:emailAndPass.email});
			var updateLastLogin = await usersModel.updateOne({'_id':ObjectId(getEmail[0]._id)},{$set:{lastLogin:dateNow}});
                var passVerify = await VerifyHash(emailAndPass.password,getEmail[0].salt,getEmail[0].password);
                if(passVerify === true){
					detail.userId = getEmail[0]._id;
					detail.name = getEmail[0].name,
					detail.surname = getEmail[0].surname,
					detail.email = getEmail[0].email,
					detail.userLevel = getEmail[0].userLevel,
					detail.profilePic = getEmail[0].profilePic,
					detail.createdAt = getEmail[0].createdAt,
					detail.updatedAt = getEmail[0].updatedAt,
					detail.createDate = getEmail[0].createDate,
					detail.updateDate = getEmail[0].updateDate,
					detail.lastLogin = getEmail[0].lastLogin,
					detail.detailUser = getEmail[0].detailUser
					var dataObj = {
						userId : getEmail[0]._id,
						userLevel : getEmail[0].userLevel,
					};
					var secret = "asdj&*aafasfas85/*sadasd66++--.svj";
					var tokenOut = await jwt.sign(dataObj,secret,{expiresIn:"3h"});

					detail.token = tokenOut;
                    return {success:true,message:"login success.",obj:detail};
                }else{
                    return {success:false,message:"not found password.",obj:null};
                }
            }
        }
	}catch(e){
		console.log('\n ***',e);
        return {success:false,message:e,obj:null};
	}
}