var db = dbConnection;

var DXBulletins  = {
    
    getBulletinsById: function(params, callback){
        var paramsList = [];
    	paramsList[0] = params.bulletinId;
		db.queryWithParams("SELECT * FROM bulletins where id = ?",paramsList,callback,false);
    },
    
    getClassroomsForBulletinId: function(params, callback){
        var paramsList = [];
    	paramsList[0] = params.bulletinId;
		db.queryWithParams("select t2.name,t2.id from class_bulletins t1, classroom t2 where t1.classroom_id = t2.id and t1.bulletin_id = ?",paramsList,callback,false);
    },
    
     editBulletinClassAssociation: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		}
    	
    	var insertMode = db.getCleanValue(params.insertMode); 
        var bulletinId = db.getCleanValue(params.bulletinId);
        var classroomId = db.getCleanValue(params.classroomId);
        var userId = db.getCleanValue(params.userId);
        
        var paramsList = [];
        
        
        if (insertMode==="associate") {
        	paramsList[0] = bulletinId;
        	paramsList[1] = classroomId;
        	paramsList[2] = userId;
        	db.queryWithParams("INSERT INTO class_bulletins (bulletin_id,classroom_id, created_by,creation_date) VALUES (?,?,?,NOW())",paramsList,callback,true);
        } else {
        	paramsList[0] = bulletinId;
        	paramsList[1] = classroomId;
        	db.queryWithParams("delete from class_bulletins where bulletin_id=? and classroom_id=?",paramsList,callback,true);
        }
    },
    
    getAllBulletinsForAdminScreen: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			return;
		} 

		var staffAdminQuery = "SELECT id,title,message,type,reminder,event_date from bulletins where school_id = ?";
		var teacherQuery = "SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1, user_class t2, class_bulletins t3 where t1.id = t3.bulletin_id and t3.classroom_id = t2.classroom_id and  t1.school_id = ? and t2.user_id = ?";
		var roles = params.roles;
        var paramsList = [];
        var theQuery ="";

        if (roles.indexOf("T") != -1) {
        	paramsList[0] = params.school_id;
        	paramsList[1] = params.userId;
        	theQuery = teacherQuery;
        } else {
        	paramsList[0] = params.school_id;
        	theQuery = staffAdminQuery;
        }
		db.queryWithParams(theQuery,paramsList,callback,false);
    },

	deleteBulletin: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.bulletinId;
		db.nestedQueryWithParams("delete from class_bulletins where bulletin_id = ?;",paramsList,"delete from bulletins where id = ?;",paramsList,callback);
    },
    
	getAllBulletinsForUser: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
    		console.log("Token invalid");
			callback({success:false});
			return;
		} 
		
		console.log("SCHOOL ID ->" + params.school_id);
		console.log("USER ID ->" + params.userId);
		

		var staffAdminQuery = "SELECT id,title,message,type,reminder,event_date from bulletins where school_id = ? limit 10";
		var teacherQuery = "SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1 where t1.school_id = ? UNION SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1, user_class t2, class_bulletins t3 where t1.id = t3.bulletin_id and t3.classroom_id = t2.classroom_id and  t1.school_id = ? and t2.user_id = ? limit 10";
		var parentQuery = "SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1 where t1.school_id = ? UNION SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1, user_student t2, class_student t3, class_bulletins t4 where t1.id = t4.bulletin_id and t3.classroom_id = t4.classroom_id and t2.student_id = t3.student_id and t1.school_id = ? and t2.user_id = ? limit 10";
		var parentAndTeacherQuery="SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1 where t1.school_id = ? UNION SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1, user_class t2, class_bulletins t3 where t1.id = t3.bulletin_id and t3.classroom_id = t2.classroom_id and t1.school_id = ? and t2.user_id = ? UNION SELECT t1.id,t1.title,t1.message,t1.type,t1.reminder,t1.event_date from bulletins t1, user_student t2, class_student t3, class_bulletins t4 where t1.id = t4.bulletin_id and t3.classroom_id = t4.classroom_id and t2.student_id = t3.student_id and t1.school_id = ? and t2.user_id = ? limit 10";
		var roles = params.roles;
        var paramsList = [];
        var theQuery ="";

        if (roles.indexOf("T") != -1 && roles.indexOf("P") != -1) {
        	paramsList[0] = params.school_id;
        	paramsList[1] = params.school_id;
        	paramsList[2] = params.userId;
        	paramsList[3] = params.school_id;
        	paramsList[4] = params.userId;
        	
        	theQuery = parentAndTeacherQuery;
        } else if (roles.indexOf("T") != -1) {
        	paramsList[0] = params.school_id;
        	paramsList[1] = params.school_id;
        	paramsList[2] = params.userId;
        	theQuery = teacherQuery;
        } else if (roles.indexOf("P") != -1) {
        	paramsList[0] = params.school_id;
        	paramsList[1] = params.school_id;
        	paramsList[2] = params.userId;
        	theQuery = parentQuery;
        } else {
        	paramsList[0] = params.school_id;
        	theQuery = staffAdminQuery;
        }
        
        console.log("INVOKING FOR BULLETIN BOARD " + theQuery);
        console.log("with params " + paramsList);
        console.log("db " + db);
		db.queryWithParams(theQuery,paramsList,callback,false);
    },
    
	insertOrUpdateBulletin: function(params, callback) {
		if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var bulletin_id = db.getCleanValue(params.bulletinId);
        var type = db.getCleanValue(params.type);
        var title = db.getCleanValue(params.title);
        var message = db.getCleanValue(params.message);
        var school_id = db.getCleanValue(params.school_id);
        var user_id = db.getCleanValue(params.user_id);
        
        console.log("bulletin_id " + bulletin_id);
        console.log("type " + type);
        console.log("title " + title);
        console.log("message " + message);
        console.log("school_id " + school_id);
        console.log("user_id " + user_id);
        
		var newBulletinQuery = "INSERT INTO bulletins (title, message, type,school_id,creation_date,created_by) VALUES ( ?,?,?,?,NOW(),?)";
		//var classBulletinInsertQuery = "INSERT INTO class_bulletins (bulletin_id, classroom_id,creation_date,created_by) VALUES ( ?,?,?,?)";
		var bulletinUpdateQuery = "UPDATE bulletins SET title=?, message=? where id = ?";

		//This is a new Bulletin
		if (!db.isValidValue(bulletin_id)) {  //NEW Bulletin
		 console.log("inserting bulletin");
   					var paramsList = new Array();
    				paramsList[0] = title;
    				paramsList[1] = message;
    				paramsList[2] = type;
    				paramsList[3] = school_id;
    				paramsList[4] = user_id;
    				console.log("inserting now");
					db.queryWithParams(newBulletinQuery,paramsList,callback,true);
		} else  { 
				var paramsList = new Array();
			    paramsList[0] = title;
			    paramsList[1] = message;
			    paramsList[2] = bulletin_id;
				db.queryWithParams(bulletinUpdateQuery,paramsList,callback,true);
		} 
		}

};
module.exports = DXBulletins;

