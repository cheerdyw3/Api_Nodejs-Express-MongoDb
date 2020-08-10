var ObjectId = require('mongoose').Types.ObjectId;
var canvasModel = require('../../model/canvas.model');
var usersModel = require('../../model/users.model');
var initconf = require('../../init.' + process.env.NODE_ENV + '.json');
const sgMail = require('@sendgrid/mail');
var jwt = require('jsonwebtoken');
const { base64encode, base64decode } = require('nodejs-base64');
var md5 = require('md5');
var randomstring = require("randomstring");
var secretEmail = "oioaj8/ca1-*6a2br5hkmi82da_8e";
exports.invite = invite;
exports.secretEmail = secretEmail;
function createSalt(){
    return randomstring.generate(128);
}

async function hashPassword(password, salt){
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

async function invite(data){
    try{
        var userId = '';
        var newSalt = await createSalt();
        var pass = randomstring.generate(newSalt);
        var passwordHash = await hashPassword(pass,newSalt);
        var dateNow = Date.now();
        var checkEmail = await usersModel.find({email:data.email});
        if(checkEmail.length>0){
            console.log("userId: ",checkEmail[0]._id);
            console.log("role: ",data.role);
            userId = checkEmail[0]._id;
            var getRole = await canvasModel.find({$and:[{_id:ObjectId(data.canvasId)},{allowanceUser:{$elemMatch:{userId:ObjectId(checkEmail[0]._id),role:data.role}}}]});
            console.log('getRole: ',getRole.length);
            if(getRole.length === 0){
                var addRole = await canvasModel.updateOne({'_id':ObjectId(data.canvasId)},
                {$push:{
                        allowanceUser:{
                            userId:checkEmail[0]._id,
                            role:data.role
                        }
                }});
                console.log('data: addRole');
            }
        }else{
            console.log('data: create account addRole');
            var objAccount = await new usersModel({
                titleName : "",
				name : "",
				surname : "",
				email : data.email,
                password: passwordHash,
                salt : newSalt,
				userLevel : 0,
				telephoneNumber : "",
                fromType:"invite",
				createDate : dateNow
            }).save();
                userId = objAccount._id;
                var addRole = await canvasModel.updateOne({'_id':ObjectId(data.canvasId)},
                {$push:{
                        allowanceUser:{
                            userId:objAccount._id,
                            role:data.role
                        }
                }});
        }
        var dataObj = {
            userId : userId,
            canvasId : data.canvasId,
            role : data.role,
        };
        
        var token = await jwt.sign(dataObj,secretEmail);
        var linkVerify = initconf.baseUrlFrontend+'auth/invite/'+token;
        console.log(linkVerify)
        sgMail.setApiKey('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');
        const msg = {
                        to: data.email,
                        from: 'invite join canvas  <canvasproduct@gmail.com>',
                        subject: 'invite join canvas',
                        text: 'invite join canvas '+linkVerify+'หากท่านกดปุ่มด้านบนไม่ได้: '+linkVerify+'...  บริษัท แอลเอฟฟินเทค จำกัด (สำนักงานใหญ่)<br>ที่อยู่เลขที่ 181/276 หมู่ที่ 3 ตำบลช้างเผือก อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50300<br>โทร (+66) 052-005-402 อีเมล info@integreat.in.th  อีเมลนี้ใช้ในการส่งออกเท่านั้นกรุณาไม่ตอบกลับ คุณสามารถเพิ่ม noreply@app.integreat.in.th ไปยังรายชื่อผู้ติดต่อ เพื่อไม่ให้อีเมลจากเราไปอยู่ในกล่องสแปม',
                        html: '<html><head><title>inteGreat Mail</title></head><body><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=\"center\"><table style=\"width:100%;margin:0;padding:0;text-align:center;\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"padding:25px 0;text-align:center;\"><img src=\"https://images.vrt.be/canvas_2015_400x/2015/08/18/62bd85f3-45ab-11e5-bddf-00163edf48dd.jpg\" alt=\"TedFund Logo\" style=\"max-width:400px;border:0;\"></td></tr><tr><td style=\"width:100%;margin:0;padding: 0;\" width=\"100%\"><table style=\" width: 570px;margin: 0 auto;padding:0;border-radius:8px;border:1px solid #E7EAEC;background-color:#fefefe;\" align=\"center\" width=\"570\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"padding:35px;\"><h2>เข้าร่วม canvas</h2><table style=\"width:100%;margin:30px auto;padding:0;text-align:center;\" align=\"center\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=\"center\"><div><a href=\"'+linkVerify+'\"style=\"display:inline-block;width: 200px;background-color:#414EF9;border-radius:3px;color:#ffffff;font-size:15px;line-height:45px;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide: all;background-color:#6d8df3;\">into</a></div></td></tr></table><table style=\"margin-top:25px;padding-top:25px;border-top:1px solid #E7EAEC;\"><tr><td><p style=\"font-size: 12px;\">หากท่านกดปุ่มด้านบนไม่ได้ สามารถใช้ลิงค์ด้านล่างนี้เพื่อเข้าสู่ระบบ</p><p style=\"font-size: 12px;\"><a href=\"'+linkVerify+'\">'+linkVerify.substring(8, 100)+'...</a></p></td></tr></table></td></tr></table></td></tr><tr><td><table style=\"width:570px;margin:0 auto;padding:0;text-align:center;\" align=\"center\" width=\"570\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"padding:35px\"><p style=\"font-size:12px;text-align:center;\">บริษัท แอลเอฟฟินเทค จำกัด (สำนักงานใหญ่)<br>ที่อยู่เลขที่ 181/276 หมู่ที่ 3 ตำบลช้างเผือก อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50300<br>โทร (+66) 052-005-402 อีเมล info@integreat.in.th</p><p style=\"font-size:10px;text-align:center;\">อีเมลนี้ใช้ในการส่งออกเท่านั้นกรุณาไม่ตอบกลับ คุณสามารถเพิ่ม noreply@app.integreat.in.th ไปยังรายชื่อผู้ติดต่อ เพื่อไม่ให้อีเมลจากเราไปอยู่ในกล่องสแปม</p></td></tr></table></td></tr></table></td></tr></table></body></html>'
        };
        var send = await sgMail.send(msg);
        return {success:true,message:"send mail success.",obj:''};
    }catch(e){
        console.log('\n ***',e);
        var err = e.toString();
        return {success:false,message:'internal server',err,obj:''};
    }
}