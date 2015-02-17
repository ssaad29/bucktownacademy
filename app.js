require('newrelic');
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var HashMap = require('hashmap').HashMap;
    nconf = require('nconf'),
    http = require('http'),
    path = require('path'),
    //mysql = require('mysql'),
    extdirect = require('extdirect');
	var fs         = require('fs');
	var mysql = require('mysql');
	var crypto = require('crypto');
	var nodemailer = require("nodemailer");
	var emailTemplates = require('email-templates');
	var templatesDir   = path.join(__dirname, 'templates');

	
nconf.env().file({ file: 'config.json'});  
  
var session = require('express-session')
      , RedisStore = require('connect-redis')(session);


	var nodetime   =require('nodetime').profile({
    accountKey: '6944e86a8a6ad8503fa92e45c800503bab3480b4', 
    appName: 'Node.js Application'
  });

var ServerConfig = nconf.get("ServerConfig"),
    MySQLConfig = nconf.get("MySQLConfig"),
    ExtDirectConfig = nconf.get("ExtDirectLocalConfig"),
    RedisConfig = nconf.get("RedisConfig"),
    LocalRedisConfig = nconf.get("LocalRedisConfig"),
	EmailConfig = nconf.get("EmailConfig");
	


  

var env = ServerConfig.env;
console.log("environment IS!!!!" + env);

var isHeroku = false;

if (env==="production" || env==="test" || env==="ymca" || env==="prod") {
	isHeroku = true;
}

if (env==="test" || env==="localtest") {
	MySQLConfig = nconf.get("TestMySQLConfig");
}
  
if (env==="production") {
		console.log("IS PROD ");
		ExtDirectConfig = nconf.get("ExtDirectProdConfig");
	} else if (env==="test") {
	console.log("IS TEST ");
		 ExtDirectConfig = nconf.get("ExtDirectTestConfig");
		 MySQLConfig = nconf.get("TestMySQLConfig");
	} else if (env==="ymca") {
	console.log("IS YMCA ");
		ExtDirectConfig = nconf.get("ExtDirectYMCAConfig");
	} else if (env==="localprod") {
	console.log("IS LOCALPROD ");
		ExtDirectConfig = nconf.get("ExtDirectLocalProdConfig");
	} else if (env==="localtest") {
		console.log("IS LOCALTEST ");
		ExtDirectConfig = nconf.get("ExtDirectLocalConfig");
		 MySQLConfig = nconf.get("TestMySQLConfig");
	} 

var server = ExtDirectConfig.server;
var port =  process.env.PORT || ExtDirectConfig.port;

//if (env==="local") {
//	port = process.env.PORT || port
//}
console.log("PRINTING CONFIG ");
console.log("server " + server);
console.log("port " + port);
console.log("host " + MySQLConfig.hostname);
console.log("user " + MySQLConfig.user);
console.log("password " + MySQLConfig.password);
console.log("database " + MySQLConfig.db);
var app = express();

//var session = require('express-session');
//var SessionStore = new RedisStore({ host: server, port: 6379, client: redis });
//var SessionStore = require('express-mysql-session')

var options = {
    host: LocalRedisConfig.hostname,
    port: LocalRedisConfig.port,
}
	var redisStore = null;
	
if (isHeroku) {
	console.log("On Heroku");
	var redis = require('redis');
	console.log("redis " + redis);
	var url = require('url');
	console.log("url " + url);
	var redisURL = url.parse(process.env.REDISCLOUD_URL);
	var redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
	redisClient.auth(redisURL.auth.split(":")[1]);
    //redisClient.set('Salma', 'Aman');
	//redisClient.get('Salma', function (err, reply) {
    //console.log(reply.toString()); // Will print `bar`
	//});
		var options = {
    		client: redisClient
		}
		redisStore = new RedisStore(options);
	} else {
		console.log("On LOCAL " + RedisConfig.hostname + ":" + RedisConfig.port);
		
		redisStore = new RedisStore(options);
	}

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    console.log("Signing up for sessions ");
	app.use(session({ store: redisStore, secret: 'session_cookie_secret' }));
	console.log("SIGNED up for sessions ");
	app.set('port', port);
    app.set('server', server);
    app.use(express.logger(ServerConfig.logger));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    if(ServerConfig.enableCompression){
        app.use(express.compress()); //Performance - we tell express to use Gzip compression
    }
    app.use(express.static(path.join(__dirname, ServerConfig.webRoot)));
});






