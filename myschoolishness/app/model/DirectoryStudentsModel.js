Ext.define('myschoolishness.model.DirectoryStudentsModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['student_id','student_first','student_last','class','parent_first','parent_last'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXDirectory.getAllStudents',
        },
	}       
})