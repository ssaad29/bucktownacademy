Ext.define('myschoolishness.view.BulletinBoard', {
    extend: 'Ext.List',
    alias: "widget.bulletin-board",
    xtype: 'bulletin-board',
config: {
	 title: 'Welcome',
     store : 'AllBulletinsStore',
     itemTpl: '• <font size=2>{title} </font>',
	title: 'News',
	listeners: {
                itemtap: function (list, idx, target, record, evt) {
                	var message = record.get("message");
                	//this.showOverLay(record.get("title"),message);
                	this.fireEvent('showBulletinDetail',this,record.get("title"),message);
                	//this.showSignatureField();
                }, // itemtaphold
            } // li
    },
    
    showSignatureField: function() {
    },
    
    load: function () {
    console.log("BULLETINS - school id " + sessionStorage.getItem("school_id"));
    console.log("BULLETINS - user id " + sessionStorage.getItem("user_id"));
    console.log("BULLETINS - token " + sessionStorage.getItem("token"));
    console.log("BULLETINS - roles " + sessionStorage.getItem("roles"));
    
		 	this.setStore(null);
		 	var bulletinStore = Ext.create('myschoolishness.store.AllBulletinsStore', {
			model: 'myschoolishness.model.AllBulletinsModel'
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
								console.log("SETTING BUlletin STORE");
							}
    					}
					})
	},
	
    
	
    
})