//GET method returns API
app.get(ExtDirectConfig.apiPath, function(request, response) {		
//console.log("GET REQUEST on apiPath " + request.url);
    try{
        var api = extdirect.getAPI(ExtDirectConfig);
        response.writeHead(200, {'Content-Type': 'application/json'});
       // console.log("API is " + api);
        response.end(api);
    }catch(e){
    	console.log("Exception while writing API " + e);
    }
});

// Ignoring any GET requests on class path
app.get(ExtDirectConfig.classPath, function(request, response) {
    try{
	//console.log("GET REQUEST on classpath " + request.url);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({success:false, msg:'Unsupported method. Use POST instead.'}));
    }catch(e){
    	console.log("Exception GET REQUEST on classpath " + e);
    }
});

// POST request process route and calls class
app.post(ExtDirectConfig.classPath, function(request, response) {
try {
console.log("POST REQUEST " + request.url);
var sid = request.sessionID;
console.log("SID!!!!" + sid);
//console.log("extdirect " + extdirect);
//console.log("request" +request);
//console.log("response" +response);
//console.log("ExtDirectConfig" +ExtDirectConfig);
    var result = extdirect.processRoute(request, response, ExtDirectConfig);
 //   console.log("extdirect.processRout result " + result);
    } catch (err) {
    // handle the error safely
    console.log("EXT DIRECT CONNECTION error " + err);
}
});

var getCleanValue = function(value) {
	if (value === null || value === undefined) {
		return "";
	}
	
	return value;
};

var isValidValue = function(value) {
	if (value === null || value === undefined || value.length < 1) {
		return false;
	}
	
	return true;
};



var isValidToken = function(clientToken,serverToken) {
	if(ServerConfig.enableSessions) {
			console.log("clientToken " + clientToken);
			console.log("serverToken " + serverToken);
        	if (clientToken!=serverToken) {
        		return false;
        	}
        }
	return true;
};

getDatesArray = function(start_date_range,end_date_range){
	
	var startDate = new Date(start_date_range);
	var endDate = new Date(end_date_range);
	var startDateDayMonthYear = startDate.getMonth().toString() + startDate.getDate().toString() + startDate.getFullYear().toString();
	console.log("startDateDayMonthYear " + startDateDayMonthYear);
	var endDateDayMonthYear = endDate.getMonth().toString() + endDate.getDate().toString() + endDate.getFullYear().toString();
	console.log("endDateDayMonthYear " + endDateDayMonthYear);
	
	var results = [];
	console.log("startDate " + startDate);
	var previousDate = startDate;
	//results[0] = (startDate.getMonth() + 1) + "/" + startDate.getDate();
	if (startDateDayMonthYear===endDateDayMonthYear) {
		var theDate = new Date(previousDate);
		results[index]=(theDate.getMonth() + 1) + "/" + theDate.getDate();
	} else {
		//console.log("More than one day!");
		var currDateDayMonthYear = "";
	
		var index = 0;
			while (currDateDayMonthYear != endDateDayMonthYear) {	
				
				var currDate = new Date(previousDate);
				//console.log("currDate at start " + currDate);
				currDate.setDate(currDate.getDate() + 1);
				//console.log("Moved forward one day " + currDate);
				var currDateDayMonthYear = currDate.getMonth().toString() + currDate.getDate().toString() + currDate.getFullYear().toString();
				console.log("currDateDayMonthYear " + currDateDayMonthYear);
				//console.log("index " + index);
				previousDate=currDate;
				results[index]=(currDate.getMonth() + 1) + "/" + currDate.getDate();
				index++;
				//console.log("storing " + currDate + " at " + index);
				//console.log("endDateDayMonthYear " + endDateDayMonthYear);
				//console.log("currDateDayMonthYear " + currDateDayMonthYear);
			}
			var theDate = new Date(endDate);
			theDate.setDate(theDate.getDate() + 1);
			results[index]=(theDate.getMonth() + 1) + "/" + theDate.getDate();
		}
	return results;
};

