Ext.define('myschoolishness.model.DirectoryStaffDetailModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['user_id','first_name','last_name','city','state','addr1','addr2','zip','email','phone'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXDirectory.getUser',
        },
	}      
});