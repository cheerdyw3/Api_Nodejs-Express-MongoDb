var initconf = require('./init.' + process.env.NODE_ENV + '.json');
const mongoose = require('mongoose');
var url = 'mongodb://'+initconf.DATABASEUSERNAME+':'+initconf.DATABASEPASSWORD+'@'+initconf.DATABASEHOST+':'+initconf.DATABASEPORT+'/'+initconf.DATABASENAME;
const authSources = {
    useNewUrlParser: true,
    authSource:'admin'
};
exports.setup = function (app){
 mongoose.Promise = global.Promise;
 mongoose.connect(url,authSources).then(() => {
     console.log("Successfully connected to the database business canvas");    
 }).catch(err => {
     console.log('Could not connect to the database business canvas. Exiting now...\n'+err+JSON.stringify(err, undefined, 2));
     process.exit();
 });
}
