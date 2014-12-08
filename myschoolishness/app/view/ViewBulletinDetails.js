Ext.define('myschoolishness.view.ViewBulletinDetails', {
    extend: 'Ext.Panel',
	alias: "widget.viewbulletindetails",
    xtype: 'viewbulletindetails',
	title: 'View Bulletin',
	config: {
		title: 'View Bulleting',
		layout: 'vbox',
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
		        				text: 'Home'
                				}
                				]
           		},
		        		    {
                    		xtype: 'label',
                    		itemId: 'bulletinTitle',
		        		    name: 'bulletinTitle',
    						style: 'text-align: center;font-size:0.90em;',
    						//padding: 6,
                    		},
                    		{
                    		itemId: 'bulletinMessage',
		        		    name: 'bulletinMessage',
		        		    styleHtmlContent:true,
		        		    xtype: 'scrollabletextarea',
                			readOnly: true,
                			maxRows : 300
                    		},
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
	var messageField = this.getComponent("bulletinMessage");
	messageField.setValue(value);
},

setTitle: function (value) {
	var titleField = this.getComponent("bulletinTitle");
	titleField.setHtml(value);
},

getMessage: function () {
	var messageField = this.getComponent("bulletinMessage");
	return messageField.getValue();
},

getTitle: function () {
	var titleField = this.getComponent("bulletinTitle");
	return titleField.getHtml();
},

})
