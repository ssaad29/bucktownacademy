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
		        		    xtype:'checkboxfield',
		        		    name: 'school-level',
		        		    label: 'School Wide Bulletin',
		        		    labelWidth: '50%',
		        		    itemId: 'school-wide',
		        		    checked: true,
		        		    labelWrap:'false',
		        			},
		        		    {
                    		xtype: 'textfield',
                    		itemId: 'bulletinTitle',
                    		placeHolder: "Title (required)",
		        		    name: 'bulletinTitle',
                    		value:""
                    		},
                    		{
                    		xtype: 'textareafield',
                    		placeHolder: "Message (required)",
                    		itemId: 'bulletinMessage',
		        		    name: 'bulletinMessage',
                    		value:""
                    		},
		        		    ]
		        }
        ],
	},

setType: function (type) {
	var fieldSet = this.getComponent('bulletinInfo');
	var schoolWideCheckBox = fieldSet.getComponent("school-wide");
	schoolWideCheckBox.setChecked(type);
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

getType: function () {
	var fieldSet = this.getComponent('bulletinInfo');
	var schoolWideCheckBox = fieldSet.getComponent("school-wide");
	return schoolWideCheckBox.isChecked();
},

})
