Ext.define('myschoolishness.store.IsSignedOutStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.IsSignedOutModel',
		sorters: 'last_name',
		grouper: {
			groupFn: function(record) {
				return record.get('last_name');
		}
	},
	},
	
})