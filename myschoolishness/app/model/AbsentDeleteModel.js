Ext.define('myschoolishness.model.AbsentDeleteModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.deleteAbsence',
        },
	}
});