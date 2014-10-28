Ext.define('myschoolishness.model.InsertSignatureModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['success'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXSignature.insertSignature',
        },
	}
})