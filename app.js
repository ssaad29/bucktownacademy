var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
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
console.log("env IS!!!!" + env);

var isHeroku = false;

if (env==="production" || env==="test" || env==="ymca" || env==="prod") {
	isHeroku = true;
}
  
if (env==="production") {
		console.log("IS PROD ");
		ExtDirectConfig = nconf.get("ExtDirectProdConfig");
	} else if (env==="test") {
	console.log("IS TEST ");
		ExtDirectConfig = nconf.get("ExtDirectTestConfig");
	} else if (env==="ymca") {
	console.log("IS YMCA ");
		ExtDirectConfig = nconf.get("ExtDirectYMCAConfig");
	} else if (env==="localprod") {
	console.log("IS LOCALPROD ");
		ExtDirectConfig = nconf.get("ExtDirectLocalProdConfig");
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

app.configure(function(){
	console.log("CONFIGURE NOT production CALLED");
	console.log("ADDING prod header " + ServerConfig.AccessControlAllowOrigin);
	//CORS Support 
    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', ServerConfig.AccessControlAllowOrigin); // allowed hosts
        res.header('Access-Control-Allow-Methods', ServerConfig.AccessControlAllowMethods); // what methods should be allowed
        res.header('Access-Control-Allow-Headers', ServerConfig.AccessControlAllowHeaders); //specify headers
        //res.header('Access-Control-Allow-Credentials', ServerConfig.AccessControlAllowCredentials); //include cookies as part of the request if set to true
        res.header('Access-Control-Max-Age', ServerConfig.AccessControlMaxAge); //prevents from requesting OPTIONS with every server-side call (value in seconds)

        if (req.method === 'OPTIONS') {
            res.send(204);
        }
        else {
            next();
        }
    });
    
    console.log("Signing up for sessions ");
	app.use(session({ store: redisStore, secret: 'session_cookie_secret' }));
	console.log("SIGNED up for sessions ");

    app.set('port', port);
    app.set('server', server);
    app.use(express.logger(ServerConfig.logger));

    if(ServerConfig.enableUpload){
        app.use(express.bodyParser({uploadDir:'./uploads'})); //take care of body parsing/multipart/files
    }

    app.use(express.methodOverride());

    if(ServerConfig.enableCompression){
        app.use(express.compress()); //Performance - we tell express to use Gzip compression
    }

console.log("SETTING WEBROOT " + ServerConfig.webRoot);

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
        		console.log("Result!!" + JSON.stringify(rows));
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
        		console.log("Params 2" + JSON.stringify(params2));
				console.log("query 2 " + queryString2);
        		if (indexToInsertIdInParams2 && indexToInsertIdInParams2!=-1) {
        			var index = parseInt(indexToInsertIdInParams2)
        			var id = info.insertId;
        			params2[index] = id;
        		}
        	
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

var sendEmail = function(subject,recipeint,templateName,locals,callback){
	if(ServerConfig.debug) {
		console.log("*****SENDING EMAIL *******");
		console.log("subject " + subject);
		console.log("recipeint " + recipeint);
		console.log("templateName " + templateName);
		console.log("locals " + locals);
		}

	var smtpTransport = nodemailer.createTransport("SMTP",{
   			service: EmailConfig.serviceName, 
   			auth: {
       			user: EmailConfig.user,
       			pass: EmailConfig.password
   			}
	});
	emailTemplates(templatesDir, function(err, template)  {
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
	crypto.randomBytes(32, function(ex, buf) {
    	var token = buf.toString('hex');
    	callback(token);
    	var newTokenQuery = "INSERT INTO tokens(token,type,creation_date,created_by) VALUES (?,?,NOW(),?);";
		var paramsList = new Array();
    				paramsList[0] = token;
    				paramsList[1] = type;
    				paramsList[3] = user;
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
};



	app.configure('development', function(){
		console.log("CONFIGURE production CALLED");
		app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', ServerConfig.AccessControlAllowOrigin); // allowed hosts
        res.header('Access-Control-Allow-Methods', ServerConfig.AccessControlAllowMethods); // what methods should be allowed
        res.header('Access-Control-Allow-Headers', ServerConfig.AccessControlAllowHeaders); //specify headers
        //res.header('Access-Control-Allow-Credentials', ServerConfig.AccessControlAllowCredentials); //include cookies as part of the request if set to true
        res.header('Access-Control-Max-Age', ServerConfig.AccessControlMaxAge); //prevents from requesting OPTIONS with every server-side call (value in seconds)

        if (req.method === 'OPTIONS') {
            res.send(204);
        }
        else {
            next();
        }
    });
 	   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

app.configure('production', function(){
	console.log("CONFIGURE production CALLED");
	app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', ServerConfig.AccessControlAllowOrigin); // allowed hosts
        res.header('Access-Control-Allow-Methods', ServerConfig.AccessControlAllowMethods); // what methods should be allowed
        res.header('Access-Control-Allow-Headers', ServerConfig.AccessControlAllowHeaders); //specify headers
        //res.header('Access-Control-Allow-Credentials', ServerConfig.AccessControlAllowCredentials); //include cookies as part of the request if set to true
        res.header('Access-Control-Max-Age', ServerConfig.AccessControlMaxAge); //prevents from requesting OPTIONS with every server-side call (value in seconds)

        if (req.method === 'OPTIONS') {
            res.send(204);
        }
        else {
            next();
        }
    });
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    //app.enable('trust proxy');
});

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
