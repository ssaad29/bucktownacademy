Ext.define('myschoolishness.view.StudentInvitePanel', {
    extend: 'Ext.Panel',
	alias: 'widget.student-invite-panel',
	xtype: 'student-invite-panel',
config: {
		title: 'Invite Form',
		fullstreen: true,
        items: [ { xtype: 'fieldset',
                   itemId:'inviteFormName',
		        	items: [
		        		    {
                    		xtype: 'textareafield',
                    		itemId: 'inviteField',
                    		placeHolder: "Enter comma separated list of email addresses for parents you wish to invite for this student",
		        		    name: 'invite',
                    		value:""
                    		},
                    		{
		        			xtype: 'button',
		        			itemId:'inviteButton',
		        			ui: 'action',
		        			padding: '10px',
		        			text: 'Invite'
                			}
		        		    ]
		        }],
		    	     listeners: [
		        			{
							delegate: '#inviteButton',
							event: 'tap',
							fn: 'onInviteButtonTap'
							},
							{
							delegate: '#segBtn',
							event: 'toggle',
							fn: 'onSegButtonTap'
							}
						]
},


onInviteButtonTap: function () {
	console.log("Invite button tapped");
	var fieldSet = this.getComponent('inviteFormName');
	var inviteField = fieldSet.getComponent("inviteField");
	var toInvite = inviteField.getValue();
	console.log("Inviting " + toInvite);
	
	var checkEmailStore = Ext.create('myschoolishness.store.CheckDuplicateEmailStore', {
			model: 'myschoolishness.model.CheckDuplicateEmailModel'
			});
	checkEmailStore.load({
    		//define the parameters of the store:
    		params: {
        				token: sessionStorage.getItem("token"),
        				email: toInvite,
    		    	},

    		scope: this,
    		callback : function(records, operation, success) {
							if (success) {
								if (records.length > 0) {
									var first = records[0].get("first_name");
									var last = records[0].get("last_name");
									var email = records[0].get("email");
									Ext.Msg.alert('Please add parent instead of sending invite',email + " belongs to " + first + " " + last, Ext.emptyFn);
									return;
								} else {
									var host = sessionStorage.getItem("first_name") + " " + sessionStorage.getItem("last_name");
									var studentId = sessionStorage.getItem("child_crud.student_id");
									console.log("STUDENT ID " + studentId);
									var emailStore = Ext.create('myschoolishness.store.SendEmailStore', {
									model: 'myschoolishness.model.SendEmailModel'
									});
									emailStore.load({
    								//define the parameters of the store:
    								params: {
        							token: sessionStorage.getItem("token"),
        							recipient: toInvite,
        							template: 'invite',
        							host: host,
        							schoolId: sessionStorage.getItem("school_id"),
        							studentId: studentId
    		    					},

    								scope: this,
    								callback : function(records, operation, success) {
									if (success) {
										Ext.Msg.alert("Success","Your invitation was sent", Ext.emptyFn);
									} else {
										Ext.Msg.alert('Error","Please try again later or email admin@schoolishness.com for help', Ext.emptyFn);
											}
    									}
									})
							}
    					} else {
								console.log("Error while checking to see if this email belongs to an existing user");
						}
				}
	})
			
	
},


setInvite: function (value) {
	var fieldSet = this.getComponent('inviteFormName');
	var inviteField = fieldSet.getComponent("inviteField");
	inviteField.setValue(value);
},

getInvite: function () {
	var fieldSet = this.getComponent('inviteFormName');
	var inviteField = fieldSet.getComponent("inviteField");
	return inviteField.getValue();
},

})