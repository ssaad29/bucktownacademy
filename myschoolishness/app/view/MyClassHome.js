Ext.define('myschoolishness.view.MyClassHome', {
    extend: 'Ext.Panel',
    alias: 'widget.class-home',
    xtype: 'class-home',
     fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	
    	items:[ 
    			{
                		xtype: 'titlebar',
                		itemId: 'classTitlebar',
                		//id: 'classTitlebar',
                		docked: 'top',
                		items: [
                    			{
                    				itemId: 'classHomeSeg',
		        					xtype: 'segmentedbutton',
                    			items: [{
                        				text: 'Updates',
                        				pressed: true,
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
                            						var classPanel = Ext.getCmp('classPanel');
													var bulletinsClass = Ext.getCmp('bulletinsClass');	
													classPanel.setActiveItem(0);
													bulletinsClass.load();	
                            					} else if (btn.getText() === "Attendance") {
                            						var absenceList = Ext.getCmp('classAttendance');	
													absenceList.loadData();
													var classPanel = Ext.getCmp('classPanel');
													classPanel.setActiveItem(1);
                            					} else if (btn.getText() === "Sign Out") {
                            						var signOutList = Ext.getCmp('classSignOut');	
													signOutList.loadData();
													var classPanel = Ext.getCmp('classPanel');
													classPanel.setActiveItem(2);
                            					}
                        					}, // toggle
                        					painted: function (segBtn, btn, isPressed) {
                        						var pressedButtons = this.getPressedButtons();
                        						var classPanel = Ext.getCmp('classPanel');
                        						
                        						if (pressedButtons[0].getText() === "Updates") {
													classPanel.setActiveItem(0);
													var bulletinsClass = Ext.getCmp('bulletinsClass');	
													bulletinsClass.load();	
                            					} else if (pressedButtons[0].getText() === "Attendance") {
													classPanel.setActiveItem(1);
													var absenceList = Ext.getCmp('classAttendance');	
													absenceList.loadData();
                            					} else if (pressedButtons[0].getText() === "Sign Out") {
													classPanel.setActiveItem(2);
													var signOutList = Ext.getCmp('classSignOut');	
													signOutList.loadData();
                            					}
                        					},
                    					} // listeners
               	 					},
            
                			]
           		},
           		{
        		xtype: 'panel',
        		layout: 'card',
				itemId:'classPanel',
				id:'classPanel',
				width:'100%',
				height:'100%',
        		items: [
    	       		{
    	       		xtype: 'bulletin-board',
    	       		itemId: 'bulletinsClass',
    	       		id: 'bulletinsClass',
    	       		title:'Updates'
    	       		},
    	       		{
    	       		xtype: 'absence-rollcall',
    	       		itemId: 'classAttendance',
    	       		id: 'classAttendance',
    	       		title:'Attendance'
    	       		},
    	       		{
    	       		xtype: 'absence-signout',
    	       		itemId: 'classSignOut',
    	       		id: 'classSignOut',
    	       		title:'Sign Out'
    	       		},
    	       	]},
    	      ],
    },
	
	
	showUpdates: function () {
		sessionStorage.setItem("homescreen","class");
		var classPanel = Ext.getCmp('classPanel');
		var bulletinsClass = Ext.getCmp('bulletinsClass');	
		classPanel.setActiveItem(0);
		bulletinsClass.load();	
		var titleBar = this.getComponent('classTitlebar');
		var segButtonClass = titleBar.getComponent('classHomeSeg');
		var segButtonClass1 = Ext.ComponentQuery.query("classHomeSeg");
		console.log("segButtonClass1 " + segButtonClass1);
		console.log("segButtonClass " + segButtonClass);
	},
	
	showAttendance: function () {
		sessionStorage.setItem("homescreen","class");
		var absenceList = Ext.getCmp('classAttendance');	
		absenceList.loadData();
		var classPanel = Ext.getCmp('classPanel');
		classPanel.setActiveItem(1);
	},
	
	syncSegPanel: function(index) {
    	classPanel.setActiveItem(0);
	},
	
	makeSignOutActive: function() {
    	var sigPanel = Ext.getCmp('classSignOut');
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