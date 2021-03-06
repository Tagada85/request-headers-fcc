'use strict';

const express = require('express');
const http = require('http');

const app = express();

const port = process.env.PORT || 3000;

app.all('/api/whoami', function(req, res){
	let headers = req.headers;
	let ip = req.ip;
	let re = /:|f/gi;
	let cleanIp = ip.replace(re, '');
	let host = headers.host;
	let language = headers['accept-language'];
	let userAgent = headers['user-agent'];
	let usedLanguage = getLanguage(language);
	let software = getSoftware(userAgent);
	res.json({'ipadress' : cleanIp,
		'language' : usedLanguage,
		'software' : software});
	res.end();
});

app.all('*', function(req, res){
	res.redirect('/api/whoami');
});

app.listen(port);


function getLanguage(language){
	let splitString = language.split(',');
	return splitString[0];
}

function getSoftware(userAgent){
	let splitString = userAgent.split('(');
	let software = splitString[1].split(')');
	return software[0];

}