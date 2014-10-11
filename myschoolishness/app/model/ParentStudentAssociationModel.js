Ext.define('myschoolishness.model.ParentStudentAssociationModel', {
	extend: 'Ext.data.Model',
	config:{
		autoLoad: true,
		fields:['userId','parentId','studentId'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXStudent.editStudentParentAssociation',
        },
	}
})