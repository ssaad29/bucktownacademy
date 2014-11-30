Ext.define('myschoolishness.view.ManageBulletins', {
	extend: 'Ext.List',
	xtype: 'manage-bulletins',
	alias : 'widget.manage-bulletins',
	requires: ['Ext.List'],
	config: {
		iconCls: 'news',
		title: 'Bulletins' ,
		store : 'AllBulletinsStore',
		itemTpl:'{title}',
		itemId:'Class Bulletins List',
		listeners: {
            itemtap: function (list, idx, target, record, evt) {
            	console.log("ITEM TAPP invoked");
            	console.log("calling edit bulletin");
            	sessionStorage.setItem("edit_bulletin.origin","staffEdit");
				sessionStorage.setItem("edit_bulletin.bulletin_id", record.get("id"));
				this.fireEvent("editBulletin", this);
        	}
		}
		},
	
	invokeNewFlow: function () {	
		console.log("New invoked");
		sessionStorage.setItem("newbulletin.index","0");
		this.fireEvent("newBulletin", this);
	},
	
	loadData: function () {
		 this.setStore(null);
		 	var bulletinsStore = Ext.create('myschoolishness.store.AllBulletinsStore', {
			model: 'myschoolishness.model.AllBulletinsModel'
			});
			bulletinsStore.addListener('load',this. onStoreLoad,this);
			bulletinsStore.load({
    		//define the parameters of the store:
    		params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token"),
        		userId: sessionStorage.getItem("user_id"),
        		roles: sessionStorage.getItem("roles")
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								for (var i=0;i<records.length;i++) {
									console.log("Record at " + i + " " + records[i].get("title"));
								}
								this.setStore(bulletinsStore);
							}
    					}
					})
	},
})