Ext.define('myschoolishness.view.UserProfilePanel', {
    extend: 'Ext.Panel',
	alias: 'widget.user-profile-panel',
	xtype: 'user-profile-panel',
config: {
		title: 'User Profile Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'userProfileForm',
		        	items: [
		        					{
                    				xtype: 'textfield',
                    				itemId: 'firstname',
                    				placeHolder: "First Name",
		        		        	name: 'firstname',
		        		        	required: 'true',
                    				value:""
                    				},
                    				{
                    				xtype: 'textfield',
                    				placeHolder: "Last Name",
                    				itemId: 'lastname',
		        		        	name: 'lastname',
		        		        	required: 'true',
                    				value:""
                    				},
		        				
		        		        	]
		        }],
},

initialize: function () {
	var roles =myschoolishness.controller.Utils.getRoles();
	
	if (roles === null) {
		return;
	}
	
},

setFirstName: function (value) {
	var fieldSet = this.getComponent('userProfileForm');
	var firstNameField = fieldSet.getComponent("firstname");
	firstNameField.setValue(value);
},

setLastName: function (value) {
	var fieldSet = this.getComponent('userProfileForm');
	var lastNameField = fieldSet.getComponent("lastname");
	lastNameField.setValue(value);
},

getFirstName: function () {
	var fieldSet = this.getComponent('userProfileForm');
	var firstNameField = fieldSet.getComponent("firstname");
	return firstNameField.getValue();
},

getLastName: function () {
	var fieldSet = this.getComponent('userProfileForm');
	var lastNameField = fieldSet.getComponent("lastname");
	return lastNameField.getValue();
},


})