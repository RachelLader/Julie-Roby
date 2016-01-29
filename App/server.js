
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 4000;
var app = module.exports= express();

app.use(express.static(__dirname + '../../App/Client'));
app.use(express.static(__dirname + '../../node_modules'));
app.use(bodyParser.json());


app.listen(port);
console.log('Julie&Rob server is now running at port' + port);