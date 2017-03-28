var https = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = 'https://book.douban.com/subject/10519369/';
var insertMysql = require('./insertMysql');

function fetchBook(x){
	startRequest(x);
}

function startRequest(x){
	https.get(x,function(res){
		var html = '';
		var title = '';
		res.setEncoding('utf-8');
		res.on('data',function(chunk){
			html+=chunk;
		});
		res.on('end',function(){
			var $ = cheerio.load(html);
			var books_item={
				title: $('h1 span').text().trim(),
				author:$('#info span a').text().trim(),
				scores:$('strong').html(),
				i:i=i+1,
			}
			if(books_item.scores==null||books_item.scores=="  "){
				insertMysql.connmysql(books_item.title,books_item.author,0.0);
			}else{
				insertMysql.connmysql(books_item.title,books_item.author,books_item.scores);
			}
			console.log(books_item);
			var ur='https://book.douban.com/subject/'+(1000000+i)+'/';
			if(i<=10000000){
				fetchBook(ur);
			}
		});
	}).on('error',function(err){
		console.log(err);
	});
}

fetchBook(url);
