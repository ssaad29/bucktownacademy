Ext.define('myschoolishness.view.UserCrudCard', {
    extend: 'Ext.Panel',
	alias: "widget.userCrudCard",
    xtype: 'userCrudCard',
	fullscreen: true,
	requires: ['myschoolishness.model.validations.UserPasswordValidation','myschoolishness.model.validations.UserContactInfoValidation','myschoolishness.model.validations.UserProfileValidation'],
	config: {
	title: 'Contact Info',
	layout: 'fit',
	items: [    
                			{
                				xtype: 'titlebar',
                				itemId: 'prefTitlebar',
                				docked: 'top',
                			items: [{
		        				xtype: 'button',
		        				itemId:'cancelButtonUserContact',
		        				id:'cancelButtonUserContact',
		        				ui: 'back',
		        				padding: '10px',
		        				text: 'Back'
                				},
                				{
		        				xtype: 'button',
		        				itemId:'saveButtonUserContact',
		        				id:'saveButtonUserContact',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Save'
                				},
                				{
		        				xtype: 'button',
		        				itemId:'nextButtonUser',
		        				id:'nextButtonUser',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Next'
                				}
                				]
        						},
        						{
        						xtype: 'panel',
        						layout: 'card',
        						itemId:'userPrefCardPanel',
		        				id:'userPrefCardPanel',
        						items: [
        							{
                					xtype: 'user-contact-info-panel',
                					itemId: 'userContactInfo',
                					id: 'userContactInfo'
		        		        	},
		        		        	{
                					xtype: 'user-address-form',
                					itemId: 'userAddressForm',
                					id: 'userAddressForm'
		        		        	},
        							{
                					xtype: 'user-profile-panel',
                					itemId: 'userProfilePanel',
                					id: 'userProfilePanel'
		        		        	}, 
        							{
                					xtype: 'user-password-form',
                					itemId: 'userPasswordPanel',
                					id: 'userPasswordPanel'
		        		        	}, 
		        		        	{
                					xtype: 'user-roles-panel',
                					itemId: 'userRolesPanel',
                					id: 'userRolesPanel'
		        		        	},
		        		        	{
                					xtype: 'user-agreement-panel',
                					itemId: 'userAgreementPanel',
                					id: 'userAgreementPanel'
		        		        	},
        						{
                				xtype: 'list',
                				fullscreen:true,
                				itemId:'userKidsList',
		        				id:'userKidsList',
								itemTpl:'{student_first} {student_last} ',
								listeners: {
                						itemtap: function (list, idx, target, record, evt) {
										sessionStorage.setItem("child_crud.student_id", record.get("student_id"));
										
										//myschoolishness.app.redirectTo('editUser/editStudent');
										
										sessionStorage.setItem("edit_student.index", 0);
										this.fireEvent("showChildCard", this);
        								}
									}
        						} 
		        		        ]
		        		    }
		        		],
		        	listeners: [
		        		{
						delegate: '#cancelButtonUserContact',
						event: 'tap',
						fn: 'onCancelButtonTap'
						},
						{
						delegate: '#saveButtonUserContact',
						event: 'tap',
						fn: 'onSaveButtonTap'
						},
						{
						delegate: '#nextButtonUser',
						event: 'tap',
						fn: 'doNext'
						}
						],
		
        			},
	
	doRegister: function () {
		//console.log("isPasswordReset set to NO:2");
		sessionStorage.setItem("isPasswordReset","no");
		sessionStorage.setItem("newparent.index","5");
		sessionStorage.setItem("edit_user.origin","registration");
		this.doNext();
	},
	
	doPasswordReset: function () {
		sessionStorage.setItem("edit_user.origin","parent");
		console.log("SEtting password rest to yes");
		sessionStorage.setItem("isPasswordReset","yes");
		var saveButton = Ext.getCmp("saveButtonUserContact");	
		var nextButton = Ext.getCmp("nextButtonUser");
		var backButton = Ext.getCmp("cancelButtonUserContact");
		var card = this.getComponent("userPrefCardPanel");
		var passwordForm = Ext.getCmp("userPasswordPanel");
		passwordForm.toggleExistingPasswordField(false);
		passwordForm.setNewPassword("");	
		passwordForm.setNewPasswordMatch("");	
		card.setActiveItem(3);
		saveButton.setHidden(false);
		nextButton.setHidden(true);
		backButton.setHidden(true);
	},
	
	doNext: function () {
		console.log("isPasswordReset set to NO:3");
		sessionStorage.setItem("isPasswordReset","no");
		var roles = sessionStorage.getItem("roles");
		var saveButton = Ext.getCmp("saveButtonUserContact");	
		var nextButton = Ext.getCmp("nextButtonUser");	
		var backButton = Ext.getCmp("cancelButtonUserContact");
		var card = this.getComponent("userPrefCardPanel");
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		console.log("editUserOrigin!!! " + editUserOrigin);
		var idx = sessionStorage.getItem("newparent.index");
		if (idx === null || idx === undefined) {
			idx = 2;
		} else {
			idx = parseInt(idx);
		}
		console.log("idx IS!!! " + idx);
		if (idx === 5) {
			console.log("Inside index 5 ");
			var agreementPanel = Ext.getCmp("userAgreementPanel");
			console.log("loading agreement ");
			agreementPanel.loadData();
			console.log("done loading agreement ");
			saveButton.setHidden(true);
			nextButton.setHidden(false);
			card.setActiveItem(idx);
			sessionStorage.setItem("newparent.index","2");
			//sessionStorage.setItem("newparent.index","2");
			} else if (idx === 2) {
				var proceed = true;
				var origin	=	sessionStorage.getItem("edit_user.origin");
				
				if (origin === "registration") {
					backButton.setHidden(true);
					var agreementPanel = Ext.getCmp("userAgreementPanel");
				if (agreementPanel.hasAccepted()) {
					sessionStorage.setItem("newparent.index","2");
				} else {
					backButton.setHidden(false);
					proceed=false;
					sessionStorage.setItem("newparent.index","5");
					Ext.Msg.alert('Unable to proceed', 'You must accept terms of use and privacy policy to continue', Ext.emptyFn);
					}
				}
				console.log("PROCEED " + proceed);
				if (proceed) {
					var profilePanel = Ext.getCmp("userProfilePanel");
					profilePanel.setFirstName("");	
					profilePanel.setLastName("");	
					//profilePanel.setProfileSharing("1");
					saveButton.setHidden(true);
					nextButton.setHidden(false);
					card.setActiveItem(idx);
					sessionStorage.setItem("newparent.index","0");
				}
		} else if (idx === 0) {
			var profilePanel = Ext.getCmp("userProfilePanel");	
			var isValid = this.validateProfileInfo(profilePanel.getFirstName(),profilePanel.getLastName());
			if (!isValid) {
				return;
			} else {
				var contactPanel = Ext.getCmp("userContactInfo");
				contactPanel.setEmail("");
				contactPanel.setPhone("");	
				contactPanel.setCell("");
				card.setActiveItem(idx);
				sessionStorage.setItem("newparent.index","1");
				sessionStorage.setItem("backButtonIdx.index","2");
			}
		} else if (idx === 1) {
			var contactPanel = Ext.getCmp("userContactInfo");
			var isValid = this.validateContactInfo(contactPanel.getEmail(),contactPanel.getPhone(),contactPanel.getCell());
			if (!isValid) {
				return;
			} else {
				var addressForm = Ext.getCmp("userAddressForm");	
				addressForm.setAddr1("");	
				addressForm.setAddr2("");	
				addressForm.setCity("");
				addressForm.setState("");
				addressForm.setZip("");
				card.setActiveItem(idx);
				sessionStorage.setItem("backButtonIdx.index",0);
				if (editUserOrigin === "registration") {
					sessionStorage.setItem("newparent.index","3");
				} else {
					if (roles != null && roles.indexOf("A") != -1) { 
						sessionStorage.setItem("newparent.index","4");
					} else {
						sessionStorage.setItem("newparent.index","100");
						saveButton.setHidden(false);
						nextButton.setHidden(true);
					}
				}
			}
		} else if (idx === 3) {
			sessionStorage.setItem("backButtonIdx.index",1);
			var passwordForm = Ext.getCmp("userPasswordPanel");
			passwordForm.setExistingPassword("");	
			passwordForm.setNewPassword("");	
			passwordForm.setNewPasswordMatch("");	
			card.setActiveItem(idx);
			console.log("editUserOrigin??? " + editUserOrigin);
			if (editUserOrigin==="registration") {
				console.log("INSIDE!! ");
				passwordForm.toggleExistingPasswordField(false);
				sessionStorage.setItem("newparent.index","100");
				saveButton.setHidden(false);
				nextButton.setHidden(true);
			} else {
				passwordForm.toggleExistingPasswordField(true);
				sessionStorage.setItem("newparent.index","4");
			}
		} else if (idx === 4) {
			if (editUserOrigin==="registration") {
				sessionStorage.setItem("backButtonIdx.index",3);
				} else {
					sessionStorage.setItem("backButtonIdx.index",1);
			}
			var rolesPanel = Ext.getCmp("userRolesPanel");
			rolesPanel.setRoles("");		
			sessionStorage.setItem("newparent.index","100");
			saveButton.setHidden(false);
			nextButton.setHidden(true);
			card.setActiveItem(idx);
		} 
	},
	
	onCancelButtonTap: function () {
   		var idx = sessionStorage.getItem("backButtonIdx.index");
   		
		if (idx === null || idx === undefined) {
			console.log("IDX undefined");
			idx = -1;
		} else {
			idx = parseInt(idx);
			console.log("IDX " + idx);
			if (idx === -1) {
				this.fireEvent("showEditUser", this);
			} else {
				sessionStorage.setItem("newparent.index",idx);
				this.doNext();
			}
		}
	},
	
	activateItem: function () {
		console.log("isPasswordReset set to NO:1");
		sessionStorage.setItem("isPasswordReset","no");
		sessionStorage.setItem("backButtonIdx.index",-1);
		var nextButton = Ext.getCmp("nextButtonUser");
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		console.log("editUserOrigin " + editUserOrigin);
		
		if (editUserOrigin==="pref" || editUserOrigin==="staff") {
			nextButton.setHidden(true);
		} else {
			nextButton.setHidden(false);
		}
		
		var category = sessionStorage.getItem("edit_user.category");
		
		var card = this.getComponent("userPrefCardPanel");

		if (category === 'Contact Info') {
			this.initContactForm();
			card.setActiveItem(0);
		} else if (category === 'Address') {
			this.initAddressForm();
			card.setActiveItem(1);
		} else if (category === 'Profile') {
			this.initProfileForm();
			card.setActiveItem(2);
		} else if (category === 'Children') {
			this.initKidsList("userKidsList");
			card.setActiveItem(6);
		} else if (category === 'Roles') {
			this.initRolesForm();
			card.setActiveItem(4);
		} else if (category === 'Password') {
			card.setActiveItem(3);
		}
	},
	
	validatePasswordUpdate: function (existingPassword,newPassword,newPasswordMatch) { 		
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		var passwordValidation = null;
		
		if (editUserOrigin==="parent" || editUserOrigin==="registration") {
			passwordValidation = Ext.create('myschoolishness.model.validations.ParentPasswordValidation',{
     			newPassword: newPassword,
     			newPasswordMatch: newPasswordMatch
			});
 		} else {
 			passwordValidation = Ext.create('myschoolishness.model.validations.UserPasswordValidation',{
     			existingPassword: existingPassword,
     			newPassword: newPassword,
     			newPasswordMatch: newPasswordMatch
			});
 		}
 		
 		
		var errs = passwordValidation.validate();
		var msg = '';
 		
 		var returnVal = true;
 		
		if (!errs.isValid()) {
  			 errs.each(function (err) {
  			  		msg += err.getField() + ' : ' + err.getMessage() + '<br/>';
  			  		returnVal = false;
   			});
   		if (!returnVal) {
   			Ext.Msg.alert('ERROR', msg);
   		}
		} 
		
		return returnVal;
	},
	
	validateProfileInfo: function (first,last) { 		
		var contactValidation = Ext.create('myschoolishness.model.validations.UserProfileValidation',{
     		first: first,
     		last: last
		});
 
		var errs = contactValidation.validate();
		var msg = '';
 		
 		var returnVal = true;
 		
		if (!errs.isValid()) {
  			 errs.each(function (err) {
  			  		msg += err.getField() + ' : ' + err.getMessage() + '<br/>';
  			  		returnVal = false;
   			});
   		if (!returnVal) {
   			Ext.Msg.alert('ERROR', msg);
   		}
		} 
		
		return returnVal;
	},
	
	validateContactInfo: function (emailAddress,phone,cellphone) {
		console.log("VALIDATING CONTACT INFO");
		varValidatePhone = true;
 		varValidateCell = true;
 		
 		if (phone==null || phone===undefined || phone.length <1) {
 			varValidatePhone = false;
 		} else {
 			phone = phone.replace(/[^\d]*/g, "");
 		}
 		
 		if (cellphone==null || cellphone===undefined || cellphone.length <1) {
 			varValidateCell = false;
 		} else {
 			cellphone = cellphone.replace(/[^\d]*/g, "");
 		}
 		console.log("VALIDATING phone " + phone);
 		console.log("VALIDATING cellphone " + cellphone);
		var contactValidation = Ext.create('myschoolishness.model.validations.UserContactInfoValidation',{
     		email: emailAddress,
     		phone: phone,
     		cellphone: cellphone
		});
 
		var errs = contactValidation.validate();
		var msg = '';
 		
 		var returnVal = true;
 		
		if (!errs.isValid()) {
  			 errs.each(function (err) {
  			 if ((err.getField() === "phone" && varValidatePhone) || 
  			 	(err.getField() === "cellphone" && varValidateCell) || err.getField() === "email") {
  			  		msg += err.getField() + ' : ' + err.getMessage() + '<br/>';
  			  		returnVal = false;
  			  		}
   			});
   		if (!returnVal) {
   			Ext.Msg.alert('ERROR', msg);
   		} else {
   			var contactPanel = Ext.getCmp("userContactInfo");
				contactPanel.setPhone(this.formatPhone(phone));	
				contactPanel.setCell(this.formatPhone(cellphone));
   		}
		} 
		
		return returnVal;
	},
	
	
	onSaveButtonTap: function () {
	console.log("onSaveButtonTap: user crud card");
		var createIndex = sessionStorage.getItem("newparent.index");
		var userId = sessionStorage.getItem("user_crud.user_id");
		var updatedBy = sessionStorage.getItem("user_id");
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		var passwordForm = Ext.getCmp("userPasswordPanel");
		var	isShowingExistingPasswordField = passwordForm.isShowingExistingPasswordField();
		var currUserRoles = sessionStorage.getItem("roles");
				
		if (createIndex === "100") { //create a new user
			sessionStorage.setItem("newparent.index",'3');
			var insertStore = Ext.create('myschoolishness.store.UserInsertStore', {
			model: "myschoolishness.model.UserInsertModel"
			});
			insertStore.addAfterListener('load',this.afterInsertLoad,this);
			var contactPanel = Ext.getCmp("userContactInfo");
			var email = contactPanel.getEmail();
			var phone = contactPanel.getPhone();	
			var cellPhone = contactPanel.getCell();		
			var addressForm = Ext.getCmp("userAddressForm");	
			var addr1 = addressForm.getAddr1();	
			var addr2 = addressForm.getAddr2();	
			var city = addressForm.getCity();
			var state = addressForm.getState();
			var zip = addressForm.getZip();
			var profilePanel = Ext.getCmp("userProfilePanel");
			var firstName = profilePanel.getFirstName();	
			var lastName = profilePanel.getLastName();	
			//var publicProfile = profilePanel.getProfileSharing();
			var rolesPanel = Ext.getCmp("userRolesPanel");
			var roles = "P";
			if (currUserRoles != null && currUserRoles.indexOf("A") != -1) {
				roles = rolesPanel.getRoles();	
			}
			var password = firstName + "ysecreT66";
			var doInsert = true;
			
			if (editUserOrigin === "registration") {
				var passwordForm = Ext.getCmp("userPasswordPanel");
				var password = passwordForm.getNewPassword();	
				roles = "P";
				var isValid = this.validatePasswordUpdate(passwordForm.getExistingPassword(),passwordForm.getNewPassword(),passwordForm.getNewPasswordMatch());	
				if (!isValid) {
					doInsert=false;
				}
			}
			
			if (doInsert) {
			insertStore.load({
    			//define the parameters of the store:
    		    		params: {
					userId: email,
					insertMode: "new",
					firstName: firstName,
					lastName: lastName,
        			token: sessionStorage.getItem("token"),
        			publicProfile: 1,
					updatedBy: updatedBy,
        			email: email,
        			phone: phone,
        			cellPhone: cellPhone,
        			addr1: addr1,
        			addr2: addr2,
        			city: city,
        			state: state,
        			updatedBy: updatedBy,
        			zip: zip,
        			password: password,
        			roles: roles
    				},
    			});
    		}
		} else {
		var category = sessionStorage.getItem("edit_user.category");
		
		var insertStore = Ext.create('myschoolishness.store.UserInsertStore', {
			model: "myschoolishness.model.UserInsertModel"
			});
		insertStore.addAfterListener('load',this.afterStoreLoad,this);	
		
		if (category === 'Contact Info') {
			var contactPanel = Ext.getCmp("userContactInfo");
			var email = contactPanel.getEmail();
				
			var phone = contactPanel.getPhone();	
			var cellPhone = contactPanel.getCell();
			if (!this.validateContactInfo(email,phone,cellPhone)) {
				return;
			}
			
			
		var checkEmailStore = Ext.create('myschoolishness.store.CheckDuplicateEmailStore', {
			model: "myschoolishness.model.CheckDuplicateEmailModel"
		});
				
		checkEmailStore.load({
    			//define the parameters of the store:
    		    params: {
        		email: email,
        		userId: userId,
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				if (records!=null && records.length === 0) {
					insertStore.load({
    				//define the parameters of the store:
    		    		params: {
						token: sessionStorage.getItem("token"),
						userId: userId,
						updatedBy: updatedBy,
        				email: email,
        				phone: phone,
        				cellPhone: cellPhone,
        				insertMode: 'contact'
    					},
    				})
				} else {
					Ext.Msg.alert('Email', 'Email is a duplicate, cannot save', Ext.emptyFn);
				}
    			}
			})
		} else if (category === 'Address') {
			var addressForm = Ext.getCmp("userAddressForm");	
			var addr1 = addressForm.getAddr1();	
			var addr2 = addressForm.getAddr2();	
			var city = addressForm.getCity();
			var state = addressForm.getState();
			var zip = addressForm.getZip();
			
			insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				token: sessionStorage.getItem("token"),
				userId: userId,
        		addr1: addr1,
        		addr2: addr2,
        		city: city,
        		state: state,
        		updatedBy: updatedBy,
        		zip: zip,
        		insertMode: 'address',
        		userId: userId,
        		password: password,
    			},
    		})
		} else if (category === 'Profile') {
			var profilePanel = Ext.getCmp("userProfilePanel");
			var firstName = profilePanel.getFirstName();	
			var lastName = profilePanel.getLastName();	
			
			if (!this.validateProfileInfo(firstName,lastName)) {
				return;
			}
			
			
			insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				token: sessionStorage.getItem("token"),
				userId: userId,
        		firstName: firstName,
        		lastName: lastName,
        		updatedBy: updatedBy,
        		publicProfile: '1',
        		insertMode: 'profile'
    			},
    		})
		} else if (category === 'Roles') {
			var rolesPanel = Ext.getCmp("userRolesPanel");
			var roles = rolesPanel.getRoles();	
			
			insertStore.load({
    			//define the parameters of the store:
    		    		params: {
				token: sessionStorage.getItem("token"),
				userId: userId,
        		roles: roles,
        		updatedBy: updatedBy,
        		insertMode: 'roles'
    			},
    		})
		} else if (category === 'Password' && isShowingExistingPasswordField===true) {
			console.log("IN password");
			var passwordForm = Ext.getCmp("userPasswordPanel");
			var existingPassword = passwordForm.getExistingPassword();	
			var password = passwordForm.getNewPassword();	
			var newPasswordMatch = passwordForm.getNewPasswordMatch();	
			insertStore.addAfterListener('load',this.afterStoreLoad,this);	
			//console.log("existingPassword length " + existingPassword.length);
			//		console.log("password length " + password.length);
			//		console.log("newPasswordMatch length " + newPasswordMatch.length);
			
			var store = Ext.create('Ext.data.Store', {
			model: "myschoolishness.model.UserByIdModel"
			});
				
			store.load({
    			//define the parameters of the store:
    		    params: {
				token: sessionStorage.getItem("token"),
        		user_id: userId,
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				var record = records[0];
				if (record!=null) {
					
					var oldPassword = record.get("password");
					
					if (existingPassword.length < 1) {
						Ext.Msg.alert('Enter existing password', 'No existing password entered.', Ext.emptyFn);
					} else if (password.length < 1) {
						Ext.Msg.alert('Enter password', 'No password entered.', Ext.emptyFn);
					} else if (newPasswordMatch.length < 1) {
						Ext.Msg.alert('Enter new password', 'No new password entered.', Ext.emptyFn);
					} else if (existingPassword!=oldPassword) {
						Ext.Msg.alert('Incorrect Password', 'Your password is incorrect.', Ext.emptyFn);
					}	else if (password === null || password === undefined || password.length < 1 || password!=newPasswordMatch) {
						Ext.Msg.alert('No Match', 'New password entries do not match', Ext.emptyFn);
					} else {
						if (!this.validatePasswordUpdate(oldPassword,password,newPasswordMatch)) {
							return;
						}
						
					insertStore.load({
    				//define the parameters of the store:
    		    	params: {
					token: sessionStorage.getItem("token"),
					userId: userId,
        			password: password,
        			insertMode: 'password'
    				},
    		})
			}
				}
    		}
			})
		} else if (isShowingExistingPasswordField===false) {
			var passwordForm = Ext.getCmp("userPasswordPanel");
			var password = passwordForm.getNewPassword();	
			var userId = sessionStorage.getItem("forgot.userId");
						console.log("userId at save " + userId);
					insertStore.load({
    				//define the parameters of the store:
    		    	params: {
					token: sessionStorage.getItem("token"),
					userId: userId,
        			password: password,
        			insertMode: 'password'
    				},
    			})
			}
		} 	
	},
	
	afterInsertLoad: function(store, records, successful, operation, eOpts) {
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		if (successful) {
			studentId = sessionStorage.getItem("registration.student_id")

			if (studentId!=null && studentId!=undefined && studentId.length >0) {
				sessionStorage.setItem("user_id",records[0].get("insertId")),
				this.addStudent(records[0].get("insertId"));
			} else {
				Ext.Msg.alert('Success', 'New user created', Ext.emptyFn);
				this.fireEvent("showParentAdminList", this);
			}
		} else {
			Ext.Msg.alert('Error', 'Profile creation failed', Ext.emptyFn);
		}
	},
	
	addStudent: function (parentId) {
	var parentStudentStore = Ext.create('myschoolishness.store.ParentStudentAssociationStore', {
			model: "myschoolishness.model.ParentStudentAssociationModel"
			});
        	parentStudentStore.load({
    			//define the parameters of the store:
    		    params: {
        		parentId: parentId,
        		insertMode: "associate",
        		studentId: sessionStorage.getItem("registration.student_id"),
        		userId:sessionStorage.getItem("user_id"),
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				if (success) {
					var userSchoolStore = Ext.create('myschoolishness.store.AssociateUserSchoolStore', {
					model: "myschoolishness.model.AssociateUserSchoolModel"
					});
					userSchoolStore.addAfterListener('load',this.afterRegistrationComplete,this);
        			userSchoolStore.load({
    				//define the parameters of the store:
    		    	params: {
        				schoolId: sessionStorage.getItem("school_id"),
        				userId: sessionStorage.getItem("user_id")
    				},
				})
    		}
			}
			})
	},

	formatPhone: function(phone) {
		if (phone===null || phone===undefined || phone.length===0) {
			return "";
		}  else {
  			phone = phone.replace(/[^0-9]/g, '');
  			phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  			
  			return phone;
  		}
	},

	afterRegistrationComplete: function(store, records, successful, operation, eOpts) {
		console.log("afterRegistrationComplete successful " + successful);
    	if (successful) {
    		sessionStorage.setItem("token","processed");
			this.fireEvent("goToLogin", this);
			sessionStorage.setItem("welcome-alert","yes");
    	}
	},
	
	afterStoreLoad: function(store, records, successful, operation, eOpts) {
		console.log("After store load in user crud card");
		var isPasswordReset = sessionStorage.getItem("isPasswordReset");
    	if (records.length === 1 && successful) {
    		Ext.Msg.alert('Success', 'Your changes have been saved', Ext.emptyFn);
    		console.log("After store load:isPasswordReset " + isPasswordReset);
    		if (isPasswordReset==="yes") {
    		console.log("Bumping to login " + isPasswordReset);
    			sessionStorage.setItem("token","processed");
    			this.fireEvent("goToLogin", this);
    		}
    	}
    	
    	
	},
		
	initAddressForm : function(contactFieldSetId) {
		var user_id = sessionStorage.getItem("user_crud.user_id");
		var store = Ext.create('Ext.data.Store', {
			model: "myschoolishness.model.UserByIdModel"
		});
				
		store.load({
    			//define the parameters of the store:
    		    params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				
				if (success) {
					var record = records[0];
					var addr1 = record.get("addr1");
					var addr2 = record.get("addr2");
					var city = record.get("city");
					var state = record.get("state");
					var zip = record.get("zip");
				
					var addressForm = Ext.getCmp("userAddressForm");	
					addressForm.setAddr1(addr1);
					addressForm.setAddr2(addr2);
					addressForm.setCity(city);
					addressForm.setState(state);
					addressForm.setZip(zip);
				}
    		}
			})
	},
	
	formatPhoneNumber : function(val)
	{
	if (val===null || val===undefined || val.length <1) {
		return "";
	}
	
    // strip non-digit characters
    val = val.replace(/[^\d]*/g, "");

	
    // force 10 digits
    val = val.substring(0, 10);


    // Format number  (####) ###-#### when there are 10 digits 
    if (val.length == 10)
    {
        val = '(' + val.substring(0, 3) + ') ' + val.substring(3, 6) + '-' + val.substring(6, 10);
    }


    	return val;
	},

	initContactForm : function() {
		var user_id = sessionStorage.getItem("user_crud.user_id");
		var store = Ext.create('Ext.data.Store', {
			model: "myschoolishness.model.UserByIdModel"
		});
				
		store.load({
    			//define the parameters of the store:
    		    params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				
				if (success) {
					var record = records[0];
					console.log("record in contact" + record);
					var phone = record.get("phone");
					var email = record.get("email");
					var cell = record.get("cell_phone");
				
					var contactPanel = Ext.getCmp("userContactInfo");	
					contactPanel.setEmail(email);	
					contactPanel.setPhone(this.formatPhoneNumber(phone));
					contactPanel.setCell(this.formatPhoneNumber(cell));		
				}
    		}
			})
	},
	
	initProfileForm : function() {
		var user_id = sessionStorage.getItem("user_crud.user_id");
		var store = Ext.create('Ext.data.Store', {
			model: "myschoolishness.model.UserByIdModel"
		});
				
		store.load({
    			//define the parameters of the store:
    		    params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				
				if (success) {
					var record = records[0];
					var firstName = record.get("first_name");
					var lastName = record.get("last_name");
					var profile = record.get("public_profile");
		
					var profilePanel = Ext.getCmp("userProfilePanel");			
					profilePanel.setFirstName(firstName);
					profilePanel.setLastName(lastName);
					//profilePanel.setProfileSharing(profile);
					//figure out birthday

				}
    		}
			})
	},
	
	initRolesForm : function() {
		var user_id = sessionStorage.getItem("user_crud.user_id");
		var store = Ext.create('Ext.data.Store', {
			model: "myschoolishness.model.UserByIdModel"
		});
				
		store.load({
    			//define the parameters of the store:
    		    params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				
				if (success) {
					var record = records[0];
					var roles = record.get("roles");

					var rolesPanel = Ext.getCmp("userRolesPanel");			
					rolesPanel.setRoles(roles);
				}
    		}
			})
	},
	
	getCleanValue: function (text) {
		if (text==null || text=='undefined') {
			return null;
		}
		
		if (text.length < 1) {
			return  null;
		}
		
		return  text;
	},
		
	 initKidsList: function (kidsListId) {	
	 	console.log("Initializing kids list");
	 		var kidsList = Ext.getCmp(kidsListId);	
    		kidsList.setStore(null);
			var user_id = sessionStorage.getItem("user_crud.user_id");
			var kidsStore = Ext.create('myschoolishness.store.AbsenceMyKidsStore', {
			model: "myschoolishness.model.AbsenceMyKidsModel"
			});
		
			//kidsStore.addListener('load',this. onStoreLoad,this);
    
        	kidsStore.load({
    			//define the parameters of the store:
    		    params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				if (success) {
					kidsList.setStore(kidsStore);
				}
    		}
			})
		//console.log(attendanceStore.getCount());
	},
	
	onStoreLoad: function(store, records, successful, operation, eOpts) {
	
			if (successful===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
			var me = this;
			console.log("records.length " + records.length);
        if (records.length > 0) {
			for (var i=0;i<records.length;i++) {

					if (records[i].get("start_date_time") != null) {
						records[i].set('start_date_time', me.displayDate(records[i].get("start_date_time")) );
					} 
					
					if (records[i].get("end_date_time") != null) {
						records[i].set('end_date_time', me.displayDate(records[i].get("end_date_time")) );

					} 

				}

			return;
		} 
    }
		
})