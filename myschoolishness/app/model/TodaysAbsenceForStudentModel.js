Ext.define('myschoolishness.model.TodaysAbsenceForStudentModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['absence_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getTodaysAbsenceForStudent',
        },
	}
	
});