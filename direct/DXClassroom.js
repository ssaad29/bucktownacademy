var db = dbConnection;

var DXClassroom  = {
    
    getAllClassroomsForSchool: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.school_id;
		db.queryWithParams("SELECT * FROM classroom where school_id = ? and is_subject = 0",paramsList,callback,false);
    },
};

module.exports = DXClassroom;