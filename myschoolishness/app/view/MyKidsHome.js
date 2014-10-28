Ext.define('myschoolishness.view.MyKidsHome', {
    extend: 'Ext.Panel',
    alias: 'widget.my-kids-home',
    xtype: 'my-kids-home',
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	
    	items:[ 
    			{
                		xtype: 'titlebar',
                		itemId: 'dirTitlebar',
                		docked: 'top',
                		items: [
                				{
                    			xtype: 'selectfield',
                    			id: 'kidsSelect',
		        				itemId: 'kidsSelect',
		        				maxWidth: 140,
                    			listeners: {                                
                    				change: function(field, value) {
	    								console.log("value" + value);
	    								var valuesList = value.split(".");
	    								console.log(valuesList[i]);
	    								if (valuesList.length > 2) {
	    									sessionStorage.setItem("attendance.student_id", valuesList[2]);
											sessionStorage.setItem("attendance.first_name", valuesList[0]);
											sessionStorage.setItem("attendance.last_name", valuesList[1]);
											var absenceList = Ext.getCmp('kidsAttendance');	
											absenceList.loadData();
										}
	    								
	                        			}                      
                    				}
                    			},
                    			{
		        					xtype: 'segmentedbutton',
                    			items: [{
                        				text: 'Updates:',
                        				pressed: true
                    					}, {
                        				text: 'Attendance',
                    					}, ], // items
                    					listeners: {
                        					toggle: function (segBtn, btn, isPressed) {
                            					if (btn.getText() === "Updates:") {
                            						var kidsPanel = Ext.getCmp('kidsPanel');
													var bulletinsKids = Ext.getCmp('bulletinsKids');	
													kidsPanel.setActiveItem(0);
													bulletinsKids.load();	
                            					} else {
                            						var absenceList = Ext.getCmp('kidsAttendance');	
													absenceList.loadData();
													var kidsPanel = Ext.getCmp('kidsPanel');
													kidsPanel.setActiveItem(1);
                            					}
                        					} // toggle
                    					} // listeners
               	 					},
               	 					
            
                			]
           		},
           		{
        		xtype: 'panel',
        		layout: 'card',
				itemId:'kidsPanel',
				id:'kidsPanel',
				width:'100%',
				height:'100%',
        		items: [
    	       		{
    	       		xtype: 'bulletin-board',
    	       		itemId: 'bulletinsKids',
    	       		id: 'bulletinsKids',
    	       		title:'Updates'
    	       		},
    	       		{
    	       		xtype: 'absenceList',
    	       		itemId: 'kidsAttendance',
    	       		id: 'kidsAttendance',
    	       		title:'Attendance'
    	       		},
    	       	]},
    	      ],
		        listeners: [
								{
									delegate: '#myKidsUpdatesButton',
									event: 'tap',
									fn: 'showUpdates'
								},
								{
								delegate: '#myKidsAttendanceButton',
								event: 'tap',
								fn: 'showAttendance'
								},
								
							]

    },
	
	
	
	showUpdates: function () {
		var kidsPanel = Ext.getCmp('kidsPanel');
		var bulletinsKids = Ext.getCmp('bulletinsKids');	
		kidsPanel.setActiveItem(0);
		bulletinsKids.load();	
		
	},
	
	showAttendance: function () {
		var absenceList = Ext.getCmp('kidsAttendance');	
		absenceList.loadData();
		console.log("ABSENCE LIST " + absenceList.getStore());
		var kidsPanel = Ext.getCmp('kidsPanel');
		kidsPanel.setActiveItem(1);
		var absenceList = Ext.getCmp('kidsAttendance');	
	},
		
	initialize: function() {
    	console.log("Init CALLED->" + this.schoolIdIsValid());
        	this.loadSelect();
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
	
	loadSelect: function () {
			console.log("LOAD SELECT CALLED->" + this.schoolIdIsValid());
			var school_id = sessionStorage.getItem("school_id");
			var kidsSelect = Ext.getCmp('kidsSelect');
			kidsSelect.setHidden(true);
			var options = [];
			kidsSelect.setOptions(null);
			
            for (var i=0;i<options.length;i++) {
				console.log("NOW PRINTING " + i + " " + options[i]);
			}
		 	var user_id = sessionStorage.getItem("user_id");
		 	console.log("School ID " + school_id);
		 	var kidsStore = Ext.create('myschoolishness.store.AbsenceMyKidsStore', {
			model: 'myschoolishness.model.AbsenceMyKidsModel'
			});
			kidsStore.load({
    		//define the parameters of the store:
    		params: {
        		user_id: user_id,
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token")
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								for (var i=0;i<records.length;i++) {
									if (i===0) {
										sessionStorage.setItem("attendance.id_type", "student");
										sessionStorage.setItem("attendance.student_id", records[i].get("student_id"));
										sessionStorage.setItem("attendance.first_name", records[i].get("student_first"));
										sessionStorage.setItem("attendance.last_name", records[i].get("student_last"));
										sessionStorage.setItem("absence.edit.role", "creator");
									}
    								console.log("FIRST " + records[i].get('student_first'));
								console.log("LAST " + records[i].get('student_last'));
        							options.push({
            						value: records[i].get('student_first') + "." + records[i].get('student_last') + "." + records[i].get('student_id'),
            						text: records[i].get('student_first'),
        							});
    							};
								kidsSelect.setOptions(options);
								console.log("SETTING MY KIDS STORE " + kidsSelect);
								console.log("LENGTH " + records.length);
								kidsSelect.setHidden(false);
							}
    					}
					})
	},

})