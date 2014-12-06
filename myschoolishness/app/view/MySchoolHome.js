Ext.define('myschoolishness.view.MySchoolHome', {
    extend: 'Ext.Panel',
    alias: 'widget.school-home',
    xtype: 'school-home',
     fullscreen: true,
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	
    	items:[ 
    			{
                		xtype: 'titlebar',
                		itemId: 'schoolTitlebar',
                		docked: 'top',
                		items: [
                    			{
		        					xtype: 'segmentedbutton',
                    			items: [{
                        				text: 'Updates',
                        				pressed: true
                    					}, {
                        				text: 'Attendance',
                    					},
                    					{
                        				text: 'Sign Out',
                    					}
                    					 ], // items
                    					listeners: {
                        					toggle: function (segBtn, btn, isPressed) {
                            					if (btn.getText() === "Updates") {
                            						var schoolPanel = Ext.getCmp('schoolPanel');
													var bulletinsSchool = Ext.getCmp('bulletinsSchool');	
													schoolPanel.setActiveItem(0);
													bulletinsSchool.load();	
                            					} else if (btn.getText() === "Attendance") {
                            						var absenceList = Ext.getCmp('schoolAttendance');	
													absenceList.loadData();
													var schoolPanel = Ext.getCmp('schoolPanel');
													schoolPanel.setActiveItem(1);
                            					} else if (btn.getText() === "Sign Out") {
                            						var signOutList = Ext.getCmp('schoolSignOut');	
													signOutList.loadData();
													var schoolPanel = Ext.getCmp('schoolPanel');
													schoolPanel.setActiveItem(2);
                            					}
                        					} // toggle
                    					} // listeners
               	 					},
            
                			]
           		},
           		{
        		xtype: 'panel',
        		layout: 'card',
				itemId:'schoolPanel',
				id:'schoolPanel',
				width:'100%',
				height:'100%',
        		items: [
    	       		{
    	       		xtype: 'bulletin-board',
    	       		itemId: 'bulletinsSchool',
    	       		id: 'bulletinsSchool',
    	       		title:'Updates'
    	       		},
    	       		{
    	       		xtype: 'absence-manage-students',
    	       		itemId: 'schoolAttendance',
    	       		id: 'schoolAttendance',
    	       		title:'Attendance'
    	       		},
    	       		{
    	       		xtype: 'absence-signout',
    	       		itemId: 'schoolSignOut',
    	       		id: 'schoolSignOut',
    	       		title:'Sign Out'
    	       		},
    	       	]},
    	      ],
    },
	
	showUpdates: function () {
		sessionStorage.setItem("homescreen","school");
		var schoolPanel = Ext.getCmp('schoolPanel');
		var bulletinsSchool = Ext.getCmp('bulletinsSchool');	
		schoolPanel.setActiveItem(0);
		bulletinsSchool.load();	
	},
	
	showAttendance: function () {
		sessionStorage.setItem("homescreen","school");
		var absenceList = Ext.getCmp('schoolAttendance');	
		absenceList.loadData();
		var schoolPanel = Ext.getCmp('schoolPanel');
		schoolPanel.setActiveItem(1);
	},
	
	makeSignOutActive: function() {
    	var sigPanel = Ext.getCmp('schoolSignOut');
    	sigPanel.loadData();
    	 //segButtonClass.setPressedButtons([2]);
    	 //segButtonClass.setPressed(2);
    	 //var classPanel = Ext.getCmp('classPanel');
		//classPanel.setActiveItem(2);
	},
	
	loadScreens: function() {
    	sessionStorage.setItem("homescreen","school");
        	this.showUpdates();
        	 this.initialize();
	},
		
	onTabSelect: function (sender, newActiveItem, oldActiveItem, eOpts ) {
		console.log("TAB switched " + newActiveItem.getTitle());
		//newActiveItem.loadData();
	},
	
	schoolIdIsValid: function () {
		var school_id = sessionStorage.getItem("school_id");
		console.log("schoolIdIsValid->" + school_id);
			if (school_id === null || school_id === undefined || school_id.length <1 || school_id === 'undefined') {
				return false;
			} else {
				return true;
			}
	},
	
})