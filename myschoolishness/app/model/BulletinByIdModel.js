Ext.define('myschoolishness.model.BulletinByIdModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['id','title','message','type'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXBulletins.getBulletinsById',
        },
	}
})