var db = dbConnection;

var DXEmailService  = {
    
    sendEmail: function(params, callback){
    	if (!params.template === "forgotPassword" && !db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
		console.log("TEMPLATE!!!" + params.template);
		
    	if (params.template === "invite") {
    		var token = db.createNewToken("registration",params.host,function(token) {
    					console.log("host" + params.host);
			console.log("username" + params.studentId);
			console.log("token" + params.token);
			console.log("schoolId" + params.schoolId);
			console.log("appURL" + db.appURL());
    				var locals = {
      					host: params.host,
      					studentId: params.studentId,
      					token: token,
      					schoolId: params.schoolId,
      					app_url: db.appURL(),
    				};
					db.sendEmail("Invitation to sign up for bucktownacademy.schooltalknow.com",params.recipient,"invite",locals,callback);
			});
		} else if (params.template === "forgotPassword") {
			console.log("userId" + params.userId);
			console.log("username" + params.username);
			console.log("token" + params.token);
			console.log("appURL" + db.appURL());
    		var token = db.createNewToken("forgotPassword",params.userId,function(token) {
    				var locals = {
      					userId: params.userId,
      					username: params.username,
      					token: token,
      					app_url: db.appURL(),
    				};
					db.sendEmail("Bucktown Academy password reset",params.recipient,"forgotPassword",locals,callback);
			});
		}
    },
};

module.exports = DXEmailService;