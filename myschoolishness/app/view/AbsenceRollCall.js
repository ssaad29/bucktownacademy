Ext.define('myschoolishness.view.AbsenceRollCall', {
	extend: 'Ext.List',
	xtype: 'absence-rollcall',
	alias : 'widget.absence-rollcall',
	requires: ['Ext.List'],
	config: {
		iconCls: 'check',
		title: 'Roll call' ,
		grouped: false,
		indexBar: false,
		style: ".myButton { margin-left: 10px; margin-right: 10px;float: left;} .myContent {margin-bottom: 5px;",
		store: 'AttendanceStore',
		itemTpl: '{first_name} {last_name}' + '<div class="myButton">' +
        '<input type="button" name="{AorP}" value="{AorP}" ' +
        'style="padding:3px;">' +
        '</div>' ,
		listeners: {
                itemsingletap: function (list, idx, target, record, evt) {
                	sessionStorage.setItem("attendance.id_type", "student");
					sessionStorage.setItem("attendance.student_id", record.get("student_id"));
					sessionStorage.setItem("attendance.first_name", record.get("first_name"));
					sessionStorage.setItem("attendance.last_name", record.get("last_name"));
                	var lastDate = sessionStorage.getItem("lastDate-attendance");
                	var moreThenOneSec = myschoolishness.controller.Utils.moreThanOneSecondHasElapsed(lastDate);

                	if(moreThenOneSec) {
        				if(evt.target.type == "button"){
        					if (record.get("present") === null || record.get("present") === 0 || record.get("present") === '0') {
        						            				console.log('Add absence ');
								console.log('FIRING fireMarkOutForToday ');
            					list.fireMarkOutForToday();
            					}
            				else {
            				console.log('Go ahead and delete ');
            					list.deleteTodaysAbsences(record.get("student_id"));
            				}
    					} else {
    						sessionStorage.setItem("absence.edit.role", "approver");
							window.location.hash = 'absence/absenceList';
    					}
        			}
        			sessionStorage.setItem("lastDate-attendance", new Date().getTime());
                 }
			}
		},
	
	fireMarkOutForToday: function () {	
	 	this.checkForDupes();
	},
	
	checkForDupes: function() {
    	var startDate =new Date();
		//var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
		var endDate =new Date();
		startDate.setHours(0,0,0,0);
		endDate.setHours(23,59,59,999);
		var student_id = null;
		var user_id=null;
		console.log('attendance.id_type ' + sessionStorage.getItem("attendance.id_type"));
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
		var typeToCreate = 1;
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
			this.saveAbsenceToDatabase(null,null);
		}
	},
	
	tabChosen: function () {	
	 	this.loadData();
	},
	
	saveAbsenceToDatabase: function (tardyDismissalTime,reasonText) {
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
		absentInsertStore.addAfterListener('load',this.afterInsertStoreLoad,this);
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
        			type: 1,
        			createdBy: currentUser,
        			school_entered: schoolEntered,
        			parent_entered: parentEntered,
        			token: sessionStorage.getItem("token")
    			},
    	})
	},

 	afterInsertStoreLoad: function(store, records, successful, operation, eOpts) {
 		Ext.Msg.alert('Status', 'Successfully added attendance record');
    	this.loadData();
	},	
	
    loadData: function () {		
		this.setStore(null);
		//our Store automatically picks up the LocalStorageProxy defined on the Search model
		var store = Ext.create('Ext.data.Store', {
			model: "myschoolishness.model.LoginModel"
		});
			
		store.load();
			//var user_id = store.getAt(0).get("dbId");
			var user_id = sessionStorage.getItem("user_id");

			var attendanceStore = Ext.create('myschoolishness.store.AttendanceStore', {
			model: "myschoolishness.model.AttendanceModel"
			});
		
			attendanceStore.addListener('load',this. onStoreLoad,this);
        	attendanceStore.load({
    			//define the parameters of the store:
    		    		params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    			},

    		scope: this,
    		callback : function(records, operation, success) {
				if (this.getStore() === null) {
    				this.setStore(attendanceStore);
				}
    		}
			})
	},
	
	deleteTodaysAbsences: function (student_id) {
			console.log("deleteTodaysAbsences called" + student_id);
			var todaysAbsenceStore = Ext.create('myschoolishness.store.TodaysAbsenceForStudentStore', {
				model: "myschoolishness.model.TodaysAbsenceForStudentModel"
			});
			console.log("todaysAbsenceStore created" + todaysAbsenceStore);
			console.log("token" + sessionStorage.getItem("token"));
			todaysAbsenceStore.load({
    			//define the parameters of the store:
    		    		params: {
        		student_id: student_id,
        		token: sessionStorage.getItem("token")
    			},
    			
    		scope: this,
    		callback : function(records, operation, success) {		

			if (success===false) {
				console.log("success " + success);
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
				if (success===true) {
						var ids = "";
						
						for (var i=0;i<records.length;i++) {
							console.log("DELETE record with id " + records[i].get("absence_id"));
							this.deleteAbsences(records[i].get("absence_id"));
						}
					}		
				
				}
			})
	},
	
	deleteAbsences: function (absence_id) {
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

			if (success===false) {
				myschoolishness.controller.Utils.sessionExpired();
		
				return;
			}
				if (myschoolishness.controller.Utils.hasRecords(records) || success===true) {
						Ext.Msg.alert('Status', 'Successfully deleted attendance records for today');
						//history.back();
						this.loadData();
					}		
				
				}
			})
		}
	},
	
	showAddedAbsence: function (absence_id) {
		Ext.Msg.alert('Status', 'Successfully added attendance record for today');
		this.loadData();
	},
	
	onStoreLoad: function(store, records, successful, operation, eOpts) {
		var me = this;

		if (successful===false) {
			myschoolishness.app.sessionExpired();
		
			return;
		}	
			for (var i=0;i<records.length;i++) {
					if (records[i].get("present") === null || records[i].get("present") === 0 || records[i].get("present") === '0') {
						records[i].set('AorP', 'P');
						console.log(records[i].get("first_name") + " " + records[i].get("last_name") + " is PRESENT");
					} else {
						records[i].set('AorP', 'A');
						console.log(records[i].get("first_name") + " " + records[i].get("last_name") + " is ABSENT");
						//records[i].set('display_first_name', "<font color='red'> " + records[i].get("first_name") );
						//records[i].set('display_last_name', records[i].get("last_name") + "</font>" );
					}
				}
    }
    
    

})