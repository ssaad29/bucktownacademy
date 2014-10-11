Ext.define('myschoolishness.view.ManageParents', {
	extend: 'Ext.List',
	xtype: 'manage-parents',
	alias : 'widget.manage-parents',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-users2',
		title: 'Users' ,
		store : 'ParentsStore',
		itemTpl:'{first_name} {last_name}',
		itemId:'Parents Admin List',
		listeners: {
            itemtap: function (list, idx, target, record, evt) {
				sessionStorage.setItem("user_crud.user_id", record.get("user_id"));
				sessionStorage.setItem("edit_user.origin","staff");
				this.fireEvent("showEditUser", this);
        	}
		}
		},
	
	invokeNewFlow: function () {	
		sessionStorage.setItem("edit_parent.origin","staffEdit");
		sessionStorage.setItem("newparent.index","2");
		this.fireEvent("showNewUser", this);
	},
	
	loadData: function () {
		console.log("Reloading parents");
		 this.setStore(null);
		 	var parentStore = Ext.create('myschoolishness.store.UsersStore', {
			model: 'myschoolishness.model.UsersModel'
			});
			//parentStore.addListener('load',this. onStoreLoad,this);
			parentStore.load({
    		//define the parameters of the store:
    		params: {
        		school_id: sessionStorage.getItem("school_id"),
        		token: sessionStorage.getItem("token"),
        		roles: sessionStorage.getItem("roles")
    			},
    			scope: this,
    			callback : function(records, operation, success) {
					if (success) {
						console.log("reload parents");
						this.setStore(parentStore);
					}
    			}
			})

			
	},
})