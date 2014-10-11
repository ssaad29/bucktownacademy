var db = dbConnection;

var DXDirectory  = {
    
    getAllStudents: function(params, callback){
       db.simpleQuery("select distinct student_id,student_first,student_last,parent_first,parent_last,class from parents_students",callback,false);
    },
    
    getFamily: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			return;
		} 
		
		var paramsList = [];
    	paramsList[0] = params.student_id;
		db.queryWithParams("select * from parents_students where user_id in (select user_id from parents_students where student_id = ?)",paramsList,callback,false);
    },
    
    getUser: function(params, callback){
		if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		}        
		
		var paramsList = [];
    	paramsList[0] = params.user_id;
		db.queryWithParams("select * from user where id =?",paramsList,callback,false);
    },
    
    getBirthdays: function(params, callback){
    	var paramsList = [];
    	paramsList[0] = params.school_id;
        db.queryWithParams("select * from birthdays where school_id=? order by birthdate",paramsList,callback,false);
    },
    
    getAllStaff: function(params, callback){
        db.simpleQuery("select id AS user_id, first_name, last_name,roles from user where (roles LIKE '%T%' OR roles LIKE '%S%' OR roles LIKE '%A%')",callback,false);
    },
    


};

module.exports = DXDirectory;