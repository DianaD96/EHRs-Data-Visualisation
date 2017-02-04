var bodyParser = require("body-parser"); // Require Body parser module
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var app = require('express')(); // Require Express module
var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dms8kgrx7',
  api_key: '429963195267198',
  api_secret: 'xjlEFGK2oJCGKH38ZEbgn03mHUU'
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {


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
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials	", responseSettings.AccessControlAllowCredentials);
  res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
  res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
  res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});


var dataController = "test";
var dataController2 = "test";
var nrOfSwipes = "test";
var userRank = "test";
var neighbouringVaues = "test";



const SENDGRID_API_KEY = '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';
const MY_TEMPLATE_ID = '45b2e979-8c5a-4814-8bb0-81ce849b0ca3';

var sg = require('sendgrid')(SENDGRID_API_KEY);
const test = 'dsadsadas'

module.exports = function(app) {

  app.post('/sendEmail', function(request, response) {

    const var1 = JSON.stringify(nrOfSwipes.numberOfSwipes);
    const var2 = JSON.stringify(userRank.userRank);
    const var3 = JSON.stringify(request.body.link1);
    const var4 = JSON.stringify(request.body.link2);

    console.log("TEST:", request.body.link1);
    console.log("TEST:", request.body.link2);

    cloudinary.uploader.upload(request.body.link1, function(result) {
      var3 = JSON.stringify(result.secure_url);
      console.log(result.secure_url)
    });

    cloudinary.uploader.upload(request.body.link2, function(result) {
      var4 = JSON.stringify(result.secure_url);
      console.log(result.secure_url)
    });

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [{
          to: [{
            email: 'zcabdad@ucl.ac.uk',
          }, ],
          subject: 'Nuffield Health - Your Last Month Progress',
          substitutions: {
            "%name%": "John",
            "%swipes%": `${var1}`,
            "%rank%": `${var2}`,
            "%link1%": `${var3}`,
            "%link2%": `${var4}`
          },
        }, ],
        from: {
          email: 'NuffieldResearchGroup@nuffieldhealth.com'
        },
        template_id: MY_TEMPLATE_ID,
      },
    });

    //With callback
    sg.API(request, function(error, response) {
      if (error) {
        console.log('Error response received');
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

  });

  app.post('/getQueryJson', function(request, response) {
    if (response.statusCode == 200) {

      console.log("In routes.js TESTING......")
      console.log("This is your request: ", request.body);

      dataController = request.body;
      console.log("dataController1: ", dataController);
      response.send(request.body);
    } else {
      response.send(" Error code: " + response.statusCode);
    }
  });

  app.post('/sendToController', function(request, response) {
    console.log("dataController2: ", dataController);
    response.send(dataController);
  });

  app.post('/getQueryJson2', function(request, response) {
    if (response.statusCode == 200) {

      console.log("In routes.js TESTING......")
      console.log("This is your request: ", request.body);

      dataController2 = request.body;
      console.log(">dataController1: ", dataController2);
      response.send(request.body);
    } else {
      response.send(" Error code: " + response.statusCode);
    }
  });

  app.post('/sendToController2', function(request, response) {
    console.log(">dataController2: ", dataController2);
    response.send(dataController2);
  });

  app.post('/getNrOfSwipes', function(request, response) {
    if (response.statusCode == 200) {

      console.log("In routes.js TESTING......")
      console.log("This is your request: ", request.body);

      nrOfSwipes = request.body;
      console.log("nrOfSwipes: ", nrOfSwipes);
      response.send(request.body);
    } else {
      response.send(" Error code: " + response.statusCode);
    }
  });

  app.post('/sendNrOfSwipes', function(request, response) {
    console.log("nrOfSwipes: ", nrOfSwipes);
    response.send(nrOfSwipes);
  });

  app.post('/getUserRank', function(request, response) {
    if (response.statusCode == 200) {

      console.log("In routes.js TESTING......")
      console.log("This is your request: ", request.body);

      userRank = request.body;
      console.log("userRank: ", userRank);
      response.send(request.body);
    } else {
      response.send(" Error code: " + response.statusCode);
    }
  });

  app.post('/sendUserRank', function(request, response) {
    console.log("userRank: ", userRank);
    response.send(userRank);
  });

  app.post('/getNeighbouringValues', function(request, response) {
    if (response.statusCode == 200) {

      console.log("In routes.js TESTING......")
      console.log("This is your request: ", request.body);

      neighbouringVaues = request.body;
      console.log("neighbouringVaues: ", neighbouringVaues);
      response.send(request.body);
    } else {
      response.send(" Error code: " + response.statusCode);
    }
  });

  app.post('/sendNeighbouringVaues', function(request, response) {
    console.log("neighbouringVaues: ", neighbouringVaues);
    response.send(neighbouringVaues);
  });
};
