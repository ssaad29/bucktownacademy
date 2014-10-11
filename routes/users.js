/**
 * New node file
 */
var common = require('./common');
var connection = common.getMySQLConnection();

exports.all = function(req, res){
	console.log("IN ALL->");

    if (connection) {
        connection.query('select * from user', function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};


exports.one = function(req, res){
	console.log("IN ONE->");

    var id = req.params.id;
    if (connection) {
        var queryString = 'select * from user where id = ?';
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};
