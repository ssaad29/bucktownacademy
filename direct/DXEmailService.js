var db = dbConnection;

var DXEmailService  = {
    
    sendEmail: function(params, callback){
    	if (!params.template === "forgotPassword" && !db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
    	if (params.template === "invite") {
    		var token = db.createNewToken("registration",params.host,function(token) {
    				var locals = {
      					host: params.host,
      					studentId: params.studentId,
      					token: token,
      					schoolId: params.schoolId,
      					app_url: db.appURL(),
    				};
					db.sendEmail("Invitation to sign up for tribuneymca.com",params.recipient,"invite",locals,callback);
			});
		} else if (params.template === "forgotPassword") {
			console.log("userId" + params.userId);
    		var token = db.createNewToken("forgotPassword",params.userId,function(token) {
    				var locals = {
      					userId: params.userId,
      					username: params.username,
      					token: token,
      					app_url: db.appURL(),
    				};
					db.sendEmail("Myschoolishness password reset",params.recipient,"forgotPassword",locals,callback);
			});
		}
    },
};

module.exports = DXEmailService;