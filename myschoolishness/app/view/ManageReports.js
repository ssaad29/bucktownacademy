Ext.define('myschoolishness.view.ManageReports', {
    extend: 'Ext.Panel',
	alias: "widget.managereports",
    xtype: 'managereports',
	fullscreen: true,
		requires: ['Ext.ux.field.TimePicker'],

	title: 'Manage Reports',
	config: {
		iconCls: 'news',
		title: 'Reports' ,
		layout: 'fit',
		fullstreen: true,
        items: [
		{
			xtype: 'fieldset',
			itemId: 'reportsfieldset',
			items: [
					{
                    	xtype: 'selectfield',
                    	label: 'Report',
                    	id: 'attendanceTypeField',
		        		itemId: 'attendanceTypeField',
                    	options: [
                        	{text: 'Attendance',  value: '1'},
                        	{text: 'Dismissal Signature', value: '2'},
                    	],
                    	
                	 },
					{
		        						xtype: 'fieldset',
		        						itemId: 'fromFieldSetReports',
		        						id: 'fromFieldSetReports',
		        						layout: 'hbox',
		        						items: [
		        								{
												xtype:'label',
												html: 'From',
												padding: '12',
												align: 'left'
												},
		        		        				{
		        		        				xtype: 'datepickerfield',
                    								itemId: 'FromReports',
                    								dateFormat: 'M d, Y',
                    								id: 'FromReports',
													value: new Date()
                								}

		        		        			]

		        		},
                		{
		        						xtype: 'fieldset',
		        						itemId: 'toFieldSetReports',
		        						layout: 'hbox',
		        						items: [
		        								{
												xtype:'label',
												html: 'To',
												padding: '12',
												align: 'left'
												},
		        		        				{
		        		        				xtype: 'datepickerfield',
                    								name: 'to',
                    								itemId: 'toReports',
                    								dateFormat: 'M d, Y',
                    								id: 'toReports',
													value: new Date()
                								}

		        		        			]

		        			},
		        			{
    	       				xtype: 'button',
    	       	    		iconMask: true,
    	       				align: 'right',
    	       				itemId: 'generateReportButton',
    	       				id:'generateReportButton',
    	       				ui: 'confirm',
    	       				text: 'Generate',
    	       				}
					]
		},	
		
		],
		listeners: [
		        				{
								delegate: '#generateReportButton',
								event: 'tap',
								fn: 'generateReport'
								},
								{
								delegate: '#toReports',
								event: 'change',
								fn: 'toChanged'
								},
								{
								delegate: '#FromReports',
								event: 'change',
								fn: 'fromChanged'
								},
								{
								delegate: '#attendanceTypeField',
								event: 'change',
								fn: 'typeChanged'
								},
							]
		
		},
	
	typeChanged: function(object, newValue, oldValue, eOpts) {
		console.log("typeChanged called" + newValue);
		var attendanceTypeField =  Ext.getCmp("attendanceTypeField");
		attendanceTypeField.setValue(newValue);
	},
	
	toChanged: function(object, newDate, oldDate, eOpts) {
		var to =  Ext.getCmp("toReports");
		to.setValue(newDate);
	},
	
	fromChanged: function(object, newDate, oldDate, eOpts) {
		var from = Ext.getCmp("FromReports");
		from.setValue(newDate);
		console.log("object " + object);
	console.log("newDate " + newDate);
    	console.log("oldDate " + oldDate);
	},
	
	
	loadData: function() {
		var from = Ext.getCmp("FromReports");
    	var to =  Ext.getCmp("toReports");
    	to.setValue(new Date());
    	from.setValue(new Date());	
    	console.log(from.getValue());
    	console.log(to.getValue());
    },
	
	
	generateReport: function() {
    	var from = Ext.getCmp("FromReports");
    	var to =  Ext.getCmp("toReports");
    	var startDate = from.getValue();
    	console.log("startDate-. " + startDate);
    	//startDate.setMonth(startDate.getMonth() );
		var endDate = to.getValue();
		console.log("endDate-. " + to.getValue());
		//endDate.setMonth(endDate.getMonth() );
		
		var typeField = Ext.getCmp("attendanceTypeField");
		var reportType = "";
		console.log("TYPE FIELD " + typeField.getValue());
		if (typeField.getValue() ==="1") {
			reportType = "attendance";
		} else {
			reportType="signout";
		}
				console.log("reportType " + reportType);

		if(endDate >= startDate) {
			if(reportType === "attendance") {
					var attendanceReportStore = Ext.create('myschoolishness.store.AttendanceReportStore', {
					model: "myschoolishness.model.AttendanceReportModel"
					});
		    
        			attendanceReportStore.load({
    				//define the parameters of the store:
    		    		params: {
        				start_date_time: startDate,
        				end_date_time: endDate,
        				token: sessionStorage.getItem("token")
    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								console.log("NUM records " + records.length);
								//console.log("HTML: " + records[0].get("html"));
								//this.fireEvent("showReport", this,records[0].get("html"));
								
								var myWindow = window.open("", "MsgWindow", "width=600, height=500");
								console.log("my wondow opened");
								var htmlContent = records[0].get("html");
								console.log("html content");
								myWindow.document.write("Bucktown Academy Attendance Report", htmlContent);
								console.log("written");
								myWindow.document.close();
								console.log("closed");
							}
    					}
					})
					
			}	else {
				var SignoutReportStore = Ext.create('myschoolishness.store.SignoutReportStore', {
					model: "myschoolishness.model.SignoutReportModel"
					});
		    
        			SignoutReportStore.load({
    				//define the parameters of the store:
    		    		params: {
        				start_date_time: startDate,
        				end_date_time: endDate,
        				token: sessionStorage.getItem("token")
    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								console.log("NUM records " + records.length);
								//console.log("HTML: " + records[0].get("html"));
								//this.fireEvent("showReport", this,records[0].get("html"));
								var myWindow = window.open("", "MsgWindow", "width=600, height=500");
								var htmlContent = records[0].get("html");
								myWindow.document.write("Bucktown Academy Attendance Report", htmlContent);
								myWindow.document.close();
							}
    					}
					})
			}	
		} else {
			Ext.Msg.alert('Invalid request', 'Start date cannot be later than end date');
		}
		
	},
	
	
})

