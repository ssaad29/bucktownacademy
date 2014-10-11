Ext.define('myschoolishness.model.AbsentInsertModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.insertOrUpdateAbsence',
        },
	}  
});