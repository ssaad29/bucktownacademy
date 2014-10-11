Ext.define('myschoolishness.model.AbsentCheckForDuplicatesModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['start_date_time','end_date_time','reason','absence_id','type'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.existingAbsencesByDate',
        },
	}
	
	    
        
})