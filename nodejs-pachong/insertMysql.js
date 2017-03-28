var mysql = require('mysql');
exports.connmysql=function(name,author,scores){
	var conn = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'dh5300',
		database:'booksInDouban',
		port:3306
	});
	conn.connect();
	var querySQL = "insert into books(name,author,scores) values('"+name+"','"+author+"',"+scores+");";
	conn.query(querySQL,function(error,response){
	if(error) console.log(error);
	});
	conn.end();
}
