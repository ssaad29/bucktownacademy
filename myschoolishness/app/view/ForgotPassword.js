Ext.define('myschoolishness.view.ForgotPassword', {
    extend: 'Ext.Panel',
	alias: 'widget.forgot-password-panel',
	xtype: 'forgot-password-panel',
config: {
		title: 'Invite Form',
		fullstreen: true,
        items: [ 
		        			{
		        			xtype:'label',
		        			style: 'color:#990000;margin:5px 0px;',
		        			html: 'Enter your email address to reset your password. You may need to check your spam folder or unblock admin@myschoolishness.com.',
		        			},
		        		    {
                    			xtype: 'emailfield',
                    			itemId: 'emailField',
		        		        name: 'emailField',
		        		        placeHolder: "Email",
                    			value:""
                    		},
                    		

                    		{
		        			xtype: 'button',
		        			itemId:'forgotSubmitButton',
		        			ui: 'action',
		        			padding: '10px',
		        			text: 'Submit'
                			}],
		    	     listeners: [
		        			{
							delegate: '#forgotSubmitButton',
							event: 'tap',
							fn: 'onSubmitButtonTap'
							}
						]
},

onSubmitButtonTap: function () {
		console.log("forgot button tapped");
		var emailField = this.getComponent("emailField");
		
		
		var getEmailSore = Ext.create('myschoolishness.store.CheckDuplicateEmailStore', {
			model: 'myschoolishness.model.CheckDuplicateEmailModel'
			});
		getEmailSore.load({
    		//define the parameters of the store:
    		params: {
        				token: sessionStorage.getItem("token"),
        				email: emailField.getValue(),
    		    	},

    		scope: this,
    		callback : function(records, operation, success) {
							if (success) {
								if (records.length > 0) {
									var first = records[0].get("first_name");
									var last = records[0].get("last_name");
									var email = records[0].get("email");
									var userId = records[0].get("id");
									
									console.log("first " + first);
									console.log("last " + last);
									console.log("email " + email);
									console.log("userId " + userId);
									
									var emailStore = Ext.create('myschoolishness.store.SendEmailStore', {
										model: 'myschoolishness.model.SendEmailModel'
									});
		
									emailStore.load({
    								//define the parameters of the store:
    								params: {
        								userId: userId,
        								token: sessionStorage.getItem("token"),
        								template: 'forgotPassword',
        								username: first + " " + last ,
        								recipient: email,
    		    					},

    								scope: this,
    								callback : function(records, operation, success) {
									if (success) {
										Ext.Msg.alert("Success","Please check your inbox for an email from admin@myschoolishness.com", Ext.emptyFn);
										} else {
										Ext.Msg.alert('Error","Please try again later or email admin@schoolishness.com for help', Ext.emptyFn);
									}
    							}
							})
								return;
							} else {
									Ext.Msg.alert('Email address not registered with myschoolishness.com',"Please contact your child's teacher to be added to myschoolishness", Ext.emptyFn);
							}
    					} else {
								console.log("Error while finding this email address. Please email admin@myschoolishness.com");
						}
				}
	})
	
		var username = sessionStorage.getItem("first_name") + " " + sessionStorage.getItem("last_name");
		var userId = sessionStorage.getItem("user_id");
		console.log("userId " + userId);

},

})