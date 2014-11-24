Ext.define('myschoolishness.model.IsSignedOutModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['id','display_first_name','display_last_name','first_name','last_name','signed_out_today','student_id',],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXSignature.getStudentsSignedOutToday',
        },
	}        
})