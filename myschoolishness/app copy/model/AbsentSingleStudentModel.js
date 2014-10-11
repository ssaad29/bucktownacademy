Ext.define('myschoolishness.model.AbsentSingleStudentModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success','reason','student_id','absence_id','start_date_time','end_date_time','type','tardy_dismissal_time','parent_entered','school_approved','displayString'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAllAbsencesForStudent',
        },
	}      
})