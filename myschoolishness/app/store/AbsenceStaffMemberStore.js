Ext.define('myschoolishness.store.AbsenceStaffMemberStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.AbsenceStaffMemberModel',
		sorters: 'last_name',
		grouper: {
			groupFn: function(record) {
				return record.get('last_name');
		}
	}
	}
})