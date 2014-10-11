Ext.define('myschoolishness.store.DirectoryStudentsStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.DirectoryStudentsModel',
		autoLoad: true,
		sorters: 'class',
		grouper: {
			groupFn: function(record) {
				return record.get('class');
			}
		},
		listeners: [
            {
                fn: 'onStoreLoad',
                event: 'load'
            }
        ]
	},
	
	onStoreLoad: function(store, records, successful, operation, eOpts) {
			var newRecordArray = [];
			var dupesArray =[];
			for (var i=0;i<records.length;i++) {
				if (dupesArray.indexOf(records[i].get('student_id')) === -1) {
					newRecordArray.push(records[i]);
					dupesArray.push(records[i].get('student_id'));
				}				
			}
		store.setData(newRecordArray);
	}
})