Ext.define('myschoolishness.model.CheckSignedOutModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXSignature.alreadySignedOutCheck',
        },
	}
})