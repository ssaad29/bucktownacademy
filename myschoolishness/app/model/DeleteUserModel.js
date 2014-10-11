Ext.define('myschoolishness.model.DeleteUserModel', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.deleteUser',
        },
	}
})