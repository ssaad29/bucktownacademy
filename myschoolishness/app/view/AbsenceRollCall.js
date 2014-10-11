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
		store: 'AttendanceStore',
		itemTpl:'{display_first_name} {display_last_name} ',
		itemId:'attendanceList',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
                	setTimeout(function() {
					console.log("Item tap" + idx);
					if (this.actions) {
					console.log("Hidden" + this.actions.getHidden());
					}
					console.log("this.actions" + this.actions);
					if (!this.actions) {
										console.log("CREATING NEW");
		        							this.actions = Ext.Viewport.add({
		        								xtype: 'actionsheet',
		        								items: [
        											{
            										text: 'Roll call',
            										scope: this,
            											handler: function() {
            												
            												sessionStorage.setItem("attendance.id_type", "student");
															sessionStorage.setItem("attendance.student_id", record.get("student_id"));
															sessionStorage.setItem("attendance.first_name", record.get("first_name"));
															sessionStorage.setItem("attendance.last_name", record.get("last_name"));
															sessionStorage.setItem("absence.edit.role", "approver");
															window.location.hash = 'absence/absenceList';
															//this.fireEvent('showAbsenceList');
															this.actions.hide();
															console.log("Hiding...");
            											}
        											},
        											{
            										text: 'Sign in / Sign out',
            										scope: this,
            											handler: function() {
            												this.actions.hide();
            												//this.up().up().up().onRecordTardy();
            												console.log("Hiding...");
            											}
        											},
    											]
		        							})
		        						} else if (this.actions.getHidden() === true){
		        							console.log("Showing OLD");
		        							this.actions.show();
		        							console.log("Showing...");
		        						}                
                 }, 0);
        		}
        		
			}
		},
			
	tabChosen: function () {	
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
	
	onStoreLoad: function(store, records, successful, operation, eOpts) {
		var me = this;

		if (successful===false) {
			myschoolishness.app.sessionExpired();
		
			return;
		}	
			for (var i=0;i<records.length;i++) {
					if (records[i].get("present") === null || records[i].get("present") === 0 || records[i].get("present") === '0') {
						records[i].set('display_first_name', "<font color='black'> " + records[i].get("first_name") );
						records[i].set('display_last_name', records[i].get("last_name") + "</font>" );

					} else {
						records[i].set('display_first_name', "<font color='red'> " + records[i].get("first_name") );
						records[i].set('display_last_name', records[i].get("last_name") + "</font>" );
					}
				}
			this.refresh();

    }
    
    

})