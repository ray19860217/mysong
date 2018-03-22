
var request = require('request');

//调用
const httpRequst = function (url, requestData,response,callback) {
  request({
    url: url,
    method: "POST",
    json: true,
    body: requestData,
  }, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      console.log("-------接口调用成功，返回信息如下------");
      console.log(body);
      callback(response,body);
    } else { response.send ("接口调用连接失败，状态码" + res.statusCode) }
  });
} 
module.exports = {httpRequst}