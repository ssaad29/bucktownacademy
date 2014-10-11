Ext.define('myschoolishness.model.UserByIdModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['id','user_name','password','roles','first_name','last_name','phone','email','addr1','addr2','city','state','zip','public_profile','cell_phone','birthdate','school_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.getUserById',
        },
	}
})