Ext.define('myschoolishness.model.DeleteStudentModel', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXStudent.deleteStudent',
        },
	}
})