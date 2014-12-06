Ext.define('myschoolishness.view.StudentNamePanel', {
    extend: 'Ext.Panel',
	alias: 'widget.student-name-panel',
	xtype: 'student-name-panel',
config: {
		title: 'Student Name Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'childNameForm',
		        	items: [
		        		    {
                    		xtype: 'textfield',
                    		itemId: 'studentFirstName',
                    		placeHolder: "First Name (required)",
		        		    name: 'studentFirstName',
                    		value:""
                    		},
                    		{
                    		xtype: 'textfield',
                    		placeHolder: "Last Name (required)",
                    		itemId: 'studentLastName',
		        		    name: 'studentLastName',
                    		value:""
                    		},
		        		    ]
		        }],
},

setFirstName: function (value) {
	var fieldSet = this.getComponent('childNameForm');
	var firstNameField = fieldSet.getComponent("studentFirstName");
	firstNameField.setValue(value);
},

setLastName: function (value) {
	var fieldSet = this.getComponent('childNameForm');
	var lastNameField = fieldSet.getComponent("studentLastName");
	lastNameField.setValue(value);
},

getFirstName: function () {
	var fieldSet = this.getComponent('childNameForm');
	var firstNameField = fieldSet.getComponent("studentFirstName");
	return firstNameField.getValue();
},

getLastName: function () {
	var fieldSet = this.getComponent('childNameForm');
	var lastNameField = fieldSet.getComponent("studentLastName");
	return lastNameField.getValue();
},

})