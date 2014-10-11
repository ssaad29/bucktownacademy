var db = dbConnection;

var DXGrades  = {
    
    getAllGradesForSchool: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
        var paramsList = [];
    	paramsList[0] = params.school_id;
		db.queryWithParams("SELECT * FROM grades where school_id = ?",paramsList,callback,false);
    },
    
};

module.exports = DXGrades;