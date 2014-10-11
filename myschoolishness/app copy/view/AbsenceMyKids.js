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
		
	displayDate: function (dateString) {  
		var date = new Date();  
		
		if (dateString === null || dateString === undefined || dateString.length < 1) {
			return date;
		}
    	
    	var parts = String(dateString).split(/[- : T Z]/);  
    	
    	date.setFullYear(parts[0]);  
    	date.setMonth(parts[1] );  
    	date.setDate(parts[2]);  
    	date.setHours(parts[3]);  
    	date.setMinutes(parts[4]);  
    	date.setSeconds(parts[5]);  
    	date.setMilliseconds(0);  
    	var hours = date.getHours();
    	var ampm = hours >= 12 ? 'pm' : 'am';
  		hours = hours % 12;
  		hours = hours ? hours : 12; // the hour '0' should be '12'
  		var minutes = date.getMinutes();
  		minutes = minutes < 10 ? '0'+minutes : minutes;
  		var strTime = hours + ':' + minutes + ' ' + ampm;
  		var month = date.getMonth();
  		if (month === 0)
  			month = 12;
  		
      	var formattedDate = month + "/" + date.getDate() + "/" + date.getFullYear() + "-" + strTime;
      	
      	return formattedDate;
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

				if (success) {
    				this.setStore(kidsStore);
				}
    		}
			})
	},

})