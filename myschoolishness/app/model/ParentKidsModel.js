Ext.define('myschoolishness.model.ParentKidsModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['student_first','student_last','student_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.getChildren',
        },
	}        
});