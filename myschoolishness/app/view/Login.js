Ext.define('myschoolishness.view.Login', {
    extend: 'Ext.Panel',
	alias: "widget.loginview",
	requires: [
	'Ext.form.FieldSet','Ext.form.Password',
	'Ext.form.Checkbox',
	'Ext.form.Text',
	'Ext.Label',
	'Ext.Img'],
	
	config: {
		title: 'Login',
		fullstreen: true,
		itemId:'loginWindow',
		items: [
				{
				xtype:'panel',
		        layout: 'fit',
		        		
				items: [
						{
							xtype:'panel',
							html: '<center><img src="images/Bucktown_Academy_Web_Logo_Small.jpg" /></center> ',
			        		style: 'font:20px Comic Sans MS,cursive, sans-serif;',
			        		flex:'3',
						},


		        			{
		        		    xtype:'checkboxfield',
		        		    name: 'rem',
		        		    label: 'Remember Me',
		        		    labelWidth: '50%',
		        		    itemId: 'rem',
		        		    checked: true,
		        		    labelWrap:'false',
		        		    flex:'1',
		        			}
		        			
		        	   ]
		        	},
		        	{
		        		xtype:'label',
		        		html: 'Login failed. Please enter the correct credentials.',
		        		itemId: 'signInFailedLabel',
		        		hidden: true,
		        		hideAnimation: 'fadeOut',
		        		showAnimation: 'fadeIn',
		        		style: 'color:#990000;margin:5px 0px;'
		        	},
		        	{
		        		xtype: 'fieldset',
		        		items: [
		        		        	{
		        		        		xtype:'textfield',
		        		        		placeHolder: 'Email address',
		        		        		itemId: 'userNameTextField',
		        		        		name: 'userNameTextField',
		        		        		required: true
		        		        	},
		        		        	{
		        		        		xtype:'passwordfield',
		        		        		placeHolder: 'Password',
		        		        		itemId: 'passwordTextField',
		        		        		name: 'passwordTextField',
		        		        		required: true
		        		        	},
		        		        ]
		        	},
		        	{	
		        		align:'center',
		        		xtype: 'button',
		        		itemId:'logInButton',
		        		ui: 'action',
		        		padding: '10px',
		        		text: 'Log In'
		        	},
		        	{
		        			align:'center',
		        			xtype:'button',
		        			itemId:'forgotButton',
		        			ui: 'small',
		        			margin: '20',
		        			text: 'forgot username/password? >>'
		        	}
		        	
		        ],
		        
		listeners: [{
			delegate: '#logInButton',
			event: 'tap',
			fn: 'onLogInButtonTap'
		},
		{
			delegate: '#logInButton',
			event: 'keyup',
			fn: 'onLogInButtonTap'
		},
		{
			delegate: '#forgotButton',
			event: 'tap',
			fn: 'onForgotButtonTap'
		}
		
		]
	},
	
	show: function () {
		var roles = sessionStorage.getItem("roles");

		if (roles === null || roles === undefined || roles.length < 1) {
			this.checkForEmailToken();
		} else {			
			myschoolishness.controller.Utils.hasRequiredSessionInfo(true);	
		}
	},
	
	checkForEmailToken: function () {
		var params = Ext.Object.fromQueryString(window.location.search);
		var token = sessionStorage.getItem("token");
		if (token!=null && token!=undefined && token==="processed") {
			token===null;
			token = sessionStorage.removeItem("token");
			window.location.search="";
			return;
		} else {
			 token = params.token;
		}
		var student_id = params.student_id;
		var userId = params.userId;
		var schoolId = params.schoolId;
		sessionStorage.setItem("school_id",schoolId);
		
		if (token!=null && token!=undefined && token.length > 0) {
			var tokenStore = Ext.create('myschoolishness.store.CheckEmailTokenStore', {
				model: "myschoolishness.model.CheckEmailTokenModel"
			});
	
			tokenStore.load({
    		scope: this,
			params: {
        		token: token,
    		},
    		callback : function(records, operation, success) {	
					if (success ===true) {
						var type = records[0].get("type");
						var date = records[0].get("creation_date");
						
						var clientokenStore = Ext.create('myschoolishness.store.TokenStore', {
							model: "myschoolishness.model.TokenModel",
							token: sessionStorage.getItem("token"),
						});
			
			
					clientokenStore.load({
    				scope: this,
    				callback : function(tokenRecords, operation, success) {	
					if (success ===true) {
						sessionStorage.setItem("token", tokenRecords[0].get("session_id"));
						if (type === "registration") {
							sessionStorage.setItem("registration.student_id", student_id);
							this.fireEvent("doNewRegistration", this);
						} else if (type === "forgotPassword") {
							sessionStorage.setItem("forgot.userId", userId);
							this.fireEvent("doForgotPassword", this);
						}
						}
					}
					})
					} 
				}
			})
		}	
	},
	
    initialize: function () {
    	sessionStorage.removeItem("roles");
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_id");
		sessionStorage.removeItem("school_id");
		var me = this;
    	rememberToggle = me.down('#rem');
    	
		if (rememberToggle.isChecked()) {
			var usernameField = me.down('#userNameTextField');
			passwordField = me.down("#passwordTextField");
			
			//our Store automatically picks up the LocalStorageProxy defined on the Search model
			var store = Ext.create('Ext.data.Store', {
			    model: "myschoolishness.model.LoginModel"
			});
			
			store.load().each(function(record) {
				var user = record.get("username");
				var pass = record.get("password");
				var rem = record.get("remember");

				usernameField.setValue(user);
				passwordField.setValue(pass);
				if (rem=="false") {
					rememberToggle.setChecked("false");
				}
				});
		}
		
		if (sessionStorage.getItem("welcome-alert") ==="yes") {
			Ext.Msg.alert('Success', 'Your username is the same as your email address. Please login with your new credentials', Ext.emptyFn);
			sessionStorage.setItem("welcome-alert","no");
		}

    },
	
	onForgotButtonTap: function () {
		var me = this;
		me.fireEvent('onForgotCommand',me);

	},
		
	onLogInButtonTap: function () {
		var me = this;
		
		var usernameField = me.down('#userNameTextField');
		passwordField = me.down("#passwordTextField");
		label = me.down('#signInFailedLabel');
		rememberToggle = me.down('#rem');
		
		label.hide();
		
		var username = usernameField.getValue();
		password = passwordField.getValue();
		remember = rememberToggle.getValue();
		rem = rememberToggle.isChecked();
			
				var store = Ext.create('Ext.data.Store', {
				    model: "myschoolishness.model.LoginModel"
				});
				
				store.load();
				var record = store.getAt(0);

				if (record) {
					if (rememberToggle.isChecked()) {
						record.set('username', username );
						record.set('password', password );
					} else {
						record.set('username', '' );
						record.set('password', '' );
					}
					record.set('remember', rem );
					record.dirty = true;
					store.sync();
				} else {
					var model = new myschoolishness.model.LoginModel();
					if (rememberToggle.isChecked()) {
					    model.data.username = username;
					    model.data.password = password;
					} else {
					    model.data.username = '';
					    model.data.password = '';
					}
				    model.data.remember = rem;
				    model.save(); //the actual saving. Use chrome developer tools to see the local storage
				}
				me.fireEvent('signInCommand',me,username,password);
				
				usernameField.setValue('');
				passwordField.setValue('');
	},
	
	showSignInFailedMessage: function(message) {
		label = this.down('#signInFailedLabel');
		label.setHidden(false);
		label.setHtml(message);
	}
})