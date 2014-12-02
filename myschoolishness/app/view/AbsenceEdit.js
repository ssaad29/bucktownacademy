Ext.define('myschoolishness.view.AbsenceEdit', {
    extend: 'Ext.Panel',
	alias: "widget.absence-edit",
	 xtype: 'absence-edit',
	requires: ['Ext.carousel.Carousel','Ext.data.Store','Ext.form.FieldSet','Ext.form.Text','Ext.field.Toggle','Ext.TitleBar','Ext.ux.field.TimePicker'],
	config: {
		title: 'Student Absences',
		items: [
					{
                		xtype: 'titlebar',
                		itemId: 'titlebar',
                		docked: 'top',
                		ui: 'dark',
                		items: [
                			{
		        			xtype: 'button',
		        			itemId:'cancelButton',
		        			ui: 'back',
		        			padding: '10px',
		        			text: 'Back'
                			}, 
                			{
                    		xtype: 'spacer'
                			}, 
                			
                			{
		        			xtype: 'button',
		        			align: 'right',
		        			itemId:'removeButton',
		        			id:'removeButton',
		        			ui: 'decline',
		        			padding: '10px',
		        			text: 'Remove'
                			},
                			{
		        			xtype: 'button',
		        			align: 'right',
		        			itemId:'doButton',
		        			id:'doButton',
		        			ui: 'action',
		        			padding: '10px',
		        			text: 'Update'
                			}
                		]
           			 },
           			 {
                    	xtype: 'selectfield',
                    	label: 'Choose one',
                    	id: 'typeField',
		        		itemId: 'typeField',
                    	options: [
                        	{text: 'Absent',  value: '1'},
                        	{text: 'Late arrival', value: '2'},
                        	{text: 'Leaving early',  value: '3'},
                        	{text: 'After school note',  value: '4'},
                        	{text: 'Before school note',  value: '5'}
                    	],
                    	listeners: {                                
                    			change: function(field, value) {
    							var tardyDismissalField = Ext.getCmp("tardyDismissalTimeEditStudent");
    							var tardyDismissalFieldSet = Ext.getCmp("tardyDismissalTimeEditStudentFieldSet");
    							console.log("value" + value);
    							
                        		if (value==='2' || value==='3') {
    								tardyDismissalFieldSet.setHidden(false);
    							} else {
    								tardyDismissalFieldSet.setHidden(true);
    							}
                        	}                      
                    	}
                	 },
           			 {
		        		xtype: 'fieldset',
		        		itemId: 'fieldset',
		        		items: [
		        					{
		        		    		xtype:'togglefield',
		        		    		name: 'noteFromHome',
		        		    		label: 'Received note/call from parents',
		        		    		labelWidth: '60%',
		        		    		id: 'noteFromHome',
		        		    		itemId: 'noteFromHome',
		        		    		checked: false,
		        		    		labelWrap:'false',
		        		        	},
		        		        	{
		        		        		xtype:'textfield',
		        		        		placeHolder: 'Enter reason',
		        		        		itemId: 'reason',
		        		        		name: 'reason',
		        		        		required: false
		        		        	},
		        		        	{
		        						xtype: 'fieldset',
		        						itemId: 'fromFieldSet',
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
                    								name: 'from',
                    								itemId: 'from',
                    								dateFormat: 'M d, Y',
                    								id: 'from',
													value: new Date()
                								}

		        		        			]

		        					},
                					{
		        						xtype: 'fieldset',
		        						itemId: 'toFieldSet',
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
                    								itemId: 'to',
                    								dateFormat: 'M d, Y',
                    								id: 'to',
													value: new Date()
                								}

		        		        			]

		        					},
		        					{
		        						xtype: 'fieldset',
		        						id: 'tardyDismissalTimeEditStudentFieldSet',
		        						itemId: 'tardyDismissalTimeEditStudentFieldSet',
		        						layout: 'hbox',
		        						items: [
		        								{
												xtype:'label',
												html: 'Time',
												padding: '12',
												align: 'left'
												},
												{
        										xtype: 'timepickerfield',
        										name: 'Enter time',
        										id: 'tardyDismissalTimeEditStudent',
        										itemId: 'tardyDismissalTimeEditStudent',
        										value: new Date()
        										},
		        		        			]

		        					},

		        		        ]

		        	}
		],
		 listeners: [{
							delegate: '#cancelButton',
							event: 'tap',
							fn: 'onCancelButtonTap'
							},
							{
							delegate: '#removeButton',
							event: 'tap',
							fn: 'onRemoveButtonTap'
							},
							{
							delegate: '#doButton',
							event: 'tap',
							fn: 'onActionButtonTap'
							},
							{
							delegate: '#addButton',
							event: 'tap',
							fn: 'onAddButtonTap'
							}
						]

	},
	
	onAddButtonTap: function () {
		this.configureView(null);
		this.setRecord(null);
	},
	
	onCancelButtonTap: function () {
		if (sessionStorage.getItem("homescreen") ==="kids") {
    			this.fireEvent("goHome", this);
    		} else {
    			history.back();
    		}
	},

	onRemoveButtonTap: function () {
		console.log("REMOVE Tapped");
		absence_id = sessionStorage.getItem("absence.edit.absence_id");
		if (absence_id!= null && absence_id!=undefined) {
			console.log('try deleting this absence ' + absence_id);
		
			var absentDeleteStore = Ext.create('myschoolishness.store.AbsentDeleteStore', {
				model: "myschoolishness.model.AbsentDeleteModel"
			});
			
			absentDeleteStore.load({
    			//define the parameters of the store:
    		    		params: {
        		absence_id: absence_id,
        		token: sessionStorage.getItem("token")
    			},
    			
    		scope: this,
    		callback : function(records, operation, success) {		
			console.log("REMOVE success " + success);
			if (success===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
				if (success===true) {
						Ext.Msg.alert('Status', 'Delete successful');
						if (sessionStorage.getItem("homescreen") ==="kids") {
							console.log("Going home ");
    						this.fireEvent("goHome", this);
    					} else {
    						console.log("Going back ");
    						history.back();
    					}
					}		
				
				}
			})
		}
	},

 	afterStoreLoad: function(store, records, successful, operation, eOpts) {
    	if (sessionStorage.getItem("homescreen") ==="kids") {
    			this.fireEvent("goHome", this);
    		} else {
    			history.back();
    		}
	},
	
	onActionButtonTap: function () {
		var fieldset = this.getComponent("fieldset");
		var noteFromHome = fieldset.getComponent("noteFromHome");
    	var reason = fieldset.getComponent("reason");
    	var fromFieldSet = fieldset.getComponent("fromFieldSet");
    	var from = fromFieldSet.getComponent("from");
    	var toFieldSet = fieldset.getComponent("toFieldSet");
    	var to = toFieldSet.getComponent("to");
    	var startDate = from.getValue();
    	startDate.setMonth(startDate.getMonth() );
    	var tardyDismissalFieldSet = fieldset.getComponent("tardyDismissalTimeEditStudentFieldSet");
    	var tardyDismissalField = tardyDismissalFieldSet.getComponent("tardyDismissalTimeEditStudent");
		var typeField = this.getComponent("typeField");
		var tardyDismissal = "";
		var role = sessionStorage.getItem("absence.edit.role");
		
		if (typeField.getValue() ==="2" || typeField.getValue() ==="3") {
			tardyDismissal = tardyDismissalField.getValue();
		} else {
			tardyDismissal=null;
		}

		var schoolEntered = 0;
		var parentEntered = 0;
		var role = sessionStorage.getItem("absence.edit.role");
    	var endDate = to.getValue();
    	endDate.setMonth(endDate.getMonth() );
		
		if(endDate > startDate) {

			if (role==="approver") {
				schoolEntered=1;
				parentEntered=noteFromHome.getValue();
			} else {
				parentEntered =1;
			}
		
			var absentInsertStore = Ext.create('myschoolishness.store.AbsentInsertStore', {
				model: "myschoolishness.model.AbsentInsertModel"
			});
		
			absentInsertStore.addListener('load',this. onStoreLoad,this);
			absentInsertStore.addAfterListener('load',this.afterStoreLoad,this);
		
        	absentInsertStore.load({
    			//define the parameters of the store:
    		    		params: {
        		student_id: sessionStorage.getItem("attendance.student_id"),
        		absence_id: sessionStorage.getItem("absence.edit.absence_id"),
        		user_id: sessionStorage.getItem("staff.user_id"),
        		reason: reason.getValue(),
        		start_date_time: startDate,
        		end_date_time: endDate,
        		tardy_dismissal_time: tardyDismissal,
        		type: typeField.getValue(),
        		updatedBy: sessionStorage.getItem("user_id"),
        		school_entered: schoolEntered,
        		parent_entered:parentEntered,
        		token: sessionStorage.getItem("token")
    			},
    			
    			scope: this,
    			callback : function(records, operation, success) {
				if (success===false) {
					myschoolishness.controller.Utils.sessionExpired();
		
					return;
				}
					if (myschoolishness.controller.Utils.hasRecords(records) || success===true) {
						Ext.Msg.alert('Status', 'Changes saved successfully.');
					}
				}
			})
		} else {
			Ext.Msg.alert('Cannot save', 'Start date cannot be later than end date');
		}
	},

   loadData: function () {	
			var absence_id = sessionStorage.getItem("absence.edit.absence_id");
			console.log("absence_id " + absence_id);
			if (absence_id!= null && absence_id!=undefined && absence_id.length > 1) {
				var absenceStore = Ext.create('myschoolishness.store.AbsentGetByIdStore', {
					model: "myschoolishness.model.AbsentGetByIdModel"
				});
		
				//absenceStore.addListener('load',this. onIdRecieved,this);
    
        		absenceStore.load({
    			//define the parameters of the store:
    		    		params: {
        		absence_id: absence_id,
        		token: sessionStorage.getItem("token")
    			},

    		scope: this,
    		callback : function(records, operation, success) {
			console.log("Got an absence??" + success);
			if (success===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
				console.log("Got an absence?? + records[0] " + records[0]);
				if (myschoolishness.controller.Utils.hasRecords(records)) {
					this.configureView(records[0]);
				} else {
					this.configureView(null);
				}
				}
			})
			} else {
				this.configureView(null);
			}
	},
	
	
	configureView: function (record) {
		var fieldset = this.getComponent("fieldset");
		var noteFromHome = fieldset.getComponent("noteFromHome");
    	var reason = fieldset.getComponent("reason");
    	var titlebar = this.getComponent("titlebar");
		var actionButton = Ext.getCmp('doButton');
		var deleteButton = Ext.getCmp('removeButton');
		var addButton = Ext.getCmp('addButton');
		var role = sessionStorage.getItem("absence.edit.role");
		var idType = sessionStorage.getItem("attendance.id_type");
		var firstName = sessionStorage.getItem("attendance.first_name");
		var lastName = sessionStorage.getItem("attendance.last_name");
		var actionButton = Ext.getCmp('doButton');
		var typeField = this.getComponent("typeField");
    	var fromFieldSet = fieldset.getComponent("fromFieldSet");
    	var from = fromFieldSet.getComponent("from");
    	var toFieldSet = fieldset.getComponent("toFieldSet");
    	var to = toFieldSet.getComponent("to");
		var tardyDismissalFieldSet = fieldset.getComponent("tardyDismissalTimeEditStudentFieldSet");
    	var tardyDismissalField = tardyDismissalFieldSet.getComponent("tardyDismissalTimeEditStudent");

		if (idType==="staff") {
			firstName=sessionStorage.getItem("staff.first_name");
			lastName=sessionStorage.getItem("staff.last_name");
		}
		
		if ((firstName != undefined && firstName!=null && firstName.length >0) || (lastName != undefined && lastName===null && lastName.length >0)) {
			title = firstName + " " + lastName;
		} else {
    		title = "Edit Attendance";
    	}

		titlebar.setTitle(title);
		if (record===null) {
			actionButton.setText("Record");
    		deleteButton.setHidden(true);
    	} else {
    		deleteButton.setHidden(false);
    		//addButton.setHidden(false);
    		actionButton.setText("Update");
    	}
    	
    	console.log("role " + role);
    	console.log("idType " + idType);
    	if (role==="approver" && idType==="student") {
    		noteFromHome.setHidden(false);
    	} else {
    		noteFromHome.setHidden(true);
    	}
    	
    	if (record!=null && record!=undefined && (record.get("type")===2 || record.get("type")===3)) {
    		tardyDismissalFieldSet.setHidden(false);
    		var tardyDismissal =myschoolishness.controller.Utils.convertDateToJS(record.get("tardy_dismissal_time"));
    		tardyDismissalField.setValue(tardyDismissal);
    	} else {
    		tardyDismissalFieldSet.setHidden(true);
    	}
    	
    	if (record != null) {
    		var parentEntered = record.get("parent_entered");
    		if (parentEntered === 1) {
    			noteFromHome.setValue(1);
    		} else {
    			noteFromHome.setValue(0);
    		}
    		sessionStorage.setItem("absence.absence_id", record.get("absence_id"));
    		var startDate = myschoolishness.controller.Utils.convertDateToJS(record.get("start_date_time"));
    		var endDate = myschoolishness.controller.Utils.convertDateToJS(record.get("end_date_time"));
    		reason.setValue(record.get("reason"));
    		from.setValue(startDate);
    		to.setValue(endDate);
    		typeField.setValue(record.get("type"));
    	} else {
    		sessionStorage.setItem("absence.absence_id", "");
    		var today = new Date();
    		today.setHours(0,0,0,0);
    		from.setValue(today);
    		var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    		tomorrow.setHours(0,0,0,0);
    		to.setValue(tomorrow);
    		typeField.setValue(1);
    	}
    },    
})