Ext.define('myschoolishness.model.AttendanceReportModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['html'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXReports.getAttendanceReportHtml',
        }
	}        
})