Ext.define('myschoolishness.model.UsersModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['user_id','first_name','last_name','roles'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.getAllUsers',
        },
	}
})