var isConn = function(){};
var http = require('http');
var request = require('request');
isConn.prototype.get=function(url,callback){
	request(url,function(err,res,body){
		if(!err&&res.statusCode == 200){
			callback(body,res.statusCode);
		}else{
			console.log('status='+res.statusCode);
			console.log('err');	
		}
	});
}
module.exports = new isConn();
