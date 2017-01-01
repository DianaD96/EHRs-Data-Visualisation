/*var app   = require('express')(); // Require Express module
var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var mongo = require('mongoskin'); // Require mongoskin module
var db = mongo.db("mongodb://localhost:27017/members", {native_parser:true}); // Connection MongoDB book collection DB
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data

app.use(function(req,res,next){
  req.db = db;
  res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


app.post('/getQueryJson', function(request, response) {
		console.log ("I got here");
		if(response.statusCode == 200) { 

		  console.log("TESTING......")
		  console.log("This is your request: ", request.body); 	 

		  console.log("This is your request: ", JSON.stringify(request.body));
		}else{
		  response.send(" Error code: " + response.statusCode);
		}
	});
	
app.get('/membership',function(req,res){
	var data = {
		"Data":""
	};
	var db = req.db;
	db.collection('membership').find().toArray(function (err, items) {
	if(!!err){
		data["membership"] = "Error fetching data";
		res.json(data);
	}else{
		if(!!items && items.length != 0){
			data["error"] = 0;
			data["membership"] = items;
			res.json(data);
		}else{
			data["error"] = 1;
			data["membership"] = 'No books Found..';
			res.json(data);
		}
	}
	});
});

http.listen(9000,function(){
	console.log("Connected & Listen to port 9000");
});*/