Ext.define('myschoolishness.store.AbsentManageStaffStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.AbsentManageStaffModel',
		autoLoad: true,
		sorters: 'last_name',
		grouper: {
			groupFn: function(record) {
				return record.get('last_name')[0];
		}
	}
	}
})