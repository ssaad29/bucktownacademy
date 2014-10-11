/**
 * New node file
 */
var common = require('./common');
var connection = common.getMySQLConnection();

exports.authenticate = function(req, res){
	console.log("IN AUTHENTICATE->");

    if (connection) {
        var username = req.params.username;
        var password = req.params.password;
        
        console.log(req.query);
        console.log("username->" + username);
        console.log("password->" + password);
        
    	  var queryString = 'select count(*) from user where user_name = ? and password =?';
          connection.query(queryString, [username,password], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};
