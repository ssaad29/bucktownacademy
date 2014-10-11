Ext.define('myschoolishness.model.UserModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['id','user_name','school_id','password','public_profile','first_name','last_name','roles','addr1','addr2','city','state','zip','cell_phone','hint','email','last_update'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.getUser',

        },
	}
	
	    
        
})