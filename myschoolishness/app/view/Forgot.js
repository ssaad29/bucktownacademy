Ext.define('myschoolishness.view.Forgot', {
    extend: 'Ext.Panel',
	alias: "widget.forgotview",
    xtype: 'forgotview',
	requires: ['Ext.form.FieldSet','Ext.form.Text','Ext.Label','Ext.Img'],
	config: {
		title: 'Forgot',
		fullstreen: true,
		items: [
					{
						xtype:'panel',
						html: '<img style="height: 100px; width: 100px;" src="images/logo-placeholder.png" />',

					},
					{
						xtype:'label',
						html: 'School Simplified',
			        	style: 'font:20px Comic Sans MS,cursive, sans-serif;'

					},
		        	{
		        		xtype: 'fieldset',
		        		items: [
		        		        	{
		        		        		xtype:'textfield',
		        		        		placeHolder: 'Email you use for school',
		        		        		itemId: 'emailTextField',
		        		        		name: 'emailTextField',
		        		        		required: true
		        		        	},
		        		        ]
		        	},
		        	{	
		        		align:'center',
		        		xtype: 'button',
		        		itemId:'emailButton',
		        		ui: 'action',
		        		padding: '10px',
		        		text: 'Send me my password'
		        	},
		        	{	
		        		align:'center',
		        		xtype: 'spacer',
		        		padding: '10px',
		        	},

		        	{
		        		xtype: 'fieldset',
		        		items: [
	        		        	{
	        		        		xtype:'checkboxfield',
	        		        		name: 'problems',
	        		        		label: 'Having problems?',
	        		        		itemId: 'problems',
	        		        		checked: false,
	        		        		labelWrap:'true',
	        		        	},

		        		        	{
		        		        		xtype:'textfield',
		        		        		placeHolder: 'Your name',
		        		        		itemId: 'nameTextField',
		        		        		name: 'nameTextField',
		        		        		hidden: true,
		        		        		hideAnimation: 'fadeOut',
		        		        		showAnimation: 'fadeIn',
		        		        	},
		        		        	{
		        		        		xtype:'textfield',
		        		        		placeHolder: 'Your email or phone',
		        		        		itemId: 'emailHelpTextField',
		        		        		name: 'emailHelpTextField',
		        		        		hidden: true,
		        		        		hideAnimation: 'fadeOut',
		        		        		showAnimation: 'fadeIn',
		        		        	},

		        		        ]
		        	},
		        	{	
		        		align:'center',
		        		xtype: 'button',
		        		itemId:'helpButton',
		        		ui: 'action',
		        		padding: '10px',
		        		text: 'Let us help you',
		        		hidden: true,
		        		hideAnimation: 'fadeOut',
		        		showAnimation: 'fadeIn',
		        	}

		        ],
		listeners: [{
			delegate: '#emailButton',
			event: 'tap',
			fn: 'onEmailButtonTap'
		},
		{
			delegate: '#helpButton',
			event: 'tap',
			fn: 'onHelpButtonTap'
		},
		{
			delegate: '#problems',
			event: 'check',
			fn: 'havingProblems'
		},
		{
			delegate: '#problems',
			event: 'uncheck',
			fn: 'havingProblems'
		}
		]
	},
	
	
	havingProblems: function () {
		nameField = this.down('#nameTextField');
		emailField = this.down('#emailHelpTextField');
		helpButton = this.down('#helpButton');
		checkBox = this.down('#problems');
		if (checkBox.isChecked()) {
			nameField.setHidden(false);
			emailField.setHidden(false);
			helpButton.setHidden(false);
		} else {
			nameField.setHidden(true);
			emailField.setHidden(true);
			helpButton.setHidden(true);
		}
	},

	
	onEmailButtonTap: function () {
		Ext.Msg.alert('Forgot Password','In the real app an email with the username,password and hint will be sent',Ext.emptyFn);
	},
	
	onHelpButtonTap: function () {
		Ext.Msg.alert('Forgot Password','In the real app an email will be sent to Schoolishness LLC',Ext.emptyFn);
	}


})