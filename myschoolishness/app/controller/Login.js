Ext.define('myschoolishness.controller.Login', {
	extend: 'Ext.app.Controller',
	requires: ['myschoolishness.view.Forgot',
	'myschoolishness.view.Login',
	'myschoolishness.view.Main',
	'myschoolishness.view.EditUser',
	'myschoolishness.store.UserStore',
	'myschoolishness.model.LoginModel',
	'myschoolishness.model.UserModel'],
	
	config: {
		refs: {
			prefView: 'edituserview',
			loginView: 'loginview',
			mainView: 'mainview',
			forgotView: 'forgot-password-panel',
			signatureView: 'signatureview',
			bulletinView: 'bulletin-board',
			bulletinDetailView: 'viewbulletindetails',
			userCrudCard: 'userCrudCard',
		},
		
		control: {
			loginview: {
				goHome: 'goHome',
				signInCommand: 'onSignInCommand',
				onForgotCommand: 'onForgotCommand'
			},
			mainView: {
				signOffCommand: 'onSignOffCommand',
				showPrefView: 'showPref'
			},
			bulletinView: {
				showBulletinDetail: 'onShowBulletinDetail',
				goHome: 'goHome',
			},
			bulletinDetailView: {
				goHome: 'goHome',
			},
			userCrudCard: {
				goToLogin: 'goToLogin'
			},
		},
		
		routes: {
			'login': 'goToLogin',
            'home': 'goHome',
            'pref': 'showPref',
            'logout': 'goToLogoutScreen',
            'sessionExpired': 'doSessionExpired',
            'signature': 'showSignatureView'
        }

	},
	
	onShowBulletinDetail: function (sender,title,message) {
		var detailsView = this.getBulletinDetailView();
		detailsView.setTitle(title);
		detailsView.setMessage(message);
		Ext.Viewport.animateActiveItem(detailsView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	showSignatureView: function () {
		console.log("should show sig view");
		var sigView = this.getSignatureView();
		console.log("should show sig view " + sigView);
		Ext.Viewport.animateActiveItem(sigView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
		doLogout: function () {
		console.log("SHOULD LOG OUT");
		var loginView = this.getLoginView();
		//loginView.setMasked(false);
		loginView.showSignInFailedMessage("You have been successfully logged out");
		sessionStorage.removeItem("roles");
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_id");
		sessionStorage.removeItem("school_id");
		console.log("Calling the slide trans");
		//Ext.Viewport.remove(this.overlay);
		Ext.Viewport.animateActiveItem(loginView,myschoolishness.controller.Utils.getDefaultSlideTransition());
		//console.log("done with the slide trans");
		//this.goToLogoutScreen();
	},
	
	goToLogoutScreen: function () {
		sessionStorage.removeItem("roles");
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_id");
		sessionStorage.removeItem("school_id");
		console.log("SHOULD LOG OUT");
		var loginview = this.getLoginView();
		Ext.Viewport.animateActiveItem(loginview,myschoolishness.controller.Utils.getDefaultSlideTransition());
		if (sessionStorage.getItem("logout") === "yes") {
			sessionStorage.removeItem("logout");
			window.location.reload();
		}
	},
	
	goToLogin: function () {
		var loginView = this.getLoginView();
			console.log("CHECKINGmyschoolishness.controller.Utils!! " +myschoolishness.controller.Utils);
		myschoolishness.controller.Utils.hasRequiredSessionInfo(true);
		console.log("DONEQQ " +myschoolishness.controller.Utils);
		Ext.Viewport.animateActiveItem(loginView,myschoolishness.controller.Utils.getDefaultSlideTransition());
			loginView.showSignInFailedMessage("Your username and password are incorrect");
			loginView.setMasked(false);
	},
	
	doSessionExpired: function () {
		var loginView = this.getLoginView();
		Ext.Viewport.animateActiveItem(loginView,myschoolishness.controller.Utils.getDefaultSlideTransition());
		loginView.showSignInFailedMessage("Your session expired, Please log in again");
		loginView.setMasked(false);
		sessionStorage.removeItem("roles");
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_id");
		sessionStorage.removeItem("school_id");
	},
	
	showPref: function () {
		var prefview = this.getPrefView();
		sessionStorage.setItem("edit_user.origin","pref");
		sessionStorage.setItem("edit_student.origin","pref");
		prefview.configureList();
		Ext.Viewport.animateActiveItem(prefview,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},

	/*onSend: function () {
		Ext.Viewport.animateActiveItem(this.getMainView(),myschoolishness.controller.Utils.getDefaultSlideTransition());
	},*/

	initHome: function () {
		console.log("IN GO HOME");
		var mainView = this.getMainView();
		if (mainView != null && mainView!=undefined) {
			mainView.initScreens();
			mainView.loadData();	
			var roles = sessionStorage.getItem("roles");
			console.log("roles " + roles);
			//if (roles != null && roles.length > 0) {
			//	console.log("NOT NULL " );
			//	mainView.setRoles(roles);	
			//	mainView.setMasked(false);
			//	Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
			//}
		}
	},
	
	goHome: function () {
		console.log("IN GO HOME");
		var mainView = this.getMainView();
		if (mainView != null && mainView!=undefined) {
				Ext.Viewport.animateActiveItem(mainView,myschoolishness.controller.Utils.getDefaultSlideTransition());
			}
	},
	
	onSignOffCommand: function () {
		var mainview = this.getMainview();
		mainview.setMasked(false);
		Ext.Viewport.animateActiveItem(mainview,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},

	onForgotCommand: function (view) {
		console.log("forgot button tapped");

		var forgotView = this.getForgotView();
		forgotView.setMasked(false);
		Ext.Viewport.animateActiveItem(forgotView,myschoolishness.controller.Utils.getDefaultSlideTransition());
	},
	
	isAutherized: function(username,password) {
		console.log("isAutherized!!!");
		loginView = this.getLoginView();
		loginView.setMasked(true);
		var userStore = Ext.create('myschoolishness.store.UserStore', {
		    model: "myschoolishness.model.UserModel"
		});
				
		userStore.addListener('load',this. onStoreLoad,this);
    console.log("LOADING.....!!!");
		userStore.load({
    		params: {
        	username: username,
        	password: password,
    	}  	
		});
	},

	onStoreLoad: function(store, records, successful, operation, eOpts) {
	console.log("isAutherized!onStoreload");
			var me = this;
			loginView = me.getLoginView();

        if (records.length > 0) {
        	var tokenStore = Ext.create('myschoolishness.store.TokenStore', {
				model: "myschoolishness.model.TokenModel",
				token: sessionStorage.getItem("token"),
			});
			
			
			tokenStore.load({
    		scope: this,
    		callback : function(tokenRecords, operation, success) {	
console.log("isAutherized!success " + success);
					if (success ===true) {
						
						sessionStorage.setItem("token", tokenRecords[0].get("session_id"));
						sessionStorage.setItem("roles", records[0].get("roles"));
						sessionStorage.setItem("user_id", records[0].get("id"));
						sessionStorage.setItem("school_id", records[0].get("school_id"));
						sessionStorage.setItem("first_name", records[0].get("first_name"));
						sessionStorage.setItem("last_name", records[0].get("last_name"));
			console.log("SESSION " + tokenRecords[0].get("session_id"));
			console.log("roles " + records[0].get("roles"));
			console.log("user_id " + records[0].get("id"));
			console.log("1. SETTING school_id " + records[0].get("school_id"));
					Ext.Viewport.add([
      	          	    {xtype: 'mainview'},
      	          	    ]);
						var store = Ext.create('Ext.data.Store', {
							model: "myschoolishness.model.LoginModel"
						});
				
						store.load();
						var record = store.getAt(0);
						record.set('dbId', records[0].get("id") );
						record.set('roles', records[0].get("roles") );
						record.set('school_id', records[0].get("school_id") );
						record.set('username', records[0].get("user_name") );
						record.set('password', records[0].get("password") );
						record.set('first_name', records[0].get("first_name") );
						record.set('last_name', records[0].get("last_name") );
						sessionStorage.setItem("user.first_name", records[0].get("first_name"));
						sessionStorage.setItem("user.last_name", records[0].get("last_name"));
						record.set('hint', records[0].get("hint") );
						record.set('phone', records[0].get("phone") );
						record.set('email', records[0].get("email") );
						record.set('addr1', records[0].get("addr1") );
						record.set('addr2', records[0].get("addr2") );
						record.set('city', records[0].get("city") );
						record.set('state', records[0].get("state") );
						record.set('zip', records[0].get("zip") );
						record.set('cell', records[0].get("cell_phone") );
						record.set('public_profile', records[0].get("public_profile") );
						record.set('last_sync', new Date() );
						loginView.setMasked(false);
						this.initHome();
					} else {
						myschoolishness.controller.Utils.logout();
					}
				}
			})
		} else {
			Ext.Viewport.animateActiveItem(loginView,myschoolishness.controller.Utils.getDefaultSlideTransition());
			loginView.showSignInFailedMessage("Your username and password are incorrect");
			loginView.setMasked(false);
			sessionStorage.setItem("roles", "");
		}

    },
	
	onSignInCommand: function (view,username,password) {
		var me = this,
		loginView = me.getLoginView();
		console.log(password);

		if (username.length === 0 || password.length == 0) {
			loginView.showSignInFailedMessage('Please enter your username and password');
			return;
		}
		
		loginView.setMasked({
			xtype: 'loadmask',
			message: 'Signing In....'
		});
		
		this.isAutherized(username,password);
		
	},
			
})