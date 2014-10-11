Ext.define('myschoolishness.view.DirectoryStaff', {
	extend: 'Ext.List',
	xtype: 'directory-staff',
	alias : 'widget.directory-staff',
	config: {
		iconCls: 'icon-users2',
		grouped: true,
		indexBar: true,
		pinHeaders: false,
		store : 'DirectoryStaffStore',
		itemTpl:'{first_name} {last_name}',
		itemId:'Staff Directory',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
				var me = this;
				sessionStorage.setItem("directory.user_id", record.get("user_id"));
				me.fireEvent('showStaffDetail');
        		}
			}
		},
		
	onSearchKeyUp: function(queryString) {
  		var store = this.getStore();
  		store.clearFilter();
 
  		if(queryString){
   			var thisRegEx = new RegExp(queryString, "i");
   			store.filterBy(function(record) {
    		if (thisRegEx.test(record.get('first_name')) || thisRegEx.test(record.get('last_name'))  ) {
     			return true;
    			}
    		return false;
    		});
 		}
 	},
	
	loadData: function () {
		 this.setStore(null);
		 	var staffStore = Ext.create('myschoolishness.store.DirectoryStaffStore', {
			model: 'myschoolishness.model.DirectoryStaffModel'
			});
			staffStore.load({
    		//define the parameters of the store:
    		params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token"),
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								this.setStore(staffStore);
								console.log("SETTING STAFF STORE");
							}
    					}
					})
	},
	
	onClearSearch: function() {
  		var store = this.getStore();
  		store.clearFilter();
 	},	
		
})