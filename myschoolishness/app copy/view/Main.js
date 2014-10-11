Ext.define('myschoolishness.view.Main', {
    extend: 'Ext.Panel',
    alias: "widget.mainview",
    xtype: 'main',
	requires: ['Ext.form.FieldSet','Ext.Label','Ext.Img','Ext.Button','Ext.TitleBar'],
	config: {
  layout: {
   type: 'vbox',
   align:'center',
  },
  items: [
   {
    xtype: 'titlebar',
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
    		xtype: 'toolbar',
    		docked: 'top',
    		align: 'center',
    		title: '',
    			items: [
    					{
		        		xtype: 'button',
		        		itemId:'myKidsButton',
		        		id:'myKidsButton',
		        		iconCls: 'key',
						text: 'My Kids' ,
						style: 'font-size:13px;',
						iconAlign: 'top',
						align: 'center',
						},
						{
		        		xtype: 'button',
		        		itemId:'myClassButton',
		        		id:'myClassButton',
		        		iconCls: 'key',
						text: 'My Class' ,
						style: 'font-size:13px;',
						iconAlign: 'top',
						align: 'center',
						},
						{
		        		xtype: 'button',
		        		itemId:'mySchoolButton',
		        		id:'mySchoolButton',
		        		iconCls: 'key',
						text: 'My School' ,
						style: 'font-size:13px;',
						iconAlign: 'top',
						align: 'center',
						},
						{
		        		xtype: 'button',
		        		itemId:'directoryButton',
		        		id:'directoryButton',
		        		iconCls: 'key',
						text: 'Directory' ,
						style: 'font-size:13px;',
						iconAlign: 'top',
						align: 'center',
						},
					]
		},
		{
			xtype: 'panel',
			itemId:'homePanel',
			id:'homePanel',
			 width: '100%',
        	height: '100%',
        	layout: 'card',
        	bodyStyle: 'padding:15px',
        	defaults: {
            	// applied to each contained panel
            	border: false
        	},
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
				],
		},
  ],
  listeners: [{
			delegate: '#attendanceButton',
			event: 'tap',
			fn: 'onAbsentTap'
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
			delegate: '#myKidsButton',
			event: 'tap',
			fn: 'onMyKidsTap'
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
			delegate: '#directoryButton',
			event: 'tap',
			fn: 'onDirectoryTap'
		}
		
		]
 },
 	
 	onMyKidsTap: function () {
		var homePanel = Ext.getCmp('homePanel');	
		homePanel.setActiveItem(0);
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
	
 	show: function () {
		window.location.hash = 'home';		
		var homePanel = Ext.getCmp('homePanel');	
		homePanel.setActiveItem(0);
		this.setRoles(sessionStorage.getItem("roles"));		
		this.loadData();
	},
	
	loadData: function () {	
		var kidsHome = Ext.getCmp('kidsHome');	
		kidsHome.loadData();
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
	console.log("set roles called in main");
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
		console.log("ROLES " + roles);
		var myKidsButton = Ext.getCmp("myKidsButton");
		var myClassButton = Ext.getCmp("myClassButton");
		var mySchoolButton = Ext.getCmp("mySchoolButton");
		
		if (roles.indexOf("T") === -1) {
			myClassButton.setHidden(true);
			console.log("NOT TEACHER");
		} 
		
		if (roles.indexOf("P") === -1) {
			myKidsButton.setHidden(true);
			console.log("NOT PARENT");
		} 
		
		if (roles.indexOf("A") === -1 ) {
			mySchoolButton.setHidden(true);
			console.log("NOT AN ADMIN");
		} 
	},
	
});