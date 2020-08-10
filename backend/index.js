const express = require('express');
const app = express();

const socketFunc = require('./socketFunc');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//mongomongosetup
var mongosetup = require('./mongo-setting');
mongosetup.setup(app);
// allow cors
var cors = require('cors');
app.use(cors());
// add file upload support
var http = require('http');
var initconf = require('./init.' + process.env.NODE_ENV + '.json');

var authen = require('./checkAuth');
app.use(authen.VerifyToken);

var createPattern = require('./modules/pattern/createPattern.module');
var editPattern = require('./modules/pattern/editPattern.module');
var getAllPattern = require('./modules/pattern/getAllPattert.module');
var getPatternById = require('./modules/pattern/getPatternById.module');
var deletePattern = require('./modules/pattern/deletePattern.module');
var createCanvas = require('./modules/canvas/createCanvas.module');
var addNoteInCanvas = require('./modules/canvas/addNoteInCanvas.module');
var getAllCanvas = require('./modules/canvas/getAllCanvas.module');
var getCanvasById = require('./modules/canvas/getCanvasById.module');
var deleteCanvas = require('./modules/canvas/deleteCanvas.module');
var editCanvas = require('./modules/canvas/editCanvas.module');
var editNoteInCanvas = require('./modules/canvas/editNoteInCanvas.module');
var deleteNoteInCanvas = require('./modules/canvas/deleteNoteInCanvas.module');
var getHistoryById = require('./modules/canvas/getCanvasHistoryById.module');
var invite = require('./modules/users/invite.module');
var checkEmailOutside = require('./modules/users/checkEmailOutside.module');
var login = require('./modules/users/login.module');
var checkInvite = require('./modules/canvas/checkInvite.module');
var editProfile = require('./modules/users/editProfile.module');
var getUserDetail = require('./modules/users/getUserDetail.module');

createPattern.initialize(app);
editPattern.initialize(app);
getAllPattern.initialize(app);
getPatternById.initialize(app);
deletePattern.initialize(app);
createCanvas.initialize(app);
addNoteInCanvas.initialize(app);
getAllCanvas.initialize(app);
getCanvasById.initialize(app);
deleteCanvas.initialize(app);
editCanvas.initialize(app);
editNoteInCanvas.initialize(app);
deleteNoteInCanvas.initialize(app);
getHistoryById.initialize(app);
invite.initialize(app);
checkEmailOutside.initialize(app);
login.initialize(app);
checkInvite.initialize(app);
editProfile.initialize(app);
getUserDetail.initialize(app);

var port = process.env.PORT || parseInt(initconf.port) || 3000;
if(process.env.NODE_ENV=='prod'){
	const httpsServer = http.createServer(app);
	const io = require('socket.io')(httpsServer);
	socketFunc.listHistory(io);
	httpsServer.listen(port, () => {
		console.log('[' + (new Date()).toString() + '] HTTPS activated ');
	});
}else {
	const httpServer = http.createServer(app);
	const io = require('socket.io')(httpServer);
	socketFunc.listHistory(io);
	httpServer.listen(port, () => {
		console.log('[' + (new Date()).toString() + '] HTTP port ' + port);
	});
}

app.get('/',function(req,res){
	res.status(200).json({success:true,data:'API canvas is work.',obj:null});
	return;
});