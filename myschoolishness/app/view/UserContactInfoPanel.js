Ext.define('myschoolishness.view.UserContactInfoPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.user-contact-info-panel',
	xtype: 'user-contact-info-panel',
	    requires: ['Ext.field.Email'],
config: {
		title: 'User Contact Info Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'userContactInfo',
		        	items: [
		        		        		{
                    					xtype: 'emailfield',
                    					itemId: 'emailField',
		        		        		name: 'emailField',
		        		        		placeHolder: "Email",
                    					value:""
                    					},
                    					{
                    					xtype: 'textfield',
                    					itemId: 'phoneField',
		        		        		name: 'phoneField',
		        		        		placeHolder: "Phone",
                    					value:""
                    					},
                    					{
                    					xtype: 'textfield',
                    					placeHolder: "Cell Phone",
                    					itemId: 'cellphoneField',
		        		        		name: 'cellphoneField',
                    					value:""
                    					}
		        		    ]
		        }],
},

setEmail: function (value) {
	var fieldSet = this.getComponent('userContactInfo');
	var emailField = fieldSet.getComponent("emailField");
	emailField.setValue(value);
},

setPhone: function (value) {
	var fieldSet = this.getComponent('userContactInfo');
	var phoneField = fieldSet.getComponent("phoneField");
	phoneField.setValue(value);
},

setCell: function (value) {
	var fieldSet = this.getComponent('userContactInfo');
	var cellField = fieldSet.getComponent("cellphoneField");
	cellField.setValue(value);
},

getEmail: function () {
	var fieldSet = this.getComponent('userContactInfo');
	var emailField = fieldSet.getComponent("emailField");
	return emailField.getValue();
},

getPhone: function () {
	var fieldSet = this.getComponent('userContactInfo');
	var phoneField = fieldSet.getComponent("phoneField");
	return phoneField.getValue();
},

getCell: function () {
	var fieldSet = this.getComponent('userContactInfo');
	var cellField = fieldSet.getComponent("cellphoneField");
	return cellField.getValue();
},
})