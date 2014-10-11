Ext.define('myschoolishness.view.StudentDetailsPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.student-details-panel',
	xtype: 'student-details-panel',
config: {
		title: 'Student Details Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'studentDetailsForm',
		        	items: [
		        		    {
                    		xtype: 'textfield',
                    		itemId: 'childAllergies',
		        		    name: 'childAllergies',
		        		    placeHolder: "Allergies",
                    		},
                    		{
                    		xtype: 'textareafield',
                    		placeHolder: "Comments",
                    		itemId: 'childComments',
		        		    name: 'childComments',
                    		},
		        		    ]
		        }],
},

setAllergies: function (value) {
	var fieldSet = this.getComponent('studentDetailsForm');
	var allergiesField = fieldSet.getComponent("childAllergies");
	allergiesField.setValue(value);
},

setComments: function (value) {
	var fieldSet = this.getComponent('studentDetailsForm');
	var commentsField = fieldSet.getComponent("childComments");
	commentsField.setValue(value);
},

getAllergies: function () {
	var fieldSet = this.getComponent('studentDetailsForm');
	var allergiesField = fieldSet.getComponent("childAllergies");
	return allergiesField.getValue();
},

getBirthday: function () {
	var fieldSet = this.getComponent('studentDetailsForm');
	var birthdayField = fieldSet.getComponent("studentBirthday");
	return birthdayField.getValue();
},

getComments: function () {
	var fieldSet = this.getComponent('studentDetailsForm');
	var commentsField = fieldSet.getComponent("childComments");
	return commentsField.getValue();
},

})