handleDBError = function(ex){
	console.log("handleDBError called " + ex);
};

getConnection = function(){
	console.log("GETTING THE CONN ");
	var newConn = null;
	
	
	try {
		newConn = mysql.createConnection({
  		host     : MySQLConfig.hostname,
  		user     : MySQLConfig.user,
  		password : MySQLConfig.password,
  		database : MySQLConfig.db,
		});
		console.log("Created new connection... " + newConn);
		newConn.connect();
		console.log("Connected ");
		} catch (ex) {
			console.log("getConnection has ERROR " + err);
    		handleDBError(ex);
  		}
  		
  		newConn.connect(function(err) {
  			console.log(err.code); // 'ECONNREFUSED'
  			console.log(err.fatal); // true
		});
		
  		return newConn
};

var simpleQuery = function(queryString, callback){
	var connection = null;
	
	if(ServerConfig.debug) {
			console.log("*****SIMPLE QUERY *******");
			console.log(queryString);
		}

  
	try {
		connection = getConnection();
  		connection.query( queryString, function(err, rows) {
    		console.log("Recieved reply for " + queryString);
    		console.log(JSON.stringify(rows) + " +++++++++DONE +++++++");
    		callback(rows);
    		connection.end();
	});
	} catch (err) {
		console.log("simpleQuery has ERROR " + err);
		handleDBError();
		if (connection!=null) {
			connection.end();
		}
		
	}
};   
        	
var queryWithParams = function(queryString,params,callback,shouldCommit){
	var connection = null;
	
	  	if(ServerConfig.debug) {
			console.log("*****PARAMS QUERY ******* " + queryString);
			console.log(JSON.stringify(params));
			console.log(queryString);
		}
		
		
	try {
		connection = getConnection();
  		connection.query(queryString, params,function(err, rows, fields) {
    		// And done with the connection.
    		if(ServerConfig.debug) {
        		console.log("Result for " + queryString + " with params " + params + " IS: " + JSON.stringify(rows));
        		console.log("ERROR recorded " + err);
        	}
        	if (callback!=null) {
            		callback(rows);
            }
        	if (shouldCommit) {
        	connection.query("commit", function(err, rows, fields) {
            
            	if(ServerConfig.debug) {
                	console.log("Recieved reply for " + queryString);
            		console.log(JSON.stringify(rows) + " +++++++++DONE+++++++++");
            		}
        	});
        } 
        connection.end();
  		});
  		} catch (err) {
  			console.log("queryWithParams has ERROR " + err);
			handleDBError();
			if (connection!=null) {
				connection.end();
			}
		}
};       

