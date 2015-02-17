var db = dbConnection;

var DXReports  = {
    getAttendanceReportHtml: function(params, callback){
    	
    	var start = params.start_date_time;
    	var end = params.end_date_time;
    	console.log("params.start_date_range->" + start);
    	console.log("params.end_date_range->" + end);
		db.getHtmlForAttendanceReport(start,end,callback);
 },
};
module.exports = DXReports;