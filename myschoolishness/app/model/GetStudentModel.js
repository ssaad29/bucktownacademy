Ext.define('myschoolishness.model.GetStudentModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['id','first_name','last_name','allergies','comments','classroom','grade','birthdate'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXStudent.getStudentById',
        },
	}      
})