//if you don't want to use an id from an insert then send in -1 for the id index
var nestedQueryWithParams = function(queryString1,params1,queryString2,params2,callback,indexToInsertIdInParams2){
	console.log("nestedQueryWithParams:queryString1 " + queryString1);
	console.log("nestedQueryWithParams:params1 " + params1);
	console.log("nestedQueryWithParams:queryString2 " + queryString2);
	console.log("nestedQueryWithParams:params2 " + params2);
	console.log("nestedQueryWithParams:callback " + callback);
	console.log("nestedQueryWithParams:indexToInsertIdInParams2 " + indexToInsertIdInParams2);
	
	var connection = null;
	
  	if(ServerConfig.debug) {
    				console.log("Params 1" + JSON.stringify(params1));
					console.log("query 1 " + queryString1);
        			if (queryString2) {
						console.log("queryString2" + queryString2);
						console.log("params2" + JSON.stringify(params2));
					}
     }
  	
		
	try {
		connection = getConnection();
		if(ServerConfig.debug) {
			console.log("*****NESTED QUERY ******* " + queryString1);
		}
		
  		connection.query(queryString1, params1,function(err, info) {

  				console.log("Recieved reply for " + queryString1);
    			
        	
        	if (queryString2) {
        		
        		if (indexToInsertIdInParams2 && indexToInsertIdInParams2!=-1) {
        			var index = parseInt(indexToInsertIdInParams2)
        			console.log("index " + index);
        			var id = info.insertId;
        			console.log("id " + id);
        			params2[index] = id;
        		}
        		console.log("Params 2" + JSON.stringify(params2));
				console.log("query 2 " + queryString2);
        		connection.query(queryString2, params2,function(err, rows, fields) {
            	
            	if(ServerConfig.debug) {
                	console.log("Recieved reply for " + queryString2);
            		console.log(JSON.stringify(rows) + " +++++++++DONE+++++++++");
            		}
            	//ST2.1 List / Dataview response
            	callback(rows);
            	connection.end();
        	});
        } else {
        	callback(rows);
            connection.end();
        }
  		});
  		} catch (err) {
  			console.log("nestedQueryWithParams has ERROR " + err);
			handleDBError();
			if (connection!=null) {
				connection.end();
			}
		}
};  

//if you don't want to use an id from an insert then send in -1 for the id index
var nestedQueriesUptoFour = function(queryString1,queryString2,queryString3,queryString4,params1,params2,params3,params4,indexToInsertIdInParams2,indexToInsertIdInParams3,indexToInsertIdInParams4,callback)
{
	var connection = null;
	
	if(ServerConfig.debug) {
		console.log("*****NESTED QUERY *******");
		console.log("queryString1" + queryString1);
		console.log("params1" + JSON.stringify(params1));
		if (queryString2) {
			console.log("queryString2" + queryString2);
			console.log("params2" + JSON.stringify(params2));
		}
		if (queryString3) {
			console.log("queryString3" + queryString3);
			console.log("params3" + JSON.stringify(params3));
		}
		if (queryString4) {
			console.log("queryString4" + queryString4);
			console.log("params4" + JSON.stringify(params4));
			}
	}
				
	
  	
		try {
			connection = getConnection();
  			connection.query(queryString1, params1,function(err, info) {
    		if(ServerConfig.debug) {
        		console.log(JSON.stringify(info));
        	}
        	
        	if (queryString2) {
        		console.log("indexToInsertIdInParams2 " + indexToInsertIdInParams2);
        		if (indexToInsertIdInParams2!=-1) {
        			var index = parseInt(indexToInsertIdInParams2)
        			console.log("index for 2 " + index);
        			var id = info.insertId;
        			console.log("id for 2 " + id);
        			params2[index] = id;
        		}
        		connection.query(queryString2, params2,function(err, rows, fields) {
            	
            	if(ServerConfig.debug) {
                	console.log("Recieved reply for " + queryString2);
            		console.log(JSON.stringify(rows) + " +++++++++DONE+++++++++");
            	}
        			if (queryString3) {
        				if (indexToInsertIdInParams3!=-1) {
        					var index = parseInt(indexToInsertIdInParams3)
        					var id = info.insertId;
        					params3[index] = id;
        				}
        				connection.query(queryString3, params3,function(err, rows, fields) {
            			
            			if(ServerConfig.debug) {
                			console.log("Recieved reply for " + queryString3);
            				console.log(JSON.stringify(rows) + " +++++++++DONE+++++++++");
            			}


        				if (queryString4) {
        					
        					if (indexToInsertIdInParams4!=-1) {
        						var index = parseInt(indexToInsertIdInParams4)
        						var id = info.insertId;
        						params4[index] = id;
        					}
        					connection.query(queryString4, params4,function(err, rows, fields) {
            				if (err) throw err;
            				if(ServerConfig.debug) {
                				console.log("Recieved reply for " + queryString4);
            					console.log(JSON.stringify(rows) + " +++++++++DONE+++++++++");
            				}
            				//ST2.1 List / Dataview response
            				callback(rows);
            				connection.end();
        					});
        					} else {
        						callback(rows);
        						connection.end();
        				}
        			});
        			} else {
        				callback(rows);
        				connection.end();
        			}
        	});
        	} else {
        		callback(rows);
        		connection.end();
        	}
  		});
  		} catch (err) {
  			console.log("nestedQueriesUptoFour has ERROR " + err);
			handleDBError();
			if (connection!=null) {
				connection.end();
			}
		}
};

