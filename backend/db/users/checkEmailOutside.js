var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
const { base64encode, base64decode } = require('nodejs-base64');
var md5 = require('md5');
const sgMail = require('@sendgrid/mail');
var randomstring = require("randomstring");
var jwt = require('jsonwebtoken');
var usersModel = require('../../model/users.model');
var checkAuth = require('../../checkAuth');

exports.checkEmailOutside = checkEmailOutside;

function CreateSalt(){
    return randomstring.generate(128);
}

async function hashPassword(password,salt){
	try{
		let text1 = password + '-' + salt
		let text1Md5 = await md5(text1);
		let text2 = salt + '-' + base64encode(password);
		let text2Md5 = await md5(text2);
		let finalText = await base64encode(md5(text1Md5 + salt + text2Md5));
		return finalText;
	}catch(e){
		console.log(e);
	}
}
async function checkEmailOutside(model){
	try{
		var newSalt = await CreateSalt();
		var pass = randomstring.generate(newSalt);
        var passwordHash = await hashPassword(pass,newSalt);
		var dateNow = Date.now();
		var checkEmail = await usersModel.find({email:model.email});
		if(checkEmail.length > 0){
            var objData = {userId:checkEmail[0]._id};
			var tokenAuth = await jwt.sign(objData,checkAuth.secret,{expiresIn:'1d'});
			return {success:true,message:"have user in system already",tokenAuth:tokenAuth};
        }else{
            var dataUser = new usersModel({
				titleName : model.titleName,
				name : model.name,
				surname : model.surname,
				email : model.email,
                password: passwordHash,
                salt : newSalt,
				userLevel :  0,
				telephoneNumber : model.telephoneNumber,
				verifyEmail : false,
				fromType : 'integreat',
				createDate : dateNow
			});
			var resultMentor = await dataUser.save();
			if(resultMentor._id === null){
				return {success:false,message:"add false.",obj:null};
			}else{
				var objData = {userId:resultMentor._id};
				var tokenAuth = await jwt.sign(objData,checkAuth.secret,{expiresIn:'1d'});
				return {success:true,message:"create account success.",tokenAuth:tokenAuth};
			}
        }
	}catch(e){
		console.log('\n ***',e);
        return {success:false,message:"internal server",obj:null};
    }
}

