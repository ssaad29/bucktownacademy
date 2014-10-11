Ext.define('myschoolishness.model.CheckDuplicateEmailModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: false,
		fields:['email','id','first_name','last_name'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.checkForDuplicateEmail',
        },
	}
})