Ext.define('myschoolishness.model.AbsentGetByIdModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['start_date_time','end_date_time','reason','id','type','tardy_dismissal_time','school_entered','parent_entered'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAbsenceById',
        },
	}
	
	    
        
})