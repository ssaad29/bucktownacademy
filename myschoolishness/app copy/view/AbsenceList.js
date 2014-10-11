Ext.define('myschoolishness.view.AbsenceList', {
	extend: 'Ext.Panel',
	xtype: 'absenceList',
	title: "absenceList",
    iconCls: 'action',
	alias : 'widget.absenceList',
	requires: ['Ext.List'],
	fullscreen: true,
	config: {
	title: 'Absence List',
	layout: 'fit',
	items: [    
                			{
                				xtype: 'titlebar',
                				title: "Absences",
                				itemId: 'studentAbsences',
                				id:'studentAbsences',
                				docked: 'top',
                			items: [{
		        				xtype: 'button',
		        				itemId:'cancelButtonStudentAbsenceList',
		        				id:'cancelButtonStudentAbsenceList',
		        				ui: 'back',
		        				padding: '10px',
		        				text: 'Back'
                				},
                				{
		        				xtype: 'button',
		        				itemId:'reportAbsentButton',
		        				id:'reportAbsentButton',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Out'
                				},
                				{
		        				xtype: 'button',
		        				itemId:'recordTardyTime',
		        				id:'recordTardyTime',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Tardy'
                				},
                				{
		        				xtype: 'button',
		        				itemId:'recordEarlyDismissal',
		        				id:'recordEarlyDismissal',
		        				padding: '10px',
		        				align: 'right',
		        				text: 'Early'
                				},
                				{
    	       					xtype: 'button',
    	       					iconCls: 'add',
    	       	    			iconMask: true,
    	       					align: 'right',
    	       					itemId: 'addAbsenceFromList',
    	       					id:'addAbsenceFromList',
    	       					hidden: false
    	       					},
                				]
        						}, 
        						{
        						xtype: 'list',
									title: 'Student Absences' ,
									grouped: false,
									indexBar: false,
									itemTpl:'{displayString}',
									itemId:'studentAbsenceList',
		        					id:'studentAbsenceList',
		        							listeners: {
                								itemtap: function (list, idx, target, record, evt) {
												sessionStorage.setItem("absence.edit.absence_id", record.get("absence_id"));
												window.location.hash = 'absence/edit';
												this.fireEvent("showEdit", this);
        										},
        										show: function(list, opts){
        											this.getStore().load();
    											}
											}
        						}
		        		],
		        	listeners: [
		        		{
						delegate: '#cancelButtonStudentAbsenceList',
						event: 'tap',
						fn: 'onCancelButtonTap'
						},
						{
						delegate: '#recordTardyTime',
						event: 'tap',
						fn: 'onRecordTardy'
						},
						{
						delegate: '#recordEarlyDismissal',
						event: 'tap',
						fn: 'onRecordEarlyDismissal'
						},
						{
						delegate: '#reportAbsentButton',
						event: 'tap',
						fn: 'onReportAbsentButtonTap'
						},
						{
						delegate: '#addAbsenceFromList',
						event: 'tap',
						fn: 'onAddAbsence'
						}
						],
		
        			},
	
	onRecordExcused: function () {
		Ext.Msg.confirm("Confirmation", "Are you sure that you have received a note or phone call about being out today from the parents?",  function(choice)
 		{
   			if(choice == 'yes')
     		{
        		console.log("YES");
     		}
 		})
	},
	
	onAddAbsence: function () {
		sessionStorage.setItem("absence.edit.absence_id","");
		this.fireEvent("showEdit", this);
	},
	
	onRecordTardy: function () {
		sessionStorage.setItem("absenceType",2);
		this.checkForDupes();
	},
	
	onRecordEarlyDismissal: function () {
		sessionStorage.setItem("absenceType",3);
		this.checkForDupes();
	},
	
	onTimeCollected: function (time) {
		 this.saveAbsenceToDatabase(sessionStorage.getItem("absenceType"),time,null);
	},
	
	onCancelButtonTap: function () {
		this.fireEvent("goHome", this);
	},	
	
	onReportAbsentButtonTap: function () {
		sessionStorage.setItem("absenceType",1);
		this.checkForDupes();
	},

	checkForDupes: function() {
    	var startDate =new Date();
		//var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
		var endDate =new Date();
		startDate.setHours(0,0,0,0);
		endDate.setHours(23,59,59,999);
		var student_id = null;
		var user_id=null
		if (sessionStorage.getItem("attendance.id_type")==="staff") {
			user_id = sessionStorage.getItem("staff.user_id");
		} else {
			student_id = sessionStorage.getItem("attendance.student_id");
		}
		
		var dupesStore = Ext.create('myschoolishness.store.AbsentCheckForDuplicatesStore', {
			model: "myschoolishness.model.AbsentCheckForDuplicatesModel"
		});
		
		//dupesStore.addListener('load',this.onStoreLoad,this);
		dupesStore.addListener('load',this.afterDupesCheck,this);

        dupesStore.load({
    			//define the parameters of the store:
    		    params: {
        			student_id: student_id,
        			user_id: user_id,
        			start_date_range: startDate,
        			end_date_range: endDate,
        			token: sessionStorage.getItem("token")
    			},
    	})
	},
	
	afterDupesCheck: function(store, records, successful, operation, eOpts) {
		var typeToCreate = parseInt(sessionStorage.getItem("absenceType"));
		if (myschoolishness.controller.Utils.hasRecords(records)) {
			for (var i=0;i<records.length;i++) {
				if (records[i].get("type") ===typeToCreate) {
					Ext.Msg.alert('Unable to complete', 'This would create a duplicate', Ext.emptyFn);
					return;
				}
			}
		}
		
		if (sessionStorage.getItem("absence.edit.role") === "approver" && (typeToCreate===2 || typeToCreate===3)) {
			console.log("Teacher - tardy early ");
			var pickerWindow = Ext.getCmp('timeEntryPanel');
			if(!pickerWindow || pickerWindow===undefined){
				pickerWindow = Ext.create('myschoolishness.view.EnterTimeWindow');
				Ext.Viewport.add(pickerWindow);
			}
			pickerWindow.addListener('timeEntryCollected',this. onTimeCollected,this);
			pickerWindow.show();
		} else if (sessionStorage.getItem("absence.edit.role") === "creator" && (typeToCreate===1)){
			Ext.Msg.prompt(
      			"Reason",
      			"Please enter a reason",
      			function(buttonId,text) {
          			this.gotReason(buttonId,text);                  
      			}, 
      			this // scope of the controller 
    			);			
		} else {
			console.log("Plain ");
			this.saveAbsenceToDatabase(typeToCreate,null,null);
		}
	},
	
	gotReason: function (button,text) {
		this.saveAbsenceToDatabase(1,null,text);
	},
	
	saveAbsenceToDatabase: function (type, tardyDismissalTime,reasonText) {
		var reason = reasonText;
		var startDate = new Date(); 
		var endDate = new Date(); 
		//var startDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		//var startDate =new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		//var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
		var endDate =new Date();
		startDate.setHours(0,0,0,0);
		endDate.setHours(23,59,59,999);
		var tardyTime =myschoolishness.controller.Utils.getTimeStringForDisplayFromString(tardyDismissalTime); 
		var schoolEntered = 0;
		var parentEntered = 1;
		var student_id = null;
		var user_id=null
		if (sessionStorage.getItem("attendance.id_type")==="staff") {
			user_id = sessionStorage.getItem("staff.user_id");
		} else {
			student_id = sessionStorage.getItem("attendance.student_id");
		}
		
		if (sessionStorage.getItem("absence.edit.role") === "approver") {
			reason = "Teacher reported";
			schoolEntered = 1;
			parentEntered = 0;
		}
		
		
		var absentInsertStore = Ext.create('myschoolishness.store.AbsentInsertStore', {
			model: "myschoolishness.model.AbsentInsertModel"
		});
		
		absentInsertStore.addListener('load',this. onStoreLoad,this);
		absentInsertStore.addAfterListener('load',this.afterStoreLoad,this);
		var currentUser = sessionStorage.getItem("user_id");
        absentInsertStore.load({
    			//define the parameters of the store:
    		    params: {
        			student_id: student_id,
        			user_id: user_id,
        			reason: reason,
        			tardy_dismissal_time: tardyDismissalTime,
        			start_date_time: startDate,
        			end_date_time: endDate,
        			type: type,
        			createdBy: currentUser,
        			school_entered: schoolEntered,
        			parent_entered: parentEntered,
        			token: sessionStorage.getItem("token")
    			},
    	})
	},

 	afterStoreLoad: function(store, records, successful, operation, eOpts) {
    	this.onCancelButtonTap();
	},

    loadData: function () {	
    		sessionStorage.setItem("absence.edit.absence_id", null);
    		var list = this.getComponent("studentAbsenceList");	
			var idType = sessionStorage.getItem("attendance.id_type");
			list.setStore(null);
			
			if (idType==="staff") {
				var user_id = sessionStorage.getItem("staff.user_id");
				
				var staffStore = Ext.create('myschoolishness.store.AbsenceStaffMemberStore', {
					model: "myschoolishness.model.AbsenceStaffMemberModel"
				});
		
				staffStore.addListener('load',this. onStoreLoad,this);
    
        		staffStore.load({
    			//define the parameters of the store:
    		    		params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    			},

    			scope: this,
    			callback : function(records, operation, success) {
				if (list.getStore() === null) {
    				list.setStore(staffStore);
						}
    				}
				})
			} else {
    		
					var student_id = sessionStorage.getItem("attendance.student_id");
					list.setStore(null);
					var studentStore = Ext.create('myschoolishness.store.AbsentSingleStudentStore', {
					model: "myschoolishness.model.AbsentSingleStudentModel"
					});
		
					studentStore.addListener('load',this. onStoreLoad,this);
    
        			studentStore.load({
    				//define the parameters of the store:
    		    		params: {
        				student_id: student_id,
        				token: sessionStorage.getItem("token")
    				},

    				scope: this,
    				callback : function(records, operation, success) {
					if (list.getStore() === null) {
    						list.setStore(studentStore);
							}
    					}
					})
			}
	},
		
	onStoreLoad: function(store, records, successful, operation, eOpts,result) {
		if (successful===false) {
			myschoolishness.controller.Utils.sessionExpired();
		
			return;
		}
			var me = this;
			var titleBar = this.getComponent("studentAbsences");	
			var firstName = sessionStorage.getItem("attendance.first_name");
			var lastName = sessionStorage.getItem("attendance.last_name");
			
			if (sessionStorage.getItem("attendance.id_type")==="staff") {
				firstName = sessionStorage.getItem("staff.first_name");
				lastName = sessionStorage.getItem("staff.last_name");
			}
			titleBar.setTitle(firstName + " " + lastName);
						
       if (myschoolishness.controller.Utils.hasRecords(records)) {
			for (var i=0;i<records.length;i++) {
					var startDateStr =myschoolishness.controller.Utils.getDateStringForDisplayFromDBDate(records[i].get("start_date_time"));
					var endDateStr =myschoolishness.controller.Utils.getDateStringForDisplayFromDBDate(records[i].get("end_date_time"));
					var type =myschoolishness.controller.Utils.absenceTypeIntToString(records[i].get("type"));
					
					
					if (records[i].get("type") !="1") {
						endDateStr = "";
					}
					var excused = "excused";
					if (records[i].get("parent_entered")===undefined || records[i].get("parent_entered") != 1)
						excused = "unexcused";
					if (sessionStorage.getItem("attendance.id_type")==="staff") {
						excused="";
					}
						
					var displayString = type +  " " + startDateStr + " " + endDateStr + " " + excused;
					
					records[i].set('displayString', displayString)
				}

			return;
		} 
    }

})