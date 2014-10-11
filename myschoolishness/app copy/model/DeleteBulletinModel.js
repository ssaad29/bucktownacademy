Ext.define('myschoolishness.model.DeleteBulletinModel', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXBulletins.deleteBulletin',
        },
	}
})