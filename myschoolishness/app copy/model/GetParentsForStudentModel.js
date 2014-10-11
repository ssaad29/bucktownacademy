Ext.define('myschoolishness.model.GetParentsForStudentModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['student_id','user_id','parent_first','parent_last'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXStudent.getParents',
        },
	}
})