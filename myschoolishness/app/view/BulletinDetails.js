Ext.define('myschoolishness.view.BulletinDetails', {
    extend: 'Ext.Panel',
	alias: "widget.bulletindetails",
    xtype: 'bulletindetails',
	fullscreen: true,
	title: 'Edit Bulletin',
	config: {
		title: 'Edit Bulleting',
		layout: 'fit',
		fullstreen: true,
        items: [
        		{ xtype: 'fieldset',
                   itemId:'bulletinInfo',
		        	items: [
		        		    {
                    		xtype: 'textfield',
                    		itemId: 'bulletinTitle',
                    		placeHolder: "Title",
		        		    name: 'bulletinTitle',
                    		value:""
                    		},
                    		{
                    		xtype: 'textareafield',
                    		placeHolder: "Message",
                    		itemId: 'bulletinMessage',
		        		    name: 'bulletinMessage',
                    		value:""
                    		},
		        		    ]
		        }
        ],
	},
	
setMessage: function (value) {
	var fieldSet = this.getComponent('bulletinInfo');
	var messageField = fieldSet.getComponent("bulletinMessage");
	messageField.setValue(value);
},

setTitle: function (value) {
	var fieldSet = this.getComponent('bulletinInfo');
	var titleField = fieldSet.getComponent("bulletinTitle");
	titleField.setValue(value);
},

getMessage: function () {
	var fieldSet = this.getComponent('bulletinInfo');
	var messageField = fieldSet.getComponent("bulletinMessage");
	return messageField.getValue();
},

getTitle: function () {
	var fieldSet = this.getComponent('bulletinInfo');
	var titleField = fieldSet.getComponent("bulletinTitle");
	return titleField.getValue();
},

})
