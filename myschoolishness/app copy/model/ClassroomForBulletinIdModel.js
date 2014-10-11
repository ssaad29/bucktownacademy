Ext.define('myschoolishness.model.ClassroomForBulletinIdModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['id','name'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXBulletins.getClassroomsForBulletinId',
        },
	}
})