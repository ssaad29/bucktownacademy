Ext.define('myschoolishness.view.EditUser', {
    extend: 'Ext.Panel',
	alias: "widget.edituserview",
    xtype: 'edituserview',
	fullscreen: true,
	title: 'Edit User',
	requires: ['myschoolishness.store.UserAdminCategoriesStore','myschoolishness.store.ParentsSettingCategoriesStore','myschoolishness.model.CategoryModel','myschoolishness.store.SettingCategoriesStore'],
	config: {
		title: 'Main',
		layout: 'fit',
		fullstreen: true,
        items: [
        {
                		xtype: 'titlebar',
                		itemId: 'prefTitlebar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'backButtonPref',
		        			id:'backButtonPref',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                			{
		        			xtype: 'button',
		        			align: 'right',
		        			itemId:'userDeleteButton',
		        			id:'userDeleteButton',
		        			ui: 'decline',
		        			padding: '10px',
		        			text: 'Delete'
                			},
                			]
        },
        {
        	xtype: 'list',
			fullscreen: true,
			itemId:'userManagementCatList',
		    id:'userManagementCatList',
		    itemTpl: '{category_name}',    
        	listeners: {
                itemtap: function (list, idx, target, record, evt) {
				var me = this;
				console.log("edit_user.index " + idx);
				console.log("edit_user.category " + record.get("category_name"));
				sessionStorage.setItem("edit_user.index", idx);
				sessionStorage.setItem("edit_user.category", record.get("category_name"));
				this.parent.fireEvent("showUserCard", this);
        		}
			}
        }
        ],
        listeners: [
		        				{
						delegate: '#backButtonPref',
						event: 'tap',
						fn: 'onBackButtonTap'
						},
						{
						delegate: '#userDeleteButton',
						event: 'tap',
						fn: 'onDeleteButtonTap'
						}
		]
	},
	
		
	onDeleteButtonTap: function () {
		var userId = sessionStorage.getItem("user_crud.user_id");
		var me = this;
		
		Ext.Msg.confirm("Confirmation", "Are you sure that you want to delete this user?",  function(choice)
 		{
   			if(choice == 'yes')
     		{
					var deleteUserStore = Ext.create('myschoolishness.store.DeleteUserStore', {
					model: "myschoolishness.model.DeleteUserModel"
					});
		
					deleteUserStore.addListener('load',this. onStoreLoad,this);
    
        			deleteUserStore.load({
    				//define the parameters of the store:
    		    		params: {
        				userId: userId,
        				token: sessionStorage.getItem("token")
    				},

    				scope: this,
    				callback : function(records, operation, success) {
							console.log("CALLBACK " + success);
							if (success) {
								console.log("THIS IS " + this);
								me.fireEvent("showParentList", me);
    							//Ext.Msg.alert('Success', 'User has been deleted', Ext.emptyFn);
							}
    					}
					})
     		}
 		})
	},
		
	configureList: function() {
		var user_id = sessionStorage.getItem("user_crud.user_id");
		var userManagementCatList = Ext.getCmp("userManagementCatList");
		userManagementCatList.setItemTpl('{category_name}');
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
				var record = records[0];
				var categoriesStore = this.getRelevantStore();
    			userManagementCatList.setStore(categoriesStore);
    		}
			})
			

	},	
	
	
	
	getRelevantStore: function () {
		var roles =myschoolishness.controller.Utils.getRoles();
		var deleteButton = Ext.getCmp("userDeleteButton");
		
		if (roles === null) {
			return;
		}
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		
		if (editUserOrigin==="pref") {
			deleteButton.setHidden(true);
		} else {
			deleteButton.setHidden(false);
		}
		
		var theStore = null;
		console.log("editUserOrigin " + editUserOrigin);
		console.log("roles " + roles);
		
		if (editUserOrigin === 'pref' && roles.indexOf("P") === -1) {
				console.log("Choosing settingCategoriesStore ");
				theStore = Ext.create('myschoolishness.store.SettingCategoriesStore', {
					model: "myschoolishness.model.CategoryModel"
				});
		} else if (roles.indexOf("A") != -1) {
				console.log("Choosing UserAdminCategoriesStore ");
				theStore = Ext.create('myschoolishness.store.UserAdminCategoriesStore', {
					model: "myschoolishness.model.CategoryModel"
				});		
		} else if (roles.indexOf("T") != -1) {
				console.log("Choosing UserTeacherCategoriesStore ");
				theStore = Ext.create('myschoolishness.store.UserTeacherCategoriesStore', {
					model: "myschoolishness.model.CategoryModel"
				});		
		}  else  {
				console.log("Choosing ParentsSettingCategoriesStore ");
				theStore = Ext.create('myschoolishness.store.ParentsSettingCategoriesStore', {
					model: "myschoolishness.model.CategoryModel"
				});		
    	}
    	
    	return theStore;
	},
	
	onBackButtonTap: function () {
		var editUserOrigin = sessionStorage.getItem("edit_user.origin");
		if (editUserOrigin === 'pref') {
			this.fireEvent("goHome", this);
		} else {
		 this.fireEvent("showParentList", this);
		 }
	}
	
	

	

})
