Ext.define('myschoolishness.view.AbsenceHome', {
    extend: 'Ext.TabPanel',
    alias: 'widget.absence-home',
    xtype: 'absence-home',
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	tabBar: {
            docked: 'bottom',
            itemId: 'absenceTabBar',
            layout: {
            	animation: {
        			duration:0
    			},
                pack: 'center'
            }

        },
    	items:[ 
    			{
                		xtype: 'titlebar',
                		title: "Students Out Today",
                		itemId: 'titlebar',
                		docked: 'top',
                		items: [{
		        			xtype: 'button',
		        			itemId:'backButton',
		        			id:'backButtonAbsence',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			}, 
                			{
    	       				xtype: 'button',
    	       				iconCls: 'add',
    	       	    		iconMask: true,
    	       				align: 'right',
    	       				itemId: 'newAbsenceButton',
    	       				id:'newAbsenceButton',
    	       				hidden: true
    	       				}
                			]
           			 },
    	       	{
    	       	xtype: 'absence-allstudents',
    	       	itemId: 'allstudents'
    	       	},
    	       	{
    	       	xtype: 'absence-allstaff',
    	       	itemId: 'allstaff'
    	       	},
    	       	{
    	       	xtype:'absence-rollcall',
    	       	itemId: 'rollcall'
    	       	},
    	       	{
    	       	title:'Me',
    	       	iconCls: 'icon-user2',
    	       	itemId: 'Me'
    	       	},
    	       	{
    	       	xtype: 'absence-mykids',
    	       	itemId: 'mykids'
    	       	},
    	       	{
    	       	xtype: 'absence-manage-students',
    	       	itemId: 'manageStudents'
    	       	},
    	       	{
    	       	xtype: 'absence-manage-staff',
    	       	itemId: 'manageStaff'
    	       	}
    	       	
    	      ],
		        listeners: [
		        				{
								delegate: '#backButtonAbsence',
								event: 'tap',
								fn: 'onBackButtonTap'
								},
								{
								delegate: '#newAbsenceButton',
								event: 'tap',
								fn: 'onNewButtonTap'
								},
								{
								event: 'activeitemchange',
								fn: 'onTabSelect'
								}
							]

    },
    
    configureTabs: function () {
        var rollcall = this.getComponent("rollcall");
        var staffMember = this.getComponent("Me");
        var allstaff = this.getComponent("allstaff");
        var allstudents = this.getComponent("allstudents");
        var myKids = this.getComponent("mykids");
        var manageStudents = this.getComponent("manageStudents");
        var manageStaff = this.getComponent("manageStaff");

		var roles = sessionStorage.getItem("roles");
		console.log("ROLES " + roles);
		
		if (roles.indexOf("T") === -1) {
			this.remove(rollcall);
			//console.log("removing roll call");
		} 
		
		if (roles.indexOf("P") === -1) {
			this.remove(myKids);
			console.log("removing mykids");
		} else {
			this.remove(allstudents);
			console.log("removing all student");
		}
		
		if (roles.indexOf("S") === -1 && roles.indexOf("A") === -1 && roles.indexOf("T") === -1) {
			this.remove(staffMember);
			console.log("removing staffMember");
		} 
		
		if (roles.indexOf("A") === -1) {
			this.remove(manageStudents);
			this.remove(manageStaff);
		} 
		
		if (roles.indexOf("P") != -1) {
			this.setActiveItem(myKids);
			window.location.hash = 'absence/myKids';
		} else if (roles.indexOf("T") != -1) {
			this.setActiveItem(rollcall);
			window.location.hash = 'absence/rollcall';
		} else {
			this.setActiveItem(allstaff);
			window.location.hash = 'absence/staffOutToday';
		}
	},

    onNewButtonTap: function () {
		 sessionStorage.setItem("staff-absence.index", -1);
		 sessionStorage.setItem("myKids-absence.index", -1);
	     var me = this;
		 me.fireEvent('showEdit');
	},
	
    onBackButtonTap: function () {
    	this.fireEvent("goHome", this);
	},
	
	onTabSelect: function (sender, newActiveItem, oldActiveItem, eOpts ) {
		var titlebar = this.getComponent("titlebar");
		var newButton = Ext.getCmp('newAbsenceButton');
		var roles = sessionStorage.getItem("roles");
		var allstaff = this.getComponent("allstaff");

		if (newActiveItem.getItemId() === "Me") {
			sessionStorage.setItem("attendance.id_type", "staff");
			sessionStorage.setItem("absence.edit.role", "creator");
			sessionStorage.setItem("staff.first_name", sessionStorage.getItem("user.first_name"));
			sessionStorage.setItem("staff.last_name", sessionStorage.getItem("user.last_name"));
			sessionStorage.setItem("staff.user_id", sessionStorage.getItem("user_id"));
			sessionStorage.setItem("absence.edit.absence_id", null);
			this.fireEvent("showManageStaff", this);
		} else if (newActiveItem.getItemId() === "rollcall") {
			titlebar.setTitle("Roll Call for Today");
			newButton.setHidden(true);
			newActiveItem.tabChosen();
			window.location.hash = 'absence/rollcall';
		}  else if (newActiveItem.getItemId() === "allstudents") {
			titlebar.setTitle("Students Out Today");
			newButton.setHidden(true);
			window.location.hash = 'absence/studentsOutToday';
		}  else if (newActiveItem.getItemId() === "allstaff") {
			titlebar.setTitle("Staff Out Today");
			newButton.setHidden(true);
			window.location.hash = 'absence/staffOutToday';
		} else if (newActiveItem.getItemId() === "mykids") {
			sessionStorage.setItem("absence.origin", "myKids");
			titlebar.setTitle("My Kids");
			newButton.setHidden(true);
			newActiveItem.tabChosen();
			window.location.hash = 'absence/myKids';
		} else if (newActiveItem.getItemId() === "manageStudents") {
			titlebar.setTitle("Administer Student Absences");
			newButton.setHidden(true);
			window.location.hash = 'absence/manageStudents';
		} else if (newActiveItem.getItemId() === "manageStaff") {
			titlebar.setTitle("Administer Staff Absences");
			newButton.setHidden(true);
			window.location.hash = 'absence/manageStaff';
		}
		
		//console.log("sender " + sender + " newActiveItem " + newActiveItem.getTitle() + " oldActiveItem " + oldActiveItem + " eOpts " + eOpts );
	}

})