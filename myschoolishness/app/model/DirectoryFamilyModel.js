Ext.define('myschoolishness.model.DirectoryFamilyModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['student_id','user_id','student_first','student_last','public_profile','grade','class','allergies','comments','parent_first','parent_last','city','state','addr1','addr2','zip','email','cell_phone','phone','display_city','display_state','display_addr1','display_addr2','display_zip','display_email','display_phone','display_cell'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXDirectory.getFamily',
        },
	}     
})