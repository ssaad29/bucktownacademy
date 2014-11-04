var db = dbConnection;

var DXSignature  = {
    
    insertSignature: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.action;
    	paramsList[1] = params.signature;
    	paramsList[2] = params.student_id;
		db.queryWithParams("INSERT INTO signature_records( action , signature , student_id, time_collected) VALUES(?, ?, ?, NOW())",paramsList,callback,false);
    },

    alreadySignedOutCheck: function(params, callback){
    	console.log("IN alreadySignedOutCheck: Token " + params.token);
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
        var paramsList = [];
    	paramsList[0] = params.student_id;
    	console.log("IN alreadySignedOutCheck: params.student_id " + params.student_id);
		db.queryWithParams("SELECT id, DATE_FORMAT(time_collected, '%Y-%m-%d') FROM signature_records WHERE DATE(time_collected) = CURDATE() and student_id = ?",paramsList,callback,false);
    },
};
module.exports = DXSignature;
