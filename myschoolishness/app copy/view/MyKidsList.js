Ext.define('myschoolishness.view.MyKidsList', {
	extend: 'Ext.List',
	xtype: 'mykids-list',
	alias : 'widget.mykids-list',
	requires: ['Ext.List'],
	config: {
		iconCls: 'icon-users',
		store : 'MyKidsStore',
		itemTpl:'{student_first} {student_last}',
		itemId:'KidsList',
		listeners: {
                itemtap: function (list, idx, target, record, evt) {
				var me = this;
				sessionStorage.setItem("directory.student_id", record.get("student_id"));
				me.fireEvent('showFamily');                } // itemtaphold
        }
	},
    
    loadData: function () {
		 this.setStore(null);
		 	var studentStore = Ext.create('myschoolishness.store.MyKidsStore', {
			model: 'myschoolishness.model.MyKidsModel'
			});
			studentStore.load({
    		//define the parameters of the store:
    		params: {
        		user_id: sessionStorage.getItem("user_id"),
        		token: sessionStorage.getItem("token"),
    		    				},

    				scope: this,
    				callback : function(records, operation, success) {
							if (success) {
								this.setStore(studentStore);
								console.log("SETTING StUDENT STORE" + records.length);
							} else {
								console.log("NADA StUDENT STORE");
							}
    					}
					})
	},
	
	
		
})