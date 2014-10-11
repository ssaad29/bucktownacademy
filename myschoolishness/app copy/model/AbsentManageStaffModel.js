Ext.define('myschoolishness.model.AbsentManageStaffModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['first_name','last_name','role','user_id','school_id'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAllStaff',
        },
	}        
})