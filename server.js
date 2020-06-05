// var pg = require('pg');
var async = require('async');
var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser');
var cors = require('cors')
var express = require('express'),
  app = express(),
  port = 7070;

var app = express(); 
// for parsing application/json
app.use(express.json()); 
// const { Pool, Client } = require('pg')

// exports.pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'db',
//   password: 'password',
//   port: 5432,
// })
app.use(cors()) 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

var routes = require('./api/routes/Routes'); //importing route

routes(app);
Wekin
app.listen(port, function(){
	console.log("API Run into http://localhost:"+port+"\n"); 
});