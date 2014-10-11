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
                    					 ], // items
                    					listeners: {
                        					toggle: function (segBtn, btn, isPressed) {
                            					if (btn.getText() === "Updates") {
                            						var classPanel = Ext.getCmp('classPanel');
													var bulletinsClass = Ext.getCmp('bulletinsClass');	
													classPanel.setActiveItem(0);
													bulletinsClass.load();	
                            					} else {
                            						var absenceList = Ext.getCmp('classAttendance');	
													absenceList.loadData();
													var classPanel = Ext.getCmp('classPanel');
													classPanel.setActiveItem(1);
                            					}
                        					} // toggle
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
    	       	]},
    	      ],
    },
	
	showUpdates: function () {
		var classPanel = Ext.getCmp('classPanel');
		var bulletinsClass = Ext.getCmp('bulletinsClass');	
		classPanel.setActiveItem(0);
		bulletinsClass.load();	
	},
	
	showAttendance: function () {
		var absenceList = Ext.getCmp('classAttendance');	
		absenceList.loadData();
		var classPanel = Ext.getCmp('classPanel');
		classPanel.setActiveItem(1);
	},
		
	initialize: function() {
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