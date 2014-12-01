var db = dbConnection;

var DXAbsent  = {
    //callback as last argument in mandatory
    getChildAbsencesForParent: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
    	var paramsList = [];
    	paramsList[0] = params.user_id;
		db.queryWithParams("select t1.first_name ,t1.last_name, t2.start_date_time, t2.end_date_time, t2.reason, t2.id AS absence_id,t1.id AS student_id from student t1, absence t2, absence_owner t3, user t4,user_student t5 where t3.user_id IS NULL and t1.id = t3.student_id and t2.id = t3.absence_id and t4.id = t5.user_id and t5.student_id = t1.id and t4.id = ? order by t2.end_date_time desc",paramsList,callback,false);
    },
    
    getAbsencesForStaffMember: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
    	var paramsList = [];
    	paramsList[0] = params.user_id;
		db.queryWithParams("select t1.first_name ,t1.last_name, t2.start_date_time, t2.end_date_time, t2.reason, t2.id AS absence_id from user t1, absence t2, absence_owner t3 where t3.student_id IS NULL and t1.id = t3.user_id and t2.id = t3.absence_id and t1.id = ? order by t2.end_date_time desc",paramsList,callback,false);
    },
    
    getAllStudentsAbsentToday: function(params, callback){
        db.simpleQuery("select first_name ,last_name, start_date_time, end_date_time,type,parent_entered, reason, absence_id from students_absent_today where present = 1 order by end_date_time desc",callback);
    },
    
    getAllStudentAbsences: function(params, callback){
        db.simpleQuery("select t1.first_name ,t1.last_name, t2.start_date_time, t2.end_date_time, t2.reason, t2.id AS absence_id from student t1, absence t2, absence_owner t3 where t3.user_id IS NULL and t1.id = t3.student_id and t2.id = t3.absence_id order by t2.end_date_time desc",callback);
    },
    
    getAllStudents: function(params, callback){
        db.simpleQuery("select t1.first_name,t1.last_name,t4.name AS grade,t3.name AS class, t1.id AS student_id from student t1, class_student t2, classroom t3,grades t4 where t1.id = t2.student_id and t3.id = t2.classroom_id and t1.grade_id=t4.id order by t3.name,t1.last_name asc",callback);
    },
    
    getAllStaff: function(params, callback){
        db.simpleQuery("select  id AS user_id, first_name, last_name,roles from user where (roles LIKE '%T%' OR roles LIKE '%S%' OR roles LIKE '%A%')",callback);
    },
    
    getAllStaffAbsences: function(params, callback){
         db.simpleQuery("select * from staff_absent_today",callback);
    },
    
    existingAbsencesByDate: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
    	console.log("params.start_date_range->" + params.start_date_range);
    	console.log("params.end_date_range->" + params.end_date_range);
    	console.log("params.student_id->" + params.student_id);
    	console.log("params.user_id->" + params.user_id);
    	var studentId = params.student_id;
    	var userId = params.user_id;
    	var paramsList = [];
    	paramsList[0] = params.start_date_range;
    	paramsList[1] = params.end_date_range;
    	var timezone_query = "SET time_zone = '-6:00'";
    	var paramsListempty = [];
    	var studentquery = "SELECT t3.start_date_time,t3.end_date_time,t3.type,t3.id AS absence_id from student t1, absence_owner t2,absence t3 where t1.id = t2.student_id and t3.id = t2.absence_id and t3.start_date_time = ? and t3.end_date_time = ? and t1.id=?";
    	var userquery = "SELECT t3.start_date_time,t3.end_date_time,t3.type,t3.id AS absence_id from user t1, absence_owner t2,absence t3 where t1.id = t2.user_id and t3.id = t2.absence_id and t3.start_date_time = ? and t3.end_date_time = ? and t1.id=?";
    	if (studentId!=null && studentId!=undefined && studentId.length >0) {
    		paramsList[2] = studentId;
			db.nestedQueryWithParams(timezone_query,paramsListempty,studentquery,paramsList,callback,-1);
			} else {
			paramsList[2] = userId;
			db.nestedQueryWithParams(timezone_query,paramsListempty,userquery,paramsList,callback,-1);
			}
    },
    
    getStudentsForTeacher: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
    	var paramsList1 = [];
    	var paramsList2 = [];
    	paramsList2[0] = params.user_id;
    	var attendance_query = "select distinct student_id,first_name,last_name,present from student_attendance where present = 1 UNION select distinct student_id,first_name,last_name,present from student_attendance where present = 0 and user_id=?";
    	var timezone_query = "SET time_zone = '-6:00'";
    	db.nestedQueryWithParams(timezone_query,paramsList1,attendance_query,paramsList2,callback,-1);
    },
	
	getAllAbsencesForStudent: function(params, callback){
		if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false,message:'no token'});
			
			return;
		} 
		
    	var paramsList = [];
    	paramsList[0] = params.student_id;
		db.queryWithParams("select t1.start_date_time,t1.end_date_time,t1.reason,t1.id,t1.type,t1.parent_entered,t1.tardy_dismissal_time,t1.id AS absence_id,t2.student_id from absence t1, absence_owner t2 where t2.student_id = ? and t1.id = t2.absence_id order by t1.end_date_time desc",paramsList,callback,false);
    },
    
    getAbsenceById: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
    	var paramsList = [];
    	var absence_id = params.absence_id;
    	if (absence_id===null || absence_id===undefined) {
    		absence_id = "-1";
    	}
    	
    	paramsList[0] = parseInt(absence_id);
		db.queryWithParams("select * from absence where id =?;",paramsList,callback,false);
    },
    
    deleteAbsence: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
		var paramsList = [];
    	paramsList[0] = params.absence_id;
    	var absence_ownerq = "delete from absence_owner where absence_id IN (?)";
    	var absenceq = "delete from absence where id IN (?)";
    	db.nestedQueryWithParams(absence_ownerq,paramsList,absenceq,paramsList,callback,-1);

		//db.queryWithParams("delete from absence_owner where absence_id IN (?);",paramsList,callback,true);
		//db.queryWithParams("delete from absence where id IN (?);",paramsList,callback,true);
    },
    
    getTodaysAbsenceForStudent: function(params, callback){
        	console.log("TOKEN:getTodaysAbsenceForStudent " + params.token)

    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
        var paramsListEmpty = [];
    	paramsList[0] = params.student_id;
    	var timezone_query = "SET time_zone = '-6:00'";
    	var q1 = "SELECT absence_id FROM absence_owner t1, absence t2 WHERE DATE_FORMAT(t2.start_date_time, '%Y-%m-%d') = CURDATE() and t1.student_id=? and t1.absence_id = t2.id";
		db.nestedQueryWithParams(timezone_query,paramsListEmpty,q1,paramsList,callback,-1);
    },
    
    insertOrUpdateAbsence: function(params, callback) {
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        console.log("insertOrUpdateAbsence->" + JSON.stringify(params));
        var absence_id = params.absence_id;
        var reason = params.reason;
        var type = params.type;
        var user_id = params.user_id;
        var tardy_dismissal_time = params.tardy_dismissal_time;
        var school_entered = params.school_entered;
        var parent_entered = params.parent_entered;
        var start_date_time = params.start_date_time;
        var end_date_time = params.end_date_time;
        var student_id = params.student_id;
        var createdBy = params.createdBy; 
        var updatedBy = params.updatedBy; 
        
        console.log("PARAMS IN INSERT OR UPDATE ");
        console.log("absence_id->" + absence_id);
		console.log("student_id->" + student_id);
		console.log("user_id->" + user_id);
        console.log("reason->" + reason);
		console.log("type->" + type);
		console.log("tardy_dismissal_time->" + tardy_dismissal_time);
        console.log("school_entered->" + school_entered);
		console.log("parent_entered->" + parent_entered);
		console.log("start_date_time->" + start_date_time);
        console.log("end_date_time->" + end_date_time);
		console.log("student_id->" + student_id);
		console.log("createdBy->" + createdBy);
		console.log("updatedBy->" + updatedBy);
		
		var newAbsenceQuery = "INSERT INTO absence (start_date_time, end_date_time, reason,created_by,creation_date,type,tardy_dismissal_time,school_entered,parent_entered) VALUES ( ?,?,? ,?,?,?,?,?,?) ";
		var absenceOwnerStudentIdQuery = "INSERT INTO absence_owner (student_id, absence_id,created_by,creation_date) VALUES (?,?,?,?)";
		var absenceOwnerUserIdQuery = "INSERT INTO absence_owner (user_id, absence_id,created_by,creation_date) VALUES (?,?,?,?)";
        var updateQuery = "UPDATE absence SET reason=?, start_date_time=?, end_date_time=? ,last_updated_by=?,tardy_dismissal_time=?,school_entered=?,parent_entered=? where id = ?";
        var commitQuery = "commit";
		var paramsList = new Array();
        
		
console.log("Checking absence_id->" + absence_id);
		//This is a new absence
		if (absence_id === null || absence_id === undefined || absence_id.length < 1) {  //NEW ABSENCE
			console.log ("This could be a new absence " + newAbsenceQuery);
			var secondQuery = "";
			paramsList1 = new Array();
    				paramsList1[0] = start_date_time;
    				paramsList1[1] = end_date_time;
    				paramsList1[2] = reason;
    				paramsList1[3] = createdBy;
    				paramsList1[4] = end_date_time;
    				paramsList1[5] = type;
    				paramsList1[6] = tardy_dismissal_time;
    				paramsList1[7] = school_entered;
    				paramsList1[8] = parent_entered;
    				
    		if (user_id === null || user_id === undefined || user_id.length < 1) { 	
    				paramsList2 = new Array();
    				paramsList2[0] = student_id;
    				paramsList2[1] = "";
    				paramsList2[2] = createdBy;
    				paramsList2[3] = end_date_time;
    				secondQuery = absenceOwnerStudentIdQuery;
    				var index = "1";
    				db.nestedQueryWithParams(newAbsenceQuery,paramsList1,secondQuery,paramsList2,callback,index);
    		} else {
    				paramsList2 = new Array();
   					paramsList2[0] = user_id;
   					paramsList2[1] = "";
   					paramsList2[2] = createdBy;
    				paramsList2[3] = end_date_time;
    				var index = "1";
    				secondQuery = absenceOwnerUserIdQuery;
    				db.nestedQueryWithParams(newAbsenceQuery,paramsList1,secondQuery,paramsList2,callback,"1");
    		}	
		} else { //UPDATE
		console.log("ITS AN UPDATE->" + absence_id);
		console.log("reason->" + reason);
		console.log("start_date_time->" + start_date_time);
		console.log("end_date_time->" + end_date_time);
		console.log("last_updated_by->" + updatedBy);
		console.log("tardy_dismissal_time->" + tardy_dismissal_time);
		console.log("school_entered->" + school_entered);
		console.log("parent_entered->" + parent_entered);
		console.log("absence_id->" + absence_id);
			    paramsList[0] = reason;
			    paramsList[1] = start_date_time;
			    paramsList[2] = end_date_time;
			    paramsList[3] = updatedBy;
			    paramsList[4] = tardy_dismissal_time;
			    paramsList[5] = school_entered;
			    paramsList[6] = parent_entered;
			    paramsList[7] = absence_id;
				db.queryWithParams(updateQuery,paramsList,callback,true);
		}

    },
};

module.exports = DXAbsent;