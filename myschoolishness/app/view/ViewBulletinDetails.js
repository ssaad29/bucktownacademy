Ext.define('myschoolishness.view.ViewBulletinDetails', {
    extend: 'Ext.Panel',
	alias: "widget.viewbulletindetails",
    xtype: 'viewbulletindetails',
	fullscreen: true,
	title: 'View Bulletin',
	config: {
		title: 'View Bulleting',
		layout: 'fit',
		fullstreen: true,
        items: [
        		{
                			xtype: 'titlebar',
                			itemId: 'dirTitlebar',
                			docked: 'top',
                			items: [
                				{
		        				xtype: 'button',
		        				itemId:'backButtonBulletinDetails',
		        				id:'backButton',
		        				ui: 'back',
		        				padding: '10px',
		        				text: 'Back'
                				}
                				]
           		},
        		{ xtype: 'fieldset',
                   itemId:'bulletinInfo',
		        	items: [
		        		    {
                    		xtype: 'textfield',
                    		itemId: 'bulletinTitle',
                    		placeHolder: "Title",
		        		    name: 'bulletinTitle',
		        		    disabled: true,
                    		value:""
                    		},
                    		{
                    		xtype: 'textareafield',
                    		placeHolder: "Message",
                    		itemId: 'bulletinMessage',
                    		disabled: true,
		        		    name: 'bulletinMessage',
                    		value:""
                    		},
		        		    ]
		        }
        ],
        		        	listeners: [
		        		{
						delegate: '#backButtonBulletinDetails',
						event: 'tap',
						fn: 'onBackButtonTap'
						}
						],
	},

onBackButtonTap: function () {
	this.fireEvent("goHome", this);
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
