Ext.define('myschoolishness.store.DirectoryStaffStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.DirectoryStaffModel',
		autoLoad: true,
		sorters: ['last_name'],
		grouper: {
			groupFn: function(record) {
				return record.get('last_name')[0];
			}
		}
	}
})