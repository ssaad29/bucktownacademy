Ext.define('myschoolishness.model.AbsenceAllStudentModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['first_name','last_name','reason','start_date_time','end_date_time','type','tardy_dismissal_time','parent_entered','school_approved','displayTypeExc'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAllStudentsAbsentToday',
        }
	}        
})