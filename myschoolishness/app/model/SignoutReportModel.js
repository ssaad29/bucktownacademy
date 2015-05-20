Ext.define('myschoolishness.model.SignoutReportModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['html'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXReports.getSignoutReportHtml',
        }
	}        
})