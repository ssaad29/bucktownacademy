Ext.define('myschoolishness.view.AbsenceMyKids', {
	extend: 'Ext.List',
	xtype: 'absence-mykids',
	alias : 'widget.absence-mykids',
	requires: ['Ext.List','Ext.data.Store'],
	config: {
		iconCls: 'icon-users',
		title: 'My Kids' ,
		grouped: false,
		indexBar: false,
		itemTpl:'{student_first} {student_last} ',
		itemId:'myKidsAbsenceslist',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
                sessionStorage.setItem("attendance.id_type", "student");
				sessionStorage.setItem("attendance.student_id", record.get("student_id"));
				sessionStorage.setItem("attendance.first_name", record.get("student_first"));
				sessionStorage.setItem("attendance.last_name", record.get("student_last"));
				sessionStorage.setItem("absence.edit.role", "creator");
				var me = this;
				window.location.hash = 'absence/absenceList';
				me.fireEvent('showAbsenceList');        		
				}
			}
		},
		
	tabChosen: function () {	
	 if (this.getStore()==null) {
	 	this.loadData();
	 }
	  //console.log("DATA " + this.getStore().getTotalCount());
	},
	
    loadData: function () {		
    		this.setStore(null);
			var user_id = sessionStorage.getItem("user_id");
			var kidsStore = Ext.create('myschoolishness.store.AbsenceMyKidsStore', {
			model: "myschoolishness.model.AbsenceMyKidsModel"
			});
		    
        	kidsStore.load({
    			//define the parameters of the store:
    		    		params: {
        		user_id: user_id,
        		token: sessionStorage.getItem("token")
    			},

    		scope: this,
    		callback : function(records, operation, success) {

						if (success===false) {
							myschoolishness.app.sessionExpired();
		
							return;
						}

				if (myschoolishness.app.hasRecords(records) && this.getStore() === null) {
    				this.setStore(kidsStore);
				}
    		}
			})
	},

})