getRanges = function(toSplit,maxInRange){
	var numRanges = 1;
	var ranges = [];
	
	if (toSplit.length > maxInRange) {
		numRanges = toSplit.length/maxInRange;
		numRanges = Math.floor(numRanges);
		var remainder = toSplit.length % maxInRange;

		if (remainder > 0) {
			numRanges++;
		} 
	
		for (var i = 0; i < numRanges; i++) {
		  var currRange = toSplit.slice(i * maxInRange, ((i * maxInRange) + maxInRange));
		  ranges[i] = 	currRange;
		}
	} else {
		ranges[0] = toSplit;
	}
	
	
	return ranges;
};


getPagesArray = function(datesArray,students,maxStudents,maxDates){
	var dateRanges = getRanges(datesArray,maxDates);
	var studentRanges = getRanges(students,maxStudents);
	var pagesArray = [];
	var counter = 0;
	
	for (var i = 0; i < dateRanges.length; i++) {
		for (var j = 0; j < studentRanges.length; j++) {
			var currMap = new HashMap();
			currMap.set("Dates", dateRanges[i]);
			currMap.set("Students", studentRanges[j]);
			pagesArray[counter] = currMap;
			counter++;
		}
	}
	return pagesArray;
};

formatReport = function(datesArray,students,maxStudents,maxDates,attendanceDataArray){
	var preHTML = "<html> <head><style>.break { page-break-before: always; }</style></head><body>  <form> <input type='button' value='Print this page' onClick='window.print()'></form>";
	var postHtml = "</body></html>";
	var pages = getPagesArray(datesArray,students,maxStudents,maxDates);
	var reportHtml = preHTML;
	for (var i = 0; i < pages.length; i++) {
		var currPage = pages[i];
		var pageHtml = "";
		
		if (i===0) {
			pageHtml = getAttendanceHtmlForPage(currPage,attendanceDataArray,true);
		} else {
			pageHtml = getAttendanceHtmlForPage(currPage,attendanceDataArray,false);
		}
		
		reportHtml = reportHtml + pageHtml;
	}
	
	reportHtml = reportHtml + postHtml;

	return reportHtml;
},

arrayContains = function(theArray,elem)
{
   for (var i in theArray)
   {
   	
       if (theArray[i] == elem) {
       	console.log("Match found: " + theArray[i] + " with "+ elem);
       	return true;
       	}
   }
   return false;
};

getAttendanceHtmlForPage = function(page,attendanceDataArray, isFirstPage){
	var datesArray = page.get("Dates");
	var students = page.get("Students");
	var preHTML = "<p class='break'> <table border='1' style='width:80%;'><tr><th> Student Name </th>";
	var preHTMLFirstPage = "<p> <table border='1' style='width:80%;'><tr><th> Student Name </th>";
	var datesHTML ="";
	var preStudentsHtml ="</tr>";
	var studentsHtml ="</tr>";
	var postStudentsHtml ="</table> </p>";
	var studentsHtml = "";
	
	for (var i = 0; i < datesArray.length; i++) {
			var currRow = "<th>" + datesArray[i] + "</th>";
    		//console.log('Appending: ' +  currRow);
    		datesHTML = datesHTML + currRow;
	}
		console.log('got this many students: ', students.length);
		
	for (var i = 0; i < students.length; i++) {
		 	studentsHtml = studentsHtml + "<tr> <td>" + students[i].first_name + " " + students[i].last_name +"</td>";
			for (var j = 0; j < datesArray.length; j++) {
				var currDate = students[i].id + "-" + datesArray[j];
				//console.log("checking if there is an absence for " + currDate);
				if (arrayContains(attendanceDataArray,currDate)) {
					studentsHtml = studentsHtml + " <td> <font color='red'>A</font> </td>";
				} else {
					studentsHtml = studentsHtml + " <td> P </td>";
				}
			}
			//console.log("studentsHtml-> " + studentsHtml);
			studentsHtml = studentsHtml + " </tr>";
		}
	
	var resultBuffer = "";
	
	if (isFirstPage) {
		resultBuffer = preHTMLFirstPage + datesHTML + preStudentsHtml + studentsHtml + postStudentsHtml;
	} else {
		resultBuffer = preHTML + datesHTML + preStudentsHtml + studentsHtml + postStudentsHtml;
	}
	
	//console.log("HTML is->" + resultBuffer);
	
	return resultBuffer;
	    				//console.log('id: ', rows[i].id);
    				//console.log('last_name: ', rows[i].last_name);
    				//console.log('first_name: ', rows[i].first_name);

};


