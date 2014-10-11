Ext.define('myschoolishness.model.CheckTokenModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success','session_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.checkTokenValidity',
        },
	}
})