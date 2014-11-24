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
                            						//var absenceList = Ext.getCmp('schoolAttendance');	
													//absenceList.loadData();
													var schoolPanel = Ext.getCmp('schoolPanel');
													schoolPanel.setActiveItem(1);
                            					} else if (btn.getText() === "Sign Out") {
                            						var signOutList = Ext.getCmp('classSignOut');	
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
    	       		xtype: 'absence-rollcall',
    	       		itemId: 'schoolAttendance',
    	       		id: 'schoolAttendance',
    	       		title:'Attendance'
    	       		},
    	       	]},
    	      ],
    },
	
	showUpdates: function () {
		var schoolPanel = Ext.getCmp('schoolPanel');
		var bulletinsSchool = Ext.getCmp('bulletinsSchool');	
		schoolPanel.setActiveItem(0);
		bulletinsSchool.load();	
	},
	
	showAttendance: function () {
		var absenceList = Ext.getCmp('schoolAttendance');	
		absenceList.loadData();
		var schoolPanel = Ext.getCmp('schoolPanel');
		schoolPanel.setActiveItem(1);
	},
		
	loadScreens: function() {
    	console.log("Init CALLED->" + this.schoolIdIsValid());
        	this.showUpdates();
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