var getHtmlForAttendanceReport = function(start_date_range,end_date_range,callback){
	console.log("Getting dates for attendance report ");
		var attendanceDataArray = new Array();
		var datesForAttendanceReport = getDatesArray(start_date_range,end_date_range);
		console.log("BACK attendance report " + datesForAttendanceReport);
		var connection = getConnection();
		var timezone_query = "SET time_zone = '-6:00'";
		var student_names_query = "select id, first_name,last_name from student";
		var student_attendance_query = "select t1.id AS absence_id,t1.start_date_time,t1.end_date_time,t3.id AS student_id,t3.first_name,t3.last_name from absence t1, absence_owner t2, student t3 where t1.start_date_time BETWEEN ? and ? and t1.id = t2.absence_id and t2.student_id = t3.id";
		console.log("Timezone query ");
  		connection.query(timezone_query, function(err, info) {

  				console.log("Recieved reply for " + timezone_query);
        		connection.query(student_names_query,function(err, studentsList, fields) {
        			
        			var paramsList = [];
    				paramsList[0] = start_date_range;
    				paramsList[1] = end_date_range;
        			connection.query(student_attendance_query,paramsList,function(err, attendanceRows, fields) {
        				console.log('got this many attendance rows: ', attendanceRows.length);	
        				for (var i = 0; i < attendanceRows.length; i++) {
        					//console.log('student_id: ', attendanceRows[i].student_id);
        					//console.log('start_date_time: ', attendanceRows[i].start_date_time);
        					//console.log('end_date_time: ', attendanceRows[i].end_date_time);
        					var startDate = new Date(attendanceRows[i].start_date_time);
							var endDate = new Date(attendanceRows[i].end_date_time);
							var startDateDayMonthYear = startDate.getMonth().toString() + startDate.getDate().toString() + startDate.getFullYear().toString();
							var endDateDayMonthYear = endDate.getMonth().toString() + endDate.getDate().toString() + endDate.getFullYear().toString();
							//console.log('startDateDayMonthYear: ', startDateDayMonthYear);
        					//console.log('endDateDayMonthYear: ', endDateDayMonthYear);
							var previousDate = startDate;
							if (startDateDayMonthYear===endDateDayMonthYear) {
								//console.log("Only one day! ADDING$$ " + attendanceRows[i].student_id + "-" + (startDate.getMonth() + 1) + "/" + startDate.getDate());
								attendanceDataArray.push(attendanceRows[i].student_id + "-" + (endDate.getMonth() + 1) + "/" + endDate.getDate());
							} else {
							//console.log("More than one day!");
							var currDateDayMonthYear = "";
	
							var index = 0;
							while (currDateDayMonthYear != endDateDayMonthYear) {	
								var currDate = new Date(previousDate);
								currDate.setDate(currDate.getDate() + 1);
								var currDateDayMonthYear = currDate.getMonth().toString() + currDate.getDate().toString() + currDate.getFullYear().toString();
								previousDate=currDate;
								//console.log("putting DATE$$ " + attendanceRows[i].student_id + "-" + (currDate.getMonth() + 1) + "/" + currDate.getDate());
								attendanceDataArray.push(attendanceRows[i].student_id + "-" + (currDate.getMonth() + 1) + "/" + currDate.getDate());
								index++;
								}
							attendanceDataArray.push(attendanceRows[i].student_id + "-" + (endDate.getMonth() + 1) + "/" + endDate.getDate());
							//console.log("putting DATE$$ " + attendanceRows[i].student_id + "-" + (endDate.getMonth() + 1) + "/" + endDate.getDate());

							}
        				}
        				var htmlReport = formatReport(datesForAttendanceReport,studentsList,10,15,attendanceDataArray);
        				var jsonResult = "[{\"html\":\"" + htmlReport + "\"}]";
        				console.log("htmlReport " + htmlReport);
        				callback(jsonResult);
            			connection.end();
					});
            	
        	});
        
  		});
  		

};



