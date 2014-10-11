Ext.define('myschoolishness.model.TokenModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success','session_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.getToken',
        },
	}
})