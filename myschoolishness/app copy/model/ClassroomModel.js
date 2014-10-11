Ext.define('myschoolishness.model.ClassroomModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['id','name'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXClassroom.getAllClassroomsForSchool',
        },
	}
})