var jwt = require('jsonwebtoken');
var secret = "5x8s9t4j3/af-g8/g220v.fn1k_$5";
exports.secret = secret;
exports.VerifyToken = async (req, res, next) => {
    var token = req.get('Authorization');
    if(token == undefined){
        settingAuth(req.app, false, '', '');
        next();
        return;
    }

    if((token != undefined) && (token.length > 0) && (token.startsWith('Bearer '))){
    var realtoken = token.replace('Bearer ','');
    //jwt 
    
    var userObj = await jwt.verify(realtoken,secret,function(err,response){
        if(err != null){
            console.log(err);
            console.log('data: jwt expried.');
            return null;
        }else{
            console.log('data: ',response.userId);
            console.log('response: ',response);
            return response;
        }
    });
        if (userObj === null){
            settingAuth(req.app,false,'','');
        }else{
            settingAuth(req.app,true,"",userObj);
        }
    }else{
        settingAuth(req.app,false,'','');
    }
    next();
    return;
}

function settingAuth(app,isAuth,token,userObj){
    app.locals.authorize = isAuth;
    app.locals.token = token;
    app.locals.userObj = userObj;
    app.locals.userId = userObj.userId;
    return;
}