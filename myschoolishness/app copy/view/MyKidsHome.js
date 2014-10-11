Ext.define('myschoolishness.view.MyKidsHome', {
    extend: 'Ext.TabPanel',
    alias: 'widget.my-kids-home',
    xtype: 'my-kids-home',
    fullscreen: true,
    requires: ['Ext.TabPanel'],

    defaults: {
        styleHtmlContent: true
        },
      
    config: {
    	tabBar: {
            docked: 'bottom',
            itemId: 'directoryTabBar',
            layout: {
                pack: 'center'
            },

        },
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
                    			listeners: {                                
                    				change: function(field, value) {
                        			}                      
                    			}
                	 			},
                			]
           		},
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
    	      ],
		        listeners: [
								{
								event: 'activeitemchange',
								fn: 'onTabSelect'
								},
							]

    },
	
	
	show: function ( ) {
		this.loadSelect();
	},
	
	loadData: function ( ) {
		var bulletins = Ext.getCmp('bulletinsKids');
		console.log("bulletins" + bulletins);
		bulletins.loadData();
		
	},
	
	loadSelect: function () {
			var kidsSelect = Ext.getCmp('kidsSelect');
			kidsSelect.setHidden(true);
			var options = [];
			kidsSelect.setOptions(null);
			
            for (var i=0;i<options.length;i++) {
				console.log("NOW PRINTING " + i + " " + options[i]);
			}
		 	var user_id = sessionStorage.getItem("user_id");
		 	
		 	var kidsStore = Ext.create('myschoolishness.store.MyKidsStore', {
			model: 'myschoolishness.model.MyKidsModel'
			});
			kidsStore.load({
    		//define the parameters of the store:
    		params: {
        		user_id: user_id,
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
            						value: records[0].get('student_first') + " " + records[i].get('student_last'),
            						text: records[0].get('student_first') + " " + records[i].get('student_last'),
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