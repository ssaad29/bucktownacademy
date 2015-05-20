Ext.define('myschoolishness.view.AdminHome', {
    extend: 'Ext.TabPanel',
    alias: 'widget.admin-home',
    xtype: 'admin-home',
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	tabBar: {
            docked: 'bottom',
            itemId: 'staffTabBar',
            layout: {
                pack: 'center'
            },

        },
    	items:[ 
    			{
                		xtype: 'titlebar',
                		title: "Admin",
                		itemId: 'staffTitlebar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'staffBackButton',
		        			id:'staffBackButton',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			},
                			
                			{
    	       				xtype: 'button',
    	       				iconCls: 'add',
    	       	    		iconMask: true,
    	       				align: 'right',
    	       				itemId: 'staffNewButton',
    	       				id:'staffNewButton',
    	       				}
                			]
           		},
    	       	{
    	       	xtype: 'manage-students',
    	       	itemId: 'students',
    	       	},
    	       {
    	       	xtype: 'manage-parents',
    	       	itemId: 'parents',
    	       	},
    	       	{
    	       	xtype: 'manage-bulletins',
    	       	itemId: 'bulletins',
    	       	},
    	       	{
    	       	xtype: 'managereports',
    	       	itemId: 'reports',
    	       	}
    	      ],
		        listeners: [
		        				{
								delegate: '#staffBackButton',
								event: 'tap',
								fn: 'onBackButtonTap'
								},
								{
								delegate: '#staffNewButton',
								event: 'tap',
								fn: 'onNewButtonTap'
								},
								
								{
								event: 'activeitemchange',
								fn: 'onTabSelect'
								}
							]

    },
	
	
	onNewButtonTap: function () {
		var activeItem = this.getActiveItem();
		activeItem.invokeNewFlow();
	},
	
    onBackButtonTap: function () {
		this.fireEvent("goHome", this);
	},
	
	onTabSelect: function (sender, newActiveItem, oldActiveItem, eOpts ) {
		if (newActiveItem.getItemId() === "parents" || newActiveItem.getItemId() === "bulletins" || newActiveItem.getItemId() === "reports") {
			newActiveItem.loadData();
		} 
		
		this.setRoles();
	},
	
	showReports: function () {
		var reports = this.getComponent("reports");
		reports.loadData();
	},
	
	showBulletins: function () {
		var bulletins = this.getComponent("bulletins");
		bulletins.loadData();
	},
	
	showParents: function () {
		var parents = this.getComponent("parents");
		parents.loadData();
	},
	
	showStudents: function () {
		var students = this.getComponent("students");
		students.loadData();
	},
	
	setRoles: function () {
	 var me = this;
	 var newButton = Ext.getCmp('staffNewButton');
	 var activeItem = this.getActiveItem();
	 var currItemId = activeItem.getItemId();
	 var roles = sessionStorage.getItem("roles");
	 
	 if (currItemId === "students" && roles.indexOf("A") != -1) {
	 	newButton.setHidden(false);
	 } else if (currItemId === "students") {
	 	newButton.setHidden(true);
	 } else if (currItemId === "parents" || currItemId === "bulletins") {
	 	newButton.setHidden(false);
	 } 
	 
	}

})