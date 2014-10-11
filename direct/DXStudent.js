var table = 'student';
var db = dbConnection;

var DXStudent  = {    

    getStudentById: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.studentId;

    	db.queryWithParams("SELECT t1.id, t1.first_name, t1.last_name,t4.name AS grade,t1.allergies,t1.comments,t1.birthdate,t2.name AS classroom FROM student t1, classroom t2,class_student t3, grades t4 where t1.id = t3.student_id and t2.id= t3.classroom_id and t1.grade_id = t4.id and t1.id = ?",paramsList,callback,false);
    },

    editStudentParentAssociation: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		}
    	
    	var insertMode = db.getCleanValue(params.insertMode); 
        var studentId = db.getCleanValue(params.studentId);
        var userId = db.getCleanValue(params.userId);
        var parentId = db.getCleanValue(params.parentId);
        
        var paramsList = [];
        
        
        if (insertMode==="associate") {
        	paramsList[0] = studentId;
        	paramsList[1] = parentId;
        	paramsList[2] = userId;
        	db.queryWithParams("INSERT INTO user_student (student_id, user_id,created_by,creation_date) VALUES (?,?,?,NOW())",paramsList,callback,false);
        } else {
        	paramsList[0] = studentId;
        	paramsList[1] = parentId;
        	db.queryWithParams("delete from user_student where student_id=? and user_id=?",paramsList,callback,false);
        }
    },
    
    deleteStudent: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.student_id;
    	
    	q1 = "delete from class_student where student_id = ?;";
    	q2 = "delete from user_student where student_id = ?;";
    	q3 = "delete from student where id = ?;";
    	
		db.nestedQueriesUptoFour(q1,q2,q3,null,paramsList,paramsList,paramsList,null,-1,-1,-1,callback,true);
    },
    
    getParents: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.student_id;
		db.queryWithParams("select * from parents_students where student_id = ?",paramsList,callback,false);
    },

	insertOrUpdateStudent: function(params, callback) {
		console.log("insertOrUpdateStudent!!!!!!");
		if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		var insertMode = db.getCleanValue(params.insertMode); 
        var studentId = db.getCleanValue(params.studentId);
        var birthday = params.birthday;
        var userId = db.getCleanValue(params.userId);
        var comments = db.getCleanValue(params.comments);
        var allergies = db.getCleanValue(params.allergies);
        var firstName = db.getCleanValue(params.firstName);
        var lastName = db.getCleanValue(params.lastName);
        var grade = db.getCleanValue(params.grade);
        var classroom = db.getCleanValue(params.classroom);
        var createdBy = db.getCleanValue(params.userId);
        var updatedBy = db.getCleanValue(params.userId); 
		var q1 = "INSERT INTO student (first_name, last_name, comments,allergies,birthdate,grade_id,created_by,creation_date) VALUES (?,?,?,?,?,(select id from grades where name=?),?,NOW())";
		//var q2 = "INSERT INTO user_student (student_id, user_id,created_by,creation_date) VALUES (?,?,?,NOW())";
		var q2 = "INSERT INTO class_student (classroom_id,student_id,created_by,creation_date) VALUES ((select id from classroom where name=?),(SELECT MAX(id) from student),?,NOW())";
		var nameUpdateQuery = "UPDATE student SET first_name=?, last_name=? ,last_updated_by= ? where id = ?";
        var detailsUpdateQuery = "UPDATE student SET allergies=?, comments=? ,birthdate=?,last_updated_by = ? where id = ?";
        var gradeUpdateQuery = "UPDATE student SET grade_id=(select id from grades where name=?) ,last_updated_by =? where id = ?";
        var classroomStudentUpdateQuery = "UPDATE class_student set classroom_id = (select id from classroom where name=?) where student_id =? ";
        
		var paramsList = new Array();
		console.log("classroom " + classroom);
		console.log("grade " + grade);
		console.log("insertMode " + insertMode);
		console.log("studentId " + studentId);
		console.log("userId " + userId);
		console.log("comments " + comments);
		console.log("allergies " + allergies);
		console.log("birthday " + birthday);
		console.log("firstName " + firstName);
		console.log("lastName " + lastName);
		console.log("createdBy " + createdBy);
		console.log("updatedBy " + updatedBy);
		var classroomId = null;
		
		//This is a new student
		if (insertMode==="new") {  //NEW STUDENT
					    console.log("Creating new ");

				var paramsList1 = new Array();
			    paramsList1[0] = firstName;
			    paramsList1[1] = lastName;
			    paramsList1[2] = comments;
			    paramsList1[3] = allergies;
			    paramsList1[4] = birthday;
			    paramsList1[5] = grade;
			    paramsList1[6] = userId;
			    console.log(JSON.stringify(paramsList1) );
			    //var paramsList2 = new Array();
			    //paramsList2[0] = studentId;
			   // paramsList2[1] = userId;
			    //paramsList2[2] = userId;
			   // console.log(JSON.stringify(paramsList2) );
			    var paramsList2 = new Array();
			    paramsList2[0] = classroom;
			    paramsList2[1] = userId;
			    console.log(JSON.stringify(paramsList2) );
			    	
			    console.log("Invoking ");
			    db.nestedQueriesUptoFour(q1,q2,null,null,paramsList1,paramsList2,null,null,-1,-1,-1,callback,true);
		} else if (insertMode==="name") { 
			    paramsList[0] = firstName;
			    paramsList[1] = lastName;
			    paramsList[2] = updatedBy;
			    paramsList[3] = studentId;
				db.queryWithParams(nameUpdateQuery,paramsList,callback,true);
		} else if (insertMode==="details") { 
			    paramsList[0] = allergies;
			    paramsList[1] = comments;
			    paramsList[2] = birthday;
			    paramsList[3] = updatedBy;
			    paramsList[4] = studentId;
				db.queryWithParams(detailsUpdateQuery,paramsList,callback,true);
		} else  if (insertMode==="grade-class") {
				paramsList[0] = grade; //take care of the grade
			    paramsList[1] = updatedBy;
			    paramsList[2] = studentId;
				db.queryWithParams(gradeUpdateQuery,paramsList,callback,true);
				paramsList[0] = classroom;
			    paramsList[1] = studentId;
				db.queryWithParams(classroomStudentUpdateQuery,paramsList,callback,true);
		}
		}
		
};

module.exports = DXStudent;