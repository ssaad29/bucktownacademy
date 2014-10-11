Ext.define('myschoolishness.model.AbsentModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['start_date_time','end_date_time','reason','absence_id','type','tardy_dismissal_time','parent_entered','school_approved'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAbsences',
        },
	}
	
	    
        
})