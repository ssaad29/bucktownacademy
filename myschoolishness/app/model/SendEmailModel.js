Ext.define('myschoolishness.model.SendEmailModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXEmailService.sendEmail',
        }
	}        
})