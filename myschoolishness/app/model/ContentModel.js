Ext.define('myschoolishness.model.ContentModel', {
	extend: 'Ext.data.Model',
	config:{
		fields:['content'],
		proxy: {
            //Set proxy type
            type: 'direct',
			directFn:'ExtRemote.DXContentService.getContent',
        }
	}        
})