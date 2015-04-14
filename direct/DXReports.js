var db = dbConnection;

var DXReports  = {
    getAttendanceReportHtml: function(params, callback){
    	
    	var start = params.start_date_time;
    	var end = params.end_date_time;
    	console.log("getAttendanceReportHtml:params.start_date_range->" + start);
    	console.log("getAttendanceReportHtml:params.end_date_range->" + end);
		db.getHtmlForAttendanceReport(start,end,callback);
 },


    getSignoutReportHtml: function(params, callback){
    	var start = params.start_date_time;
    	var end = params.end_date_time;
    	console.log("getSignoutReportHtml:params.start_date_range->" + start);
    	console.log("getSignoutReportHtml:params.end_date_range->" + end);
		db.getHtmlForSignOutReport(start,end,callback);
 },
};

module.exports = DXReports;