var sendEmail = function(subject,recipeint,templateName,locals,callback){
	//if(ServerConfig.debug) {
		console.log("*****SENDING EMAIL *******");
		console.log("subject " + subject);
		console.log("recipeint " + recipeint);
		console.log("templateName " + templateName);
		console.log("locals " + locals);
		console.log("serviceName " + EmailConfig.serviceName);
		console.log("user " + EmailConfig.user);
		console.log("password " + EmailConfig.password);
	//	}

	var smtpTransport = nodemailer.createTransport("SMTP",{
   			service: EmailConfig.serviceName, 
   			auth: {
       			user: EmailConfig.user,
       			pass: EmailConfig.password
   			}
	});
	console.log("smtpTransport " + smtpTransport );
	emailTemplates(templatesDir, function(err, template)  {
	console.log("EMAILING!!!!! " +  err);
      if (err) {
        console.log("Error getting template " + err);
      } else {
      	 template(templateName, locals, function(err, html, text) {
        smtpTransport.sendMail({
          from: EmailConfig.fromAddress,
          to: recipeint,
          subject: subject,
          html: html,
          // generateTextFromHTML: true,
          text: text
        }, function(err, responseStatus) {
        console.log("responseStatus " + responseStatus[0] + " " + responseStatus[1]);
        console.log("Error while sending " + err);
          if (err) {
            console.log("Error while sending " + err);
            callback({success:false});
          } else {
            callback({success:true});
          }
        });
        });
        
      }
    });
};    

var getTextContent = function(templateName,callback){
	var file = templatesDir + "/" + templateName + "/" + "content.txt";
	console.log("getting text for " + file);
	
	fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
     console.log(" ERROR READING CONTENT " + err);
  } 
  callback({"content":data});
});

};   
 
var createNewToken = function(type,user,callback) {
	console.log("createNewToken+++");
	console.log("type " + type);
	console.log("user " + user);
	crypto.randomBytes(32, function(ex, buf) {
    	var token = buf.toString('hex');
    	callback(token);
    	var newTokenQuery = "INSERT INTO tokens(token,type,creation_date,created_by) VALUES (?,?,NOW(),?);";
		var paramsList = new Array();
    				paramsList[0] = token;
    				paramsList[1] = type;
    				paramsList[2] = user;
    				console.log(JSON.stringify(paramsList));
		dbConnection.queryWithParams(newTokenQuery,paramsList,null,true);
	});
};

var appURL = function() {
	var url =  server;
	
	if (env==="local") { 
		url =  server + ":" + port;
	} 
	
	console.log("SENDING URL " + url);
	
	return url;
};

// Make MySql connections available globally, so we can access them from within modules
global['dbConnection'] =  {
    nestedQueryWithParams : nestedQueryWithParams,
    nestedQueriesUptoFour : nestedQueriesUptoFour,
    simpleQuery : simpleQuery,
    queryWithParams : queryWithParams,
    getCleanValue : getCleanValue,
    isValidValue : isValidValue,
    isValidToken : isValidToken,
    sendEmail : sendEmail,
    createNewToken : createNewToken,
    getTextContent : getTextContent,
    appURL : appURL,
    getHtmlForAttendanceReport : getHtmlForAttendanceReport,
};

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
