Ext.define('myschoolishness.model.DirectoryStaffModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['first_name','last_name','user_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXDirectory.getAllStaff'
        },
	}      
});