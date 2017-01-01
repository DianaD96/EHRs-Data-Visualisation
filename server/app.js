var bodyParser = require("body-parser"); // Require Body parser module
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var app   = require('express')(); // Require Express module
var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.all('*', function(req, res,next) {


    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);	
    }
    else {
        next();
    }
});

app.get('/getQueryJson', function(request, response) {
		console.log ("I got here");
		if(response.statusCode == 200) { 

		  console.log("TESTING......")
		  console.log("This is your request: ", request.body); 	 

		  console.log("This is your request: ", JSON.stringify(request.body))
		  response.send("Query Received");
		}else{
		  response.send(" Error code: " + response.statusCode);
		}
	});


http.listen(9000,function(){
	console.log("Connected & Listen to port 9000");
});