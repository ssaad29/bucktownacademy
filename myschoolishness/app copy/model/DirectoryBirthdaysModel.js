Ext.define('myschoolishness.model.DirectoryBirthdaysModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: false,
		fields:['first_name','last_name','type','id','type','birthdate','display_birthdate'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXDirectory.getBirthdays',
        },
	}
})