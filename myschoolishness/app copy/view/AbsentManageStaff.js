Ext.define('myschoolishness.view.AbsentManageStaff', {
	extend: 'Ext.List',
	xtype: 'absence-manage-staff',
	alias : 'widget.absence-manage-staff',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-hammer2',
		title: 'Staff Absences' ,
		grouped: true,
		indexBar: true,
		store : 'AbsentManageStaffStore',
		itemTpl:'{first_name} {last_name}',
		itemId:'absence-manage-staff',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
				sessionStorage.setItem("attendance.id_type", "staff");
				sessionStorage.setItem("absence.edit.role", "creator");
				sessionStorage.setItem("staff.first_name", record.get("first_name"));
				sessionStorage.setItem("staff.last_name", record.get("last_name"));
				sessionStorage.setItem("staff.user_id", record.get("user_id"));
				var me = this;
				window.location.hash = 'absence/absenceList';
				me.fireEvent('showAbsenceList');        		
        		}
			}
		},
		
	tabChosen: function () {	
	console.log("loading staff DATA ");
	 if (this.getStore()==null) {
	 	this.loadData();
	 }
	  
	},
	
    loadData: function () {		
    		this.setStore(null);
			var user_id = sessionStorage.getItem("user_id");
			var staffStore = Ext.create('myschoolishness.store.AbsentManageStaffStore', {
			model: "myschoolishness.model.AbsentManageStaffModel"
			});
		    
        	staffStore.load({
    			//define the parameters of the store:
    		    		params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    			},

    		scope: this,
    		callback : function(records, operation, success) {

						if (success===false) {
							myschoolishness.controller.Utils.sessionExpired();
		
							return;
						}

				if (myschoolishness.controller.Utils.hasRecords(records) && this.getStore() === null) {
    				this.setStore(staffStore);
				}
    		}
			})
	},
})