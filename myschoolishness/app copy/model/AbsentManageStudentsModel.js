Ext.define('myschoolishness.model.AbsentManageStudentsModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['first_name','last_name','class','grade','student_id','school_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAllStudents',
        },
	}        
})