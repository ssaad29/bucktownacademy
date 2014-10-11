Ext.define('myschoolishness.store.MyKidsStore', {
    extend: 'Ext.data.Store',
	config: {
		model: 'myschoolishness.model.MyKidsModel',
		autoLoad: true,
		},
})