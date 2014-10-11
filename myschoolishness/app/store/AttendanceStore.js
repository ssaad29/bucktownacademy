Ext.define('myschoolishness.store.AttendanceStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.AttendanceModel',
		sorters: 'last_name',
		grouper: {
			groupFn: function(record) {
				return record.get('last_name');
		}
	}
	}
})