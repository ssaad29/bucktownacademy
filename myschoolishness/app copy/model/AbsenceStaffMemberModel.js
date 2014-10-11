Ext.define('myschoolishness.model.AbsenceStaffMemberModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['first_name','last_name','reason','absence_id','start_date_time','end_date_time'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXAbsent.getAbsencesForStaffMember',
        },
	}       
});