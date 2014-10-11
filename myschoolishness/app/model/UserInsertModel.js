Ext.define('myschoolishness.model.UserInsertModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['insertId'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.insertOrUpdateUser',
        },
	}  
});