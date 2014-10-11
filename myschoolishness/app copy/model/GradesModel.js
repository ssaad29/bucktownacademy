Ext.define('myschoolishness.model.GradesModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['id','name'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXGrades.getAllGradesForSchool',
        },
	}
})