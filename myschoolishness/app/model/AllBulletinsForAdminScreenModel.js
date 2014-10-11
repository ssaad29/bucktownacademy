Ext.define('myschoolishness.model.AllBulletinsForAdminScreenModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['id','title','message','type'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXBulletins.getAllBulletinsForAdminScreen',
        }
	}        
})