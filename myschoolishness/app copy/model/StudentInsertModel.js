Ext.define('myschoolishness.model.StudentInsertModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXStudent.insertOrUpdateStudent',
        },
	}  
});