Ext.define('myschoolishness.view.Main', {
    extend: 'Ext.Panel',
    alias: "widget.mainview",
    xtype: 'main',
	requires: ['Ext.form.FieldSet','Ext.Label','Ext.Img','Ext.Button','Ext.TitleBar'],
config: {
	title: 'Main',
	layout: 'vbox',
	items: [ {
        							
    		xtype: 'toolbar',
    		docked: 'top',
    		align: 'center',
    		title: '',
    			items: [
                			{
                				xtype: 'segmentedbutton',
                				itemId:'mainSegmentedButton',
		        				id:'mainSegmentedButton',
                				allowMultiple: false,
                				items: [{
                    				text: 'My Kids',
                    				pressed: true
                				}, {text: 'My Class'
                				}, {text: 'My School'
                				}, {text: 'Directory'
                				}, 
                				]},
                				{
		        							xtype: 'button',
		        							itemId:'logoutButton',
		        							id:'logoutButton',
		        							ui:'small',
											text: 'Logout' ,
											align: 'center',
                							},
								]
		
        						},
        						{
        						xtype: 'panel',
        						layout: 'card',
								itemId:'homePanel',
								id:'homePanel',
								width:'100%',
								height:'100%',
								flex:2,
        						items: [
        								
										{
    	       							xtype:'my-kids-home',
										align: 'center',
    	       							itemId: 'kidsHome',
    	       							id: 'kidsHome',
    	       							title:'My Kids'
    	       							},
    	       							{
    	       							xtype:'class-home',
										align: 'center',
    	       							itemId: 'classHome',
    	       							id: 'classHome',
    	       							title:'My Class'
    	       							},
    	       							{
    	       							xtype:'school-home',
										align: 'center',
    	       							itemId: 'schoolHome',
    	       							id: 'schoolHome',
    	       							title:'My School'
    	       							},
    	       							{
    	       							xtype:'directory-home',
										align: 'center',
    	       							itemId: 'directoryHome',
    	       							id: 'directoryHome',
    	       							title:'Directory'
    	       							},
										]
		        		    	},
		        		    	
		        		    		{
        								xtype: 'panel',
        								layout: 'fit',
										flex:1,
        								items: [
        									{
    										xtype: 'toolbar',
    										docked: 'top',
    										align: 'center',
    										title: '',
    										items: [
    										{
                					   		xtype: 'button',
		        							itemId:'prefButton',
		        							id:'prefButton',
											iconCls: 'settings',
											title: 'Preferences' ,
											align: 'center',
                							},
                							{
		        							xtype: 'button',
		        							itemId:'adminButton',
		        							id:'adminButton',
											iconCls: 'key',
											text: 'admin' ,
											style: 'font-size:13px;',
											iconAlign: 'top',
											align: 'center',
                							},
                							
								]
		
        						
        									},
		        		    				{
		        							xtype: 'rotating-carousel',
		        							}
		        							]
		        					},
		        		],
		        listeners: [{
			delegate: '#attendanceButton',
			event: 'tap',
			fn: 'onAbsentTap'
		},
		{
								delegate: '#addNewNote',
								event: 'tap',
								fn: 'newNote'
								},
		{
			delegate: '#prefButton',
			event: 'tap',
			fn: 'onPrefTap'
		},
		{
			delegate: '#adminButton',
			event: 'tap',
			fn: 'onAdminTap'
		},
		{
			delegate: '#logoutButton',
			event: 'tap',
			fn: 'onLogoutTap'
		},
		{
			delegate: '#myClassButton',
			event: 'tap',
			fn: 'onMyClassTap'
		},
		{
			delegate: '#mySchoolButton',
			event: 'tap',
			fn: 'onMySchoolTap'
		},
		{
			delegate: '#mainSegmentedButton',
			event: 'toggle',
			fn: 'onSegButtonTap'
		}
		
		],	
        },

	initScreens: function() {
		console.log("INIT SCREENS in main");
			var schoolHome = Ext.getCmp('schoolHome');	
			schoolHome.loadScreens();
			var classHome = Ext.getCmp('classHome');	
			classHome.loadScreens();
			var kidsHome = Ext.getCmp('kidsHome');	
			kidsHome.loadScreens();
	},
		
	newNote: function () {
		console.log("Should fire show list");
		this.fireEvent('showBulletinAdminList');
	},
	
	onSegButtonTap: function (container, button, pressed) {
		var homePanel = Ext.getCmp('homePanel');	
		if (button.getText() === "My Kids") {
			this.loadData();
			homePanel.setActiveItem(0);
		} else if (button.getText() === "My Class") {
			this.loadData();
			homePanel.setActiveItem(1);
		} else if (button.getText() === "My School") {
			//this.loadData();
			homePanel.setActiveItem(2);
		} else {
			homePanel.setActiveItem(3);
		}
	},
	
	onDirectoryTap: function () {
		var homePanel = Ext.getCmp('homePanel');	
		homePanel.setActiveItem(3);
	},
	
	onMyClassTap: function () {
		var homePanel = Ext.getCmp('homePanel');	
		homePanel.setActiveItem(1);
	},
	
	onMySchoolTap: function () {
		var homePanel = Ext.getCmp('homePanel');	
		homePanel.setActiveItem(2);
	},
		
	loadData: function () {	
		console.log("LOAD DATA called in MAIN!!");
		var roles = sessionStorage.getItem("roles");
		window.location.hash = 'home';		
		this.setRoles(roles);	
		var activeItemIndex = 0;
		
		if (roles.indexOf("A") != -1) {
			var schoolHome = Ext.getCmp('schoolHome');	
			schoolHome.loadScreens();
			schoolHome.show();
			activeItemIndex = 2;
		}
		
		if (roles.indexOf("T") != -1) {
			var classHome = Ext.getCmp('classHome');	
			classHome.loadScreens();
			classHome.show();
			activeItemIndex = 1;
		}
		
		if (roles.indexOf("P") != -1) {
			var kidsHome = Ext.getCmp('kidsHome');	
			kidsHome.loadScreens();
			//activeItemIndex = 0;
		}
		
		//console.log("SETTING to ACTIVE " + activeItemIndex);
		//var homePanel = Ext.getCmp('homePanel');	
		//homePanel.setActiveItem(activeItemIndex);
	},
	
	onPrefTap: function () {
		sessionStorage.setItem("edit_user.origin","pref");
		sessionStorage.setItem("edit_student.origin","pref");
		sessionStorage.setItem("user_crud.user_id",sessionStorage.getItem("user_id"));
		this.fireEvent("showPrefView", this);
	},
	
	onAdminTap: function () {
		this.fireEvent("showStaff", this);
	},
	
	onAbsentTap: function () {
		this.fireEvent("absentChosen", this);
	},
	
	onLogoutTap: function () {
		sessionStorage.setItem("logout","yes");
		myschoolishness.controller.Utils.logout();
	},
	
	setRoles: function (roles) {
	 var me = this;
	 var dir = Ext.getCmp('directoryButton');	
		
		if (roles != null && roles.indexOf("S") === -1 && roles.indexOf("A") === -1 && roles.indexOf("T") === -1 && roles.indexOf("R") === -1) {
			var admin = Ext.getCmp('adminButton');
			admin.setHidden(true);
		}
		this.configureTabs();
		
	},
	
	configureTabs: function () {
		var roles = sessionStorage.getItem("roles");
		var segmentedbutton = Ext.getCmp("mainSegmentedButton");
		
		var items = segmentedbutton.getItems();
		var toPress = [];
		toPress[0] = 0;
		if (items.length === 4) {
			
			if (roles.indexOf("A") != -1 ) {
				toPress[0] = 2;
			}
			if (roles.indexOf("T") != -1 ) {
				toPress[0] = 1;
			}  
			segmentedbutton.setPressedButtons(toPress);

			if (roles.indexOf("A") === -1 ) {
				segmentedbutton.removeAt(2);
			} 
			if (roles.indexOf("T") === -1 ) {
				segmentedbutton.removeAt(1);
			}
			if (roles.indexOf("P") === -1 ) {
				segmentedbutton.removeAt(0);
			} 
		}
	},
	
});