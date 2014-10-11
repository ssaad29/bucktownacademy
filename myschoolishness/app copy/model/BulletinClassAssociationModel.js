Ext.define('myschoolishness.model.BulletinClassAssociationModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['success'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXBulletins.editBulletinClassAssociation',
        }
	}        
})