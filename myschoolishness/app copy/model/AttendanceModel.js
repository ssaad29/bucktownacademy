Ext.define('myschoolishness.model.AttendanceModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['first_name','last_name','class','reason','user_id','student_id','present','absence_id','start_date_time','end_date_time','display_first_name','display_last_name','type','tardy_dismissal_time','parent_entered','school_approved'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getStudentsForTeacher',
        },
	}        
})