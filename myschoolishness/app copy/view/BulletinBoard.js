Ext.define('myschoolishness.view.BulletinBoard', {
    extend: 'Ext.List',
    alias: "widget.bulletin-board",
    xtype: 'bulletin-board',
    requires: ['Ext.List'],
config: {
	iconCls: 'icon-users',
	 title: 'Welcome',
     store : 'AllBulletinsStore',
     itemTpl: '{title} ',
	title: 'News',
	listeners: {
                itemtap: function (list, idx, target, record, evt) {
                	var message = record.get("message");
                	this.fireEvent('showBulletinDetail',this,record.get("title"),message);
                }, // itemtaphold
            } // li
    },
    
    showSignatureField: function() {
    },
    
    show: function () {
    	this.loadData();
    },
    
    loadData: function () {
    console.log("BULLETIN++++++ school_id " + sessionStorage.getItem("school_id"));
    console.log("BULLETIN++++++ userId " + sessionStorage.getItem("user_id"));
    console.log("BULLETIN++++++ token " + sessionStorage.getItem("token"));
    console.log("BULLETIN++++++ roles " + sessionStorage.getItem("roles"));
    
		 //this.setStore(null);
		 	var bulletinStore = Ext.create('myschoolishness.store.AllBulletinsStore', {
				model: "myschoolishness.model.AllBulletinsModel"
		});
			bulletinStore.load({
    		//define the parameters of the store:
    		params: {
        		school_id: sessionStorage.getItem("school_id"),
        		userId: sessionStorage.getItem("user_id"),
        		token: sessionStorage.getItem("token"),
        		roles: sessionStorage.getItem("roles")
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								this.setStore(bulletinStore);
								console.log("SETTING BULLETIN----- STORE" + records.length);
							} else {
								console.log(" BULLETIN----- FAULT");
							}
    					}
					})
	},
	
    
})

