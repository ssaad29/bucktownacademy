Ext.define('myschoolishness.model.SaveBulletinModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['id','insertId'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXBulletins.insertOrUpdateBulletin',
        }
	}        
})
