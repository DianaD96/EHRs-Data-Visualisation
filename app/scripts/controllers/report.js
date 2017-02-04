var lineNr = 0;


// Nodejs/Express Server Paths
var getNrOfSwipes = 'http://localhost:3000/getNrOfSwipes';
var findUserRank = 'http://localhost:3000/findUserRank';
var monthlyStatisticsLeast = 'http://localhost:3000/monthlyStatisticsLeast';
var monthlyStatisticsTop = 'http://localhost:3000/monthlyStatisticsTop'
var getNeighbouringValues = 'http://localhost:3000/getNeighbouringValues';
var getUserRank = 'http://localhost:3000/findUserRank';

angular.module('yapp').controller('ReportCtrl', function($scope, $http, $filter, NgTableParams) {

  $scope.myvalue = false;

  $scope.tableParams = createUsingFullOptions();

  function createUsingFullOptions() {
    var initialParams = {
      page: 1,
      count: 5 // initial page size

    };
    var initialSettings = {
      // page size buttons (right set of buttons in demo)
      counts: [],
      // determines the pager buttons (left set of buttons in demo)
      paginationMaxBlocks: 13,
      paginationMinBlocks: 2,
      dataset: $scope.data
    };
    return new NgTableParams(initialParams, initialSettings);
  }

  $http.get('https://uclactive.aidbox.io/fhir/Patient').
  then(function(response) {
    $scope.getCSV();
    //searching parameters
    $scope.sortType = 'first_name'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.searchFish = ''; // set the default search/filter term

    //quering the data
    $scope.patient = response.data.entry;
  });

  $scope.dataResponse = "";

  $scope.sendEmail = function() {
    $http({
      method: "POST",
      url: "http://localhost:9000/sendEmail",
      data: {
        link1: $scope.link1,
        link2: $scope.link2
      }
    }).then((response) => {
      console.log("responde.data: ", response.data);
    }).catch((err) => {
      //if error occurs
      console.log('err', err.stack);
    });
  };

  // Send Query Data to NodeJs
  $scope.query = function() {
    console.log("I am hereee");
    var month = ("0" + ($scope.dt.getMonth() + 1)).slice(-2);
    var date = $scope.dt.getFullYear() + "" + month;
    var queryData = JSON.stringify({
      MemberID_Hash: $scope.memberNo,
      Date_Key_Month: date
    });
    console.log("data: ", queryData);


    getFirstGraphQuery(queryData, monthlyStatisticsLeast);
    getSecondGraphQuery(queryData, monthlyStatisticsTop);
    getNrOfSwipesQuery(queryData, getNrOfSwipes);
    getUserRankQuery(queryData, getUserRank);
    //getNeighbouringValuesQuery(queryData, getNeighbouringValues);
  };

  $scope.show = function() {
    $scope.myvalue = true;
    getFirstGraphShow();
    getSecondGraphShow();
    getNrOfSwipesGraph();
    getUserRankGraph();
    //getNeighbouringValuesGraph();
  };

  function getFirstGraphQuery(queryData, queryUrl) {
    var promise = $http({ //send query to node/express server
      method: 'POST',
      url: queryUrl,
      data: queryData,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(() => { //read backend response
      console.log("11111111");
    });
  }

  $scope.gymSwipes_json = new Array();

  function getFirstGraphShow() {
    $http({
      method: "POST",
      url: "http://localhost:9000/sendToController"
    }).then((response) => {
      console.log("responde.data: ", response.data);
      $scope.dataResponse = response.data;
      console.log("1st graph", $scope.dataResponse);

      for (i = 0; i < $scope.dataResponse.length; i++) {
        var aux = [$scope.dataResponse[i].nrOfGymSwipes, $scope.dataResponse[i].nrOfMembers];
        $scope.gymSwipes_json.push(aux);
      }
      console.log("JSON: ", $scope.gymSwipes_json);
      showGraph1($scope.gymSwipes_json);

    }).catch((err) => {
      //if error occurs
      console.log('err', err.stack);
    });
  }

  function getSecondGraphQuery(queryData, queryUrl) {
    var promise = $http({ //send query to node/express server
      method: 'POST',
      url: queryUrl,
      data: queryData,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(() => { //read backend response
      console.log("2222222222222");
    });
  }

  $scope.gymSwipes2_json = new Array();

  function getSecondGraphShow() {
    $http({
      method: "POST",
      url: "http://localhost:9000/sendToController2"
    }).then((response) => {
      console.log("responde.data: ", response.data);
      $scope.dataResponse2 = response.data;

      for (i = 0; i < $scope.dataResponse2.length; i++) {
        var aux = [$scope.dataResponse2[i].nrOfGymSwipes, $scope.dataResponse2[i].nrOfMembers];
        $scope.gymSwipes2_json.push(aux);
      }
      console.log("JSON: ", $scope.gymSwipes2_json);
      showGraph2($scope.gymSwipes2_json);

      console.log("2nd graph", $scope.dataResponse2);
      $scope.data2 = [{
        key: "Cumulative Return",
        values: $scope.dataResponse2
      }]

    }).catch((err) => {
      //if error occurs
      console.log('err', err.stack);
    });
  }

  function getNrOfSwipesQuery(queryData, queryUrl) {
    var promise = $http({ //send query to node/express server
      method: 'POST',
      url: queryUrl,
      data: queryData,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(() => { //read backend response
      console.log("33333");
    });
  }

  function getNrOfSwipesGraph() {
    $http({
      method: "POST",
      url: "http://localhost:9000/sendNrOfSwipes"
    }).then((response) => {
      console.log("responde.data: ", response.data);
      $scope.nrOfSwipes = response.data.numberOfSwipes;
      console.log("nrOfSwipes: ", $scope.nrOfSwipes);
    }).catch((err) => {
      //if error occurs
      console.log('err', err.stack);
    });
  }

  function getUserRankQuery(queryData, queryUrl) {
    var promise = $http({ //send query to node/express server
      method: 'POST',
      url: queryUrl,
      data: queryData,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(() => { //read backend response
      console.log("4444");
    });
  }

  function getUserRankGraph() {
    $http({
      method: "POST",
      url: "http://localhost:9000/sendUserRank"
    }).then((response) => {
      console.log("response.data: ", response.data);
      $scope.userRank = response.data.userRank;
      console.log("userRank: ", $scope.userRank);
    }).catch((err) => {
      //if error occurs
      console.log('err', err.stack);
    });
  }

  function getNeighbouringValuesQuery(queryData, queryUrl) {
    var promise = $http({ //send query to node/express server
      method: 'POST',
      url: queryUrl,
      data: queryData,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(() => { //read backend response
      console.log("5555");
    });
  }

  function getNeighbouringValuesGraph() {
    $http({
      method: "POST",
      url: "http://localhost:9000/sendNeighbouringVaues"
    }).then((response) => {
      console.log("response.data: ", response.data);
      $scope.dataResponse3 = response.data;
      console.log("neighbouringValues: ", $scope.data3);
    }).catch((err) => {
      console.log('err', err.stack);
    });
  }

  function showGraph1(data) {
    $chartConfig = {
      chart: {
        type: 'column',
        renderTo: 'container',
        zoomType: 'x'
      },
      title: {
        text: 'UCL-Active - Least 10 active members'
      },
      subtitle: {
        text: 'The graph displays how many members have the least number of swipes in the given month'
      },
      xAxis: {
        type: 'category',
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Members'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">Number of Swipes: {point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
          '<td style="padding:0"><b>{point.y:.1f} members </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Number of Gym Swipes',
        data: data
      }]
    };

    $(function() {
      Highcharts.chart('container', $chartConfig);
    });
  }

  function showGraph2(data) {
    $chartConfig2 = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'UCL-Active - Top 10 active members'
      },
      subtitle: {
        text: 'The graph displays how many members have the most number of swipes in the given month.'
      },
      xAxis: {
        type: 'category',
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Members'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">Number of Swipes: {point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
          '<td style="padding:0"><b>{point.y:.1f} members </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Number of Gym Swipes',
        data: data
      }]
    };

    $(function() {
      Highcharts.chart('container2', $chartConfig2);
    });
  }

  $scope.save_btn = function() {
    save_chart($('#container').highcharts(), 'chart');
    save_chart2($('#container2').highcharts(), 'chart');
  };

  EXPORT_WIDTH = 1000;

  $scope.link1 = '';
  $scope.link2 = '';

  function save_chart(chart, filename) {
    var data = {
      options: JSON.stringify($chartConfig),
      filename: filename,
      type: 'image/png',
      async: true
    };

    var exportUrl = 'http://export.highcharts.com/';
    $.post(exportUrl, data, function(data) {
        url = exportUrl + data;
        console.log('inside: ', url);
        $scope.link1 = url;
        console.log("inside2: ", $scope.link1);
        //window.open(url);
      })
      .done(function() {
        console.log("after: ", $scope.link1);
      });
  }

  function save_chart2(chart, filename) {
    var data = {
      options: JSON.stringify($chartConfig2),
      filename: filename,
      type: 'image/png',
      async: true
    };

    var exportUrl = 'http://export.highcharts.com/';
    $.post(exportUrl, data, function(data) {
        url = exportUrl + data;
        console.log('inside: ', url);
        $scope.link2 = url;
        console.log("inside2: ", $scope.link2);
        //window.open(url);
      })
      .done(function() {
        console.log("after: ", $scope.link2);
      });
  }


  // Date Picker Function
  $scope.popup1 = {
    opened: false
  };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.formats = ['MMMM', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'd!.M!.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
    $scope.memberNo = null;
    $scope.mytime = null;

  };

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
  };

  $scope.toggleMin();

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  // This will parse a delimited string into an array of
  // arrays. The default delimiter is the comma, but this
  // can be overridden in the second argument.
  function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [
      []
    ];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);
      }
      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        var strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"), "\"");
      } else {
        // We found a non-quoted value.
        var strMatchedValue = arrMatches[3];
      }
      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
  }

  //CSV to JSON
  function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        objArray[i - 1][key] = array[i][k]
      }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
  }


  $scope.getCSV = function() {
    // http get request to read CSV file content
    $http.get('/csv/test2.csv').success($scope.startParsing);
  };
  $scope.startParsing = function(allText) {
    $scope.jsonData = [{
      "key": "Cumulative Return",
      "values": JSON.parse(CSV2JSON(allText))
    }];
  }

  //This os for for table display
  //reading CSV
  $scope.readCSV = function() {
    // http get request to read CSV file content
    $http.get('/csv/test2.csv').success($scope.processData);


    //Converter Class
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});

    //end_parsed will be emitted once parsing finished
    converter.on("end_parsed", function(jsonArray) {
      console.log(jsonArray); //here is your result jsonarray
    });

    //read from file
    require("fs").createReadStream("/csv/vGymSwipeGM.csv").pipe(converter);
  };

  //showing the table
  $scope.processData = function(allText) {
    // split content based on new line
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      var data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        var tarr = [];
        for (var j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        lines.push(tarr);
      }
    }
    $scope.data = lines;
    $scope.jsonData = CSV2JSON(allText);
  };

  /*  d3.csv("/csv/test2.csv",function(err,data){

        //get each key of the data that is not date
        //these will be our key in the key/value pair
        //the values x and y will be month and the value
        var dataToPlot = Object.keys(data[0]).filter(function(k){return k!="DayofSwipeDate"})
          .map(function(k){
            return {"key":k,"values":data.map(function(d){
             return {
              var timeParser = d3.time.format("%I%p");
              var time = new Date(timeParser.parse(d.HourName));
              var hour = time.getHours();
               //let's make this a real date
               "x":d3.time.format('%d-%m-%y')(new Date(d.DayofSwipeDate)),
               "y":d3.time.format("%I%p").parse(d.HourName)
             }
            })}
          })

          nv.addGraph(function() {
          var chart = nv.models.multiBarChart()
            .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
            .rotateLabels(0)      //Angle to rotate x-axis labels.
            .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1)    //Distance between each group of bars.
          ;

          chart.xAxis
              .tickFormat(d3.time.format('%d-%b-%Y'));

          chart.yAxis
              .tickFormat(d3.time.format('%H%p'));

          d3.select('#chart1 svg')
              .datum(dataToPlot)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
        })
  */

});
