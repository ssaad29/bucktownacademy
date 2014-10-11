Ext.define('myschoolishness.view.DirectoryBirthdays', {
    extend: 'Ext.dataview.List',
    xtype: 'directory-birthdays',
    alias : 'widget.directory-birthdays',
    config: {
     store : 'DirectoryBirthdaysStore',
     itemTpl: ' {first_name} {last_name} {display_birthdate} {type}',
     iconCls: 'icon-gift',
	itemId:'birthdays',
    },
    
 initialize: function () {
		var store = this.getStore();
		store.load({
    	//define the parameters of the store:
    	params: {
        	school_id: sessionStorage.getItem("school_id"),
        	token: sessionStorage.getItem("token")
    		},

    		scope: this,
    		callback : function(records, operation, success) {
				for (var i=0;i<records.length;i++) {
						var birthday = records[i].get("birthdate");
							if (birthday!=null && birthday.length >0) {
							var parts = String(birthday).split(/[- : T Z]/);  
							var date = new Date();  
    						date.setMonth(parts[1] );  
    						date.setDate(parts[2]);   
    						var month = date.getMonth();
  							if (month === 0)
  							month = 12;
  							var bdayWithYear = date.toDateString();
  							var bdayNoYear = bdayWithYear.substr(0,bdayWithYear.length -4); 
      						records[i].set("display_birthdate","<font color='green'> " +bdayNoYear + " </font>");
      					}
					}
    		}
			})

		this.setStore(store);
	},
})
