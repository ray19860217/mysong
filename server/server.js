// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http'); 
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引入配置文件
const config = require('./config'); 
const api = require('./api'); 
// 创建一个 express 实例
const app = express();

const requestData = {
    TransCode : '',
    OpenId : config.config.apiopenID,
    Body : '',
}

app.use('/api', (request, response, next) => { 
    //console.log(request.query);
    var url = config.config.apiurl;    
    requestData.TransCode = request.query.TransCode
    if (request.query.Body){
        var reqBodystr = decodeURIComponent (request.query.Body)
        requestData.Body = JSON.parse(reqBodystr)
    }
    console.log(requestData)
    api.httpRequst(url,requestData,response,Musiccallback);
}); 

const Musiccallback = function (response,callbackData){
    response.setHeader('Content-Type','text/javascript;charset=UTF-8');
    if (callbackData.ErrCode == 'OK' ){
        var songlist = JSON.stringify(callbackData.Body)
        response.send(songlist);
      } else {
        var prom = "错误码:" + callbackData.ErrCode + ",错误信息:" + callbackData.ErrMsg
        response.send(prom);
    }
}

app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});


const server = http.createServer(app);

// 启动 HTTP 服务
server.listen(config.config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.config.serverPort}`);