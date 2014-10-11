Ext.define('myschoolishness.model.CheckEmailTokenModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['type','creation_date'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.checkEmailToken',
        }
	}        
})