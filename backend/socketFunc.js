var getCanvasHistoryByIdDb = require('./db/canvas/getCanvasHistoryById.db');
var getCanvasByIdDb = require('./db/canvas/getCanvasById.db');
exports.listHistory = async function (io){
    try{
        io.on('connection',(socket)=>{
            socket.on('listCanvasHistory',async function(data){
                var result = await getCanvasHistoryByIdDb.getCanvasHistoryById(data);
                io.emit('getCanvasHistory',result);
            });

            socket.on('listCanvas',async function(data){
                var result = await getCanvasByIdDb.getCanvasById(data);
                io.emit('getlistCanvas',result);
            });
        });
    }catch(e){
        console.log('\n\n',e);
        return{success:false,data:'internal server.',obj:null};
    }
}