module.exports = function(app) {
	
	app.post('/getQueryJson', function(request, response) {
		if(response.statusCode == 200) { 

		  console.log("TESTING......")
		  console.log("This is your request: ", request.body);
		  console.log("\nMemberID_Hash: ", request.body.MemberID_Hash); 	 
		  console.log("\Date_Key_Month: ", request.body.Date_Key_Month); 	 

		  console.log("This is your request: ", JSON.stringify(request.body));
		  
		  response.send("it wooorks");
		}else{
		  response.send(" Error code: " + response.statusCode);
		}
	});
};