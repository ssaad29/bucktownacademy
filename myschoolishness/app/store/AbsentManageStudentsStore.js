Ext.define('myschoolishness.store.AbsentManageStudentsStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.AbsentManageStudentsModel',
		autoLoad: true,
		sorters: 'class',
		grouper: {
			groupFn: function(record) {
				return record.get('class');
		}
	}
	}
})