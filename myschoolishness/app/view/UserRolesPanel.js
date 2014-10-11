Ext.define('myschoolishness.view.UserRolesPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.user-roles-panel',
	xtype: 'user-roles-panel',
config: {
		title: 'User Roles Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'userRolesForm',
		        	items: [
		        		        	{
		        		    		xtype:'checkboxfield',
		        		    		name: 'Admin',
		        		    		label: 'Admin',
		        		    		itemId: 'adminCheckbox',
		        		    		checked: false,
		        		    		labelWrap:'true',
		        					},
		        					
		        					{
		        		    		xtype:'checkboxfield',
		        		    		name: 'Teacher',
		        		    		label: 'Camp Leader',
		        		    		itemId: 'teacherCheckbox',
		        		    		checked: false,
		        		    		labelWrap:'true',
		        					},
		        					{
		        		    		xtype:'checkboxfield',
		        		    		name: 'Parent',
		        		    		label: 'Parent',
		        		    		itemId: 'parentCheckbox',
		        		    		checked: false,
		        		    		labelWrap:'true',
		        					}
		        					
		        		        	]
		        }],
},

initialize: function () {
	var roles =myschoolishness.controller.Utils.getRoles();
	
	if (roles === null) {
		return;
	}
	
	var fieldSet = this.getComponent('userRolesForm');
	var adminCheckbox = fieldSet.getComponent("adminCheckbox");
	var teacherCheckbox = fieldSet.getComponent("teacherCheckbox");
	var parentCheckbox = fieldSet.getComponent("parentCheckbox");
	
	if (roles.indexOf("A") === -1) {
			adminCheckbox.setHidden(true);
			teacherCheckbox.setHidden(true);
			parentCheckbox.setHidden(true);
	} 
},

setRoles: function (roles) {
	var fieldSet = this.getComponent('userRolesForm');
	var adminCheckbox = fieldSet.getComponent("adminCheckbox");
	var teacherCheckbox = fieldSet.getComponent("teacherCheckbox");
	var parentCheckbox = fieldSet.getComponent("parentCheckbox");
	
	if (roles.indexOf("A") === -1) {
			adminCheckbox.setChecked("false");
	} else {
			adminCheckbox.setChecked("true");
	}
		
	if (roles.indexOf("T") === -1) {
			teacherCheckbox.setChecked("false");
	} else {
			teacherCheckbox.setChecked("true");
	}
	
	if (roles.indexOf("P") === -1) {
			parentCheckbox.setChecked("false");
	} else {
			parentCheckbox.setChecked("true");
	}
	
	
},

getRoles: function () {
	var fieldSet = this.getComponent('userRolesForm');
	var adminCheckbox = fieldSet.getComponent("adminCheckbox");
	var teacherCheckbox = fieldSet.getComponent("teacherCheckbox");
	var parentCheckbox = fieldSet.getComponent("parentCheckbox");
	
	var roles = "";
		
	if (adminCheckbox.isChecked()) {
		roles = roles + "A";
	}
	
	if (teacherCheckbox.isChecked()) {
		roles = roles + "T";
	}
	if (parentCheckbox.isChecked()) {
		roles = roles + "P";
	}
	
	return roles;
},


})