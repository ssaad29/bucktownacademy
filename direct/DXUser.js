var table = 'user';
var db = dbConnection;

var DXUser  = {    

    getUser: function(params, callback){
    	console.log("GET USER CALLED");
        var paramsList = [];
    	paramsList[0] = params.username;
    	paramsList[1] = params.password;
    	paramsList[2] = params.school;	
    	console.log("VERIFYING AUTH " + params.username + " " + params.password + " " + params.school);	
    	db.queryWithParams("select t1.id,t1.user_name,t1.password,t1.roles,t1.first_name,t1.last_name,t1.phone,email,t1.addr1,t1.addr2,t1.city,t1.state,t1.public_profile,t1.zip,t1.cell_phone,t1.birthdate,t2.school_id from user t1, user_school t2 where user_name = ? and password =? and t1.id = t2.user_id",paramsList,callback,false);
    },
    
    getToken: function(params, callback){
    	console.log("GET TOKEN CALLED");
        var token = arguments[arguments.length-1];
        console.log("token from session " + token);
        if (token===null || token===undefined || token.length < 1) {
        	console.log("No success!! ");
        	callback({success:false, session_id:null});
        }
        	console.log(" success, got one ");
		callback({success:true, session_id:token});
    },
    
    checkEmailToken: function(params, callback){
        var token = params.token;
        var paramsList = [];
    	paramsList[0] = token;
    	paramsList[1] = params.userId;
    	
    	db.queryWithParams("select type,creation_date from tokens where token = ?",paramsList,callback,false);
    },
    
    checkTokenValidity: function(params, callback){
    console.log("CHECKING TOKEN " + arguments);
    	var token = arguments[arguments.length-1];
    	console.log("SERVER TOKEN " + token);
        if (token===null || token===undefined || token.length < 1) {
        	callback({success:false, session_id:null});
        	return;
        }
        
        var clientToken = params.token;
         console.log("clientToken " + clientToken);
        if (clientToken===null || clientToken===undefined || clientToken.length < 1 || clientToken!=token) {
        	callback({success:false, session_id:null});
        	return;
        }
        callback({success:true, session_id:token});
    },
    
    checkForDuplicateEmail: function(params, callback){
		var userId = params.userId;
		var emailsStr = params.email;
		
		if (userId!=null && userId!= undefined && userId.length > 0) {
			var paramsList = [];
    		paramsList[0] = emailsStr;
    		paramsList[1] = userId;
    	
    		db.queryWithParams("select * from user where email = ? and id!=?",paramsList,callback,false);
		} else if (emailsStr!= null && emailsStr!=undefined){
    		var emails = emailsStr.split(',');
    		if (emails.length < 2) {
    			var paramsList = [];
    			paramsList[0] = emailsStr;
    	
    			db.queryWithParams("select * from user where email = ?",paramsList,callback,false);
    		} else {
    			var buffer = "";
    			for (var i=0;i<emails.length;i++) {
    				if (i===0) {
    					buffer = "'" + buffer + emails[i] +  "',";
    				} else if (i===(emails.length -1)) {
    					buffer =  buffer + "'" + emails[i] + "'";
    				} else {
    					buffer =  buffer + "'" + emails[i] + "',";
    				}
    			}

    			db.simpleQuery("select * from user where email IN (" + buffer + ")",callback,false);
    		}
		}
    },
    
    getUserById: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.user_id;

    	db.queryWithParams("select * from user where id = ?",paramsList,callback,false);
    },
    
     getChildren: function(params, callback){
     console.log("+++++++++++getChildren++++++++++++++ " );
     	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.user_id;
    	console.log("USER ID in getChildren " + params.user_id);
    	db.queryWithParams("select student_id,student_first,student_last from parents_students where user_id = ?",paramsList,callback,false);
     console.log("+++++++++++getChildren++++++++++++++ " );
    },
    
    getAllParents: function(params, callback){
        db.simpleQuery("select id AS user_id, first_name, last_name,roles from user where (roles LIKE '%P%')",callback,false);
    },
    
    getAllUsers: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	var roles = params.roles;
    	
    	if (roles != null && roles.indexOf("A") != -1) {
        	db.simpleQuery("select id AS user_id, first_name, last_name,roles from user",callback,false);
        	}
        else {
        	db.simpleQuery("select id AS user_id, first_name, last_name,roles from user where (roles LIKE '%P%')",callback,false);
        }
    },
    
    removeParentFromChild: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.user_id;
    	paramsList[0] = params.student_id;
    	db.queryWithParams("delete from user_student where user_id = ? and student_id = ?",paramsList,callback,false);
    },
    
    addParentToChild: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.user_id;
    	paramsList[0] = params.student_id;
    	db.queryWithParams("INSERT INTO user_student (user_id, classroom_id,created_by,creation_date) VALUES (?,?,?,NOW())",paramsList,callback,false);
    },
    
    deleteUser: function(params, callback){
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var paramsList = [];
    	paramsList[0] = params.userId;
    	q1 = "delete from user_school where user_id = ?;";
    	q2 = "delete from user_class where user_id = ?;";
    	q3 = "delete from user_student where user_id = ?;";
    	q4 = "delete from user where id = ?;";
    	
		db.nestedQueriesUptoFour(q1,q2,q3,q4,paramsList,paramsList,paramsList,paramsList,-1,-1,-1,callback,true);
    },
    
    associateUserWithSchool: function(params, callback){
    	var schoolId = db.getCleanValue(params.schoolId); 
        var userId = db.getCleanValue(params.userId);
        console.log("schoolId " + schoolId);
        console.log("userId " + userId);
        
        var paramsList = [];
        paramsList[0] = schoolId;
        paramsList[1] = userId;
        paramsList[2] = userId;
        db.queryWithParams("INSERT INTO user_school (school_id, user_id,created_by,creation_date) VALUES (?,?,?,NOW())",paramsList,callback,false);
    },
    
    insertOrUpdateUser: function(params, callback) {
    	if (!db.isValidToken(params.token,arguments[arguments.length-1])) {
			callback({success:false});
			
			return;
		} 
		
        var userId = db.getCleanValue(params.userId);
        var updatedBy = db.getCleanValue(params.updatedBy);
        var classId = db.getCleanValue(params.classId);
        var userName = db.getCleanValue(params.userName);
        var password = db.getCleanValue(params.password);
        var roles = db.getCleanValue(params.roles);
        var firstName = db.getCleanValue(params.firstName);
        var lastName = db.getCleanValue(params.lastName);
        var phone = db.getCleanValue(params.phone);
        var email = db.getCleanValue(params.email);
        var addr1 = db.getCleanValue(params.addr1);
        var addr2 = db.getCleanValue(params.addr2);
        var city = db.getCleanValue(params.city);
        var state = db.getCleanValue(params.state);
        var zip = db.getCleanValue(params.zip);
        var publicProfile = db.getCleanValue(params.publicProfile);
        var cellPhone = db.getCleanValue(params.cellPhone);
        var createdBy = db.getCleanValue(params.createdBy); 
        var insertMode = db.getCleanValue(params.insertMode); 
        
        console.log("insertMode->" + insertMode);
        console.log("userId->" + userId);
        console.log("classId->" + classId);
        console.log("userName->" + userName);
        console.log("password->" + password);
        console.log("roles->" + roles);
        console.log("firstName->" + firstName);
        console.log("lastName->" + lastName);
        console.log("phone->" + phone);
        console.log("email->" + email);
        console.log("addr1->" + addr1);
        console.log("addr2->" + addr2);
        console.log("city->" + city);
        console.log("state->" + state);
        console.log("zip->" + zip);
        console.log("publicProfile->" + publicProfile);
        console.log("cellPhone->" + cellPhone);
        console.log("createdBy->" + createdBy);
        
		var newUserQuery = "INSERT INTO user (user_name,first_name, last_name, password,roles,public_profile,phone,email,addr1,addr2,city,state,zip,cell_phone,created_by,creation_date) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW() ) ";
		var userClassInsertQuery = "INSERT INTO user_class (user_id, classroom_id,created_by,creation_date) VALUES (?,?,?,NOW())";
		var profileUpdateQuery = "UPDATE user SET first_name=?, last_name=?,public_profile=?,last_updated_by=? where id = ?";
		var contactUpdateQuery = "UPDATE user SET email=?, phone=?,cell_phone=?,last_updated_by=? where id = ?";
        var addressUpdateQuery = "UPDATE user SET addr1=?, addr2=?,city=?,state=?,zip=?,last_updated_by=? where id = ?";
        var passwordUpdateQuery = "UPDATE user SET password=?,last_updated_by=? where id = ?";
        var rolesUpdateQuery = "UPDATE user SET roles=?,last_updated_by=? where id = ?";
		var paramsList = new Array();

        		
		//This is a new student
		if (insertMode==="new") {  //NEW user
			paramsList[0] = email;
			paramsList[1] = firstName;
			paramsList[2] = lastName;
			paramsList[3] = password;
			paramsList[4] = roles;
			paramsList[5] = publicProfile;
			paramsList[6] = phone;
			paramsList[7] = email;
			paramsList[8] = addr1;
			paramsList[9] = addr2;
			paramsList[10] = city;
			paramsList[11] = state;
			paramsList[12] = zip;
			paramsList[13] = cellPhone;
			paramsList[14] = createdBy;
			paramsList[15] = roles;
			paramsList[16] = roles;
			paramsList[17] = userId;
			db.queryWithParams(newUserQuery,paramsList,callback,true);    
		} else if (insertMode==="profile") { 
		   		console.log("user profile update");
			    paramsList[0] = firstName;
			    paramsList[1] = lastName;
			    paramsList[2] = publicProfile;
			    paramsList[3] = updatedBy;
			    paramsList[4] = userId;
				db.queryWithParams(profileUpdateQuery,paramsList,callback,true);
		} else if (insertMode==="contact"  ) { 
				console.log("user contact update");
			    paramsList[0] = email;
			    paramsList[1] = phone;
			    paramsList[2] = cellPhone;
			    paramsList[3] = updatedBy;
			    paramsList[4] = userId;
				db.queryWithParams(contactUpdateQuery,paramsList,callback,true);
		} else if (insertMode==="roles"  ) { 
				console.log("roles update");
			    paramsList[0] = roles;
			    paramsList[1] = updatedBy;
			    paramsList[2] = userId;
				db.queryWithParams(rolesUpdateQuery,paramsList,callback,true);
		} else if (insertMode==="address") { 
			    console.log("user address update");
			    paramsList[0] = addr1;
			    paramsList[1] = addr2;
			    paramsList[2] = city;
			    paramsList[3] = state;
			    paramsList[4] = zip;
			    paramsList[5] = updatedBy;
			    paramsList[6] = userId;
				db.queryWithParams(addressUpdateQuery,paramsList,callback,true);
		} else  if (insertMode==="password") {
				console.log("user password update");
			    paramsList[0] = password;
			    paramsList[1] = updatedBy;
			    paramsList[2] = userId;
				db.queryWithParams(passwordUpdateQuery,paramsList,callback,true);
		}
		}
		
};

module.exports = DXUser;