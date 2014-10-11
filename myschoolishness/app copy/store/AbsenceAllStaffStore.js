Ext.define('myschoolishness.store.AbsenceAllStaffStore', {
    extend: 'Ext.data.Store',
	config: {
     	model: 'myschoolishness.model.AbsenceAllStaffModel',
     	autoLoad: true,
     	
     	listeners: [
            {
                fn: 'onStoreLoad',
                event: 'load'
            }
        ]
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
	 
	onStoreLoad: function(store, records, successful, operation, eOpts) {
			for (var i=0;i<records.length;i++) {
					var start = records[i].get("start_date_time");
					records[i].set("start_date_time",this.displayDate(start));
					var end = records[i].get("end_date_time");
					records[i].set("end_date_time",this.displayDate(end));
				}
     }

})