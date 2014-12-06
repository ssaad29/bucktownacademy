Ext.define('myschoolishness.view.UserPasswordForm', {
    extend: 'Ext.Panel',
	alias: 'widget.user-password-form',
	xtype: 'user-password-form',
config: {
		title: 'User Password Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'userPasswordForm',
		        	items: [
		        				{
                    			xtype: 'passwordfield',
                    			placeHolder: "Existing password",
                    			itemId: 'existingPassword',
		        		        name: 'existingPassword',
                    			value:""
                    			},
		        		        {
                    			xtype: 'passwordfield',
                    			placeHolder: "Password (required)",
                    			itemId: 'newPassword',
		        		        name: 'newPassword',
                    			value:""
                    			},
                    			{
                    			xtype: 'passwordfield',
                    			placeHolder: "Retype password (required)",
                    			itemId: 'newPasswordMatch',
		        		        name: 'newPasswordMatch',
                    			value:""
                    			}
		        		        ]
		        }],
},

toggleExistingPasswordField: function (show) {
	var fieldSet = this.getComponent('userPasswordForm');
	var existingPasswordField = fieldSet.getComponent("existingPassword");
	if (show) {
		existingPasswordField.setHidden(false);
	} else {
		existingPasswordField.setHidden(true);
	}
},

isShowingExistingPasswordField: function (show) {
	var fieldSet = this.getComponent('userPasswordForm');
	var existingPasswordField = fieldSet.getComponent("existingPassword");
	
	return !existingPasswordField.getHidden();
},

getExistingPassword: function () {
	var fieldSet = this.getComponent('userPasswordForm');
	var existingPasswordField = fieldSet.getComponent("existingPassword");
	return existingPasswordField.getValue();
},

setExistingPassword: function (value) {
	var fieldSet = this.getComponent('userPasswordForm');
	var existingPasswordField = fieldSet.getComponent("existingPassword");
	existingPasswordField.setValue(value);
},

getNewPassword: function () {
	var fieldSet = this.getComponent('userPasswordForm');
	var newPasswordField = fieldSet.getComponent("newPassword");
	return newPasswordField.getValue();
},

setNewPassword: function (value) {
	var fieldSet = this.getComponent('userPasswordForm');
	var newPasswordField = fieldSet.getComponent("newPassword");
	newPasswordField.setValue(value);
},

getNewPasswordMatch: function () {
	var fieldSet = this.getComponent('userPasswordForm');
	var newPasswordField = fieldSet.getComponent("newPasswordMatch");
	return newPasswordField.getValue();
},

setNewPasswordMatch: function (value) {
	var fieldSet = this.getComponent('userPasswordForm');
	var newPasswordField = fieldSet.getComponent("newPasswordMatch");
	newPasswordField.setValue(value);
},

})