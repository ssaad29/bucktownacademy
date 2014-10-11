/**
 * New node file
 */
	function getMySQLConnection() {
		var mysql = require('mysql');
		var connection = mysql.createConnection({ host: 'localhost', user: 'salma',  
		                                          password: 'salma', database: 'school_master'});
		
		return connection;
	}
		

	function getObjectClass(obj) {
	    if (obj && obj.constructor && obj.constructor.toString) {
	        var arr = obj.constructor.toString().match(
	            /function\s*(\w+)/);

	        if (arr && arr.length == 2) {
	            return arr[1];
	        }
	    }

	    return undefined;
	}
	
	module.exports = {
			getObjectClass: getObjectClass,
			getMySQLConnection: getMySQLConnection
			}
