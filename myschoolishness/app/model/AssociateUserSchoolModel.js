Ext.define('myschoolishness.model.AssociateUserSchoolModel', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXUser.associateUserWithSchool',
        },
	}
})